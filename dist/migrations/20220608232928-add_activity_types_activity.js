"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// LEGENDE
// _i = insufficient balance
// _s = Success
// _f = fail
//
module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, DataTypes) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.changeColumn('activity', 'type', {
                type: DataTypes.ENUM('depositAccepted', 'depositComplete', 'withdrawRequested', 'withdrawAccepted', 'withdrawComplete', 'withdrawRejected', 'login_s', 'login_f', 'logout_s', 'ignoreme_s', 'ignoreme_f', 'help_s', 'help_f', 'account_s', 'account_f', 'myrank_s', 'myrank_f', 'ranks_s', 'ranks_f', 'deposit_s', 'deposit_f', 'balance_s', 'balance_f', 'price_s', 'price_f', 'withdraw_s', 'withdraw_f', 'withdraw_i', 'topggvote_s', 'topggvote_f', 'userJoined_s', 'userJoined_f', 'activeTalker_s', 'activeTalker_f', 'rollDice_s', 'rollDice_f', 'rollDice_t')
              });

            case 2:
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
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface, DataTypes) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return queryInterface.changeColumn('activity', 'type', {
                type: DataTypes.ENUM('depositAccepted', 'depositComplete', 'withdrawRequested', 'withdrawAccepted', 'withdrawComplete', 'withdrawRejected', 'login_s', 'login_f', 'logout_s', 'ignoreme_s', 'ignoreme_f', 'help_s', 'help_f', 'account_s', 'account_f', 'myrank_s', 'myrank_f', 'ranks_s', 'ranks_f', 'deposit_s', 'deposit_f', 'balance_s', 'balance_f', 'price_s', 'price_f', 'withdraw_s', 'withdraw_f', 'withdraw_i', 'topggvote_s', 'topggvote_f', 'userJoined_s', 'userJoined_f', 'activeTalker_s', 'activeTalker_f', 'rollDice_s', 'rollDice_f')
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};