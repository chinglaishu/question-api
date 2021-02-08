'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('question_table', {
      question_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
      },
      disable_state: {
        type: Sequelize.TEXT,
        defaultValue: "null",
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      question_type: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ratio_type: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      option_list: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      correct_answer: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      min_choose_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      max_choose_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      choose_record: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      category: {
        type: Sequelize.TEXT,
        defaultValue: "regular",
      },
      minimum_fee: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      maximum_fee: {
        type: Sequelize.FLOAT,
        validate: {
          min: 0,
        },
      },
      initial_pool: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      other_pool: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      add_pool_percentage: {
        type: Sequelize.FLOAT,
        validate: {
          min: 0,
        },
      },
      attempt_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      is_show_attempt_number: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      winner_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      is_show_winner_number: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      end_requirement: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      end_requirement_value: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      visible_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      open_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      close_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('question_table');
  }
};
