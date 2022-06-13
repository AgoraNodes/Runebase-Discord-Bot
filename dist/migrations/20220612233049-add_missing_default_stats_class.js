"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('class', 'attackRating', {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: 50
    }), queryInterface.addColumn('class', 'defense', {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: 50
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('class', 'attackRating'), queryInterface.removeColumn('class', 'defense')]);
  }
};