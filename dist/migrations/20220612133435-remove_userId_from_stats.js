"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('stats', 'userId')]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('stats', 'userId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'user',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })]);
  }
};