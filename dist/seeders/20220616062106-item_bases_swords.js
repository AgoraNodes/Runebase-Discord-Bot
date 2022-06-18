"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyWalkingStick, itemFamilyScimitar, itemFamilySabre, itemFamilyFalchion, itemFamilyFCrystalSword, itemFamilyFBroadSword, itemFamilyFLongSword, itemFamilyMythicalSword, itemFamilyTwohandedSword, itemFamilyClaymore, itemFamilyGiantSword, itemFamilyBastardSword, itemFamilyFlamberge, itemFamilyGreatSword;
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
                  name: 'Short Sword'
                }
              }, ['id']);

            case 11:
              itemFamilyWalkingStick = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Short Sword',
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 7,
                strengthReq: null,
                dexterityReq: null,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWalkingStick,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gladius',
                levelReq: 18,
                levelMonster: 30,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 22,
                strengthReq: 25,
                dexterityReq: null,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyWalkingStick,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Falcata',
                levelReq: 42,
                levelMonster: 56,
                minDefense: null,
                maxDefense: null,
                minDamage: 31,
                maxDamage: 59,
                strengthReq: 150,
                dexterityReq: 88,
                durability: 24,
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
                  name: 'Scimitar'
                }
              }, ['id']);

            case 16:
              itemFamilyScimitar = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Scimitar',
                levelReq: null,
                levelMonster: 5,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 6,
                strengthReq: null,
                dexterityReq: null,
                durability: 22,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScimitar,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cutlass',
                levelReq: 25,
                levelMonster: 43,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 21,
                strengthReq: 25,
                dexterityReq: 52,
                durability: 22,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScimitar,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ataghan',
                levelReq: 45,
                levelMonster: 61,
                minDefense: null,
                maxDefense: null,
                minDamage: 26,
                maxDamage: 46,
                strengthReq: 138,
                dexterityReq: 95,
                durability: 22,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScimitar,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Sabre'
                }
              }, ['id']);

            case 21:
              itemFamilySabre = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Sabre',
                levelReq: null,
                levelMonster: 8,
                minDefense: null,
                maxDefense: null,
                minDamage: 3,
                maxDamage: 8,
                strengthReq: 25,
                dexterityReq: null,
                durability: 32,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySabre,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shamshir',
                levelReq: 23,
                levelMonster: 35,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 24,
                strengthReq: 58,
                dexterityReq: 58,
                durability: 32,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySabre,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Elegant Blade',
                levelReq: 47,
                levelMonster: 63,
                minDefense: null,
                maxDefense: null,
                minDamage: 33,
                maxDamage: 45,
                strengthReq: 109,
                dexterityReq: 122,
                durability: 32,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySabre,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Falchion'
                }
              }, ['id']);

            case 26:
              itemFamilyFalchion = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Falchion',
                levelReq: null,
                levelMonster: 11,
                minDefense: null,
                maxDefense: null,
                minDamage: 9,
                maxDamage: 17,
                strengthReq: 33,
                dexterityReq: null,
                durability: 32,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFalchion,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tulwar',
                levelReq: 25,
                levelMonster: 37,
                minDefense: null,
                maxDefense: null,
                minDamage: 16,
                maxDamage: 35,
                strengthReq: 70,
                dexterityReq: 42,
                durability: 32,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFalchion,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hydra Edge',
                levelReq: 51,
                levelMonster: 69,
                minDefense: null,
                maxDefense: null,
                minDamage: 28,
                maxDamage: 68,
                strengthReq: 142,
                dexterityReq: 105,
                durability: 32,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFalchion,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Crystal Sword'
                }
              }, ['id']);

            case 31:
              itemFamilyFCrystalSword = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Crystal Sword',
                levelReq: null,
                levelMonster: 11,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 15,
                strengthReq: 43,
                dexterityReq: null,
                durability: 20,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFCrystalSword,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dimensional Blade',
                levelReq: 25,
                levelMonster: 37,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 35,
                strengthReq: 85,
                dexterityReq: 60,
                durability: 20,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFCrystalSword,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Phase Blade',
                levelReq: 54,
                levelMonster: 73,
                minDefense: null,
                maxDefense: null,
                minDamage: 31,
                maxDamage: 35,
                strengthReq: 25,
                dexterityReq: 136,
                durability: null,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFCrystalSword,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 34:
              _context.next = 36;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Broad Sword'
                }
              }, ['id']);

            case 36:
              itemFamilyFBroadSword = _context.sent;
              _context.next = 39;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Broad Sword',
                levelReq: null,
                levelMonster: 15,
                minDefense: null,
                maxDefense: null,
                minDamage: 7,
                maxDamage: 14,
                strengthReq: 48,
                dexterityReq: null,
                durability: 32,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFBroadSword,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Sword',
                levelReq: 25,
                levelMonster: 40,
                minDefense: null,
                maxDefense: null,
                minDamage: 16,
                maxDamage: 34,
                strengthReq: 92,
                dexterityReq: 43,
                durability: 32,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFBroadSword,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Conquest Sword',
                levelReq: 58,
                levelMonster: 78,
                minDefense: null,
                maxDefense: null,
                minDamage: 37,
                maxDamage: 56,
                strengthReq: 142,
                dexterityReq: 112,
                durability: 32,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFBroadSword,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 39:
              _context.next = 41;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Long Sword'
                }
              }, ['id']);

            case 41:
              itemFamilyFLongSword = _context.sent;
              _context.next = 44;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Long Sword',
                levelReq: null,
                levelMonster: 20,
                minDefense: null,
                maxDefense: null,
                minDamage: 3,
                maxDamage: 19,
                strengthReq: 48,
                dexterityReq: 39,
                durability: 44,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFLongSword,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Rune Sword',
                levelReq: 25,
                levelMonster: 44,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 42,
                strengthReq: 103,
                dexterityReq: 79,
                durability: 44,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFLongSword,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cryptic Sword',
                levelReq: 61,
                levelMonster: 82,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 77,
                strengthReq: 99,
                dexterityReq: 109,
                durability: 44,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFLongSword,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 44:
              _context.next = 46;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'War Sword'
                }
              }, ['id']);

            case 46:
              itemFamilyMythicalSword = _context.sent;
              _context.next = 49;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'War Sword',
                levelReq: null,
                levelMonster: 27,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 20,
                strengthReq: 71,
                dexterityReq: 45,
                durability: 44,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMythicalSword,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ancient Sword',
                levelReq: 25,
                levelMonster: 49,
                minDefense: null,
                maxDefense: null,
                minDamage: 18,
                maxDamage: 43,
                strengthReq: 127,
                dexterityReq: 88,
                durability: 44,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMythicalSword,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mythical Sword',
                levelReq: 66,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 40,
                maxDamage: 45,
                strengthReq: 147,
                dexterityReq: 124,
                durability: 44,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMythicalSword,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 49:
              _context.next = 51;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Two-handed Sword'
                }
              }, ['id']);

            case 51:
              itemFamilyTwohandedSword = _context.sent;
              _context.next = 54;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Two-handed Sword',
                levelReq: null,
                levelMonster: 10,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 17,
                strengthReq: 35,
                dexterityReq: 27,
                durability: 44,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyTwohandedSword,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Espandon',
                levelReq: 25,
                levelMonster: 37,
                minDefense: null,
                maxDefense: null,
                minDamage: 18,
                maxDamage: 40,
                strengthReq: 73,
                dexterityReq: 61,
                durability: 44,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyTwohandedSword,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Legend Sword',
                levelReq: 44,
                levelMonster: 59,
                minDefense: null,
                maxDefense: null,
                minDamage: 50,
                maxDamage: 94,
                strengthReq: 175,
                dexterityReq: 100,
                durability: 44,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyTwohandedSword,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 54:
              _context.next = 56;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Claymore'
                }
              }, ['id']);

            case 56:
              itemFamilyClaymore = _context.sent;
              _context.next = 59;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Claymore',
                levelReq: null,
                levelMonster: 17,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 30,
                strengthReq: 47,
                dexterityReq: null,
                durability: 50,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyClaymore,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dacian Falx',
                levelReq: 25,
                levelMonster: 42,
                minDefense: null,
                maxDefense: null,
                minDamage: 26,
                maxDamage: 61,
                strengthReq: 91,
                dexterityReq: 20,
                durability: 50,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyClaymore,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Highland Blade',
                levelReq: 49,
                levelMonster: 66,
                minDefense: null,
                maxDefense: null,
                minDamage: 67,
                maxDamage: 96,
                strengthReq: 171,
                dexterityReq: 104,
                durability: 50,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyClaymore,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 59:
              _context.next = 61;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Giant Sword'
                }
              }, ['id']);

            case 61:
              itemFamilyGiantSword = _context.sent;
              _context.next = 64;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Giant Sword',
                levelReq: null,
                levelMonster: 21,
                minDefense: null,
                maxDefense: null,
                minDamage: 9,
                maxDamage: 28,
                strengthReq: 56,
                dexterityReq: 34,
                durability: 50,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGiantSword,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tusk Sword',
                levelReq: 25,
                levelMonster: 45,
                minDefense: null,
                maxDefense: null,
                minDamage: 19,
                maxDamage: 58,
                strengthReq: 104,
                dexterityReq: 71,
                durability: 50,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGiantSword,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Balrog Blade',
                levelReq: 53,
                levelMonster: 71,
                minDefense: null,
                maxDefense: null,
                minDamage: 55,
                maxDamage: 118,
                strengthReq: 185,
                dexterityReq: 187,
                durability: 50,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGiantSword,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 64:
              _context.next = 66;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Bastard Sword'
                }
              }, ['id']);

            case 66:
              itemFamilyBastardSword = _context.sent;
              _context.next = 69;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Bastard Sword',
                levelReq: null,
                levelMonster: 24,
                minDefense: null,
                maxDefense: null,
                minDamage: 20,
                maxDamage: 28,
                strengthReq: 62,
                dexterityReq: null,
                durability: 40,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBastardSword,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Gothic Sword',
                levelReq: 25,
                levelMonster: 48,
                minDefense: null,
                maxDefense: null,
                minDamage: 39,
                maxDamage: 60,
                strengthReq: 113,
                dexterityReq: 20,
                durability: 40,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBastardSword,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Champion Sword',
                levelReq: 57,
                levelMonster: 77,
                minDefense: null,
                maxDefense: null,
                minDamage: 71,
                maxDamage: 83,
                strengthReq: 163,
                dexterityReq: 103,
                durability: 40,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBastardSword,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 69:
              _context.next = 71;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Flamberge'
                }
              }, ['id']);

            case 71:
              itemFamilyFlamberge = _context.sent;
              _context.next = 74;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Flamberge',
                levelReq: null,
                levelMonster: 27,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 26,
                strengthReq: 70,
                dexterityReq: 49,
                durability: 50,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFlamberge,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Zweihander',
                levelReq: 25,
                levelMonster: 48,
                minDefense: null,
                maxDefense: null,
                minDamage: 29,
                maxDamage: 54,
                strengthReq: 125,
                dexterityReq: 94,
                durability: 50,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFlamberge,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Colossus Sword',
                levelReq: 60,
                levelMonster: 80,
                minDefense: null,
                maxDefense: null,
                minDamage: 61,
                maxDamage: 121,
                strengthReq: 182,
                dexterityReq: 95,
                durability: 50,
                sockets: 5,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFlamberge,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 74:
              _context.next = 76;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Great Sword'
                }
              }, ['id']);

            case 76:
              itemFamilyGreatSword = _context.sent;
              _context.next = 79;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Great Sword',
                levelReq: null,
                levelMonster: 33,
                minDefense: null,
                maxDefense: null,
                minDamage: 25,
                maxDamage: 42,
                strengthReq: 100,
                dexterityReq: 60,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatSword,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Executioner Sword',
                levelReq: 25,
                levelMonster: 48,
                minDefense: null,
                maxDefense: null,
                minDamage: 47,
                maxDamage: 80,
                strengthReq: 170,
                dexterityReq: 110,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatSword,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Colossus Blade',
                levelReq: 63,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 58,
                maxDamage: 115,
                strengthReq: 189,
                dexterityReq: 110,
                durability: 50,
                sockets: 6,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatSword,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 79:
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