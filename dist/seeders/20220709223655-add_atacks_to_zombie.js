"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var Physical, Monster;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('damageType', {
                where: {
                  name: 'Physical'
                }
              }, ['id']);

            case 2:
              Physical = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('monster', {
                where: {
                  name: 'Zombie'
                }
              }, ['id']);

            case 5:
              Monster = _context.sent;
              _context.next = 8;
              return queryInterface.bulkInsert('monsterAttack', [{
                name: 'Attack',
                minDmg: 2,
                maxDmg: 3,
                minAr: 12,
                maxAr: 30,
                damageTypeId: Physical,
                ranged: false,
                defaultAttack: true,
                chance: 100,
                monsterId: Monster,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                name: 'Bite',
                minDmg: 4,
                maxDmg: 8,
                minAr: 30,
                maxAr: 50,
                damageTypeId: Physical,
                ranged: false,
                defaultAttack: false,
                chance: 30,
                monsterId: Monster,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 8:
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
    return queryInterface.bulkDelete('monsterAttack', null, {});
  }
};