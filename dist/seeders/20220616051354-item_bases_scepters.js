"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyScepter, itemFamilyGrandScepter, itemFamilyWarScepter;
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
                  name: 'Scepter'
                }
              }, ['id']);

            case 11:
              itemFamilyScepter = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Scepter',
                levelReq: null,
                levelMonster: 3,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 11,
                strengthReq: 25,
                dexterityReq: null,
                durability: 50,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScepter,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Rune Scepter',
                levelReq: 19,
                levelMonster: 31,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 24,
                strengthReq: 58,
                dexterityReq: null,
                durability: 50,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScepter,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mighty Scepter',
                levelReq: 46,
                levelMonster: 62,
                minDefense: null,
                maxDefense: null,
                minDamage: 40,
                maxDamage: 52,
                strengthReq: 125,
                dexterityReq: 65,
                durability: 50,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScepter,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Grand Scepter'
                }
              }, ['id']);

            case 16:
              itemFamilyGrandScepter = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Grand Scepter',
                levelReq: null,
                levelMonster: 15,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 18,
                strengthReq: 37,
                dexterityReq: null,
                durability: 60,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGrandScepter,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Holy Water Sprinkler',
                levelReq: 25,
                levelMonster: 40,
                minDefense: null,
                maxDefense: null,
                minDamage: 14,
                maxDamage: 36,
                strengthReq: 76,
                dexterityReq: null,
                durability: 60,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGrandScepter,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Seraph Rod',
                levelReq: 57,
                levelMonster: 76,
                minDefense: null,
                maxDefense: null,
                minDamage: 45,
                maxDamage: 54,
                strengthReq: 108,
                dexterityReq: 69,
                durability: 60,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGrandScepter,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'War Scepter'
                }
              }, ['id']);

            case 21:
              itemFamilyWarScepter = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'War Scepter',
                levelReq: null,
                levelMonster: 21,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 17,
                strengthReq: 55,
                dexterityReq: null,
                durability: 70,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarScepter,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Divine Scepter',
                levelReq: 25,
                levelMonster: 45,
                minDefense: null,
                maxDefense: null,
                minDamage: 16,
                maxDamage: 38,
                strengthReq: 103,
                dexterityReq: null,
                durability: 70,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarScepter,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Caduceus',
                levelReq: 66,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 37,
                maxDamage: 43,
                strengthReq: 97,
                dexterityReq: 70,
                durability: 70,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarScepter,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
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