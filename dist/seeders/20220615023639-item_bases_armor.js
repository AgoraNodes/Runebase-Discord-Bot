"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyCap, itemFamilySkullCap, itemFamilyHelm, itemFamilyFullHelm, itemFamilyGreatHelm, itemFamilyMask, itemFamilyCrown, itemFamilyBoneHelm, itemFamilyQuilted, itemFamilyLeatherArmor, itemFamilyHardLeatherArmor, itemFamilyStuddedLeather, itemFamilyRingMail, itemFamilyScaleMail, itemFamilyBreastPlate, itemFamilyChainMail, itemFamilySplintMail, itemFamilyLightPlate, itemFamilyFieldPlate, itemFamilyPlateMail, itemFamilyGothicPlate, itemFamilyFullPlateMail, itemFamilyAncientArmor, itemFamilyBuckler, itemFamilySmallShield, itemFamilyLargeShield, itemFamilyKiteShield, itemFamilySpikedShield, itemFamilyTowerShield, itemFamilyBoneShield, itemFamilyGothicShield, itemFamilyLeatherGloves, itemFamilyHeavyGloves, itemFamilyChainGloves, itemFamilyLightGauntlets, itemFamilyGauntlets, itemFamilyBoots, itemFamilyHeavyBoots, itemFamilyChainBoots, itemFamilyLightPlatedBoots, itemFamilyGreaves, itemFamilySash, itemFamilyLightBelt, itemFamilyBelt, itemFamilyHeavyBelt, itemFamilyPlatedBelt;
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
                  name: 'Cap'
                }
              }, ['id']);

            case 11:
              itemFamilyCap = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Cap',
                levelReq: null,
                levelMonster: 1,
                minDefense: 3,
                maxDefense: 5,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: 12,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCap,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Hat',
                levelReq: 22,
                levelMonster: 34,
                minDefense: 45,
                maxDefense: 53,
                minDamage: null,
                maxDamage: null,
                strengthReq: 20,
                dexterityReq: null,
                durability: 12,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCap,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shako',
                levelReq: 43,
                levelMonster: 58,
                minDefense: 98,
                maxDefense: 141,
                minDamage: null,
                maxDamage: null,
                strengthReq: 50,
                dexterityReq: null,
                durability: 12,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCap,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Skull Cap'
                }
              }, ['id']);

            case 16:
              itemFamilySkullCap = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Skull Cap',
                levelReq: null,
                levelMonster: 5,
                minDefense: 8,
                maxDefense: 11,
                minDamage: null,
                maxDamage: null,
                strengthReq: 15,
                dexterityReq: null,
                durability: 18,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySkullCap,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sallet',
                levelReq: 25,
                levelMonster: 37,
                minDefense: 52,
                maxDefense: 62,
                minDamage: null,
                maxDamage: null,
                strengthReq: 43,
                dexterityReq: null,
                durability: 18,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySkullCap,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hydraskull',
                levelReq: 47,
                levelMonster: 63,
                minDefense: 101,
                maxDefense: 145,
                minDamage: null,
                maxDamage: null,
                strengthReq: 84,
                dexterityReq: null,
                durability: 18,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySkullCap,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Helm'
                }
              }, ['id']);

            case 21:
              itemFamilyHelm = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Helm',
                levelReq: null,
                levelMonster: 11,
                minDefense: 15,
                maxDefense: 18,
                minDamage: null,
                maxDamage: null,
                strengthReq: 26,
                dexterityReq: null,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHelm,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Casque',
                levelReq: 25,
                levelMonster: 42,
                minDefense: 63,
                maxDefense: 72,
                minDamage: null,
                maxDamage: null,
                strengthReq: 59,
                dexterityReq: null,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHelm,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Armet',
                levelReq: 51,
                levelMonster: 68,
                minDefense: 105,
                maxDefense: 149,
                minDamage: null,
                maxDamage: null,
                strengthReq: 109,
                dexterityReq: null,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHelm,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Full Helm'
                }
              }, ['id']);

            case 26:
              itemFamilyFullHelm = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Full Helm',
                levelReq: null,
                levelMonster: 15,
                minDefense: 23,
                maxDefense: 26,
                minDamage: null,
                maxDamage: null,
                strengthReq: 41,
                dexterityReq: null,
                durability: 30,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFullHelm,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Basinet',
                levelReq: 25,
                levelMonster: 45,
                minDefense: 75,
                maxDefense: 84,
                minDamage: null,
                maxDamage: null,
                strengthReq: 82,
                dexterityReq: null,
                durability: 30,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFullHelm,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Giant Conch',
                levelReq: 40,
                levelMonster: 54,
                minDefense: 110,
                maxDefense: 154,
                minDamage: null,
                maxDamage: null,
                strengthReq: 142,
                dexterityReq: null,
                durability: 30,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFullHelm,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Great Helm'
                }
              }, ['id']);

            case 31:
              itemFamilyGreatHelm = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Great Helm',
                levelReq: null,
                levelMonster: 23,
                minDefense: 30,
                maxDefense: 35,
                minDamage: null,
                maxDamage: null,
                strengthReq: 63,
                dexterityReq: null,
                durability: 40,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatHelm,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Winged Helm',
                levelReq: 25,
                levelMonster: 51,
                minDefense: 85,
                maxDefense: 98,
                minDamage: null,
                maxDamage: null,
                strengthReq: 115,
                dexterityReq: null,
                durability: 40,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatHelm,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Spired Helm',
                levelReq: 59,
                levelMonster: 79,
                minDefense: 114,
                maxDefense: 159,
                minDamage: null,
                maxDamage: null,
                strengthReq: 192,
                dexterityReq: null,
                durability: 40,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreatHelm,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 34:
              _context.next = 36;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Mask'
                }
              }, ['id']);

            case 36:
              itemFamilyMask = _context.sent;
              _context.next = 39;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Mask',
                levelReq: null,
                levelMonster: 19,
                minDefense: 9,
                maxDefense: 27,
                minDamage: null,
                maxDamage: null,
                strengthReq: 23,
                dexterityReq: null,
                durability: 20,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMask,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Death Mask',
                levelReq: 25,
                levelMonster: 48,
                minDefense: 54,
                maxDefense: 86,
                minDamage: null,
                maxDamage: null,
                strengthReq: 55,
                dexterityReq: null,
                durability: 20,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMask,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Demonhead',
                levelReq: 55,
                levelMonster: 74,
                minDefense: 101,
                maxDefense: 154,
                minDamage: null,
                maxDamage: null,
                strengthReq: 102,
                dexterityReq: null,
                durability: 20,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyMask,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 39:
              _context.next = 41;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Crown'
                }
              }, ['id']);

            case 41:
              itemFamilyCrown = _context.sent;
              _context.next = 44;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Crown',
                levelReq: null,
                levelMonster: 29,
                minDefense: 25,
                maxDefense: 45,
                minDamage: null,
                maxDamage: null,
                strengthReq: 55,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCrown,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Grand Crown',
                levelReq: 25,
                levelMonster: 55,
                minDefense: 78,
                maxDefense: 113,
                minDamage: null,
                maxDamage: null,
                strengthReq: 103,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCrown,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Corona',
                levelReq: 66,
                levelMonster: 85,
                minDefense: 111,
                maxDefense: 165,
                minDamage: null,
                maxDamage: null,
                strengthReq: 174,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCrown,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 44:
              _context.next = 46;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Bone Helm'
                }
              }, ['id']);

            case 46:
              itemFamilyBoneHelm = _context.sent;
              _context.next = 49;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Bone Helm',
                levelReq: null,
                levelMonster: 22,
                minDefense: 33,
                maxDefense: 36,
                minDamage: null,
                maxDamage: null,
                strengthReq: 25,
                dexterityReq: null,
                durability: 40,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBoneHelm,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Grim Helm',
                levelReq: 25,
                levelMonster: 50,
                minDefense: 60,
                maxDefense: 125,
                minDamage: null,
                maxDamage: null,
                strengthReq: 58,
                dexterityReq: null,
                durability: 40,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBoneHelm,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bone Visage',
                levelReq: 63,
                levelMonster: 84,
                minDefense: 100,
                maxDefense: 157,
                minDamage: null,
                maxDamage: null,
                strengthReq: 106,
                dexterityReq: null,
                durability: 40,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBoneHelm,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 49:
              _context.next = 51;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Quilted Armor'
                }
              }, ['id']);

            case 51:
              itemFamilyQuilted = _context.sent;
              _context.next = 54;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Quilted Armor',
                levelReq: null,
                levelMonster: 1,
                minDefense: 8,
                maxDefense: 11,
                minDamage: null,
                maxDamage: null,
                strengthReq: 12,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyQuilted,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ghost Armor',
                levelReq: 22,
                levelMonster: 34,
                minDefense: 102,
                maxDefense: 117,
                minDamage: null,
                maxDamage: null,
                strengthReq: 38,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyQuilted,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dusk Shroud',
                levelReq: 49,
                levelMonster: 65,
                minDefense: 361,
                maxDefense: 467,
                minDamage: null,
                maxDamage: null,
                strengthReq: 77,
                dexterityReq: null,
                durability: 20,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyQuilted,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 54:
              _context.next = 56;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Leather Armor'
                }
              }, ['id']);

            case 56:
              itemFamilyLeatherArmor = _context.sent;
              _context.next = 59;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Leather Armor',
                levelReq: null,
                levelMonster: 3,
                minDefense: 14,
                maxDefense: 17,
                minDamage: null,
                maxDamage: null,
                strengthReq: 15,
                dexterityReq: null,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLeatherArmor,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Serpentskin Armor',
                levelReq: 24,
                levelMonster: 36,
                minDefense: 111,
                maxDefense: 126,
                minDamage: null,
                maxDamage: null,
                strengthReq: 43,
                dexterityReq: null,
                durability: 24,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLeatherArmor,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Wyrmhide',
                levelReq: 50,
                levelMonster: 67,
                minDefense: 364,
                maxDefense: 470,
                minDamage: null,
                maxDamage: null,
                strengthReq: 84,
                dexterityReq: null,
                durability: 24,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLeatherArmor,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 59:
              _context.next = 61;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Hard Leather Armor'
                }
              }, ['id']);

            case 61:
              itemFamilyHardLeatherArmor = _context.sent;
              _context.next = 64;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Hard Leather Armor',
                levelReq: null,
                levelMonster: 5,
                minDefense: 21,
                maxDefense: 24,
                minDamage: null,
                maxDamage: null,
                strengthReq: 20,
                dexterityReq: null,
                durability: 28,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHardLeatherArmor,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Demonhide Armor',
                levelReq: 25,
                levelMonster: 37,
                minDefense: 122,
                maxDefense: 136,
                minDamage: null,
                maxDamage: null,
                strengthReq: 50,
                dexterityReq: null,
                durability: 28,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHardLeatherArmor,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Scarab Husk',
                levelReq: 51,
                levelMonster: 68,
                minDefense: 369,
                maxDefense: 474,
                minDamage: null,
                maxDamage: null,
                strengthReq: 95,
                dexterityReq: null,
                durability: 24,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHardLeatherArmor,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 64:
              _context.next = 66;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Studded Leather'
                }
              }, ['id']);

            case 66:
              itemFamilyStuddedLeather = _context.sent;
              _context.next = 69;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Studded Leather',
                levelReq: null,
                levelMonster: 8,
                minDefense: 32,
                maxDefense: 35,
                minDamage: null,
                maxDamage: null,
                strengthReq: 27,
                dexterityReq: null,
                durability: 32,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyStuddedLeather,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Trellised Armor',
                levelReq: 25,
                levelMonster: 40,
                minDefense: 138,
                maxDefense: 153,
                minDamage: null,
                maxDamage: null,
                strengthReq: 61,
                dexterityReq: null,
                durability: 32,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyStuddedLeather,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Wire Fleece',
                levelReq: 53,
                levelMonster: 70,
                minDefense: 375,
                maxDefense: 481,
                minDamage: null,
                maxDamage: null,
                strengthReq: 53,
                dexterityReq: null,
                durability: 32,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyStuddedLeather,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 69:
              _context.next = 71;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Ring Mail'
                }
              }, ['id']);

            case 71:
              itemFamilyRingMail = _context.sent;
              _context.next = 74;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Ring Mail',
                levelReq: null,
                levelMonster: 11,
                minDefense: 45,
                maxDefense: 48,
                minDamage: null,
                maxDamage: null,
                strengthReq: 38,
                dexterityReq: null,
                durability: 26,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRingMail,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Linked Mail',
                levelReq: 25,
                levelMonster: 42,
                minDefense: 158,
                maxDefense: 172,
                minDamage: null,
                maxDamage: null,
                strengthReq: 74,
                dexterityReq: null,
                durability: 26,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRingMail,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Diamond Mail',
                levelReq: 54,
                levelMonster: 72,
                minDefense: 383,
                maxDefense: 489,
                minDamage: null,
                maxDamage: null,
                strengthReq: 54,
                dexterityReq: null,
                durability: 26,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRingMail,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 74:
              _context.next = 76;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Scale Mail'
                }
              }, ['id']);

            case 76:
              itemFamilyScaleMail = _context.sent;
              _context.next = 79;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Scale Mail',
                levelReq: null,
                levelMonster: 13,
                minDefense: 57,
                maxDefense: 60,
                minDamage: null,
                maxDamage: null,
                strengthReq: 44,
                dexterityReq: null,
                durability: 36,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScaleMail,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tigulated Mail',
                levelReq: 25,
                levelMonster: 43,
                minDefense: 176,
                maxDefense: 190,
                minDamage: null,
                maxDamage: null,
                strengthReq: 86,
                dexterityReq: null,
                durability: 36,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScaleMail,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Loricated Mail',
                levelReq: 55,
                levelMonster: 73,
                minDefense: 390,
                maxDefense: 496,
                minDamage: null,
                maxDamage: null,
                strengthReq: 55,
                dexterityReq: null,
                durability: 36,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyScaleMail,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 79:
              _context.next = 81;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Breast Plate'
                }
              }, ['id']);

            case 81:
              itemFamilyBreastPlate = _context.sent;
              _context.next = 84;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Breast Plate',
                levelReq: null,
                levelMonster: 18,
                minDefense: 65,
                maxDefense: 68,
                minDamage: null,
                maxDamage: null,
                strengthReq: 30,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBreastPlate,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cuirass',
                levelReq: 25,
                levelMonster: 47,
                minDefense: 188,
                maxDefense: 202,
                minDamage: null,
                maxDamage: null,
                strengthReq: 65,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBreastPlate,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Great Hauberk',
                levelReq: 56,
                levelMonster: 75,
                minDefense: 395,
                maxDefense: 501,
                minDamage: null,
                maxDamage: null,
                strengthReq: 118,
                dexterityReq: null,
                durability: 50,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBreastPlate,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 84:
              _context.next = 86;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Chain Mail'
                }
              }, ['id']);

            case 86:
              itemFamilyChainMail = _context.sent;
              _context.next = 89;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Chain Mail',
                levelReq: null,
                levelMonster: 15,
                minDefense: 72,
                maxDefense: 75,
                minDamage: null,
                maxDamage: null,
                strengthReq: 48,
                dexterityReq: null,
                durability: 45,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyChainMail,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mesh Armor',
                levelReq: 25,
                levelMonster: 45,
                minDefense: 198,
                maxDefense: 213,
                minDamage: null,
                maxDamage: null,
                strengthReq: 92,
                dexterityReq: null,
                durability: 45,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyChainMail,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Boneweave',
                levelReq: 57,
                levelMonster: 62,
                minDefense: 399,
                maxDefense: 505,
                minDamage: null,
                maxDamage: null,
                strengthReq: 158,
                dexterityReq: null,
                durability: 45,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyChainMail,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 89:
              _context.next = 91;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Splint Mail'
                }
              }, ['id']);

            case 91:
              itemFamilySplintMail = _context.sent;
              _context.next = 94;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Splint Mail',
                levelReq: null,
                levelMonster: 20,
                minDefense: 90,
                maxDefense: 95,
                minDamage: null,
                maxDamage: null,
                strengthReq: 51,
                dexterityReq: null,
                durability: 30,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySplintMail,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Russet Armor',
                levelReq: 25,
                levelMonster: 49,
                minDefense: 225,
                maxDefense: 243,
                minDamage: null,
                maxDamage: null,
                strengthReq: 97,
                dexterityReq: null,
                durability: 30,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySplintMail,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Balrog Skin',
                levelReq: 57,
                levelMonster: 76,
                minDefense: 410,
                maxDefense: 517,
                minDamage: null,
                maxDamage: null,
                strengthReq: 165,
                dexterityReq: null,
                durability: 30,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySplintMail,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 94:
              _context.next = 96;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Light Plate'
                }
              }, ['id']);

            case 96:
              itemFamilyLightPlate = _context.sent;
              _context.next = 99;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Light Plate',
                levelReq: null,
                levelMonster: 35,
                minDefense: 90,
                maxDefense: 107,
                minDamage: null,
                maxDamage: null,
                strengthReq: 41,
                dexterityReq: null,
                durability: 60,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightPlate,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mage Plate',
                levelReq: 25,
                levelMonster: 60,
                minDefense: 225,
                maxDefense: 261,
                minDamage: null,
                maxDamage: null,
                strengthReq: 55,
                dexterityReq: null,
                durability: 60,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightPlate,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Archon Plate',
                levelReq: 63,
                levelMonster: 84,
                minDefense: 410,
                maxDefense: 524,
                minDamage: null,
                maxDamage: null,
                strengthReq: 103,
                dexterityReq: null,
                durability: 60,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightPlate,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 99:
              _context.next = 101;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Field Plate'
                }
              }, ['id']);

            case 101:
              itemFamilyFieldPlate = _context.sent;
              _context.next = 104;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Field Plate',
                levelReq: null,
                levelMonster: 28,
                minDefense: 101,
                maxDefense: 105,
                minDamage: null,
                maxDamage: null,
                strengthReq: 55,
                dexterityReq: null,
                durability: 48,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFieldPlate,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sharktooth Armor',
                levelReq: 25,
                levelMonster: 55,
                minDefense: 242,
                maxDefense: 258,
                minDamage: null,
                maxDamage: null,
                strengthReq: 103,
                dexterityReq: null,
                durability: 48,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFieldPlate,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Kraken Shell',
                levelReq: 61,
                levelMonster: 81,
                minDefense: 417,
                maxDefense: 523,
                minDamage: null,
                maxDamage: null,
                strengthReq: 173,
                dexterityReq: null,
                durability: 48,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFieldPlate,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 104:
              _context.next = 106;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Plate Mail'
                }
              }, ['id']);

            case 106:
              itemFamilyPlateMail = _context.sent;
              _context.next = 109;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Plate Mail',
                levelReq: null,
                levelMonster: 24,
                minDefense: 108,
                maxDefense: 116,
                minDamage: null,
                maxDamage: null,
                strengthReq: 65,
                dexterityReq: null,
                durability: 60,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyPlateMail,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Templar Coat',
                levelReq: 25,
                levelMonster: 52,
                minDefense: 252,
                maxDefense: 274,
                minDamage: null,
                maxDamage: null,
                strengthReq: 118,
                dexterityReq: null,
                durability: 60,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyPlateMail,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hellforge Plate',
                levelReq: 59,
                levelMonster: 78,
                minDefense: 421,
                maxDefense: 530,
                minDamage: null,
                maxDamage: null,
                strengthReq: 196,
                dexterityReq: null,
                durability: 60,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyPlateMail,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 109:
              _context.next = 111;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Gothic Plate'
                }
              }, ['id']);

            case 111:
              itemFamilyGothicPlate = _context.sent;
              _context.next = 114;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Gothic Plate',
                levelReq: null,
                levelMonster: 32,
                minDefense: 128,
                maxDefense: 135,
                minDamage: null,
                maxDamage: null,
                strengthReq: 70,
                dexterityReq: null,
                durability: 55,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGothicPlate,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Embossed Plate',
                levelReq: 25,
                levelMonster: 58,
                minDefense: 282,
                maxDefense: 303,
                minDamage: null,
                maxDamage: null,
                strengthReq: 125,
                dexterityReq: null,
                durability: 55,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGothicPlate,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lacquered Plate',
                levelReq: 62,
                levelMonster: 82,
                minDefense: 433,
                maxDefense: 541,
                minDamage: null,
                maxDamage: null,
                strengthReq: 208,
                dexterityReq: null,
                durability: 55,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGothicPlate,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 114:
              _context.next = 116;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Full Plate Mail'
                }
              }, ['id']);

            case 116:
              itemFamilyFullPlateMail = _context.sent;
              _context.next = 119;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Full Plate Mail',
                levelReq: null,
                levelMonster: 37,
                minDefense: 150,
                maxDefense: 161,
                minDamage: null,
                maxDamage: null,
                strengthReq: 80,
                dexterityReq: null,
                durability: 70,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFullPlateMail,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Chaos Armor',
                levelReq: 25,
                levelMonster: 61,
                minDefense: 315,
                maxDefense: 342,
                minDamage: null,
                maxDamage: null,
                strengthReq: 140,
                dexterityReq: null,
                durability: 70,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFullPlateMail,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Shadow Plate',
                levelReq: 64,
                levelMonster: 83,
                minDefense: 446,
                maxDefense: 557,
                minDamage: null,
                maxDamage: null,
                strengthReq: 230,
                dexterityReq: null,
                durability: 70,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFullPlateMail,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 119:
              _context.next = 121;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Ancient Armor'
                }
              }, ['id']);

            case 121:
              itemFamilyAncientArmor = _context.sent;
              _context.next = 124;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Sacred Armor',
                levelReq: null,
                levelMonster: 40,
                minDefense: 218,
                maxDefense: 223,
                minDamage: null,
                maxDamage: null,
                strengthReq: 100,
                dexterityReq: null,
                durability: 60,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAncientArmor,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ornate Plate',
                levelReq: 25,
                levelMonster: 64,
                minDefense: 417,
                maxDefense: 450,
                minDamage: null,
                maxDamage: null,
                strengthReq: 170,
                dexterityReq: null,
                durability: 60,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAncientArmor,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sacred Armor',
                levelReq: 66,
                levelMonster: 85,
                minDefense: 487,
                maxDefense: 600,
                minDamage: null,
                maxDamage: null,
                strengthReq: 232,
                dexterityReq: null,
                durability: 60,
                sockets: 4,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAncientArmor,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 124:
              _context.next = 126;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Buckler'
                }
              }, ['id']);

            case 126:
              itemFamilyBuckler = _context.sent;
              _context.next = 129;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Buckler',
                levelReq: null,
                levelMonster: 1,
                minDefense: 4,
                maxDefense: 6,
                minDamage: 1,
                maxDamage: 3,
                strengthReq: 12,
                dexterityReq: null,
                durability: 14,
                sockets: 1,
                block: 30,
                maxStack: null,
                itemFamilyId: itemFamilyBuckler,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Defender',
                levelReq: 22,
                levelMonster: 34,
                minDefense: 41,
                maxDefense: 49,
                minDamage: 8,
                maxDamage: 12,
                strengthReq: 38,
                dexterityReq: null,
                durability: 60,
                sockets: 1,
                block: 40,
                maxStack: null,
                itemFamilyId: itemFamilyBuckler,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Heater',
                levelReq: 43,
                levelMonster: 58,
                minDefense: 95,
                maxDefense: 110,
                minDamage: 16,
                maxDamage: 30,
                strengthReq: 77,
                dexterityReq: null,
                durability: 88,
                sockets: 2,
                block: 52,
                maxStack: null,
                itemFamilyId: itemFamilyBuckler,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 129:
              _context.next = 131;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Small Shield'
                }
              }, ['id']);

            case 131:
              itemFamilySmallShield = _context.sent;
              _context.next = 134;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Small Shield',
                levelReq: null,
                levelMonster: 5,
                minDefense: 8,
                maxDefense: 10,
                minDamage: 2,
                maxDamage: 3,
                strengthReq: 22,
                dexterityReq: null,
                durability: 16,
                sockets: 2,
                block: 35,
                maxStack: null,
                itemFamilyId: itemFamilySmallShield,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Round Shield',
                levelReq: 25,
                levelMonster: 37,
                minDefense: 47,
                maxDefense: 55,
                minDamage: 7,
                maxDamage: 14,
                strengthReq: 53,
                dexterityReq: null,
                durability: 64,
                sockets: 2,
                block: 42,
                maxStack: null,
                itemFamilyId: itemFamilySmallShield,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Luna',
                levelReq: 45,
                levelMonster: 61,
                minDefense: 108,
                maxDefense: 123,
                minDamage: 17,
                maxDamage: 29,
                strengthReq: 100,
                dexterityReq: null,
                durability: 84,
                sockets: 2,
                block: 50,
                maxStack: null,
                itemFamilyId: itemFamilySmallShield,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 134:
              _context.next = 136;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Large Shield'
                }
              }, ['id']);

            case 136:
              itemFamilyLargeShield = _context.sent;
              _context.next = 139;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Large Shield',
                levelReq: null,
                levelMonster: 11,
                minDefense: 12,
                maxDefense: 14,
                minDamage: 2,
                maxDamage: 4,
                strengthReq: 34,
                dexterityReq: null,
                durability: 24,
                sockets: 3,
                block: 42,
                maxStack: null,
                itemFamilyId: itemFamilyLargeShield,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Scutum',
                levelReq: 25,
                levelMonster: 42,
                minDefense: 53,
                maxDefense: 61,
                minDamage: 11,
                maxDamage: 15,
                strengthReq: 71,
                dexterityReq: null,
                durability: 62,
                sockets: 3,
                block: 44,
                maxStack: null,
                itemFamilyId: itemFamilyLargeShield,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Hyperion',
                levelReq: 48,
                levelMonster: 64,
                minDefense: 119,
                maxDefense: 135,
                minDamage: 14,
                maxDamage: 32,
                strengthReq: 127,
                dexterityReq: null,
                durability: 82,
                sockets: 3,
                block: 54,
                maxStack: null,
                itemFamilyId: itemFamilyLargeShield,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 139:
              _context.next = 141;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Kite Shield'
                }
              }, ['id']);

            case 141:
              itemFamilyKiteShield = _context.sent;
              _context.next = 144;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Kite Shield',
                levelReq: null,
                levelMonster: 15,
                minDefense: 16,
                maxDefense: 18,
                minDamage: 2,
                maxDamage: 5,
                strengthReq: 47,
                dexterityReq: null,
                durability: 30,
                sockets: 3,
                block: 38,
                maxStack: null,
                itemFamilyId: itemFamilyKiteShield,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dragon Shield',
                levelReq: 25,
                levelMonster: 45,
                minDefense: 59,
                maxDefense: 67,
                minDamage: 15,
                maxDamage: 24,
                strengthReq: 91,
                dexterityReq: null,
                durability: 76,
                sockets: 3,
                block: 48,
                maxStack: null,
                itemFamilyId: itemFamilyKiteShield,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Monarch',
                levelReq: 54,
                levelMonster: 72,
                minDefense: 133,
                maxDefense: 148,
                minDamage: 12,
                maxDamage: 34,
                strengthReq: 156,
                dexterityReq: null,
                durability: 86,
                sockets: 4,
                block: 52,
                maxStack: null,
                itemFamilyId: itemFamilyKiteShield,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 144:
              _context.next = 146;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Spiked Shield'
                }
              }, ['id']);

            case 146:
              itemFamilySpikedShield = _context.sent;
              _context.next = 149;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Spiked Shield',
                levelReq: null,
                levelMonster: 11,
                minDefense: 15,
                maxDefense: 25,
                minDamage: 5,
                maxDamage: 9,
                strengthReq: 30,
                dexterityReq: null,
                durability: 40,
                sockets: 2,
                block: 40,
                maxStack: null,
                itemFamilyId: itemFamilySpikedShield,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Barbed Shield',
                levelReq: 25,
                levelMonster: 42,
                minDefense: 58,
                maxDefense: 78,
                minDamage: 18,
                maxDamage: 35,
                strengthReq: 65,
                dexterityReq: null,
                durability: 55,
                sockets: 2,
                block: 47,
                maxStack: null,
                itemFamilyId: itemFamilySpikedShield,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Blade Barrier',
                levelReq: 51,
                levelMonster: 68,
                minDefense: 147,
                maxDefense: 163,
                minDamage: 26,
                maxDamage: 40,
                strengthReq: 118,
                dexterityReq: null,
                durability: 83,
                sockets: 3,
                block: 50,
                maxStack: null,
                itemFamilyId: itemFamilySpikedShield,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 149:
              _context.next = 151;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Tower Shield'
                }
              }, ['id']);

            case 151:
              itemFamilyTowerShield = _context.sent;
              _context.next = 154;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Tower Shield',
                levelReq: null,
                levelMonster: 22,
                minDefense: 22,
                maxDefense: 25,
                minDamage: 1,
                maxDamage: 5,
                strengthReq: 75,
                dexterityReq: null,
                durability: 60,
                sockets: 3,
                block: 54,
                maxStack: null,
                itemFamilyId: itemFamilyTowerShield,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Pavise',
                levelReq: 25,
                levelMonster: 50,
                minDefense: 68,
                maxDefense: 78,
                minDamage: 10,
                maxDamage: 17,
                strengthReq: 133,
                dexterityReq: null,
                durability: 72,
                sockets: 3,
                block: 54,
                maxStack: null,
                itemFamilyId: itemFamilyTowerShield,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Aegis',
                levelReq: 59,
                levelMonster: 79,
                minDefense: 145,
                maxDefense: 161,
                minDamage: 18,
                maxDamage: 28,
                strengthReq: 219,
                dexterityReq: null,
                durability: 92,
                sockets: 4,
                block: 54,
                maxStack: null,
                itemFamilyId: itemFamilyTowerShield,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 154:
              _context.next = 156;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Bone Shield'
                }
              }, ['id']);

            case 156:
              itemFamilyBoneShield = _context.sent;
              _context.next = 159;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Bone Shield',
                levelReq: null,
                levelMonster: 19,
                minDefense: 10,
                maxDefense: 30,
                minDamage: 3,
                maxDamage: 6,
                strengthReq: 25,
                dexterityReq: null,
                durability: 40,
                sockets: 2,
                block: 50,
                maxStack: null,
                itemFamilyId: itemFamilyBoneShield,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Grim Shield',
                levelReq: 25,
                levelMonster: 48,
                minDefense: 50,
                maxDefense: 150,
                minDamage: 14,
                maxDamage: 20,
                strengthReq: 58,
                dexterityReq: null,
                durability: 70,
                sockets: 2,
                block: 50,
                maxStack: null,
                itemFamilyId: itemFamilyBoneShield,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Troll Nest',
                levelReq: 57,
                levelMonster: 76,
                minDefense: 158,
                maxDefense: 173,
                minDamage: 24,
                maxDamage: 38,
                strengthReq: 106,
                dexterityReq: null,
                durability: 74,
                sockets: 3,
                block: 50,
                maxStack: null,
                itemFamilyId: itemFamilyBoneShield,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 159:
              _context.next = 161;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Gothic Shield'
                }
              }, ['id']);

            case 161:
              itemFamilyGothicShield = _context.sent;
              _context.next = 164;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Gothic Shield',
                levelReq: null,
                levelMonster: 30,
                minDefense: 30,
                maxDefense: 35,
                minDamage: 2,
                maxDamage: 6,
                strengthReq: 60,
                dexterityReq: null,
                durability: 40,
                sockets: 3,
                block: 46,
                maxStack: null,
                itemFamilyId: itemFamilyGothicShield,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ancient Shield',
                levelReq: 25,
                levelMonster: 56,
                minDefense: 80,
                maxDefense: 93,
                minDamage: 12,
                maxDamage: 16,
                strengthReq: 110,
                dexterityReq: null,
                durability: 80,
                sockets: 3,
                block: 46,
                maxStack: null,
                itemFamilyId: itemFamilyGothicShield,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ward',
                levelReq: 63,
                levelMonster: 84,
                minDefense: 153,
                maxDefense: 170,
                minDamage: 11,
                maxDamage: 35,
                strengthReq: 185,
                dexterityReq: null,
                durability: 100,
                sockets: 4,
                block: 54,
                maxStack: null,
                itemFamilyId: itemFamilyGothicShield,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 164:
              _context.next = 166;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Leather Gloves'
                }
              }, ['id']);

            case 166:
              itemFamilyLeatherGloves = _context.sent;
              _context.next = 169;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Leather Gloves',
                levelReq: null,
                levelMonster: 3,
                minDefense: 2,
                maxDefense: 3,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLeatherGloves,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Demonhide Gloves',
                levelReq: 21,
                levelMonster: 33,
                minDefense: 28,
                maxDefense: 35,
                minDamage: null,
                maxDamage: null,
                strengthReq: 20,
                dexterityReq: null,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLeatherGloves,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bramble Mitts',
                levelReq: 42,
                levelMonster: 57,
                minDefense: 54,
                maxDefense: 62,
                minDamage: null,
                maxDamage: null,
                strengthReq: 50,
                dexterityReq: null,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLeatherGloves,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 169:
              _context.next = 171;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Heavy Gloves'
                }
              }, ['id']);

            case 171:
              itemFamilyHeavyGloves = _context.sent;
              _context.next = 174;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Heavy Gloves',
                levelReq: null,
                levelMonster: 7,
                minDefense: 5,
                maxDefense: 6,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: 14,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHeavyGloves,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sharkskin Gloves',
                levelReq: 25,
                levelMonster: 39,
                minDefense: 23,
                maxDefense: 39,
                minDamage: null,
                maxDamage: null,
                strengthReq: 20,
                dexterityReq: null,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHeavyGloves,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Vampirebone Gloves',
                levelReq: 47,
                levelMonster: 63,
                minDefense: 56,
                maxDefense: 65,
                minDamage: null,
                maxDamage: null,
                strengthReq: 47,
                dexterityReq: null,
                durability: 14,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHeavyGloves,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 174:
              _context.next = 176;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Chain Gloves'
                }
              }, ['id']);

            case 176:
              itemFamilyChainGloves = _context.sent;
              _context.next = 179;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Chain Gloves',
                levelReq: null,
                levelMonster: 12,
                minDefense: 8,
                maxDefense: 9,
                minDamage: null,
                maxDamage: null,
                strengthReq: 25,
                dexterityReq: null,
                durability: 16,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyChainGloves,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Heavy Bracers',
                levelReq: 25,
                levelMonster: 49,
                minDefense: 37,
                maxDefense: 44,
                minDamage: null,
                maxDamage: null,
                strengthReq: 58,
                dexterityReq: null,
                durability: 16,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyChainGloves,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Vambraces',
                levelReq: 51,
                levelMonster: 69,
                minDefense: 59,
                maxDefense: 67,
                minDamage: null,
                maxDamage: null,
                strengthReq: 106,
                dexterityReq: null,
                durability: 16,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyChainGloves,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 179:
              _context.next = 181;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Light Gauntlets'
                }
              }, ['id']);

            case 181:
              itemFamilyLightGauntlets = _context.sent;
              _context.next = 184;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Light Gauntlets',
                levelReq: null,
                levelMonster: 20,
                minDefense: 9,
                maxDefense: 11,
                minDamage: null,
                maxDamage: null,
                strengthReq: 45,
                dexterityReq: null,
                durability: 18,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightGauntlets,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Gauntlets',
                levelReq: 25,
                levelMonster: 49,
                minDefense: 39,
                maxDefense: 47,
                minDamage: null,
                maxDamage: null,
                strengthReq: 88,
                dexterityReq: null,
                durability: 18,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightGauntlets,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Crusader Gauntlets',
                levelReq: 57,
                levelMonster: 76,
                minDefense: 59,
                maxDefense: 68,
                minDamage: null,
                maxDamage: null,
                strengthReq: 151,
                dexterityReq: null,
                durability: 18,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightGauntlets,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 184:
              _context.next = 186;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Gauntlets'
                }
              }, ['id']);

            case 186:
              itemFamilyGauntlets = _context.sent;
              _context.next = 189;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Gauntlets',
                levelReq: null,
                levelMonster: 27,
                minDefense: 12,
                maxDefense: 15,
                minDamage: null,
                maxDamage: null,
                strengthReq: 60,
                dexterityReq: null,
                durability: 24,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGauntlets,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Gauntlets',
                levelReq: 25,
                levelMonster: 54,
                minDefense: 43,
                maxDefense: 53,
                minDamage: null,
                maxDamage: null,
                strengthReq: 110,
                dexterityReq: null,
                durability: 24,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGauntlets,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Ogre Gauntlets',
                levelReq: 64,
                levelMonster: 85,
                minDefense: 62,
                maxDefense: 71,
                minDamage: null,
                maxDamage: null,
                strengthReq: 185,
                dexterityReq: null,
                durability: 24,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGauntlets,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 189:
              _context.next = 191;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Boots'
                }
              }, ['id']);

            case 191:
              itemFamilyBoots = _context.sent;
              _context.next = 194;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Boots',
                levelReq: null,
                levelMonster: 3,
                minDefense: 2,
                maxDefense: 3,
                minDamage: 3,
                maxDamage: 8,
                strengthReq: null,
                dexterityReq: null,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBoots,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Demonhide Boots',
                levelReq: 24,
                levelMonster: 36,
                minDefense: 28,
                maxDefense: 35,
                minDamage: 24,
                maxDamage: 46,
                strengthReq: 20,
                dexterityReq: null,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBoots,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Wyrmhide Boots',
                levelReq: 45,
                levelMonster: 60,
                minDefense: 54,
                maxDefense: 62,
                minDamage: 65,
                maxDamage: 100,
                strengthReq: 50,
                dexterityReq: null,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBoots,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 194:
              _context.next = 196;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Heavy Boots'
                }
              }, ['id']);

            case 196:
              itemFamilyHeavyBoots = _context.sent;
              _context.next = 199;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Heavy Boots',
                levelReq: null,
                levelMonster: 7,
                minDefense: 5,
                maxDefense: 6,
                minDamage: 4,
                maxDamage: 10,
                strengthReq: 18,
                dexterityReq: null,
                durability: 14,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHeavyBoots,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sharkskin Boots',
                levelReq: 25,
                levelMonster: 39,
                minDefense: 33,
                maxDefense: 39,
                minDamage: 28,
                maxDamage: 50,
                strengthReq: 47,
                dexterityReq: null,
                durability: 14,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHeavyBoots,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Scarabshell Boots',
                levelReq: 49,
                levelMonster: 66,
                minDefense: 56,
                maxDefense: 65,
                minDamage: 60,
                maxDamage: 110,
                strengthReq: 91,
                dexterityReq: null,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHeavyBoots,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 199:
              _context.next = 201;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Chain Boots'
                }
              }, ['id']);

            case 201:
              itemFamilyChainBoots = _context.sent;
              _context.next = 204;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Chain Boots',
                levelReq: null,
                levelMonster: 12,
                minDefense: 8,
                maxDefense: 9,
                minDamage: 6,
                maxDamage: 12,
                strengthReq: 30,
                dexterityReq: null,
                durability: 18,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyChainBoots,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mesh Boots',
                levelReq: 25,
                levelMonster: 43,
                minDefense: 37,
                maxDefense: 44,
                minDamage: 23,
                maxDamage: 52,
                strengthReq: 65,
                dexterityReq: null,
                durability: 16,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyChainBoots,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Boneweave Boots',
                levelReq: 54,
                levelMonster: 72,
                minDefense: 59,
                maxDefense: 67,
                minDamage: 69,
                maxDamage: 118,
                strengthReq: 118,
                dexterityReq: null,
                durability: 16,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyChainBoots,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 204:
              _context.next = 206;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Light Plated Boots'
                }
              }, ['id']);

            case 206:
              itemFamilyLightPlatedBoots = _context.sent;
              _context.next = 209;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Light Plated Boots',
                levelReq: null,
                levelMonster: 20,
                minDefense: 9,
                maxDefense: 11,
                minDamage: 8,
                maxDamage: 16,
                strengthReq: 18,
                dexterityReq: null,
                durability: 18,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightPlatedBoots,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Boots',
                levelReq: 25,
                levelMonster: 49,
                minDefense: 39,
                maxDefense: 47,
                minDamage: 37,
                maxDamage: 64,
                strengthReq: 95,
                dexterityReq: null,
                durability: 18,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightPlatedBoots,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mirrored Boots',
                levelReq: 60,
                levelMonster: 81,
                minDefense: 59,
                maxDefense: 68,
                minDamage: 50,
                maxDamage: 145,
                strengthReq: 163,
                dexterityReq: null,
                durability: 18,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightPlatedBoots,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 209:
              _context.next = 211;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Greaves'
                }
              }, ['id']);

            case 211:
              itemFamilyGreaves = _context.sent;
              _context.next = 214;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Greaves',
                levelReq: null,
                levelMonster: 27,
                minDefense: 12,
                maxDefense: 15,
                minDamage: 10,
                maxDamage: 20,
                strengthReq: 70,
                dexterityReq: null,
                durability: 24,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreaves,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Boots',
                levelReq: 25,
                levelMonster: 54,
                minDefense: 43,
                maxDefense: 53,
                minDamage: 39,
                maxDamage: 80,
                strengthReq: 125,
                dexterityReq: null,
                durability: 24,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreaves,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Myrmidon Greaves',
                levelReq: 65,
                levelMonster: 85,
                minDefense: 62,
                maxDefense: 71,
                minDamage: 83,
                maxDamage: 149,
                strengthReq: 208,
                dexterityReq: null,
                durability: 24,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyGreaves,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 214:
              _context.next = 216;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Sash'
                }
              }, ['id']);

            case 216:
              itemFamilySash = _context.sent;
              _context.next = 219;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Sash',
                levelReq: null,
                levelMonster: 3,
                minDefense: 2,
                maxDefense: 2,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                slots: 8,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySash,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Demonhide Sash',
                levelReq: 24,
                levelMonster: 36,
                minDefense: 29,
                maxDefense: 34,
                minDamage: null,
                maxDamage: null,
                strengthReq: 20,
                dexterityReq: null,
                slots: 16,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySash,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Spiderweb Sash',
                levelReq: 46,
                levelMonster: 61,
                minDefense: 55,
                maxDefense: 62,
                minDamage: null,
                maxDamage: null,
                strengthReq: 50,
                dexterityReq: null,
                slots: 16,
                durability: 12,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySash,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 219:
              _context.next = 221;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Light Belt'
                }
              }, ['id']);

            case 221:
              itemFamilyLightBelt = _context.sent;
              _context.next = 224;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Light Belt',
                levelReq: null,
                levelMonster: 3,
                minDefense: 3,
                maxDefense: 3,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                slots: 8,
                durability: 14,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightBelt,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sharkskin Belt',
                levelReq: 25,
                levelMonster: 39,
                minDefense: 31,
                maxDefense: 36,
                minDamage: null,
                maxDamage: null,
                strengthReq: 20,
                dexterityReq: null,
                slots: 16,
                durability: 14,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightBelt,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Vampirefang Belt',
                levelReq: 51,
                levelMonster: 68,
                minDefense: 58,
                maxDefense: 63,
                minDamage: null,
                maxDamage: null,
                strengthReq: 50,
                dexterityReq: null,
                slots: 16,
                durability: 14,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyLightBelt,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 224:
              _context.next = 226;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Belt'
                }
              }, ['id']);

            case 226:
              itemFamilyBelt = _context.sent;
              _context.next = 229;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Belt',
                levelReq: null,
                levelMonster: 12,
                minDefense: 5,
                maxDefense: 5,
                minDamage: null,
                maxDamage: null,
                strengthReq: 25,
                dexterityReq: null,
                slots: 12,
                durability: 16,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBelt,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mesh Belt',
                levelReq: 25,
                levelMonster: 43,
                minDefense: 35,
                maxDefense: 40,
                minDamage: null,
                maxDamage: null,
                strengthReq: 58,
                dexterityReq: null,
                slots: 16,
                durability: 16,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBelt,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Mithril Coil',
                levelReq: 62,
                levelMonster: 75,
                minDefense: 59,
                maxDefense: 66,
                minDamage: null,
                maxDamage: null,
                strengthReq: 106,
                dexterityReq: null,
                slots: 16,
                durability: 16,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyBelt,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 229:
              _context.next = 231;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Heavy Belt'
                }
              }, ['id']);

            case 231:
              itemFamilyHeavyBelt = _context.sent;
              _context.next = 234;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Heavy Belt',
                levelReq: null,
                levelMonster: 20,
                minDefense: 6,
                maxDefense: 6,
                minDamage: null,
                maxDamage: null,
                strengthReq: 45,
                dexterityReq: null,
                slots: 12,
                durability: 16,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHeavyBelt,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Battle Belt',
                levelReq: 25,
                levelMonster: 49,
                minDefense: 37,
                maxDefense: 42,
                minDamage: null,
                maxDamage: null,
                strengthReq: 88,
                dexterityReq: null,
                slots: 16,
                durability: 18,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHeavyBelt,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Troll Belt',
                levelReq: 62,
                levelMonster: 82,
                minDefense: 59,
                maxDefense: 66,
                minDamage: null,
                maxDamage: null,
                strengthReq: 151,
                dexterityReq: null,
                slots: 16,
                durability: 18,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHeavyBelt,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 234:
              _context.next = 236;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Plated Belt'
                }
              }, ['id']);

            case 236:
              itemFamilyPlatedBelt = _context.sent;
              _context.next = 239;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Plated Belt',
                levelReq: null,
                levelMonster: 27,
                minDefense: 8,
                maxDefense: 11,
                minDamage: null,
                maxDamage: null,
                strengthReq: 60,
                dexterityReq: null,
                slots: 16,
                durability: 24,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyPlatedBelt,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'War Belt',
                levelReq: 25,
                levelMonster: 54,
                minDefense: 41,
                maxDefense: 52,
                minDamage: null,
                maxDamage: null,
                strengthReq: 110,
                dexterityReq: null,
                slots: 16,
                durability: 24,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyPlatedBelt,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Colossus Girdle',
                levelReq: 67,
                levelMonster: 85,
                minDefense: 61,
                maxDefense: 71,
                minDamage: null,
                maxDamage: null,
                strengthReq: 185,
                dexterityReq: null,
                slots: 16,
                durability: 24,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyPlatedBelt,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 239:
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