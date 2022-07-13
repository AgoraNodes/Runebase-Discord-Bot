"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('monsterAttack', 'damageTypeId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'damageType',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('monster', 'damageTypeId')]);
  }
};