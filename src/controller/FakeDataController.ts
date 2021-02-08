import UserQuery from "../query/userquery";
import QuestionQuery from "../query/questionquery";
import RecordQuestionQuery from "../query/recordquestionquery";
import UtilFunction from "../util/utilfunction";
import FakeDataConfig from "./FakeDataConfig";
import moment from "moment-timezone";

const {UserList, QuestionList, SubmitQuestionList} = FakeDataConfig;

// 5user
// each create 

const FakeDataController = {
  async createAllFakeData() {
    await UserQuery.deleteAllUser();
    await QuestionQuery.deleteAllQuestion();
    await RecordQuestionQuery.deleteAllRecord();
    await this.createUserData();
    await this.createQuestionData();
    await this.createRecordQuestionData();
    return true;
  },
  async createUserData() {
    const userList = UserList;
    const postNewUserList = await Promise.all(userList.map(async (userObj: any) => {
      const {username, password} = userObj;
      const postNewUser = await UserQuery.createUser(username, password);
      return postNewUser;
    }));
    return postNewUserList;
  },
  async createQuestionData() {
    let maxId = await QuestionQuery.getMaxId();
    if (!maxId && maxId !== 0) {
      maxId = 0;
    }
    let question_id = maxId + 1;
    const questionList = QuestionList;
    await Promise.all(questionList.map(async (questionObj: any, index: number) => {
      const use_question_id = question_id + index;
      const {user_id} = questionObj;
      questionObj.visible_date = moment();
      questionObj.open_date = moment();
      if (index % 2 === 0) {
        questionObj.close_date = moment().add(1, "minute");
        questionObj.end_date = moment().add(1, "minute");
      } else {
        questionObj.close_date = moment().add(7, "days");
        questionObj.end_date = moment().add(7, "days");
      }
      const postNewQuestion = await QuestionQuery.createQuestion(use_question_id, user_id, questionObj, true);
      return postNewQuestion;
    }));

    question_id = question_id + QuestionList.length;

    const recordUseQuestionobj = questionList[0];
    const useNumList = UtilFunction.createNumList(25);
    await Promise.all(useNumList.map(async (useNum: number) => {
      const use_question_id = question_id + useNum;
      const useQuestionObj = JSON.parse(JSON.stringify(recordUseQuestionobj));
      let {user_id, title} = useQuestionObj;
      if (useNum === 0) {
        user_id = 7;
        useQuestionObj.username = "guest";
      }
      useQuestionObj.title = title + String(useNum);
      useQuestionObj.visible_date = moment();
      useQuestionObj.open_date = moment();
      const postNewQuestion = await QuestionQuery.createQuestion(use_question_id, user_id, useQuestionObj, true);
      return postNewQuestion;
    }));

    return true;
  },
  async createRecordQuestionData() {
    const user_id = 7;
    const submitQuestionList = SubmitQuestionList;
    const useNumList = [2, 5, 3, 0, 2, 1, 3];
    await Promise.all(submitQuestionList.map(async (postBody: any, index: number) => {
      const submitAllQuestion = await Promise.all(useNumList.map(async (useNum: number, index: number) => {
        const useTimestamp = moment().add(-1 * index, "days");
        const frequency = 1;
        const useList = UtilFunction.createNumList(frequency);
        const submitByFrequency = await Promise.all(useList.map(async (useNum: number) => {
          const {question_id} = postBody;
          const submitQuestion = await QuestionQuery.submitQuestion(question_id, user_id, postBody, useTimestamp);
          return submitQuestion;
        }));
        return submitByFrequency;
      }));
      return submitAllQuestion;
    }));

    await Promise.all(submitQuestionList.map(async (postBody: any, index: number) => {
      const submitAllQuestion = await Promise.all(useNumList.map(async (useNum: number, index: number) => {
        const useTimestamp = moment().add(-1 * index, "days");
        const frequency = useNum;
        const useList = UtilFunction.createNumList(frequency);
        const submitByFrequency = await Promise.all(useList.map(async (useNum: number) => {
          const usePostBody = JSON.parse(JSON.stringify(postBody));
          usePostBody.value = usePostBody.value + Math.floor(Math.random() * 10);
          const {question_id} = usePostBody;
          const submitQuestion = await QuestionQuery.submitQuestion(question_id, user_id, usePostBody, useTimestamp);
          return submitQuestion;
        }));
        return submitByFrequency;
      }));
      return submitAllQuestion;
    }));

    return true;
  },
};

export default FakeDataController;
