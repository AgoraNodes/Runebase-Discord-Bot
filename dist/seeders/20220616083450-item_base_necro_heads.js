"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyTarge, itemFamilyZombieHead, itemFamilyUnravellerHead, itemFamilyGargoyleHead, itemFamilyDemonHead;
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
                  name: 'Preserved Head'
                }
              }, ['id']);

            case 11:
              itemFamilyTarge = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Preserved Head',
                levelReq: 3,
                levelMonster: 4,
                minDefense: 2,
                maxDefense: 5,
                minDamage: null,
                maxDamage: null,
                strengthReq: 12,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 23,
                maxStack: null,
                itemFamilyId: itemFamilyTarge,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mummified Trophy',
                levelReq: 24,
                levelMonster: 33,
                minDefense: 38,
                maxDefense: 48,
                minDamage: null,
                maxDamage: null,
                strengthReq: 38,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 23,
                maxStack: null,
                itemFamilyId: itemFamilyTarge,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Minion Skull',
                levelReq: 44,
                levelMonster: 59,
                minDefense: 95,
                maxDefense: 139,
                minDamage: null,
                maxDamage: null,
                strengthReq: 77,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 23,
                maxStack: null,
                itemFamilyId: itemFamilyTarge,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Zombie Head'
                }
              }, ['id']);

            case 16:
              itemFamilyZombieHead = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Zombie Head',
                levelReq: 6,
                levelMonster: 8,
                minDefense: 4,
                maxDefense: 8,
                minDamage: null,
                maxDamage: null,
                strengthReq: 14,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 25,
                maxStack: null,
                itemFamilyId: itemFamilyZombieHead,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fetish Trophy',
                levelReq: 29,
                levelMonster: 39,
                minDefense: 41,
                maxDefense: 52,
                minDamage: null,
                maxDamage: null,
                strengthReq: 41,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 25,
                maxStack: null,
                itemFamilyId: itemFamilyZombieHead,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hellspawn Skull',
                levelReq: 50,
                levelMonster: 67,
                minDefense: 96,
                maxDefense: 141,
                minDamage: null,
                maxDamage: null,
                strengthReq: 82,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 25,
                maxStack: null,
                itemFamilyId: itemFamilyZombieHead,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Unraveller Head'
                }
              }, ['id']);

            case 21:
              itemFamilyUnravellerHead = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Unraveller Head',
                levelReq: 12,
                levelMonster: 16,
                minDefense: 6,
                maxDefense: 10,
                minDamage: null,
                maxDamage: null,
                strengthReq: 18,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 28,
                maxStack: null,
                itemFamilyId: itemFamilyUnravellerHead,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sexton Trophy',
                levelReq: 33,
                levelMonster: 45,
                minDefense: 44,
                maxDefense: 55,
                minDamage: null,
                maxDamage: null,
                strengthReq: 47,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 28,
                maxStack: null,
                itemFamilyId: itemFamilyUnravellerHead,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Overseer Skull',
                levelReq: 49,
                levelMonster: 66,
                minDefense: 98,
                maxDefense: 142,
                minDamage: null,
                maxDamage: null,
                strengthReq: 91,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 28,
                maxStack: null,
                itemFamilyId: itemFamilyUnravellerHead,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Gargoyle Head'
                }
              }, ['id']);

            case 26:
              itemFamilyGargoyleHead = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Gargoyle Head',
                levelReq: 15,
                levelMonster: 20,
                minDefense: 10,
                maxDefense: 16,
                minDamage: null,
                maxDamage: null,
                strengthReq: 20,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 30,
                maxStack: null,
                itemFamilyId: itemFamilyUnravellerHead,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cantor Trophy',
                levelReq: 36,
                levelMonster: 49,
                minDefense: 50,
                maxDefense: 64,
                minDamage: null,
                maxDamage: null,
                strengthReq: 50,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 30,
                maxStack: null,
                itemFamilyId: itemFamilyUnravellerHead,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Succubus Skull',
                levelReq: 60,
                levelMonster: 81,
                minDefense: 100,
                maxDefense: 146,
                minDamage: null,
                maxDamage: null,
                strengthReq: 91,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 30,
                maxStack: null,
                itemFamilyId: itemFamilyUnravellerHead,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Demon Head'
                }
              }, ['id']);

            case 31:
              itemFamilyDemonHead = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Demon Head',
                levelReq: 18,
                levelMonster: 24,
                minDefense: 15,
                maxDefense: 20,
                minDamage: null,
                maxDamage: null,
                strengthReq: 25,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 32,
                maxStack: null,
                itemFamilyId: itemFamilyDemonHead,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hierophant Trophy',
                levelReq: 40,
                levelMonster: 54,
                minDefense: 58,
                maxDefense: 70,
                minDamage: null,
                maxDamage: null,
                strengthReq: 58,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 32,
                maxStack: null,
                itemFamilyId: itemFamilyDemonHead,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bloodlord Skull',
                levelReq: 65,
                levelMonster: 85,
                minDefense: 103,
                maxDefense: 148,
                minDamage: null,
                maxDamage: null,
                strengthReq: 106,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: 32,
                maxStack: null,
                itemFamilyId: itemFamilyDemonHead,
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