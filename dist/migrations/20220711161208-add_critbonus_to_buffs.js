"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('buff', 'critBonus', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('buff', 'critBonus')]);
  }
};