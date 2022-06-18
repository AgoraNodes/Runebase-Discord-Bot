"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyJawboneVisor, itemFamilyFangedHelm, itemFamilyHornedHelm, itemFamilyAssaultHelmet, itemFamilyAvengerGuard;
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
                  name: 'Jawbone Cap'
                }
              }, ['id']);

            case 11:
              itemFamilyJawboneVisor = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Jawbone Cap',
                levelReq: 3,
                levelMonster: 4,
                minDefense: 10,
                maxDefense: 15,
                minDamage: null,
                maxDamage: null,
                strengthReq: 25,
                dexterityReq: null,
                durability: 25,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyJawboneVisor,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Jawbone Visor',
                levelReq: 25,
                levelMonster: 33,
                minDefense: 55,
                maxDefense: 68,
                minDamage: null,
                maxDamage: null,
                strengthReq: 58,
                dexterityReq: null,
                durability: 25,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyJawboneVisor,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Carnage Helm',
                levelReq: 45,
                levelMonster: 60,
                minDefense: 102,
                maxDefense: 147,
                minDamage: null,
                maxDamage: null,
                strengthReq: 106,
                dexterityReq: null,
                durability: 25,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyJawboneVisor,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Fanged Helm'
                }
              }, ['id']);

            case 16:
              itemFamilyFangedHelm = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Fanged Helm',
                levelReq: 6,
                levelMonster: 8,
                minDefense: 15,
                maxDefense: 20,
                minDamage: null,
                maxDamage: null,
                strengthReq: 35,
                dexterityReq: null,
                durability: 35,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFangedHelm,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Lion Helm',
                levelReq: 29,
                levelMonster: 38,
                minDefense: 63,
                maxDefense: 75,
                minDamage: null,
                maxDamage: null,
                strengthReq: 73,
                dexterityReq: null,
                durability: 35,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFangedHelm,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Fury Visor',
                levelReq: 49,
                levelMonster: 66,
                minDefense: 105,
                maxDefense: 150,
                minDamage: null,
                maxDamage: null,
                strengthReq: 129,
                dexterityReq: null,
                durability: 35,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyFangedHelm,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Horned Helm'
                }
              }, ['id']);

            case 21:
              itemFamilyHornedHelm = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Horned Helm',
                levelReq: 12,
                levelMonster: 16,
                minDefense: 25,
                maxDefense: 30,
                minDamage: null,
                maxDamage: null,
                strengthReq: 45,
                dexterityReq: null,
                durability: 45,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHornedHelm,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Rage Mask',
                levelReq: 29,
                levelMonster: 44,
                minDefense: 78,
                maxDefense: 90,
                minDamage: null,
                maxDamage: null,
                strengthReq: 88,
                dexterityReq: null,
                durability: 45,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHornedHelm,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Destroyer Helm',
                levelReq: 54,
                levelMonster: 73,
                minDefense: 111,
                maxDefense: 156,
                minDamage: null,
                maxDamage: null,
                strengthReq: 151,
                dexterityReq: null,
                durability: 45,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyHornedHelm,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Assault Helmet'
                }
              }, ['id']);

            case 26:
              itemFamilyAssaultHelmet = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Assault Helmet',
                levelReq: 15,
                levelMonster: 20,
                minDefense: 30,
                maxDefense: 35,
                minDamage: null,
                maxDamage: null,
                strengthReq: 55,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAssaultHelmet,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Savage Helmet',
                levelReq: 32,
                levelMonster: 49,
                minDefense: 85,
                maxDefense: 98,
                minDamage: null,
                maxDamage: null,
                strengthReq: 103,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAssaultHelmet,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Conqueror Crown',
                levelReq: 60,
                levelMonster: 80,
                minDefense: 114,
                maxDefense: 159,
                minDamage: null,
                maxDamage: null,
                strengthReq: 174,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAssaultHelmet,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Avenger Guard'
                }
              }, ['id']);

            case 31:
              itemFamilyAvengerGuard = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Avenger Guard',
                levelReq: 18,
                levelMonster: 24,
                minDefense: 35,
                maxDefense: 50,
                minDamage: null,
                maxDamage: null,
                strengthReq: 65,
                dexterityReq: null,
                durability: 55,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAvengerGuard,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Slayer Guard',
                levelReq: 40,
                levelMonster: 54,
                minDefense: 90,
                maxDefense: 120,
                minDamage: null,
                maxDamage: null,
                strengthReq: 118,
                dexterityReq: null,
                durability: 55,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAvengerGuard,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Guardian Crown',
                levelReq: 65,
                levelMonster: 85,
                minDefense: 117,
                maxDefense: 168,
                minDamage: null,
                maxDamage: null,
                strengthReq: 196,
                dexterityReq: null,
                durability: 55,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAvengerGuard,
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