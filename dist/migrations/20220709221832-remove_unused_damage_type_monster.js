"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('monster', 'damageTypeId'), queryInterface.removeColumn('monsterAttack', 'attackType')]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('monster', 'damageTypeId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'damageType',
        // name of Source model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }), queryInterface.addColumn('monsterAttack', 'attackType', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'physical'
    })]);
  }
};