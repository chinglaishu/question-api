import express from "express";
import passport from "passport";
import RecordQuestionQuery from "../query/recordquestionquery";

const router = express.Router();

router.get("/id-list", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    const id_list = JSON.parse((req as any).headers.id_list);
    const user_id = (req as any).headers.user_id;
    const record_list = await RecordQuestionQuery.getRecordByQuestionIdListAndUserId(id_list, user_id);
    return res.status(200).json({ success: true, result: record_list });
  } catch (err) {
    console.log("record question get id-list error");
    return res.status(500).json({ success: false });
  }
});

router.get("/:questionId", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    const question_id = parseInt(req.params.questionId);
    const record_list = await RecordQuestionQuery.getRecordByQuestionId(question_id, userIdInToken);
    return res.status(200).json({ success: true, result: record_list });
  } catch (err) {
    console.log("record question get error");
    return res.status(500).json({ success: false });
  }
});

export default router;
