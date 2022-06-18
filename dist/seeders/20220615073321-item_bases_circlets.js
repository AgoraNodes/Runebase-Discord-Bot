"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var itemDifficultyNormal, itemDifficultyExceptional, itemDifficultyElite, itemFamilyCirclet, itemFamilyCoronet, itemFamilyTiara, itemFamilyDiadem;
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
                  name: 'Circlet'
                }
              }, ['id']);

            case 11:
              itemFamilyCirclet = _context.sent;
              _context.next = 14;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Coronet'
                }
              }, ['id']);

            case 14:
              itemFamilyCoronet = _context.sent;
              _context.next = 17;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Tiara'
                }
              }, ['id']);

            case 17:
              itemFamilyTiara = _context.sent;
              _context.next = 20;
              return queryInterface.rawSelect('itemFamily', {
                where: {
                  name: 'Diadem'
                }
              }, ['id']);

            case 20:
              itemFamilyDiadem = _context.sent;
              _context.next = 23;
              return queryInterface.bulkInsert('itemBase', [{
                name: 'Circlet',
                levelReq: 16,
                levelMonster: 24,
                minDefense: 20,
                maxDefense: 30,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: 35,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCirclet,
                itemDifficultyId: itemDifficultyNormal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Coronet',
                levelReq: 39,
                levelMonster: 52,
                minDefense: 30,
                maxDefense: 40,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: 30,
                sockets: 2,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyCoronet,
                itemDifficultyId: itemDifficultyExceptional,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Tiara',
                levelReq: 52,
                levelMonster: 70,
                minDefense: 40,
                maxDefense: 50,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: 25,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyTiara,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Diadem',
                levelReq: 64,
                levelMonster: 85,
                minDefense: 50,
                maxDefense: 60,
                minDamage: null,
                maxDamage: null,
                strengthReq: null,
                dexterityReq: null,
                durability: 20,
                sockets: 3,
                block: null,
                maxStack: null,
                itemFamilyId: itemFamilyDiadem,
                itemDifficultyId: itemDifficultyElite,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 23:
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