"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyWalkingStick, itemFamilyLongStaff, itemFamilyGnarledStaff, itemFamilyBattleStaff, itemFamilyWarStaff;
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
                  name: 'Short Staff'
                }
              }, ['id']);

            case 11:
              itemFamilyWalkingStick = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Short Staff',
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 1,
                maxDamage: 5,
                strengthReq: null,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWalkingStick,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Jo Staff',
                levelReq: 18,
                levelMonster: 30,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 21,
                strengthReq: 25,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWalkingStick,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Walking Stick',
                levelReq: 43,
                levelMonster: 58,
                minDefense: null,
                maxDefense: null,
                minDamage: 69,
                maxDamage: 85,
                strengthReq: 25,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWalkingStick,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Long Staff'
                }
              }, ['id']);

            case 16:
              itemFamilyLongStaff = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Long Staff',
                levelReq: null,
                levelMonster: 5,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 8,
                strengthReq: null,
                dexterityReq: null,
                durability: 30,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongStaff,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Quarterstaff',
                levelReq: 23,
                levelMonster: 35,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 26,
                strengthReq: 25,
                dexterityReq: null,
                durability: 30,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongStaff,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Stalagmite',
                levelReq: 49,
                levelMonster: 66,
                minDefense: null,
                maxDefense: null,
                minDamage: 75,
                maxDamage: 107,
                strengthReq: 63,
                dexterityReq: 35,
                durability: 30,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongStaff,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Gnarled Staff'
                }
              }, ['id']);

            case 21:
              itemFamilyGnarledStaff = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Gnarled Staff',
                levelReq: null,
                levelMonster: 12,
                minDefense: null,
                maxDefense: null,
                minDamage: 4,
                maxDamage: 12,
                strengthReq: null,
                dexterityReq: null,
                durability: 35,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGnarledStaff,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cedar Staff',
                levelReq: 25,
                levelMonster: 38,
                minDefense: null,
                maxDefense: null,
                minDamage: 11,
                maxDamage: 32,
                strengthReq: 25,
                dexterityReq: null,
                durability: 35,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGnarledStaff,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Elder Staff',
                levelReq: 55,
                levelMonster: 74,
                minDefense: null,
                maxDefense: null,
                minDamage: 80,
                maxDamage: 93,
                strengthReq: 52,
                dexterityReq: 27,
                durability: 40,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGnarledStaff,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Battle Staff'
                }
              }, ['id']);

            case 26:
              itemFamilyBattleStaff = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Battle Staff',
                levelReq: null,
                levelMonster: 17,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 13,
                strengthReq: null,
                dexterityReq: null,
                durability: 40,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBattleStaff,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gothic Staff',
                levelReq: 25,
                levelMonster: 42,
                minDefense: null,
                maxDefense: null,
                minDamage: 14,
                maxDamage: 34,
                strengthReq: 25,
                dexterityReq: null,
                durability: 40,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBattleStaff,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shillelagh',
                levelReq: 62,
                levelMonster: 83,
                minDefense: null,
                maxDefense: null,
                minDamage: 65,
                maxDamage: 408,
                strengthReq: 52,
                dexterityReq: 27,
                durability: 40,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBattleStaff,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'War Staff'
                }
              }, ['id']);

            case 31:
              itemFamilyWarStaff = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'War Staff',
                levelReq: null,
                levelMonster: 24,
                minDefense: null,
                maxDefense: null,
                minDamage: 12,
                maxDamage: 28,
                strengthReq: null,
                dexterityReq: null,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarStaff,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Rune Staff',
                levelReq: 25,
                levelMonster: 47,
                minDefense: null,
                maxDefense: null,
                minDamage: 24,
                maxDamage: 58,
                strengthReq: 25,
                dexterityReq: null,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarStaff,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Archon Staff',
                levelReq: 66,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 83,
                maxDamage: 99,
                strengthReq: 34,
                dexterityReq: null,
                durability: 26,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarStaff,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 34:
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