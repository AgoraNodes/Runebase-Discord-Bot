"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('UserGroupClass', 'userId')]);
  },
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, DataTypes) {
      var transaction;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.sequelize.transaction();

            case 2:
              transaction = _context.sent;
              _context.prev = 3;
              queryInterface.addColumn('UserGroupClass', 'userId', {
                type: DataTypes.BIGINT,
                references: {
                  model: 'user',
                  // name of Source model
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
              });
              _context.next = 7;
              return transaction.commit();

            case 7:
              _context.next = 14;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](3);
              _context.next = 13;
              return transaction.rollback();

            case 13:
              throw _context.t0;

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 9]]);
    }));

    function down(_x, _x2) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};