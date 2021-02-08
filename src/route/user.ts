import express from "express";
import passport from "passport";
import UserQuery from "../query/userquery";

const router = express.Router();

// tryed
router.post("/login", passport.authenticate("login", {session: false}), async (req, res, next) => {
  try {
    const user_id = (req as any).user.user_id;
    const token = await UserQuery.createToken(user_id);
    return res.status(200).json({ success: true, token, user_id });
  } catch (err) {
    console.log("user login error");
    return res.status(500).json({ success: false });
  }
});

// worked
// but later need to make token not valid after change password
// maybe invalid the token before the moment of change password
router.post("/changepassword", passport.authenticate("login", {session: false}), async (req, res, next) => {
  try {
    const { username, newPassword } = req.body;
    await UserQuery.changePassword(username, newPassword);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("user change password error");
    return res.status(500).json({ success: false });
  }
});

// tryed
router.put("/edit", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    const editUserBody = req.body;
    const result = await UserQuery.editUser(userIdInToken, editUserBody);
    return res.status(200).json({ success: result });
  } catch (err) {
    console.log("user edit error");
    return res.status(500).json({ success: false });
  }
});

// tryed
router.post("/new", async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const result = await UserQuery.createUser(username, password);
    return res.status(200).json({ success: result });
  } catch (err) {
    console.log("user post new error");
    return res.status(500).json({ success: false });
  }
});

// tryed
router.get("/:userId", passport.authenticate("token", {session: false}), async (req, res, next) => {
  try {
    const userIdInToken = parseInt((req as any).user.user_id);
    if (!userIdInToken) {return res.status(500).json({ success: false }); }
    const userId = parseInt(req.params.userId);
    const getByOwner = (userId === userIdInToken);
    const result = await UserQuery.getUserById(userId, getByOwner);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

export default router;
