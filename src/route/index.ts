import express from "express";
import user from "./user";
import question from "./question";
import recordquestion from "./recordquestion";
import image from "./image";

const router = express.Router();

router.use("/api/user", user);
router.use("/api/question", question);
router.use("/api/recordquestion", recordquestion);

router.use("/api/image", image);

export default router;
