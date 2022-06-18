"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyRings, itemFamilyAmulets;
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
                  name: 'Rings'
                }
              }, ['id']);

            case 11:
              itemFamilyRings = _context.sent;
              _context.next = 14;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Eturn',
                levelReq: null,
                levelMonster: null,
                minDefense: null,
                maxDefense: null,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: null,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRings,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bband',
                levelReq: null,
                levelMonster: null,
                minDefense: null,
                maxDefense: null,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: null,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRings,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Orange',
                levelReq: null,
                levelMonster: null,
                minDefense: null,
                maxDefense: null,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: null,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRings,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sloop',
                levelReq: null,
                levelMonster: null,
                minDefense: null,
                maxDefense: null,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: null,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRings,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Chain',
                levelReq: null,
                levelMonster: null,
                minDefense: null,
                maxDefense: null,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: null,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyRings,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 14:
              _context.next = 16;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Amulets'
                }
              }, ['id']);

            case 16:
              itemFamilyAmulets = _context.sent;
              _context.next = 19;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Cross',
                levelReq: null,
                levelMonster: null,
                minDefense: null,
                maxDefense: null,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: null,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAmulets,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Star',
                levelReq: null,
                levelMonster: null,
                minDefense: null,
                maxDefense: null,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: null,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAmulets,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Sun',
                levelReq: null,
                levelMonster: null,
                minDefense: null,
                maxDefense: null,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: null,
                sockets: null,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyAmulets,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 19:
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