import { DataTypes, Model } from "sequelize";
import connection from "./connection";
import moment from "moment";

class RecordQuestion extends Model {
  public question_id: number = -1;
  public record_list: any = {};

  getId() {
    return this.question_id;
  }
}

RecordQuestion.init({
  question_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
  },
  option_list: {
    type: DataTypes.JSONB,
    defaultValue: {},
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
  },
},
{
  sequelize: connection,
  tableName: "record_question",
});

export default RecordQuestion;
