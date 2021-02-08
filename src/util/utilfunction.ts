import moment from "moment";
import crypto from "crypto";

const UtilFunction = {
  editObjByList(oringialObj: any, newObj: any, keyList: string[]) {
    for (let i = 0 ; i < keyList.length ; i++) {
      if (!newObj[keyList[i]]) {continue; }
      oringialObj[keyList[i]] = newObj[keyList[i]]
    }
    if (!!oringialObj.update_date) {
      oringialObj.update_date = moment();
    }
    return oringialObj;
  },
  createColumnValueStringAndBindObj(columnList: string[], useObj: any) {
    let columnString = "";
    let valueString = "";
    const bind: any = {};
    for (let i = 0 ; i < columnList.length ; i++) {
      const column = columnList[i];
      if (!useObj[column] && useObj[column] !== 0) {continue; }
      const addSign = (columnString === "") ? "" : ", ";
      columnString += `${addSign}${column}`;
      valueString += `${addSign}$${column}`;
      bind[column] = useObj[column];
    }
    return [columnString, valueString, bind];
  },
  createIdListString(idList: number[]) {
    let idListString = "";
    for (let i = 0 ; i < idList.length ; i++) {
      const addSign = (i === 0) ? "" : ", ";
      idListString += `${addSign}${idList[i]}`;
    }
    return idListString;
  },
  getKeyListInObj(useObj: any, action: string) {
    const keyList: string[] = [];
    const objKeyList = Object.keys(useObj);
    const objValueList: any = Object.values(useObj);
    for (let i = 0 ; i < objKeyList.length ; i++) {
      if (objValueList[i].includes(action)) {
        keyList.push(objKeyList[i]);
      }
    }
    return keyList;
  },
  getNameListInObjList(objList: any[], action: string) {
    const useList: string[] = [];
    for (let i = 0 ; i < objList.length ; i++) {
      const actionList = objList[i].action;
      if (!actionList.includes(action)) {continue; }
      useList.push(objList[i].name);
    }
    return useList;
  },
  setNotShowByList(useObj: any, keyList: string[]) {
    for (let i = 0 ; i < keyList.length ; i++) {
      useObj[keyList[i]] = "Hided By Owner";
    }
    return useObj;
  },
  deleteKeyByList(useObj: any, keyList: string[]) {
    for (let i = 0 ; i < keyList.length ; i++) {
      delete useObj[keyList[i]];
    }
    return useObj;
  },
  isNoOption(question_type: string) {
    return question_type === "decidedByOwnerWithoutOption";
  },
  checkQuestionTypeIsNoCorrectAnswer(question_type: string) {
    const noAnswerDataTypeList = ["decidedByOwnerWithoutOption", "decidedByOwnerWithOption"];
    return noAnswerDataTypeList.includes(question_type);
  },
  hideAnswer(useObj: any) {
    const {correct_answer} = useObj;
    const keyList = Object.keys(correct_answer);
    for (let i = 0 ; i < keyList.length ; i++) {
      const answer_list = useObj.correct_answer[keyList[i]].answer_list;
      if (!answer_list) {continue; }
      const hideAnswer_list = answer_list.map(() => null);
      useObj.correct_answer[keyList[i]].answer_list = hideAnswer_list;
    }
    return useObj;
  },
  addSaltAndHashPassword(password: string) {
    let salt = process.env.BEAR_PASSWORD_SALT || "BEAR_PASSWORD_SALT_SDEEFEF3232432";
    const saltAndPassword = password + salt;
    const hash = crypto.createHash("sha256").update(saltAndPassword).digest("hex");
    return hash;
  },
  checkTimeAIsBeforeB(timeA: any, timeB: any) {
    const diff = moment(timeA).diff(timeB, "seconds"); // day?
    return diff < 0;
  },
  checkTimeAfterABeforeB(time: any, timeA: any, timeB: any) {
    const isAfterA = this.checkTimeAIsBeforeB(timeA, time);
    const isBeforeB = this.checkTimeAIsBeforeB(time, timeB);
    return (isAfterA && isBeforeB);
  },
  checkIsArray(item: any) {
    return Array.isArray(item);
  },
  checkIsArrayAndHaveItem(item: any) {
    if (this.checkIsArray(item)) {
      if (item.length > 0) {return true; }
    }
    return false;
  },
  createOrAddValueToObjKey(currentValue: any, newValue: number) {
    if (currentValue === undefined || currentValue === null) {
      return newValue;
    } else {
      return currentValue + newValue;
    }
  },
  createAddValueToMultipleUserQuery(useObj: any) {
    let addValueStringList = "";
    const keyList = Object.keys(useObj);
    for (let i = 0 ; i < keyList.length ; i++) {
      const user_id = keyList[i];
      const value = useObj[user_id];
      const addSign = (i === 0) ? "" : ", ";
      addValueStringList += `${addSign}(${user_id}, ${value})`;
    }
    const query = `update user_table set value = value + add_value from (values ${addValueStringList}) as u(user_id, add_value) where u.user_id = user_table.user_id;`;
    return query;
  },
  createNumList(useNum: number) {
    const useList: number[] = [];
    for (let i = 0 ; i < useNum ; i++) {
      useList.push(i);
    }
    return useList;
  },
};

export default UtilFunction;

/*
update user_table set value = value + add_value from (values (1, -30), (9, 80)) as u(user_id, add_value) where u.user_id = user_table.user_id;
*/
