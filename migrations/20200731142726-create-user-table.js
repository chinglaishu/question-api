'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_table', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      user_type: {
        type: Sequelize.TEXT,
        defaultValue: "normal",
      },
      user_icon: {
        type: Sequelize.TEXT,
      },
      username: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
      showname: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      value: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      reputationGood: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      reputationBad: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      own_question_list: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      do_question_list: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      is_show_value_and_question: {
        type: Sequelize.TEXT,
        defaultValue: "everyone",
      },
      location: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      is_show_information: {
        type: Sequelize.TEXT,
        defaultValue: "no_one",
      },
      active_friend_list: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      passive_friend_list: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      group_list: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
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
    return queryInterface.dropTable('user_table');
  }
};
