"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('setting', 'expRewardChannelId')]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('setting', 'expRewardChannelId', {
      type: Sequelize.STRING,
      allowNull: true
    })]);
  }
};