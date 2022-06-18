"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyTarge, itemFamilyRondache, itemFamilyKurastShield, itemFamilyAerinShield, itemFamilyCrownShield;
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
                  name: 'Targe'
                }
              }, ['id']);

            case 11:
              itemFamilyTarge = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Targe',
                levelReq: 3,
                levelMonster: 4,
                minDefense: 8,
                maxDefense: 12,
                minDamage: 2,
                maxDamage: 6,
                strengthReq: 16,
                dexterityReq: null,
                durability: 20,
                sockets: 4,
                block: 40,
                maxStack: null,
                itemFamilyId: itemFamilyTarge,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Akaran Targe',
                levelReq: 26,
                levelMonster: 35,
                minDefense: 101,
                maxDefense: 125,
                minDamage: 12,
                maxDamage: 16,
                strengthReq: 44,
                dexterityReq: null,
                durability: 20,
                sockets: 4,
                block: 40,
                maxStack: null,
                itemFamilyId: itemFamilyTarge,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sacred Targe',
                levelReq: 47,
                levelMonster: 63,
                minDefense: 126,
                maxDefense: 158,
                minDamage: 22,
                maxDamage: 70,
                strengthReq: 86,
                dexterityReq: null,
                durability: 46,
                sockets: 4,
                block: 60,
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
                  name: 'Rondache'
                }
              }, ['id']);

            case 16:
              itemFamilyRondache = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Rondache',
                levelReq: 6,
                levelMonster: 8,
                minDefense: 10,
                maxDefense: 18,
                minDamage: 2,
                maxDamage: 8,
                strengthReq: 26,
                dexterityReq: null,
                durability: 30,
                sockets: 4,
                block: 45,
                maxStack: null,
                itemFamilyId: itemFamilyRondache,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Akaran Rondache',
                levelReq: 30,
                levelMonster: 40,
                minDefense: 113,
                maxDefense: 137,
                minDamage: 15,
                maxDamage: 20,
                strengthReq: 59,
                dexterityReq: null,
                durability: 30,
                sockets: 4,
                block: 45,
                maxStack: null,
                itemFamilyId: itemFamilyRondache,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sacred Rondache',
                levelReq: 52,
                levelMonster: 70,
                minDefense: 138,
                maxDefense: 164,
                minDamage: 35,
                maxDamage: 58,
                strengthReq: 109,
                dexterityReq: null,
                durability: 68,
                sockets: 4,
                block: 58,
                maxStack: null,
                itemFamilyId: itemFamilyRondache,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Heraldic Shield'
                }
              }, ['id']);

            case 21:
              itemFamilyKurastShield = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Heraldic Shield',
                levelReq: 12,
                levelMonster: 16,
                minDefense: 12,
                maxDefense: 26,
                minDamage: 3,
                maxDamage: 9,
                strengthReq: 40,
                dexterityReq: null,
                durability: 40,
                sockets: 4,
                block: 50,
                maxStack: null,
                itemFamilyId: itemFamilyKurastShield,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Protector Shield',
                levelReq: 34,
                levelMonster: 46,
                minDefense: 129,
                maxDefense: 153,
                minDamage: 18,
                maxDamage: 24,
                strengthReq: 69,
                dexterityReq: null,
                durability: 40,
                sockets: 4,
                block: 50,
                maxStack: null,
                itemFamilyId: itemFamilyKurastShield,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Kurast Shield',
                levelReq: 55,
                levelMonster: 74,
                minDefense: 154,
                maxDefense: 172,
                minDamage: 10,
                maxDamage: 82,
                strengthReq: 124,
                dexterityReq: null,
                durability: 55,
                sockets: 4,
                block: 55,
                maxStack: null,
                itemFamilyId: itemFamilyKurastShield,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Aerin Shield'
                }
              }, ['id']);

            case 26:
              itemFamilyAerinShield = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Aerin Shield',
                levelReq: 15,
                levelMonster: 20,
                minDefense: 26,
                maxDefense: 36,
                minDamage: 4,
                maxDamage: 10,
                strengthReq: 50,
                dexterityReq: null,
                durability: 50,
                sockets: 4,
                block: 52,
                maxStack: null,
                itemFamilyId: itemFamilyAerinShield,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gilded Shield',
                levelReq: 38,
                levelMonster: 51,
                minDefense: 144,
                maxDefense: 168,
                minDamage: 20,
                maxDamage: 28,
                strengthReq: 89,
                dexterityReq: null,
                durability: 50,
                sockets: 4,
                block: 52,
                maxStack: null,
                itemFamilyId: itemFamilyAerinShield,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Zakarum Shield',
                levelReq: 61,
                levelMonster: 82,
                minDefense: 168,
                maxDefense: 193,
                minDamage: 46,
                maxDamage: 46,
                strengthReq: 142,
                dexterityReq: null,
                durability: 65,
                sockets: 4,
                block: 52,
                maxStack: null,
                itemFamilyId: itemFamilyAerinShield,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Crown Shield'
                }
              }, ['id']);

            case 31:
              itemFamilyCrownShield = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Crown Shield',
                levelReq: 18,
                levelMonster: 24,
                minDefense: 30,
                maxDefense: 40,
                minDamage: 4,
                maxDamage: 12,
                strengthReq: 65,
                dexterityReq: null,
                durability: 60,
                sockets: 4,
                block: 55,
                maxStack: null,
                itemFamilyId: itemFamilyCrownShield,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Royal Shield',
                levelReq: 41,
                levelMonster: 55,
                minDefense: 156,
                maxDefense: 181,
                minDamage: 24,
                maxDamage: 32,
                strengthReq: 114,
                dexterityReq: null,
                durability: 60,
                sockets: 4,
                block: 55,
                maxStack: null,
                itemFamilyId: itemFamilyCrownShield,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Vortex Shield',
                levelReq: 66,
                levelMonster: 85,
                minDefense: 182,
                maxDefense: 225,
                minDamage: 5,
                maxDamage: 87,
                strengthReq: 148,
                dexterityReq: null,
                durability: 90,
                sockets: 4,
                block: 49,
                maxStack: null,
                itemFamilyId: itemFamilyCrownShield,
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