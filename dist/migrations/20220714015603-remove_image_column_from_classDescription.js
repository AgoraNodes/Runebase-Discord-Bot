"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('classDescription', 'image')]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('classDescription', 'image', {
      type: Sequelize.STRING,
      allowNull: false
    })]);
  }
};