import { DataTypes, Model } from "sequelize";
import connection from "./connection";
import moment from "moment";

class User extends Model {
  public user_id: number = -1;
  public username: string = "";
  public password: string = "";

  getName() {
    return this.username;
  }
}

User.init({
  user_id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  user_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: "normal",
  },
  user_icon: {
    type: DataTypes.TEXT,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  showname: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    },
  },
  reputationGood: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  reputationBad: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  own_question_list: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  do_question_list: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  is_show_value_and_question: {
    type: DataTypes.TEXT,
    defaultValue: "everyone",
  },
  location: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  is_show_information: {
    type: DataTypes.TEXT,
    defaultValue: "no_one",
  },
  active_friend_list: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  passive_friend_list: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  group_list: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: moment(),
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: moment(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: moment(),
  }
},
{
  sequelize: connection,
  tableName: "user_table",
});

export default User;
