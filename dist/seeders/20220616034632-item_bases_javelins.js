"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyJavelin, itemFamilyPilum, itemFamilyShortSpear, itemFamilyGlaive, itemFamilyThrowingSpear;
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
                  name: 'Javelin'
                }
              }, ['id']);

            case 11:
              itemFamilyJavelin = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Javelin',
                levelReq: null,
                levelMonster: 3,
                minDefense: null,
                maxDefense: null,
                minDamage: 1,
                maxDamage: 5,
                minThrowDamage: 6,
                maxThrowDamage: 14,
                strengthReq: null,
                dexterityReq: null,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 60,
                itemFamilyId: itemFamilyJavelin,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Javelin',
                levelReq: 18,
                levelMonster: 30,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 19,
                minThrowDamage: 14,
                maxThrowDamage: 32,
                strengthReq: 25,
                dexterityReq: 25,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 60,
                itemFamilyId: itemFamilyJavelin,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hyperion Javelin',
                levelReq: 40,
                levelMonster: 54,
                minDefense: null,
                maxDefense: null,
                minDamage: 21,
                maxDamage: 57,
                minThrowDamage: 28,
                maxThrowDamage: 55,
                strengthReq: 98,
                dexterityReq: 123,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 100,
                itemFamilyId: itemFamilyJavelin,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Pilum'
                }
              }, ['id']);

            case 16:
              itemFamilyPilum = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Pilum',
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 4,
                maxDamage: 9,
                minThrowDamage: 7,
                maxThrowDamage: 20,
                strengthReq: null,
                dexterityReq: 45,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 50,
                itemFamilyId: itemFamilyPilum,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Great Pilum',
                levelReq: 25,
                levelMonster: 37,
                minDefense: null,
                maxDefense: null,
                minDamage: 11,
                maxDamage: 26,
                minThrowDamage: 16,
                maxThrowDamage: 42,
                strengthReq: 25,
                dexterityReq: 88,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 50,
                itemFamilyId: itemFamilyPilum,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Stygian Pilum',
                levelReq: 46,
                levelMonster: 62,
                minDefense: null,
                maxDefense: null,
                minDamage: 14,
                maxDamage: 64,
                minThrowDamage: 21,
                maxThrowDamage: 75,
                strengthReq: 118,
                dexterityReq: 112,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 90,
                itemFamilyId: itemFamilyPilum,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Short Spear'
                }
              }, ['id']);

            case 21:
              itemFamilyShortSpear = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Short Spear',
                levelReq: null,
                levelMonster: 15,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 13,
                minThrowDamage: 10,
                maxThrowDamage: 22,
                strengthReq: 44,
                dexterityReq: 40,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 40,
                itemFamilyId: itemFamilyShortSpear,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Simbilan',
                levelReq: 25,
                levelMonster: 40,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 32,
                minThrowDamage: 27,
                maxThrowDamage: 50,
                strengthReq: 80,
                dexterityReq: 88,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 40,
                itemFamilyId: itemFamilyShortSpear,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Balrog Spear',
                levelReq: 53,
                levelMonster: 71,
                minDefense: null,
                maxDefense: null,
                minDamage: 33,
                maxDamage: 63,
                minThrowDamage: 44,
                maxThrowDamage: 62,
                strengthReq: 127,
                dexterityReq: 95,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 80,
                itemFamilyId: itemFamilyShortSpear,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Glaive'
                }
              }, ['id']);

            case 26:
              itemFamilyGlaive = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Glaive',
                levelReq: null,
                levelMonster: 23,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 17,
                minThrowDamage: 16,
                maxThrowDamage: 22,
                strengthReq: 52,
                dexterityReq: 35,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 40,
                itemFamilyId: itemFamilyGlaive,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Spiculum',
                levelReq: 25,
                levelMonster: 46,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 38,
                minThrowDamage: 32,
                maxThrowDamage: 60,
                strengthReq: 98,
                dexterityReq: 73,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 20,
                itemFamilyId: itemFamilyGlaive,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ghost Glaive',
                levelReq: 59,
                levelMonster: 79,
                minDefense: null,
                maxDefense: null,
                minDamage: 19,
                maxDamage: 60,
                minThrowDamage: 30,
                maxThrowDamage: 85,
                strengthReq: 89,
                dexterityReq: 137,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 75,
                itemFamilyId: itemFamilyGlaive,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Throwing Spear'
                }
              }, ['id']);

            case 31:
              itemFamilyThrowingSpear = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Throwing Spear',
                levelReq: null,
                levelMonster: 29,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 15,
                minThrowDamage: 12,
                maxThrowDamage: 30,
                strengthReq: null,
                dexterityReq: 65,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 80,
                itemFamilyId: itemFamilyThrowingSpear,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Harpoon',
                levelReq: 25,
                levelMonster: 51,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 35,
                minThrowDamage: 18,
                maxThrowDamage: 54,
                strengthReq: 25,
                dexterityReq: 118,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 80,
                itemFamilyId: itemFamilyThrowingSpear,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Winged Harpoon',
                levelReq: 65,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 11,
                maxDamage: 77,
                minThrowDamage: 27,
                maxThrowDamage: 35,
                strengthReq: 11,
                dexterityReq: 77,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 80,
                itemFamilyId: itemFamilyThrowingSpear,
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