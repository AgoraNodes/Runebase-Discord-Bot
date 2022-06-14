"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('itemDifficulty', [{
      name: 'Normal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Exceptional',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Elite',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('itemDifficulty', null, {});
  }
};