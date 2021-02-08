import User from "../../models/user";
import jwt from "jsonwebtoken";
import UtilFunction from "../util/utilfunction";
import moment from "moment-timezone";

const SECRET_KEY = process.env.symbior_gateway_token_secret || "bear_hand_token_secret_1is21i4jd2";
const expireDay = "30d";

const createUserColumnList = ["username", "passsword"];
const editUserColumnList = ["username", "is_show_value_and_question",
  "location", "email", "description", "is_show_information",
  "active_friend_list"];
const valueAndQuestionKeyList = ["value", "do_question_list", "own_question_list"];
const informationKeyList = ["location", "email", "description"];

const Query = {
  async deleteAllUser() {
    await (User as any).sequelize.query(`ALTER SEQUENCE user_table_user_id_seq RESTART WITH 1;`);
    const deleteAll = await (User as any).sequelize.query(`delete from user_table;`);
    return deleteAll;
  },
  async createToken(user_id: number) {
    const data = {user_id: user_id};
    return jwt.sign({data}, SECRET_KEY, { expiresIn: expireDay });
  },
  verifyToken(token: string) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return false;
    }
  },
  async checkLogin(username: string, password: string) {
    const getUser = await (User as any).sequelize.query(`select * from user_table where username = $username;`, {bind: {username}});
    if (!getUser) {return false; }
    if (password.length < 1) {return false; }
    const hashPassword = UtilFunction.addSaltAndHashPassword(password);
    const useUser = getUser[0][0];
    if (!useUser) {return false; }
    if (hashPassword !== useUser.password) {return false; }
    return useUser;
  },
  async createUser(username: string, password: string) {
    const hashPassword = UtilFunction.addSaltAndHashPassword(password);
    if (password.length < 8) {return false; }
    const result = await (User as any).sequelize.query(`INSERT INTO user_table (username, password, value, created_date) VALUES ($username, $password, 10000, $created_date);`, {bind: {username, password: hashPassword, created_date: moment().add(-7, "days")}});
    if (!result) {return false; }
    return true;
  },
  async getUserById(user_id: number, getByOwner: boolean) {
    const getUser = await (User as any).sequelize.query(`select * from user_table where user_id = $user_id;`, {bind: {user_id}});
    if (!getUser) {return false; }
    const useUser = getUser[0][0];
    useUser.password = "hide";
    if (getByOwner) {return useUser; }
    const {is_show_value_and_question, is_show_information} = useUser;
    let hideKeyList: string[] = ["password"];
    if (is_show_information === "no_one") {hideKeyList = hideKeyList.concat(informationKeyList); }
    if (is_show_value_and_question === "no_one") {hideKeyList = hideKeyList.concat(valueAndQuestionKeyList); }
    const filterUserObj = UtilFunction.setNotShowByList(useUser, hideKeyList);
    return filterUserObj;
  },
  async changePassword(username: string, newPassword: string) {
    const newHashPassword = UtilFunction.addSaltAndHashPassword(newPassword);
    const result = await (User as any).sequelize.query(`UPDATE user_table SET password=$newpassword WHERE username = $username;`, {bind: {newpassword: newHashPassword, username: username}});
    if (!result) {return false; }
    return true;
  },
  async editUser(user_id: number, editUserBody: any) {
    const keyList = Object.keys(editUserBody);
    let [columnString, valueString, bind] = UtilFunction.createColumnValueStringAndBindObj(editUserColumnList, editUserBody);
    bind["user_id"] = user_id;
    if (keyList.length > 1) {
      columnString = `(${columnString})`;
      valueString = `(${valueString})`;
    }
    const result = await (User as any).sequelize.query(`update user_table set ${columnString} = ${valueString} where user_id = $user_id;`, {bind: bind});
    if (!result) {return false; }
    return true;
  },
  // value can be positive/negative
  async changeValue(limitValueType: "add" | "minus", user_id: number, valueAdd: number, extraAction: string = "null", extraParamId: number = -1) {
    if (valueAdd === 0) {return true; }
    const userObj: any = await this.getUserById(user_id, true);
    const currentUserValue = userObj.value;
    if (currentUserValue + valueAdd < 0) {
      return false;
    }
    if (limitValueType === "add") {
      if (valueAdd < 0) {return false; }
    }
    if (limitValueType === "minus") {
      if (valueAdd > 0) {return false; }
    }
    let query: string = "";
    let bind: any = {};
    if (extraAction === "null") {
      query = `update user_table set value = value + $valueAdd where user_id = $user_id;`;
      bind = {user_id, valueAdd};
    } else if (extraAction === "addOwnQuestion" || extraAction === "addDoQuestion") {
      const columnName = (extraAction === "addOwnQuestion") ? "own_question_list" : "do_question_list";
      query = `update user_table set (value, ${columnName}) = (value + $valueAdd, ${columnName} || ${extraParamId}) where user_id = $user_id;`;
      bind = {user_id, valueAdd};
    }
    const result = await (User as any).sequelize.query(query, {bind});
    if (!result) {return false; }
    return true;
  },
  async addValueToMutipleUser(addValueObj: any) {
    const addValueQuery = UtilFunction.createAddValueToMultipleUserQuery(addValueObj);
    const addValueResult = await (User as any).sequelize.query(addValueQuery);
    if (!addValueResult) {return false; }
    return true;
  },
};

export default Query;
