"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('itemType', [// armor type
    {
      name: 'Rings',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Amulets',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('itemType', null, {});
  }
};