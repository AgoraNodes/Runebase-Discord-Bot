"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var Physical, Undead;
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
              return queryInterface.rawSelect('monsterType', {
                where: {
                  name: 'Undead'
                }
              }, ['id']);

            case 5:
              Undead = _context.sent;
              _context.next = 8;
              return queryInterface.bulkInsert('monster', [{
                name: 'Zombie',
                level: 1,
                minHp: 30,
                maxHp: 50,
                exp: 1,
                defense: 5,
                block: 3,
                minDamage: 1,
                maxDamage: 6,
                FR: 0,
                CR: 0,
                PR: 0,
                LR: 0,
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
    return queryInterface.bulkDelete('monster', null, {});
  }
};