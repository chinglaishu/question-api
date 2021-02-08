import RecordQuestion from "../../models/recordquestion";
import UtilFunction from "../util/utilfunction";
import QuestionQuery from "./questionquery";
import moment from "moment";

const Query = {
  async deleteAllRecord() {
    const deleteAll = await (RecordQuestion as any).sequelize.query(`delete from record_question`);
    return deleteAll;
  },
  async addRecordByQuestionId(isExist: boolean, question_id: number, user_id: number, recordObj: any) {
    const result = isExist
      ? await (RecordQuestion as any).sequelize.query(`UPDATE record_question SET record_list = jsonb_set(record_list, '{${user_id}, 2147483647}', $recordObj) where question_id = $question_id;`, {bind: {recordObj, question_id}})
      : await (RecordQuestion as any).sequelize.query(`UPDATE record_question SET record_list = jsonb_set(record_list, '{${user_id}}', $recordObj ) where question_id = $question_id;`, {bind: {recordObj, question_id}});
    if (!result) {return false; }
    return true;
  },
  async insertNewRecordWhenCreateQuestion(question_id: number) {
    const result = await (RecordQuestion as any).sequelize.query(`insert into record_question (question_id) values ($question_id);`, {bind: {question_id}});
    if (!result) {return false; }
    return true;
  },
  async selectByQuestionIdAndUserId(question_id: number, user_id: number) {
    const searchInsideRecord = await (RecordQuestion as any).sequelize.query(`select record_list -> $user_id from record_question where question_id = $question_id;`, {bind: {user_id, question_id}});
    const valueList = Object.values(searchInsideRecord[0][0]);
    return valueList[0];
    // return null or obj[]
  },
  async getRecordByQuestionId(question_id: number, userIdInToken: number) {
    const questionObj = await QuestionQuery.getQuestionById(question_id);
    const {close_date, user_id} = questionObj;
    const isOwner = (user_id === userIdInToken);
    const isAfterCloseDate = UtilFunction.checkTimeAIsBeforeB(moment(close_date), moment());
    if (!isOwner && !isAfterCloseDate) {return false; }
    const result = await (RecordQuestion as any).sequelize.query(`select record_list from record_question where question_id = $question_id;`, {bind: {question_id}});
    if (!result) {return false; }
    return result[0][0].record_list;
  },
  async addUserGainByQuestionId(question_id: number, recordObj: any) {
    const result = (RecordQuestion as any).sequelize.query(`UPDATE record_question SET record_list = $recordObj where question_id = $question_id;`, {bind: {recordObj, question_id}});
    if (!result) {return false; }
    return true;
  },
  async getRecordByQuestionIdListAndUserId(idList: number[], user_id: any) {
    const questionObjList = await QuestionQuery.getQuestionByIdList(idList, "all");
    const useIdList = questionObjList.map((questionObj: any) => questionObj.question_id);
    if (useIdList.length === 0) {return []; }
    const idListString = UtilFunction.createIdListString(idList);
    const recordResult = await (RecordQuestion as any).sequelize.query(`select record_list -> $user_id from record_question where question_id in (${idListString});`, {bind: {user_id}});
    if (!recordResult) {return false; }
    const resultList = recordResult[0];
    const useList: any = [];
    for (let i = 0 ; i < resultList.length ; i++) {
      const recordObjList: any = Object.values(resultList[i])[0];
      if (!recordObjList) {continue; }
      if (recordObjList.length === 0) {continue; }
      const question_id = useIdList[i];
      for (let a = 0 ; a < recordObjList.length ; a++) {
        const useObj = recordObjList[a];
        useList.push(useObj);
      }
    }
    return useList;
  },
};

export default Query;

// UPDATE record_question SET record_list = jsonb_set(record_list, '{1}', '[{"answer": 1, "value": 20}]' ) where question_id = 1;
// UPDATE record_question SET record_list = jsonb_set(record_list, '{1, 2147483647}', '{"answer": 4,"value": 100}') where question_id = 1;