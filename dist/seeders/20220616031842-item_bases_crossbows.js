"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyLightCrossbow, itemFamilyCrossbow, itemFamilyColossusCrossbow, itemFamilyRepeatingCrossbow;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('itemDifficulty', {
                where: {
                  name: 'Normal'
                }
              }, ['id']);

            case 2:
              itemDifficultyNormal = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('itemDifficulty', {
                where: {
                  name: 'Exceptional'
                }
              }, ['id']);

            case 5:
              itemDifficultyExceptional = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('itemDifficulty', {
                where: {
                  name: 'Elite'
                }
              }, ['id']);

            case 8:
              itemDifficultyElite = _context.sent;
              _context.next = 11;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Light Crossbow'
                }
              }, ['id']);

            case 11:
              itemFamilyLightCrossbow = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Light Crossbow',
                levelReq: null,
                levelMonster: 6,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 9,
                strengthReq: 21,
                dexterityReq: 27,
                durability: null,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightCrossbow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Arbalest',
                levelReq: 22,
                levelMonster: 34,
                minDefense: null,
                maxDefense: null,
                minDamage: 14,
                maxDamage: 27,
                strengthReq: 52,
                dexterityReq: 61,
                durability: null,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightCrossbow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Pellet Bow',
                levelReq: 42,
                levelMonster: 57,
                minDefense: null,
                maxDefense: null,
                minDamage: 28,
                maxDamage: 73,
                strengthReq: 83,
                dexterityReq: 155,
                durability: null,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightCrossbow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Crossbow'
                }
              }, ['id']);

            case 16:
              itemFamilyCrossbow = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Crossbow',
                levelReq: null,
                levelMonster: 15,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 16,
                strengthReq: 40,
                dexterityReq: 33,
                durability: null,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightCrossbow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Siege Crossbow',
                levelReq: 25,
                levelMonster: 40,
                minDefense: null,
                maxDefense: null,
                minDamage: 20,
                maxDamage: 42,
                strengthReq: 80,
                dexterityReq: 70,
                durability: null,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightCrossbow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gorgon Crossbow',
                levelReq: 50,
                levelMonster: 67,
                minDefense: null,
                maxDefense: null,
                minDamage: 25,
                maxDamage: 87,
                strengthReq: 117,
                dexterityReq: 105,
                durability: null,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightCrossbow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Heavy Crossbow'
                }
              }, ['id']);

            case 21:
              itemFamilyColossusCrossbow = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Heavy Crossbow',
                levelReq: null,
                levelMonster: 24,
                minDefense: null,
                maxDefense: null,
                minDamage: 14,
                maxDamage: 26,
                strengthReq: 60,
                dexterityReq: 40,
                durability: null,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyColossusCrossbow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ballista',
                levelReq: 25,
                levelMonster: 47,
                minDefense: null,
                maxDefense: null,
                minDamage: 33,
                maxDamage: 55,
                strengthReq: 110,
                dexterityReq: 80,
                durability: null,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyColossusCrossbow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Colossus Crossbow',
                levelReq: 56,
                levelMonster: 75,
                minDefense: null,
                maxDefense: null,
                minDamage: 32,
                maxDamage: 91,
                strengthReq: 163,
                dexterityReq: 77,
                durability: null,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyColossusCrossbow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Repeating Crossbow'
                }
              }, ['id']);

            case 26:
              itemFamilyRepeatingCrossbow = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Repeating Crossbow',
                levelReq: null,
                levelMonster: 33,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 12,
                strengthReq: 40,
                dexterityReq: 50,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRepeatingCrossbow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Chu-Ko-Nu',
                levelReq: 25,
                levelMonster: 54,
                minDefense: null,
                maxDefense: null,
                minDamage: 14,
                maxDamage: 32,
                strengthReq: 80,
                dexterityReq: 95,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRepeatingCrossbow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Demon Crossbow',
                levelReq: 63,
                levelMonster: 84,
                minDefense: null,
                maxDefense: null,
                minDamage: 26,
                maxDamage: 40,
                strengthReq: 141,
                dexterityReq: 98,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRepeatingCrossbow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
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
    return queryInterface.bulkDelete('itemBase', null, {});
  }
};