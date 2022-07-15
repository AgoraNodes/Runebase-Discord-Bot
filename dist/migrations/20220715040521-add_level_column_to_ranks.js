"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('rank', 'level', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('rank', 'level')]);
  }
};