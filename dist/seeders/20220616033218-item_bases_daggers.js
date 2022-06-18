"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyDagger, itemFamilyDirk, itemFamilyKris, itemFamilyBlade;
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
                  name: 'Dagger'
                }
              }, ['id']);

            case 11:
              itemFamilyDagger = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Dagger',
                levelReq: null,
                levelMonster: 3,
                minDefense: null,
                maxDefense: null,
                minDamage: 1,
                maxDamage: 4,
                strengthReq: null,
                dexterityReq: null,
                durability: 16,
                sockets: 1,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDagger,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Poignard',
                levelReq: 19,
                levelMonster: 31,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 18,
                strengthReq: 25,
                dexterityReq: null,
                durability: 16,
                sockets: 1,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDagger,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bone Knife',
                levelReq: 43,
                levelMonster: 58,
                minDefense: null,
                maxDefense: null,
                minDamage: 23,
                maxDamage: 49,
                strengthReq: 38,
                dexterityReq: 75,
                durability: 26,
                sockets: 1,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDagger,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Dirk'
                }
              }, ['id']);

            case 16:
              itemFamilyDirk = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Dirk',
                levelReq: null,
                levelMonster: 9,
                minDefense: null,
                maxDefense: null,
                minDamage: 3,
                maxDamage: 9,
                strengthReq: null,
                dexterityReq: 25,
                durability: 20,
                sockets: 1,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDirk,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Rondel',
                levelReq: 24,
                levelMonster: 36,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 26,
                strengthReq: 25,
                dexterityReq: 58,
                durability: 20,
                sockets: 1,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDirk,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mithril Point',
                levelReq: 52,
                levelMonster: 70,
                minDefense: null,
                maxDefense: null,
                minDamage: 37,
                maxDamage: 53,
                strengthReq: 55,
                dexterityReq: 98,
                durability: 55,
                sockets: 1,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDirk,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Kris'
                }
              }, ['id']);

            case 21:
              itemFamilyKris = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Kris',
                levelReq: null,
                levelMonster: 17,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 11,
                strengthReq: null,
                dexterityReq: 45,
                durability: 24,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyKris,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cinquedeas',
                levelReq: 25,
                levelMonster: 42,
                minDefense: null,
                maxDefense: null,
                minDamage: 15,
                maxDamage: 31,
                strengthReq: 25,
                dexterityReq: 88,
                durability: 20,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyKris,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fanged Knife',
                levelReq: 62,
                levelMonster: 83,
                minDefense: null,
                maxDefense: null,
                minDamage: 15,
                maxDamage: 57,
                strengthReq: 42,
                dexterityReq: 86,
                durability: 36,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyKris,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Blade'
                }
              }, ['id']);

            case 26:
              itemFamilyBlade = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Blade',
                levelReq: null,
                levelMonster: 23,
                minDefense: null,
                maxDefense: null,
                minDamage: 4,
                maxDamage: 15,
                strengthReq: 35,
                dexterityReq: 51,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBlade,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Stiletto',
                levelReq: 25,
                levelMonster: 46,
                minDefense: null,
                maxDefense: null,
                minDamage: 19,
                maxDamage: 36,
                strengthReq: 47,
                dexterityReq: 97,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBlade,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Legend Spike',
                levelReq: 66,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 31,
                maxDamage: 47,
                strengthReq: 65,
                dexterityReq: 67,
                durability: 47,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBlade,
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