import { DataTypes, Model } from "sequelize";
import connection from "./connection";
import moment from "moment";

class Question extends Model {
  public question: number = -1;
  public title: string = "";

  getTitle() {
    return this.title;
  }
}

Question.init({
  question_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
  },
  disable_state: {
    type: DataTypes.TEXT,
    defaultValue: "null",
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  question_type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ratio_type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  option_list: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  correct_answer: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  min_choose_number: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  max_choose_number: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  choose_record: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  category: {
    type: DataTypes.TEXT,
    defaultValue: "regular",
  },
  minimum_fee: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  maximum_fee: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
    },
  },
  initial_pool: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  other_pool: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  add_pool_percentage: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
    },
  },
  attempt_number: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  is_show_attempt_number: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  winner_number: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  is_show_winner_number: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  end_requirement: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  end_requirement_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  visible_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  open_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  close_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
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
  tableName: "question_table",
});

export default Question;
