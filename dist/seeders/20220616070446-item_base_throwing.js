"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyJavelin, itemFamilyBalancedKnife, itemFamilyBThrowingAxe, itemFamilyBBalancedAxe;
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
                  name: 'Throwing Knife'
                }
              }, ['id']);

            case 11:
              itemFamilyJavelin = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Throwing Knife',
                levelReq: null,
                levelMonster: 2,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 3,
                minThrowDamage: 4,
                maxThrowDamage: 9,
                strengthReq: null,
                dexterityReq: 21,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 160,
                itemFamilyId: itemFamilyJavelin,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Dart',
                levelReq: 19,
                levelMonster: 31,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 16,
                minThrowDamage: 11,
                maxThrowDamage: 24,
                strengthReq: 25,
                dexterityReq: 52,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 160,
                itemFamilyId: itemFamilyJavelin,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Flying Knife',
                levelReq: 48,
                levelMonster: 64,
                minDefense: null,
                maxDefense: null,
                minDamage: 23,
                maxDamage: 54,
                minThrowDamage: 23,
                maxThrowDamage: 54,
                strengthReq: 48,
                dexterityReq: 141,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 200,
                itemFamilyId: itemFamilyJavelin,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Balanced Knife'
                }
              }, ['id']);

            case 16:
              itemFamilyBalancedKnife = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Balanced Knife',
                levelReq: null,
                levelMonster: 13,
                minDefense: null,
                maxDefense: null,
                minDamage: 1,
                maxDamage: 8,
                minThrowDamage: 8,
                maxThrowDamage: 11,
                strengthReq: null,
                dexterityReq: 51,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 160,
                itemFamilyId: itemFamilyBalancedKnife,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Dart',
                levelReq: 25,
                levelMonster: 39,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 24,
                minThrowDamage: 14,
                maxThrowDamage: 27,
                strengthReq: 25,
                dexterityReq: 97,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 160,
                itemFamilyId: itemFamilyBalancedKnife,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Winged Knife',
                levelReq: 57,
                levelMonster: 77,
                minDefense: null,
                maxDefense: null,
                minDamage: 27,
                maxDamage: 35,
                minThrowDamage: 23,
                maxThrowDamage: 39,
                strengthReq: 45,
                dexterityReq: 142,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 200,
                itemFamilyId: itemFamilyBalancedKnife,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Throwing Axe'
                }
              }, ['id']);

            case 21:
              itemFamilyBThrowingAxe = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Throwing Axe',
                levelReq: null,
                levelMonster: 7,
                minDefense: null,
                maxDefense: null,
                minDamage: 4,
                maxDamage: 7,
                minThrowDamage: 8,
                maxThrowDamage: 12,
                strengthReq: null,
                dexterityReq: 40,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 130,
                itemFamilyId: itemFamilyBThrowingAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Francisca',
                levelReq: 22,
                levelMonster: 34,
                minDefense: null,
                maxDefense: null,
                minDamage: 11,
                maxDamage: 22,
                minThrowDamage: 18,
                maxThrowDamage: 33,
                strengthReq: 25,
                dexterityReq: 80,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 130,
                itemFamilyId: itemFamilyBThrowingAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Flying Axe',
                levelReq: 42,
                levelMonster: 56,
                minDefense: null,
                maxDefense: null,
                minDamage: 17,
                maxDamage: 65,
                minThrowDamage: 15,
                maxThrowDamage: 66,
                strengthReq: 88,
                dexterityReq: 108,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 180,
                itemFamilyId: itemFamilyBThrowingAxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Balanced Axe'
                }
              }, ['id']);

            case 26:
              itemFamilyBBalancedAxe = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Balanced Axe',
                levelReq: null,
                levelMonster: 16,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 10,
                minThrowDamage: 12,
                maxThrowDamage: 15,
                strengthReq: null,
                dexterityReq: 57,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 130,
                itemFamilyId: itemFamilyBBalancedAxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hurlbat',
                levelReq: 25,
                levelMonster: 41,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 27,
                minThrowDamage: 24,
                maxThrowDamage: 34,
                strengthReq: 25,
                dexterityReq: 106,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 130,
                itemFamilyId: itemFamilyBBalancedAxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Winged Axe',
                levelReq: 60,
                levelMonster: 80,
                minDefense: null,
                maxDefense: null,
                minDamage: 11,
                maxDamage: 56,
                minThrowDamage: 7,
                maxThrowDamage: 60,
                strengthReq: 96,
                dexterityReq: 122,
                durability: null,
                sockets: null,
                block: null,
                maxStack: 180,
                itemFamilyId: itemFamilyBBalancedAxe,
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