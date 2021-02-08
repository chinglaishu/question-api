import express from "express";
import passport from "passport";
import QuestionQuery from "../query/questionquery";
import FakeDataController from "../controller/FakeDataController";

const router = express.Router();

router.post("/create-fake-data", async (req, res, next) => {
  try {
    const createAllFakeData = await FakeDataController.createAllFakeData();
    console.log(createAllFakeData);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    console.log("question create fake data error");
    return res.status(500).json({ success: false });
  }
});

// currently is select * from table, may change to select only some column
router.get("/list/:timeName", async (req, res, next) => {
  try {
    const time_name = String(req.params.timeName);
    let userIdInToken;
    if (!(req as any).user) {
      userIdInToken = -1;
    } else {
      userIdInToken = (!!(req as any).user.user_id)
        ? parseInt((req as any).user.user_id) : -1;
    }
    const questionObjList = await QuestionQuery.getQuestionList(time_name);
    if (!questionObjList) {return res.status(500).json({ success: false }); }
    const filterQuestionObjList = QuestionQuery.filterQuestionObjList(questionObjList, userIdInToken);
    return res.status(200).json({ success: true, result: filterQuestionObjList });
  } catch (err) {
    console.log("question get list error");
    return res.status(500).json({ success: false });
  }
});

router.get("/id-list/:timeName", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const time_name = String(req.params.timeName);
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    const id_list = JSON.parse((req as any).headers.id_list);
    const questionObjList = await QuestionQuery.getQuestionByIdList(id_list, time_name);
    if (!questionObjList) {return res.status(500).json({ success: false }); }
    const filterQuestionObjList = QuestionQuery.filterQuestionObjList(questionObjList, userIdInToken);
    return res.status(200).json({ success: true, result: filterQuestionObjList });
  } catch (err) {
    console.log("question get id list error");
    return res.status(500).json({ success: false });
  }
});

router.post("/new", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    let maxId = await QuestionQuery.getMaxId();
    if (!maxId && maxId !== 0) {
      maxId = 0;
    }
    const question_id = maxId + 1;
    const createQuestionBody = req.body;
    const result = await QuestionQuery.createQuestion(question_id, userIdInToken, createQuestionBody);
    return res.status(200).json({ success: result });
  } catch (err) {
    console.log("question create new error");
    return res.status(500).json({ success: false });
  }
});

router.post("/submit/:questionId", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    const question_id = parseInt(req.params.questionId);
    const submitQuestionBody = req.body;
    const result = await QuestionQuery.submitQuestion(question_id, userIdInToken, submitQuestionBody);
    return res.status(200).json({ success: result });
  } catch (err) {
    console.log(err);
    console.log("question submit error");
    return res.status(500).json({ success: false });
  }
});

router.put("/editanswer/:questionId", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    const question_id = parseInt(req.params.questionId);
    const questionObj = await QuestionQuery.getQuestionById(question_id);
    if (!questionObj) {return res.status(500).json({ success: false }); }
    if (questionObj.user_id !== userIdInToken) {return res.status(401).json({ success: false }); }
    const editQuestionBody = req.body;
    const result = await QuestionQuery.editAnswer(question_id, editQuestionBody);
    return res.status(200).json({ success: result });
  } catch (err) {
    console.log("question edit answer error");
    return res.status(500).json({ success: false });
  }
});

router.put("/:questionId", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    const question_id = parseInt(req.params.questionId);
    const questionObj = await QuestionQuery.getQuestionById(question_id);
    if (!questionObj) {return res.status(500).json({ success: false }); }
    if (questionObj.user_id !== userIdInToken) {return res.status(401).json({ success: false }); }
    const editQuestionBody = req.body;
    const result = await QuestionQuery.editQuestion(question_id, userIdInToken, editQuestionBody);
    return res.status(200).json({ success: result });
  } catch (err) {
    console.log("question edit error");
    return res.status(500).json({ success: false });
  }
});

router.get("/:questionId", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    const question_id = parseInt(req.params.questionId);
    const questionObj = await QuestionQuery.getQuestionById(question_id);
    if (!questionObj) {return res.status(500).json({ success: false }); }
    const result = (questionObj.user_id === userIdInToken)
      ? questionObj : QuestionQuery.filterQuestionObj(questionObj);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.log("question get error");
    return res.status(500).json({ success: false });
  }
});

router.delete("/:questionId", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    const question_id = parseInt(req.params.questionId);
    const questionObj = await QuestionQuery.getQuestionById(question_id);
    if (!questionObj) {return res.status(500).json({ success: false }); }
    if (questionObj.user_id !== userIdInToken) {return res.status(401).json({ success: false }); }
    const result = await QuestionQuery.deleteQuestion(question_id);
    return res.status(200).json({ success: result });
  } catch (err) {
    console.log("question delete error");
    return res.status(500).json({ success: false });
  }
});

export default router;
