import express from "express";
import passport from "passport";
import ImageController from "../controller/imagecontroller";
import moment from "moment-timezone";

const router = express.Router();

router.post("/new", async (req, res, next) => {
  try {
    const postImageBody = req.body;
    const {fileString, fileName} = postImageBody;
    const timeString = moment().toISOString();
    const Key = timeString + fileName;
    ImageController.uploadFile(fileString, Key);
    return res.status(200).json({ success: true, fileKey: Key });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

router.get("/:fileName", async (req, res, next) => {
  try {
    const fileName = req.params.fileName;
    const fileString = await ImageController.getFileString(fileName);
    return fileString;
  } catch (err) {
    console.log("image get error");
    return res.status(500).json({ success: false });
  }
});

export default router;
