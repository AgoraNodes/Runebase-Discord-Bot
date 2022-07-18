"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var barbarian, assassin, druid, amazon, necromancer, paladin, sorceress;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Barbarian'
                }
              }, ['id']);

            case 2:
              barbarian = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Assassin'
                }
              }, ['id']);

            case 5:
              assassin = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Druid'
                }
              }, ['id']);

            case 8:
              druid = _context.sent;
              _context.next = 11;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Amazon'
                }
              }, ['id']);

            case 11:
              amazon = _context.sent;
              _context.next = 14;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Necromancer'
                }
              }, ['id']);

            case 14:
              necromancer = _context.sent;
              _context.next = 17;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Paladin'
                }
              }, ['id']);

            case 17:
              paladin = _context.sent;
              _context.next = 20;
              return queryInterface.rawSelect('class', {
                where: {
                  name: 'Sorceress'
                }
              }, ['id']);

            case 20:
              sorceress = _context.sent;
              _context.next = 23;
              return queryInterface.bulkInsert('skillTree', [{
                name: 'Warcries',
                classId: barbarian,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Combat Skills',
                classId: barbarian,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Combat Masteries',
                classId: barbarian,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bow and Crossbow Skills',
                classId: amazon,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Passive and Magic Skills',
                classId: amazon,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Javelin and Spear Skills',
                classId: amazon,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Martial Arts',
                classId: assassin,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shadow Disciplines',
                classId: assassin,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Traps',
                classId: assassin,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Elemental Skills',
                classId: druid,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shape Shifting Skills',
                classId: druid,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Summoning Skills',
                classId: druid,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Summoning Spells',
                classId: necromancer,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Poison and Bone Spells',
                classId: necromancer,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Curses',
                classId: necromancer,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Combat Skills',
                classId: paladin,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Defensive Auras',
                classId: paladin,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Offensive Auras',
                classId: paladin,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fire Spells',
                classId: sorceress,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lightning Spells',
                classId: sorceress,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cold Spells',
                classId: sorceress,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('skillTree', null, {});
  }
};