import Question from "../../models/question";
import UtilFunction from "../util/utilfunction";
import QuestionCheck from "../util/questioncheck";
import UserQuery from "./userquery";
import RecordQuestionQuery from "./recordquestionquery";
import moment, { max } from "moment";

const questionColumnObjList = [
  {name: "question_id", action: ["null"], limit: []},
  {name: "disable_state", action: ["null"], limit: []},
  {name: "username", action: ["create"], limit: []},
  {name: "user_id", action: ["null"], limit: []},
  {name: "title", action: ["create", "edit"], limit: [], type: "emoji_input"},
  {name: "description", action: ["create", "edit"], limit: [], type: "emoji_textarea"},
  {name: "question_type", action: ["create", "edit"], limit: ["vote", "choose", "decidedByOwnerWithOption", "decidedByOwnerWithoutOption"], type: "text"},
  {name: "ratio_type", action: ["create", "edit"], limit: ["fixed", "auto", "have_initial_value"], type: "text"},
  {name: "option_list", action: ["create", "edit"], limit: [], type: "text"},
  {name: "correct_answer", action: ["create", "edit"], limit: [], type: "text"},
  {name: "min_choose_number", action: ["create", "edit"], limit: [], type: "number"},
  {name: "max_choose_number", action: ["create", "edit"], limit: [], type: "number"},
  {name: "choose_record", action: ["create", "edit"], limit: []},
  {name: "category", action: ["create", "edit"], limit: ["regular", "news", "sport", "other"], type: "text"},
  {name: "minimum_fee", action: ["create", "edit"], limit: [], type: "number"},
  {name: "maximum_fee", action: ["create", "edit"], limit: [], type: "number"},
  {name: "initial_pool", action: ["create", "edit"], limit: [], type: "number"},
  {name: "other_pool", action: ["null"], limit: []},
  {name: "add_pool_percentage", action: ["create", "edit"], limit: [], type: "number"},
  {name: "attempt_number", action: ["null"], limit: []},
  {name: "is_show_attempt_number", action: ["create", "edit"], limit: [], type: "boolean"},
  {name: "winner_number", action: ["null"], limit: []},
  {name: "is_show_winner_number", action: ["create", "edit"], limit: [], type: "boolean"},
  {name: "end_requirement", action: ["create", "edit"], limit: ["total_pool", "attempt_number", "winner_number", "null"], type: "text"},
  {name: "end_requirement_value", action: ["create", "edit"], limit: [], type: "number"},
  {name: "visible_date", action: ["create", "edit"], limit: [], type: "date"},
  {name: "open_date", action: ["create", "edit"], limit: [], type: "date"},
  {name: "close_date", action: ["create", "edit"], limit: [], type: "date"},
  {name: "end_date", action: ["create", "edit"], limit: [], type: "date"},
];

const Query = {
  async deleteAllQuestion() {
    const deleteAll = await (Question as any).sequelize.query(`delete from question_table;`);
    return deleteAll;
  },
  async createQuestion(question_id: number, user_id: number, createQuestionBody: any, aviodCheck: boolean = false) {
    if (!aviodCheck) {
      if (!QuestionCheck.checkAll(createQuestionBody)) {return false; }
    }
    const changeUserValueResult = await UserQuery.changeValue("minus", user_id, createQuestionBody.initial_pool * -1, "addOwnQuestion", question_id);
    if (!changeUserValueResult) {return false; }
    createQuestionBody = this.createInitialRatioAndRecord(createQuestionBody);
    createQuestionBody = this.createAnswerObj(createQuestionBody);
    const useKeyList = UtilFunction.getNameListInObjList(questionColumnObjList, "create");
    let [columnString, valueString, bind] = UtilFunction.createColumnValueStringAndBindObj(useKeyList, createQuestionBody);
    if (columnString.length === 0) {return false; }
    columnString += ", question_id, user_id, created_date";
    valueString += ", $question_id, $user_id, $created_date";
    bind["question_id"] = question_id;
    bind["user_id"] = user_id;
    bind["created_date"] = moment().add(-7, "days");
    const result = await (Question as any).sequelize.query(`INSERT INTO question_table (${columnString}) values (${valueString});`, {bind: bind});
    if (!result) {return false; }
    const addRecordResult = await RecordQuestionQuery.insertNewRecordWhenCreateQuestion(question_id);
    if (!addRecordResult) {return false; }
    return true;
  },
  async getMaxId() {
    const result = await (Question as any).sequelize.query(`select question_id from question_table order by question_id desc limit 1;`);
    if (!result) {return false; }
    if (!result[0][0]) {return 0; }
    return result[0][0].question_id;
  },
  async editQuestion(question_id: number, user_id: number, editQuestionBody: any) {
    editQuestionBody = this.createInitialRatioAndRecord(editQuestionBody);
    editQuestionBody = this.createAnswerObj(editQuestionBody);
    const currentQuestionObj = await this.getQuestionById(question_id);
    const {open_date} = currentQuestionObj;
    const isBeforeOpen = UtilFunction.checkTimeAIsBeforeB(moment(), moment(open_date));
    if (!isBeforeOpen) {return false; }
    const currentInitialPool = currentQuestionObj.initial_pool;
    const newInitialPool = editQuestionBody.initial_pool;
    if (newInitialPool < 0 || currentInitialPool < 0) {return false; }
    const poolDiff = (newInitialPool - currentInitialPool) * -1;
    const limitValueType = (poolDiff > 0) ? "minus" : "add";
    const changeUserValueResult = await UserQuery.changeValue(limitValueType, user_id, poolDiff);
    if (!changeUserValueResult) {return false; }
    const useKeyList = UtilFunction.getNameListInObjList(questionColumnObjList, "edit");
    let [columnString, valueString, bind] = UtilFunction.createColumnValueStringAndBindObj(useKeyList, editQuestionBody);
    if (columnString.length === 0) {return false; }
    bind["question_id"] = question_id;
    const result = await (Question as any).sequelize.query(`update question_table set (${columnString}) = (${valueString}) where question_id = $question_id;`, {bind: bind});
    if (!result) {return false; }
    return true;
  },
  async editAnswer(question_id: number, editQuestionBody: any) {
    editQuestionBody = this.createAnswerObj(editQuestionBody);
    const currentQuestionObj = await this.getQuestionById(question_id);
    const {end_date} = currentQuestionObj;
    const isBeforeEnd = UtilFunction.checkTimeAIsBeforeB(moment(), moment(end_date));
    // if (!isBeforeEnd) {return false; }
    const {correct_answer} = editQuestionBody;
    const bind = {
      correct_answer,
      question_id,
    };
    const result = await (Question as any).sequelize.query(`update question_table set correct_answer = $correct_answer where question_id = $question_id;`, {bind});
    if (!result) {return false; }
    return true;
  },
  async getQuestionById(question_id: number) {
    const result = await (Question as any).sequelize.query(`select * from question_table where question_id = $question_id;`, {bind: {question_id}});
    if (!result) {return false; }
    return result[0][0];
  },
  async getQuestionByIdList(idList: number[], time_name: string) {
    if (idList.length === 0) {return []; }
    const currentTimestamp = moment().toISOString();
    const idListString = UtilFunction.createIdListString(idList);
    if (idListString === "") {return false; }
    let query = `select * from question_table where question_id in (${idListString})`;
    if (time_name === "visible") {
      query += `and visible_date < timestamp '${currentTimestamp}' and open_date > timestamp '${currentTimestamp}';`;
    } else if (time_name === "open") {
      query += `and open_date < timestamp '${currentTimestamp}' and close_date > timestamp '${currentTimestamp}';`;
    } else if (time_name === "closed") {
      query += `and close_date < timestamp '${currentTimestamp}' and disable_state != 'distributed';`;
    } else if (time_name === "distributed") {
      query += `and disable_state = 'distributed';`;
    } else {
      query += ";";
    }
    const result = await (Question as any).sequelize.query(query);
    if (!result) {return false; }
    return result[0];
  },
  async getQuestionList(time_name: string) {
    const currentTimestamp = moment().toISOString();
    let query: string = "";
    if (time_name === "visible") {
      query = `select * from question_table where visible_date < timestamp '${currentTimestamp}' and open_date > timestamp '${currentTimestamp}';`;
    } else if (time_name === "open") {
      query = `select * from question_table where open_date < timestamp '${currentTimestamp}' and close_date > timestamp '${currentTimestamp}';`;
    } else if (time_name === "closed") {
      query = `select * from question_table where close_date < timestamp '${currentTimestamp}' and disable_state != 'distributed';`;
    } else if (time_name === "distributed") {
      query = `select * from question_table where disable_state = 'distributed';`;
    } else if (time_name === "all") {
      query = `select * from question_table;`;
    }
    if (query === "") {return false; }
    const result = await (Question as any).sequelize.query(query);
    if (!result) {return false; }
    return result[0];
  },
  async getNeedToDistruibuteList() {
    const currentTimestamp = moment().toISOString();
    const result = await (Question as any).sequelize.query(`select * from question_table where end_date < timestamp '${currentTimestamp}' and disable_state != 'distributed';`);
    if (!result) {return false; }
    return result[0];
  },
  filterQuestionObjList(questionObjList: any[], userIdInToken: number) {
    return questionObjList.map((questionObj: any) => {
      if (questionObj.user_id === userIdInToken) {return questionObj; }
      return (
        this.filterQuestionObj(questionObj)
      );
    })
  },
  filterQuestionObj(questionObj: any) {
    const {close_date} = questionObj;
    const isAfterCloseDate = UtilFunction.checkTimeAIsBeforeB(moment(close_date), moment());
    if (isAfterCloseDate) {return questionObj; }
    let deleteKeyList: string[] = [];
    let hideKeyList: string[] = [];
    if (questionObj.end_requirement === "null") {deleteKeyList.push("end_requirement_value"); }
    if (!questionObj.is_show_attempt_number) {hideKeyList.push("attempte_number"); }
    if (!questionObj.is_show_winner_number) {hideKeyList.push("winner_number"); }
    let filterObj = UtilFunction.deleteKeyByList(questionObj, deleteKeyList);
    filterObj = UtilFunction.setNotShowByList(filterObj, hideKeyList);
    filterObj = UtilFunction.hideAnswer(filterObj);
    return filterObj;
  },
  async deleteQuestion(question_id: number) {
    const result = await (Question as any).sequelize.query(`delete from question_table where question_id = $question_id;`, {bind: question_id});
    if (!result) {return false; }
    return true;
  },
  checkAddWinnerNumber(question_type: string, correct_answer: string, answer: any) {
    if (UtilFunction.checkQuestionTypeIsNoCorrectAnswer(question_type)) {return [false, 0]; }
    if (question_type === "vote") {return [false, 0]; }
    const [isCorrect, value] = this.checkIfCorrectAnswer(correct_answer, answer, question_type, {}, 0, {});
    return [isCorrect, value];
  },
  checkIfCorrectAnswer(correct_answer: any, answer: any, question_type: string, choose_record: any, value: number, option_list: any) {
    if (question_type === "vote") {
      answer = this.getAnswerOrderListOfVote(correct_answer, answer, choose_record);
    }
    return this.checkIfOneOfCorrectAnswer(correct_answer, answer, question_type, value, option_list);
  },
  getAnswerOrderListOfVote(correct_answer: any, answer: any, choose_record: any) {
    const keyList = Object.keys(choose_record);
    const valueList = Object.values(choose_record);
    const addKeyToValueList = valueList.map((useObj: any, index: number) => {
      useObj.key = keyList[index];
      return useObj;
    });
    const sortList = addKeyToValueList.sort((a: any, b: any) => {
      return a.totalValueOnOption - b.totalValueOnOption;
    });
    const orderedKeyList = sortList.map((useObj: any) => useObj.key);
    const answerOrderList = answer.map((answerNum: any) => orderedKeyList.indexOf(answerNum));
    return answerOrderList;
  },
  checkIfOneOfCorrectAnswer(correct_answer: any, answer: any, question_type: string, value: number, option_list: any): any {
    const keyList = Object.keys(correct_answer);
    let isCorrect = false;
    let maxValue = 0;
    for (let i = 0 ; i < keyList.length ; i++) {
      // ratio_type add all, add all time num, time all, time all time num, fixed
      const {parameter, ratio_type, answer_list, answer_type} =  correct_answer[keyList[i]];
      if (UtilFunction.isNoOption(question_type)) {
        if (answer_list === answer) {
          isCorrect = true;
          const useValue = value * parameter;
          if (maxValue < useValue) {maxValue = useValue; }
        }
        continue;
      }
      if (this.checkMatchAnswerList(answer_list, answer, answer_type)) {
        isCorrect = true;
        const useValue = value * this.getRatioOfCorrect(answer_list, option_list, ratio_type, parameter);
        if (maxValue < useValue) {maxValue = useValue; }
      }
    }
    return [isCorrect, maxValue];
  },
  checkMatchAnswerList(answer_list: number[], answer: number[], answer_type: string) {
    const notFollowOrder = answer_type === "not_follow_order";
    for (let i = 0 ; i < answer_list.length ; i++) {
      const index = answer.indexOf(answer[i]);
      if (index === -1) {return false; }
      if (!notFollowOrder) {
        if (index !== i) {return false; }
      }
    }
  },
  getRatioOfCorrect(answer_list: number[], option_list: any, ratio_type: string, parameter: number) {
    const timeList = ["time_all", "time_all_time_num"];
    const isTimeRatio = timeList.includes(ratio_type);
    let useRatio = (timeList.includes(ratio_type)) ? 1 : 0;
    for (let i = 0 ; i < answer_list.length ; i++) {
      const key = String(answer_list[i]);
      const {ratio} = option_list[key];
      if (isTimeRatio) {
        useRatio = useRatio * ratio;
      } else {
        useRatio = useRatio + ratio;
      }
    }
    if (ratio_type === "add_all_time_num" || ratio_type === "time_all_time_num") {
      useRatio = useRatio * parameter;
    }
    if (ratio_type === "fixed") {
      useRatio = parameter;
    }
    return useRatio;
  },
  createAnswerObj(questionObj: any) {
    const {correct_answer_number} = questionObj;
    const correct_answer: any = {};
    for (let i = 0 ; i < correct_answer_number ; i++) {
      const name = `answer_${i}`;
      const answer_list = questionObj[`answer_${i}`];
      const answer_type = questionObj[`answer_${i}_type`];
      const ratio_type = questionObj[`answer_${i}_ratio_type`];
      const parameter = questionObj[`answer_${i}_parameter`];
      correct_answer[i] = {answer_list, answer_type, ratio_type, parameter};
    }
    questionObj.correct_answer = correct_answer;
    return questionObj;
  },
  createInitialRatioAndRecord(questionObj: any) {
    let {option_list, ratio_type, initial_pool} = questionObj;
    const keyList = Object.keys(option_list);
    if (keyList.length === 0) {return questionObj; }
    const choose_record: any = {};
    // ratio_type: "fixed", "auto", "have_initial_value"
    for (let i = 0 ; i < keyList.length ; i++) {
      if (ratio_type === "auto") {
        questionObj.option_list[keyList[i]].ratio = keyList.length;
      }
      const totalValueOnOption = initial_pool / questionObj.option_list[keyList[i]].ratio
      choose_record[keyList[i]] = {frequency: 0, totalValueOnOption};
    }
    questionObj.choose_record = choose_record;
    return questionObj;
  },
  getOptionListByChooseRecord(ratio_type: string, option_list: any, choose_record: any, total_pool: number) {
    if (ratio_type === "fixed") {return option_list; }
    const keyList = Object.keys(choose_record);
    for (let i = 0 ; i < keyList.length ; i++) {
      const {totalValueOnOption} = choose_record[keyList[i]];
      const newRatio = total_pool / totalValueOnOption;
      option_list[keyList[i]].ratio = newRatio;
    }
    return option_list;
  },
  async submitQuestion(question_id: number, user_id: number, submitQuestionBody: any, forceTimestamp?: any) {
    const getDataFromQuestion = await this.getQuestionById(question_id);
    if (!getDataFromQuestion) {return false; }
    const {correct_answer, choose_record, question_type, ratio_type, initial_pool, other_pool, add_pool_percentage, close_date} = getDataFromQuestion;
    if (!UtilFunction.checkTimeAIsBeforeB(moment(), moment(close_date))) {return false; }
    const {value, answer, username, title} = submitQuestionBody;
    const changeUserValueResult = await UserQuery.changeValue("minus", user_id, value * -1, "addDoQuestion", question_id);
    if (!changeUserValueResult) {return false; }
    const [isAddWinner, maxValue] = this.checkAddWinnerNumber(question_type, correct_answer, answer);
    const searchInsideRecord: any = await RecordQuestionQuery.selectByQuestionIdAndUserId(question_id, user_id);
    const isExist = UtilFunction.checkIsArrayAndHaveItem(searchInsideRecord);
    const useTimestamp = (!!forceTimestamp)
      ? moment(forceTimestamp)
      : moment();
    const useObj = {value, answer, title, username, timestamp: useTimestamp, isWinner: isAddWinner, question_id};
    const recordObj = (isExist) ? JSON.stringify(useObj) : JSON.stringify([useObj]);
    const addRecordResult = await RecordQuestionQuery.addRecordByQuestionId(isExist, question_id, user_id, recordObj);
    if (!addRecordResult) {return false; }
    let {option_list} = getDataFromQuestion;
    const total_pool = initial_pool + other_pool * (add_pool_percentage * 0.01);
    if (!UtilFunction.isNoOption(question_type)) {
      const answer_list = answer;
      if (answer_list.length === 0) {return false; }
      const eachValue = value / answer_list.length;
      for (let i = 0 ; i < answer_list.length ; i++) {
        choose_record[answer_list[i]].frequency = choose_record[answer_list[i]].frequency + 1;
        choose_record[answer_list[i]].totalValueOnOption = choose_record[answer_list[i]].totalValueOnOption + eachValue;
      }
    }
    option_list = this.getOptionListByChooseRecord(ratio_type, option_list, choose_record, total_pool);
    const addWinnerNum = (isAddWinner) ? 1 : 0;
    const result = await (Question as any).sequelize.query(`update question_table set (attempt_number, winner_number, option_list, choose_record, other_pool) = (attempt_number + 1, winner_number + $addWinnerNum, $option_list, $choose_record, other_pool + $value) where question_id = $question_id;`, {bind: {addWinnerNum, option_list, choose_record, question_id, value}});
    if (!result) {return false; }
    await this.checkQuestionBreak(getDataFromQuestion, isAddWinner, total_pool);
    return true;
  },
  async checkQuestionBreak(questionObj: any, isAddWinner: boolean, total_pool: number) {
    const {end_requirement, end_requirement_value, question_id} = questionObj;
    let {attempt_number, winner_number} = questionObj;
    if (end_requirement === "null") {return; }
    attempt_number++;
    if (isAddWinner) {winner_number++; }
    const checkObj: any = {total_pool, attempt_number, winner_number};
    const checkValue = checkObj[end_requirement];
    if (checkValue === undefined || checkValue === null) {return; }
    const isBreak = Math.round(checkValue) >= Math.round(end_requirement_value);
    if (!isBreak) {return; }
    const breakResult = await this.breakQuestion(question_id);
    return breakResult;
  },
  async breakQuestion(question_id: number) {
    console.log("it break");
    const currentTimestamp = moment();
    const result = await (Question as any).sequelize.query(`update question_table set (disable_state, close_date) = ('break', $currentTimestamp) where question_id = $question_id;`, {bind: {currentTimestamp, question_id}});
    if (!result) {return false; }
    return true;
  },
  async checkQuestionDistribute() {
    const questionObjList = await this.getNeedToDistruibuteList();
    for (let i = 0 ; i < questionObjList.length ; i++) {
      const questionObj = questionObjList[i];
      const {question_id} = questionObj;
      const distributeResult = await this.distributeValue(questionObj);
      if (!distributeResult) {
        console.log(`distribute fail: id:  ${questionObj.question_id}`);
        const result = await (Question as any).sequelize.query(`update question_table set disable_state = 'distribute_fail' where question_id = $question_id;`, {bind: {question_id}});
        if (!result) {console.log(result); }
      } else {
        const result = await (Question as any).sequelize.query(`update question_table set disable_state = 'distributed' where question_id = $question_id;`, {bind: {question_id}});
        if (!result) {console.log(result); }
      }
    }
  },
  async distributeValue(questionObj: any) {
    console.log("start distribute quesiton: " + questionObj.question_id)
    const {question_id, user_id, option_list, correct_answer, initial_pool, other_pool, add_pool_percentage, question_type, choose_record} = questionObj;
    /*
    if (!(parseInt(correct_answer) >= 0)) {
      console.log("not set");
      return false;
    }
    */
    const recordObj = await RecordQuestionQuery.getRecordByQuestionId(question_id, user_id);
    if (!recordObj) {return false; }
    // current not handling fixed ratio...
    // const useRatio = option_list[correct_answer].ratio;
    const total_pool = initial_pool + other_pool * (add_pool_percentage * 0.01);
    const remain_pool = other_pool * (1 - (add_pool_percentage * 0.01));
    const totalValue = initial_pool + other_pool;
    console.log(recordObj);
    const [newRecordObj, correctObj] = this.createNewRecordObjAndCorrectObj(recordObj, correct_answer, total_pool, question_type, choose_record, option_list);
    console.log(correctObj);
    const addUserGainToRecord = await RecordQuestionQuery.addUserGainByQuestionId(question_id, JSON.stringify(newRecordObj));
    if (!addUserGainToRecord) {return false; }
    const addValueObj = this.createAddValueObj(correctObj, remain_pool);
    addValueObj[user_id] = UtilFunction.createOrAddValueToObjKey(addValueObj[user_id], remain_pool);
    const addValueResult = await UserQuery.addValueToMutipleUser(addValueObj);
    if (!addValueResult) {return false; }
    return true;
  },
  createNewRecordObjAndCorrectObj(recordObj: any, correct_answer: any, total_pool: any, question_type: string, choose_record: any, option_list: any) {
    const correctObj: any = {};
    const keyList = Object.keys(recordObj); // user_id
    let totalRatioGain = 0;
    for (let i = 0 ; i < keyList.length ; i++) {
      const user_id = keyList[i];
      const objList = recordObj[user_id];
      for (let a = 0 ; a < objList.length ; a++) {
        const [isCorrect, value] = this.checkIfCorrectAnswer(correct_answer, objList[a].answer, question_type, choose_record, objList[a].value, option_list);
        if (isCorrect) {
          totalRatioGain += value;
          recordObj[user_id][a].isWinner = true;
          recordObj[user_id][a].ratio_gain = value;
        }
      }
    }
    for (let i = 0 ; i < keyList.length ; i++) {
      const user_id = keyList[i];
      const objList = recordObj[user_id];
      for (let a = 0 ; a < objList.length ; a++) {
        if (recordObj[user_id][a].isWinner && recordObj[user_id][a].ratio_gain > 0) {
          const actualGain = total_pool * (recordObj[user_id][a].ratio_gain / totalRatioGain);
          recordObj[user_id][a].gain = actualGain;
          correctObj[user_id] = UtilFunction.createOrAddValueToObjKey(correctObj[user_id], actualGain);
        }
      }
    }
    // {id: [{value, index}], id2: valueTotal2}
    return [recordObj, correctObj];
  },
  createAddValueObj(correctObj: any, gain: number) {
    const addValueObj: any = {};
    const keyList = Object.keys(correctObj);
    for (let i = 0 ; i < keyList.length ; i++) {
      const user_id = keyList[i];
      addValueObj[user_id] = addValueObj[user_id] + gain;
    }
    return addValueObj;
  },
};

export default Query;
