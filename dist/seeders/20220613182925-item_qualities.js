"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('itemQuality', [{
      name: 'Low Quality',
      color: '#a0a1a3',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Normal',
      color: '#f2f5fa',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Superior',
      color: '#dce6f7',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Magic',
      color: '#1c53b0',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Rare',
      color: '#f9fc1c',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Set',
      color: '#2fba6b',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Unique',
      color: '#D4AF37',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Crafted',
      color: '#FF8C00',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('itemQuality', null, {});
  }
};