"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('group', 'activeRealm', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('group', 'activeRealm')]);
  }
};