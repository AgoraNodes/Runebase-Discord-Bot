"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('debuff', 'UserclassId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'UserClass',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('debuff', 'UserclassId')]);
  }
};