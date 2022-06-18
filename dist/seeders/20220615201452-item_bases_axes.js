"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyHandAxe, itemFamilyAxe, itemFamilyDoubleAxe, itemFamilyMilitaryPick, itemFamilyWarAxe, itemFamilyLargeAxe, itemFamilyBroadAxe, itemFamilyBattleAxe, itemFamilyGreatAxe, itemFamilyGiantAxe;
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
                  name: 'Hand Axe'
                }
              }, ['id']);

            case 11:
              itemFamilyHandAxe = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Hand Axe',
                levelReq: null,
                levelMonster: 3,
                minDefense: null,
                maxDefense: null,
                minDamage: 3,
                maxDamage: 6,
                strengthReq: null,
                dexterityReq: null,
                durability: 28,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHandAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hatchet',
                levelReq: 19,
                levelMonster: 31,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 21,
                strengthReq: 25,
                dexterityReq: 25,
                durability: 28,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHandAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tomahawk',
                levelReq: 40,
                levelMonster: 54,
                minDefense: null,
                maxDefense: null,
                minDamage: 33,
                maxDamage: 58,
                strengthReq: 125,
                dexterityReq: 67,
                durability: 28,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHandAxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Axe'
                }
              }, ['id']);

            case 16:
              itemFamilyAxe = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Axe',
                levelReq: null,
                levelMonster: 7,
                minDefense: null,
                maxDefense: null,
                minDamage: 4,
                maxDamage: 11,
                strengthReq: 32,
                dexterityReq: null,
                durability: 24,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cleaver',
                levelReq: 22,
                levelMonster: 34,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 33,
                strengthReq: 68,
                dexterityReq: null,
                durability: 24,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Small Crescent',
                levelReq: 45,
                levelMonster: 61,
                minDefense: null,
                maxDefense: null,
                minDamage: 38,
                maxDamage: 60,
                strengthReq: 115,
                dexterityReq: 83,
                durability: 24,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Double Axe'
                }
              }, ['id']);

            case 21:
              itemFamilyDoubleAxe = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Double Axe',
                levelReq: null,
                levelMonster: 13,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 13,
                strengthReq: 43,
                dexterityReq: null,
                durability: 24,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDoubleAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Twin Axe',
                levelReq: 25,
                levelMonster: 39,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 38,
                strengthReq: 85,
                dexterityReq: null,
                durability: 24,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDoubleAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ettin Axe',
                levelReq: 52,
                levelMonster: 70,
                minDefense: null,
                maxDefense: null,
                minDamage: 33,
                maxDamage: 66,
                strengthReq: 145,
                dexterityReq: 45,
                durability: 24,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDoubleAxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Military Pick'
                }
              }, ['id']);

            case 26:
              itemFamilyMilitaryPick = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Military Pick',
                levelReq: null,
                levelMonster: 19,
                minDefense: null,
                maxDefense: null,
                minDamage: 7,
                maxDamage: 11,
                strengthReq: 49,
                dexterityReq: 33,
                durability: 26,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMilitaryPick,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Crowbill',
                levelReq: 25,
                levelMonster: 43,
                minDefense: null,
                maxDefense: null,
                minDamage: 14,
                maxDamage: 34,
                strengthReq: 94,
                dexterityReq: 70,
                durability: 26,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMilitaryPick,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Spike',
                levelReq: 59,
                levelMonster: 79,
                minDefense: null,
                maxDefense: null,
                minDamage: 30,
                maxDamage: 48,
                strengthReq: 133,
                dexterityReq: 54,
                durability: 26,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMilitaryPick,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'War Axe'
                }
              }, ['id']);

            case 31:
              itemFamilyWarAxe = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'War Axe',
                levelReq: null,
                levelMonster: 25,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 18,
                strengthReq: 67,
                dexterityReq: null,
                durability: 26,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Naga',
                levelReq: 25,
                levelMonster: 48,
                minDefense: null,
                maxDefense: null,
                minDamage: 16,
                maxDamage: 45,
                strengthReq: 121,
                dexterityReq: null,
                durability: 26,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Berserker Axe',
                levelReq: 64,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 24,
                maxDamage: 71,
                strengthReq: 138,
                dexterityReq: 59,
                durability: 26,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarAxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 34:
              _context.next = 36;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Large Axe'
                }
              }, ['id']);

            case 36:
              itemFamilyLargeAxe = _context.sent;
              _context.next = 39;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Large Axe',
                levelReq: null,
                levelMonster: 6,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 13,
                strengthReq: 35,
                dexterityReq: null,
                durability: 30,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLargeAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Military Axe',
                levelReq: 25,
                levelMonster: 34,
                minDefense: null,
                maxDefense: null,
                minDamage: 14,
                maxDamage: 34,
                strengthReq: 73,
                dexterityReq: null,
                durability: 30,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLargeAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Feral Axe',
                levelReq: 42,
                levelMonster: 57,
                minDefense: null,
                maxDefense: null,
                minDamage: 25,
                maxDamage: 123,
                strengthReq: 196,
                dexterityReq: null,
                durability: 30,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLargeAxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 39:
              _context.next = 41;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Broad Axe'
                }
              }, ['id']);

            case 41:
              itemFamilyBroadAxe = _context.sent;
              _context.next = 44;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Broad Axe',
                levelReq: null,
                levelMonster: 6,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 13,
                strengthReq: 35,
                dexterityReq: null,
                durability: 30,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBroadAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bearded Axe',
                levelReq: 25,
                levelMonster: 38,
                minDefense: null,
                maxDefense: null,
                minDamage: 21,
                maxDamage: 49,
                strengthReq: 92,
                dexterityReq: null,
                durability: 35,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBroadAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Silver-Edged Axe',
                levelReq: 48,
                levelMonster: 65,
                minDefense: null,
                maxDefense: null,
                minDamage: 62,
                maxDamage: 110,
                strengthReq: 166,
                dexterityReq: 65,
                durability: 35,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBroadAxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 44:
              _context.next = 46;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Battle Axe'
                }
              }, ['id']);

            case 46:
              itemFamilyBattleAxe = _context.sent;
              _context.next = 49;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Battle Axe',
                levelReq: null,
                levelMonster: 17,
                minDefense: null,
                maxDefense: null,
                minDamage: 12,
                maxDamage: 32,
                strengthReq: 54,
                dexterityReq: null,
                durability: 40,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBattleAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tabar',
                levelReq: 25,
                levelMonster: 42,
                minDefense: null,
                maxDefense: null,
                minDamage: 24,
                maxDamage: 77,
                strengthReq: 101,
                dexterityReq: null,
                durability: 40,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBattleAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Decapitator',
                levelReq: 54,
                levelMonster: 73,
                minDefense: null,
                maxDefense: null,
                minDamage: 49,
                maxDamage: 137,
                strengthReq: 189,
                dexterityReq: 33,
                durability: 40,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBattleAxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 49:
              _context.next = 51;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Great Axe'
                }
              }, ['id']);

            case 51:
              itemFamilyGreatAxe = _context.sent;
              _context.next = 54;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Great Axe',
                levelReq: null,
                levelMonster: 23,
                minDefense: null,
                maxDefense: null,
                minDamage: 9,
                maxDamage: 30,
                strengthReq: 63,
                dexterityReq: 39,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gothic Axe',
                levelReq: 25,
                levelMonster: 46,
                minDefense: null,
                maxDefense: null,
                minDamage: 18,
                maxDamage: 70,
                strengthReq: 115,
                dexterityReq: null,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Champion Axe',
                levelReq: 61,
                levelMonster: 82,
                minDefense: null,
                maxDefense: null,
                minDamage: 59,
                maxDamage: 94,
                strengthReq: 167,
                dexterityReq: 59,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatAxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 54:
              _context.next = 56;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Giant Axe'
                }
              }, ['id']);

            case 56:
              itemFamilyGiantAxe = _context.sent;
              _context.next = 59;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Giant Axe',
                levelReq: null,
                levelMonster: 27,
                minDefense: null,
                maxDefense: null,
                minDamage: 22,
                maxDamage: 45,
                strengthReq: 70,
                dexterityReq: null,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGiantAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ancient Axe',
                levelReq: 25,
                levelMonster: 51,
                minDefense: null,
                maxDefense: null,
                minDamage: 43,
                maxDamage: 85,
                strengthReq: 125,
                dexterityReq: null,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGiantAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Glorious Axe',
                levelReq: 66,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 60,
                maxDamage: 124,
                strengthReq: 164,
                dexterityReq: 55,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGiantAxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 59:
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