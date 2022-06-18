"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyShortbow, itemFamilyHuntersBow, itemFamilyLongBow, itemFamilyCompositeBow, itemFamilyShortBattleBow, itemFamilyLongBattleBow, itemFamilyShortWarBow, itemFamilyLongWarBow;
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
                  name: 'Short Bow'
                }
              }, ['id']);

            case 11:
              itemFamilyShortbow = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Short Bow',
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 1,
                maxDamage: 4,
                strengthReq: null,
                dexterityReq: 15,
                durability: null,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyShortbow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Edge Bow',
                levelReq: 18,
                levelMonster: 30,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 19,
                strengthReq: 25,
                dexterityReq: 43,
                durability: null,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyShortbow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Spider Bow',
                levelReq: 41,
                levelMonster: 55,
                minDefense: null,
                maxDefense: null,
                minDamage: 23,
                maxDamage: 50,
                strengthReq: 64,
                dexterityReq: 143,
                durability: null,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyShortbow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: "Hunter's Bow"
                }
              }, ['id']);

            case 16:
              itemFamilyHuntersBow = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: "Hunter's Bow",
                levelReq: null,
                levelMonster: 5,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 6,
                strengthReq: null,
                dexterityReq: 28,
                durability: null,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHuntersBow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Razor Bow',
                levelReq: 21,
                levelMonster: 33,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 22,
                strengthReq: 25,
                dexterityReq: 62,
                durability: null,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHuntersBow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blade Bow',
                levelReq: 45,
                levelMonster: 60,
                minDefense: null,
                maxDefense: null,
                minDamage: 21,
                maxDamage: 41,
                strengthReq: 76,
                dexterityReq: 119,
                durability: null,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHuntersBow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: "Long Bow"
                }
              }, ['id']);

            case 21:
              itemFamilyLongBow = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: "Long Bow",
                levelReq: null,
                levelMonster: 8,
                minDefense: null,
                maxDefense: null,
                minDamage: 3,
                maxDamage: 10,
                strengthReq: 22,
                dexterityReq: 19,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongBow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cedar Bow',
                levelReq: 23,
                levelMonster: 35,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 29,
                strengthReq: 53,
                dexterityReq: 49,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongBow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shadow Bow',
                levelReq: 47,
                levelMonster: 63,
                minDefense: null,
                maxDefense: null,
                minDamage: 15,
                maxDamage: 59,
                strengthReq: 52,
                dexterityReq: 188,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongBow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: "Composite Bow"
                }
              }, ['id']);

            case 26:
              itemFamilyCompositeBow = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: "Composite Bow",
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 4,
                maxDamage: 8,
                strengthReq: 25,
                dexterityReq: 35,
                durability: null,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCompositeBow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Double Bow',
                levelReq: 25,
                levelMonster: 39,
                minDefense: null,
                maxDefense: null,
                minDamage: 11,
                maxDamage: 26,
                strengthReq: 58,
                dexterityReq: 73,
                durability: null,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCompositeBow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Great Bow',
                levelReq: 51,
                levelMonster: 68,
                minDefense: null,
                maxDefense: null,
                minDamage: 12,
                maxDamage: 52,
                strengthReq: 121,
                dexterityReq: 107,
                durability: null,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCompositeBow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: "Short Battle Bow"
                }
              }, ['id']);

            case 31:
              itemFamilyShortBattleBow = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: "Short Battle Bow",
                levelReq: null,
                levelMonster: 18,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 11,
                strengthReq: 30,
                dexterityReq: 40,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyShortBattleBow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Short Siege Bow',
                levelReq: 25,
                levelMonster: 43,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 30,
                strengthReq: 65,
                dexterityReq: 80,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyShortBattleBow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Diamond Bow',
                levelReq: 54,
                levelMonster: 72,
                minDefense: null,
                maxDefense: null,
                minDamage: 33,
                maxDamage: 40,
                strengthReq: 89,
                dexterityReq: 132,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyShortBattleBow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 34:
              _context.next = 36;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: "Long Battle Bow"
                }
              }, ['id']);

            case 36:
              itemFamilyLongBattleBow = _context.sent;
              _context.next = 39;
              return queryInterface.bulkInsert('itemBase', [{
                name: "Long Battle Bow",
                levelReq: null,
                levelMonster: 23,
                minDefense: null,
                maxDefense: null,
                minDamage: 3,
                maxDamage: 18,
                strengthReq: 40,
                dexterityReq: 50,
                durability: null,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongBattleBow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Large Siege Bow',
                levelReq: 25,
                levelMonster: 46,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 42,
                strengthReq: 80,
                dexterityReq: 95,
                durability: null,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongBattleBow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Crusader Bow',
                levelReq: 57,
                levelMonster: 77,
                minDefense: null,
                maxDefense: null,
                minDamage: 15,
                maxDamage: 63,
                strengthReq: 97,
                dexterityReq: 121,
                durability: null,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongBattleBow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 39:
              _context.next = 41;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: "Short War Bow"
                }
              }, ['id']);

            case 41:
              itemFamilyShortWarBow = _context.sent;
              _context.next = 44;
              return queryInterface.bulkInsert('itemBase', [{
                name: "Short War Bow",
                levelReq: null,
                levelMonster: 27,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 14,
                strengthReq: 35,
                dexterityReq: 55,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyShortWarBow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Rune Bow',
                levelReq: 25,
                levelMonster: 49,
                minDefense: null,
                maxDefense: null,
                minDamage: 14,
                maxDamage: 35,
                strengthReq: 73,
                dexterityReq: 103,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyShortWarBow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ward Bow',
                levelReq: 60,
                levelMonster: 80,
                minDefense: null,
                maxDefense: null,
                minDamage: 20,
                maxDamage: 53,
                strengthReq: 72,
                dexterityReq: 146,
                durability: null,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyShortWarBow,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 44:
              _context.next = 46;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: "Long War Bow"
                }
              }, ['id']);

            case 46:
              itemFamilyLongWarBow = _context.sent;
              _context.next = 49;
              return queryInterface.bulkInsert('itemBase', [{
                name: "Long War Bow",
                levelReq: null,
                levelMonster: 31,
                minDefense: null,
                maxDefense: null,
                minDamage: 3,
                maxDamage: 23,
                strengthReq: 50,
                dexterityReq: 65,
                durability: null,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongWarBow,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gothic Bow',
                levelReq: 25,
                levelMonster: 52,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 50,
                strengthReq: 95,
                dexterityReq: 118,
                durability: null,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongWarBow,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hydra Bow',
                levelReq: 63,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 68,
                strengthReq: 134,
                dexterityReq: 167,
                durability: null,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLongWarBow,
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