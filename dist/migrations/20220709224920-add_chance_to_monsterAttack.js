"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('monsterAttack', 'chance', {
      type: Sequelize.INTEGER,
      defaultValue: 100,
      allowNull: false
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('monsterAttack', 'chance')]);
  }
};