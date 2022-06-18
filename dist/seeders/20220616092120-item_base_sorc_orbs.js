"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyDagger, itemFamilySacredGlobe, itemFamilySmokedSphere, itemFamilyClaspedOrb, itemFamilyJaredsStone;
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
                  name: 'Eagle Orb'
                }
              }, ['id']);

            case 11:
              itemFamilyDagger = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Eagle Orb',
                levelReq: null,
                levelMonster: 1,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 5,
                strengthReq: null,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDagger,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Glowing Orb',
                levelReq: 24,
                levelMonster: 32,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 21,
                strengthReq: null,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDagger,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Heavenly Stone',
                levelReq: 44,
                levelMonster: 58,
                minDefense: null,
                maxDefense: null,
                minDamage: 21,
                maxDamage: 46,
                strengthReq: null,
                dexterityReq: null,
                durability: 20,
                sockets: 2,
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
                  name: 'Sacred Globe'
                }
              }, ['id']);

            case 16:
              itemFamilySacredGlobe = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Sacred Globe',
                levelReq: null,
                levelMonster: 8,
                minDefense: null,
                maxDefense: null,
                minDamage: 2,
                maxDamage: 8,
                strengthReq: null,
                dexterityReq: null,
                durability: 30,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySacredGlobe,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Crystalline Globe',
                levelReq: 27,
                levelMonster: 37,
                minDefense: null,
                maxDefense: null,
                minDamage: 10,
                maxDamage: 26,
                strengthReq: null,
                dexterityReq: null,
                durability: 30,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySacredGlobe,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Eldritch Orb',
                levelReq: 50,
                levelMonster: 67,
                minDefense: null,
                maxDefense: null,
                minDamage: 18,
                maxDamage: 50,
                strengthReq: null,
                dexterityReq: null,
                durability: 30,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySacredGlobe,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
              _context.next = 21;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Smoked Sphere'
                }
              }, ['id']);

            case 21:
              itemFamilySmokedSphere = _context.sent;
              _context.next = 24;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Smoked Sphere',
                levelReq: 8,
                levelMonster: 12,
                minDefense: null,
                maxDefense: null,
                minDamage: 4,
                maxDamage: 10,
                strengthReq: null,
                dexterityReq: null,
                durability: 35,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySmokedSphere,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Cloudy Sphere',
                levelReq: 30,
                levelMonster: 41,
                minDefense: null,
                maxDefense: null,
                minDamage: 11,
                maxDamage: 29,
                strengthReq: null,
                dexterityReq: null,
                durability: 35,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySmokedSphere,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Demon Heart',
                levelReq: 56,
                levelMonster: 75,
                minDefense: null,
                maxDefense: null,
                minDamage: 23,
                maxDamage: 55,
                strengthReq: null,
                dexterityReq: null,
                durability: 35,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilySmokedSphere,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 24:
              _context.next = 26;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Clasped Orb'
                }
              }, ['id']);

            case 26:
              itemFamilyClaspedOrb = _context.sent;
              _context.next = 29;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Clasped Orb',
                levelReq: 13,
                levelMonster: 17,
                minDefense: null,
                maxDefense: null,
                minDamage: 5,
                maxDamage: 12,
                strengthReq: null,
                dexterityReq: null,
                durability: 40,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyClaspedOrb,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sparkling Ball',
                levelReq: 34,
                levelMonster: 46,
                minDefense: null,
                maxDefense: null,
                minDamage: 13,
                maxDamage: 32,
                strengthReq: null,
                dexterityReq: null,
                durability: 40,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyClaspedOrb,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Vortex Orb',
                levelReq: 63,
                levelMonster: 84,
                minDefense: null,
                maxDefense: null,
                minDamage: 12,
                maxDamage: 66,
                strengthReq: null,
                dexterityReq: null,
                durability: 40,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyClaspedOrb,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 29:
              _context.next = 31;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: "Jared's Stone"
                }
              }, ['id']);

            case 31:
              itemFamilyJaredsStone = _context.sent;
              _context.next = 34;
              return queryInterface.bulkInsert('itemBase', [{
                name: "Jared's Stone",
                levelReq: 18,
                levelMonster: 24,
                minDefense: null,
                maxDefense: null,
                minDamage: 8,
                maxDamage: 18,
                strengthReq: null,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyJaredsStone,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Swirling Crystal',
                levelReq: 37,
                levelMonster: 50,
                minDefense: null,
                maxDefense: null,
                minDamage: 18,
                maxDamage: 42,
                strengthReq: null,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyJaredsStone,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Dimensional Shard',
                levelReq: 66,
                levelMonster: 85,
                minDefense: null,
                maxDefense: null,
                minDamage: 30,
                maxDamage: 53,
                strengthReq: null,
                dexterityReq: null,
                durability: 50,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyJaredsStone,
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