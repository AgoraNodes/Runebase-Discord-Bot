"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('group', 'expRewardChannelId', {
      type: Sequelize.STRING,
      allowNull: true
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('group', 'expRewardChannelId')]);
  }
};