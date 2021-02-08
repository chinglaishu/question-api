import QuestionQuery from "../query/questionquery";

const oneHour = 60 * 60 * 1000;

const IntervalJob = {
  checkDistribute() {
    QuestionQuery.checkQuestionDistribute();
    console.log("setInterval");
    setInterval(() => {
      console.log("check distribute");
      QuestionQuery.checkQuestionDistribute();
    }, oneHour);
  },
};

export default IntervalJob;
