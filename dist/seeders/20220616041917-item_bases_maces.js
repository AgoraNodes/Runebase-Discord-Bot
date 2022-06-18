"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyClub, itemFamilySpikedClub, itemFamilyMace, itemFamilyMorningStar, itemFamilyFlail, itemFamilyWarHammer, itemFamilyWMaul, itemFamilyGreatMaul;
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
                  name: 'Club'
                }
              }, ['id']);

            case 11:
              itemFamilyClub = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Club',
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 1,
                maxDamage: 6,
                strengthReq: null,
                dexterityReq: null,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyClub,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cudgel',
                levelReq: 18,
                levelMonster: 30,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 21,
                strengthReq: 25,
                dexterityReq: null,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyClub,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Truncheon',
                levelReq: 39,
                levelMonster: 52,
                minDefense: null,
                maxDefense: null,
                minDamage: 35,
                maxDamage: 43,
                strengthReq: 88,
                dexterityReq: 43,
                durability: 55,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyClub,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Spiked Club'
                }
              }, ['id']);

            case 16:
              itemFamilySpikedClub = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Spiked Club',
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 8,
                strengthReq: null,
                dexterityReq: null,
                durability: 36,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySpikedClub,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Barbed Club',
                levelReq: 20,
                levelMonster: 32,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 25,
                strengthReq: 30,
                dexterityReq: null,
                durability: 36,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySpikedClub,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tyrant Club',
                levelReq: 42,
                levelMonster: 57,
                minDefense: null,
                maxDefense: null,
                minDamage: 32,
                maxDamage: 58,
                strengthReq: 133,
                dexterityReq: null,
                durability: 65,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySpikedClub,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Mace'
                }
              }, ['id']);

            case 21:
              itemFamilyMace = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Mace',
                levelReq: null,
                levelMonster: 8,
                minDefense: null,
                maxDefense: null,
                minDamage: 3,
                maxDamage: 10,
                strengthReq: 27,
                dexterityReq: null,
                durability: 60,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMace,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Flanged Mace',
                levelReq: 23,
                levelMonster: 35,
                minDefense: null,
                maxDefense: null,
                minDamage: 15,
                maxDamage: 23,
                strengthReq: 61,
                dexterityReq: null,
                durability: 60,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMace,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Reinforced Mace',
                levelReq: 47,
                levelMonster: 63,
                minDefense: null,
                maxDefense: null,
                minDamage: 41,
                maxDamage: 49,
                strengthReq: 145,
                dexterityReq: 46,
                durability: 60,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMace,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Morning Star'
                }
              }, ['id']);

            case 26:
              itemFamilyMorningStar = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Morning Star',
                levelReq: null,
                levelMonster: 13,
                minDefense: null,
                maxDefense: null,
                minDamage: 7,
                maxDamage: 16,
                strengthReq: 36,
                dexterityReq: null,
                durability: 72,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMorningStar,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Jagged Star',
                levelReq: 25,
                levelMonster: 39,
                minDefense: null,
                maxDefense: null,
                minDamage: 20,
                maxDamage: 31,
                strengthReq: 74,
                dexterityReq: null,
                durability: 72,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMorningStar,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Devil Star',
                levelReq: 52,
                levelMonster: 70,
                minDefense: null,
                maxDefense: null,
                minDamage: 43,
                maxDamage: 53,
                strengthReq: 153,
                dexterityReq: 44,
                durability: 72,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMorningStar,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Flail'
                }
              }, ['id']);

            case 31:
              itemFamilyFlail = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Flail',
                levelReq: null,
                levelMonster: 19,
                minDefense: null,
                maxDefense: null,
                minDamage: 1,
                maxDamage: 24,
                strengthReq: 41,
                dexterityReq: 35,
                durability: 30,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFlail,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Knout',
                levelReq: 25,
                levelMonster: 43,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 35,
                strengthReq: 82,
                dexterityReq: 73,
                durability: 30,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFlail,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Scourge',
                levelReq: 57,
                levelMonster: 76,
                minDefense: null,
                maxDefense: null,
                minDamage: 3,
                maxDamage: 80,
                strengthReq: 125,
                dexterityReq: 77,
                durability: 65,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFlail,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 34:
              _context.next = 36;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'War Hammer'
                }
              }, ['id']);

            case 36:
              itemFamilyWarHammer = _context.sent;
              _context.next = 39;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'War Hammer',
                levelReq: null,
                levelMonster: 25,
                minDefense: null,
                maxDefense: null,
                minDamage: 19,
                maxDamage: 29,
                strengthReq: 53,
                dexterityReq: null,
                durability: 55,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarHammer,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Hammer',
                levelReq: 25,
                levelMonster: 48,
                minDefense: null,
                maxDefense: null,
                minDamage: 35,
                maxDamage: 58,
                strengthReq: 100,
                dexterityReq: null,
                durability: 55,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarHammer,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Legendary Mallet',
                levelReq: 61,
                levelMonster: 82,
                minDefense: null,
                maxDefense: null,
                minDamage: 50,
                maxDamage: 61,
                strengthReq: 189,
                dexterityReq: null,
                durability: 65,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarHammer,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 39:
              _context.next = 41;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Maul'
                }
              }, ['id']);

            case 41:
              itemFamilyWMaul = _context.sent;
              _context.next = 44;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Maul',
                levelReq: null,
                levelMonster: 21,
                minDefense: null,
                maxDefense: null,
                minDamage: 30,
                maxDamage: 43,
                strengthReq: 69,
                dexterityReq: null,
                durability: 60,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWMaul,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Club',
                levelReq: 25,
                levelMonster: 45,
                minDefense: null,
                maxDefense: null,
                minDamage: 53,
                maxDamage: 78,
                strengthReq: 124,
                dexterityReq: null,
                durability: 60,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWMaul,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ogre Maul',
                levelReq: 51,
                levelMonster: 69,
                minDefense: null,
                maxDefense: null,
                minDamage: 77,
                maxDamage: 106,
                strengthReq: 225,
                dexterityReq: null,
                durability: 60,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWMaul,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 44:
              _context.next = 46;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Great Maul'
                }
              }, ['id']);

            case 46:
              itemFamilyGreatMaul = _context.sent;
              _context.next = 49;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Great Maul',
                levelReq: null,
                levelMonster: 32,
                minDefense: null,
                maxDefense: null,
                minDamage: 38,
                maxDamage: 58,
                strengthReq: 99,
                dexterityReq: null,
                durability: 60,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatMaul,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Martel de Fer',
                levelReq: 25,
                levelMonster: 53,
                minDefense: null,
                maxDefense: null,
                minDamage: 61,
                maxDamage: 99,
                strengthReq: 169,
                dexterityReq: null,
                durability: 60,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatMaul,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Thunder Maul',
                levelReq: 65,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 33,
                maxDamage: 180,
                strengthReq: 253,
                dexterityReq: null,
                durability: 60,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatMaul,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 49:
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