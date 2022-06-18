"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyBardiche, itemFamilyVoulge, itemFamilyScythe, itemFamilyPoleaxe, itemFamilyHalberd, itemFamilyWarScythe;
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
                  name: 'Bardiche'
                }
              }, ['id']);

            case 11:
              itemFamilyBardiche = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Bardiche',
                levelReq: null,
                levelMonster: 5,
                minDefense: null,
                maxDefense: null,
                minDamage: 1,
                maxDamage: 27,
                strengthReq: 40,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBardiche,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lochaber Axe',
                levelReq: 21,
                levelMonster: 33,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 58,
                strengthReq: 80,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBardiche,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ogre Axe',
                levelReq: 45,
                levelMonster: 60,
                minDefense: null,
                maxDefense: null,
                minDamage: 28,
                maxDamage: 145,
                strengthReq: 195,
                dexterityReq: 75,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBardiche,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Voulge'
                }
              }, ['id']);

            case 16:
              itemFamilyVoulge = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Voulge',
                levelReq: null,
                levelMonster: 5,
                minDefense: null,
                maxDefense: null,
                minDamage: 6,
                maxDamage: 21,
                strengthReq: 50,
                dexterityReq: null,
                durability: 50,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyVoulge,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bill',
                levelReq: 25,
                levelMonster: 37,
                minDefense: null,
                maxDefense: null,
                minDamage: 14,
                maxDamage: 53,
                strengthReq: 95,
                dexterityReq: null,
                durability: 50,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyVoulge,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Colossus Voulge',
                levelReq: 48,
                levelMonster: 64,
                minDefense: null,
                maxDefense: null,
                minDamage: 17,
                maxDamage: 165,
                strengthReq: 210,
                dexterityReq: 55,
                durability: 50,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyVoulge,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Scythe'
                }
              }, ['id']);

            case 21:
              itemFamilyScythe = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Scythe',
                levelReq: null,
                levelMonster: 15,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 20,
                strengthReq: 41,
                dexterityReq: 41,
                durability: 65,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScythe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Scythe',
                levelReq: 25,
                levelMonster: 40,
                minDefense: null,
                maxDefense: null,
                minDamage: 18,
                maxDamage: 45,
                strengthReq: 82,
                dexterityReq: 82,
                durability: 65,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScythe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Thresher',
                levelReq: 53,
                levelMonster: 71,
                minDefense: null,
                maxDefense: null,
                minDamage: 12,
                maxDamage: 141,
                strengthReq: 152,
                dexterityReq: 118,
                durability: 65,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScythe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Poleaxe'
                }
              }, ['id']);

            case 26:
              itemFamilyPoleaxe = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Poleaxe',
                levelReq: null,
                levelMonster: 21,
                minDefense: null,
                maxDefense: null,
                minDamage: 18,
                maxDamage: 39,
                strengthReq: 62,
                dexterityReq: null,
                durability: 65,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyPoleaxe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Partizan',
                levelReq: 23,
                levelMonster: 35,
                minDefense: null,
                maxDefense: null,
                minDamage: 34,
                maxDamage: 75,
                strengthReq: 113,
                dexterityReq: 67,
                durability: 65,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyPoleaxe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cryptic Axe',
                levelReq: 59,
                levelMonster: 79,
                minDefense: null,
                maxDefense: null,
                minDamage: 33,
                maxDamage: 150,
                strengthReq: 165,
                dexterityReq: 103,
                durability: 65,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyPoleaxe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Halberd'
                }
              }, ['id']);

            case 31:
              itemFamilyHalberd = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Halberd',
                levelReq: null,
                levelMonster: 29,
                minDefense: null,
                maxDefense: null,
                minDamage: 12,
                maxDamage: 45,
                strengthReq: 75,
                dexterityReq: 47,
                durability: 55,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHalberd,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bec-De-Corbin',
                levelReq: 25,
                levelMonster: 51,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 85,
                strengthReq: 133,
                dexterityReq: 91,
                durability: 55,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHalberd,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Great Poleaxe',
                levelReq: 63,
                levelMonster: 84,
                minDefense: null,
                maxDefense: null,
                minDamage: 46,
                maxDamage: 127,
                strengthReq: 179,
                dexterityReq: 99,
                durability: 55,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHalberd,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 34:
              _context.next = 36;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'War Scythe'
                }
              }, ['id']);

            case 36:
              itemFamilyWarScythe = _context.sent;
              _context.next = 39;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'War Scythe',
                levelReq: null,
                levelMonster: 34,
                minDefense: null,
                maxDefense: null,
                minDamage: 15,
                maxDamage: 36,
                strengthReq: 80,
                dexterityReq: 80,
                durability: 55,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarScythe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Grim Scythe',
                levelReq: 25,
                levelMonster: 55,
                minDefense: null,
                maxDefense: null,
                minDamage: 30,
                maxDamage: 70,
                strengthReq: 140,
                dexterityReq: 140,
                durability: 55,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarScythe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Giant Thresher',
                levelReq: 66,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 40,
                maxDamage: 114,
                strengthReq: 188,
                dexterityReq: 140,
                durability: 55,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWarScythe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 39:
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