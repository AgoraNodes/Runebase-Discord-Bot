"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyDagger, itemFamilyWristBlade, itemFamilyHatchetHands, itemFamilyCestus, itemFamilyClaws, itemFamilyBlade, itemFamilyScissorsKatar;
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
                  name: 'Katar'
                }
              }, ['id']);

            case 11:
              itemFamilyDagger = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Katar',
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 4,
                maxDamage: 7,
                strengthReq: 20,
                dexterityReq: 20,
                durability: 48,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDagger,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Quhab',
                levelReq: 21,
                levelMonster: 28,
                minDefense: null,
                maxDefense: null,
                minDamage: 11,
                maxDamage: 24,
                strengthReq: 57,
                dexterityReq: 57,
                durability: 48,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDagger,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Suwayyah',
                levelReq: 44,
                levelMonster: 58,
                minDefense: null,
                maxDefense: null,
                minDamage: 39,
                maxDamage: 52,
                strengthReq: 99,
                dexterityReq: 99,
                durability: 46,
                sockets: 3,
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
                  name: 'Wrist Blade'
                }
              }, ['id']);

            case 16:
              itemFamilyWristBlade = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Wrist Blade',
                levelReq: null,
                levelMonster: 9,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 9,
                strengthReq: 33,
                dexterityReq: 33,
                durability: 52,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWristBlade,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Wrist Spike',
                levelReq: 24,
                levelMonster: 32,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 27,
                strengthReq: 66,
                dexterityReq: 66,
                durability: 56,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWristBlade,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Wrist Sword',
                levelReq: 46,
                levelMonster: 62,
                minDefense: null,
                maxDefense: null,
                minDamage: 34,
                maxDamage: 45,
                strengthReq: 105,
                dexterityReq: 105,
                durability: 56,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWristBlade,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Hatchet Hands'
                }
              }, ['id']);

            case 21:
              itemFamilyHatchetHands = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Hatchet Hands',
                levelReq: null,
                levelMonster: 12,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 15,
                strengthReq: 37,
                dexterityReq: 37,
                durability: 56,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHatchetHands,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fascia',
                levelReq: 27,
                levelMonster: 36,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 37,
                strengthReq: 69,
                dexterityReq: 69,
                durability: 64,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHatchetHands,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Fist',
                levelReq: 51,
                levelMonster: 68,
                minDefense: null,
                maxDefense: null,
                minDamage: 36,
                maxDamage: 53,
                strengthReq: 108,
                dexterityReq: 108,
                durability: 72,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHatchetHands,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Cestus'
                }
              }, ['id']);

            case 26:
              itemFamilyCestus = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Cestus',
                levelReq: null,
                levelMonster: 15,
                minDefense: null,
                maxDefense: null,
                minDamage: 7,
                maxDamage: 15,
                strengthReq: 42,
                dexterityReq: 42,
                durability: 72,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCestus,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hand Scythe',
                levelReq: 30,
                levelMonster: 41,
                minDefense: null,
                maxDefense: null,
                minDamage: 16,
                maxDamage: 37,
                strengthReq: 73,
                dexterityReq: 73,
                durability: 72,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCestus,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Cestus',
                levelReq: 54,
                levelMonster: 73,
                minDefense: null,
                maxDefense: null,
                minDamage: 36,
                maxDamage: 42,
                strengthReq: 110,
                dexterityReq: 110,
                durability: 72,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCestus,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Claws'
                }
              }, ['id']);

            case 31:
              itemFamilyClaws = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Claws',
                levelReq: null,
                levelMonster: 18,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 15,
                strengthReq: 46,
                dexterityReq: 46,
                durability: 64,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCestus,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Greater Claws',
                levelReq: 33,
                levelMonster: 45,
                minDefense: null,
                maxDefense: null,
                minDamage: 18,
                maxDamage: 37,
                strengthReq: 76,
                dexterityReq: 76,
                durability: 52,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCestus,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Feral Claws',
                levelReq: 58,
                levelMonster: 78,
                minDefense: null,
                maxDefense: null,
                minDamage: 22,
                maxDamage: 53,
                strengthReq: 113,
                dexterityReq: 113,
                durability: 52,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCestus,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 34:
              _context.next = 36;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Blade Talons'
                }
              }, ['id']);

            case 36:
              itemFamilyBlade = _context.sent;
              _context.next = 39;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Blade Talons',
                levelReq: null,
                levelMonster: 21,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 14,
                strengthReq: 50,
                dexterityReq: 50,
                durability: 69,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBlade,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Greater Talons',
                levelReq: 37,
                levelMonster: 50,
                minDefense: null,
                maxDefense: null,
                minDamage: 21,
                maxDamage: 35,
                strengthReq: 79,
                dexterityReq: 79,
                durability: 69,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBlade,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Runic Talons',
                levelReq: 60,
                levelMonster: 81,
                minDefense: null,
                maxDefense: null,
                minDamage: 24,
                maxDamage: 44,
                strengthReq: 115,
                dexterityReq: 115,
                durability: 69,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBlade,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 39:
              _context.next = 41;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Scissors Katar'
                }
              }, ['id']);

            case 41:
              itemFamilyScissorsKatar = _context.sent;
              _context.next = 44;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Scissors Katar',
                levelReq: null,
                levelMonster: 24,
                minDefense: null,
                maxDefense: null,
                minDamage: 9,
                maxDamage: 17,
                strengthReq: 55,
                dexterityReq: 55,
                durability: 68,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScissorsKatar,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Scissors Quhab',
                levelReq: 40,
                levelMonster: 54,
                minDefense: null,
                maxDefense: null,
                minDamage: 19,
                maxDamage: 40,
                strengthReq: 82,
                dexterityReq: 82,
                durability: 68,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScissorsKatar,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Scissors Suwayyah',
                levelReq: 64,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 40,
                maxDamage: 51,
                strengthReq: 118,
                dexterityReq: 118,
                durability: 68,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScissorsKatar,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 44:
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