"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, DataTypes) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.createTable('activity', {
                id: {
                  type: DataTypes.BIGINT,
                  allowNull: false,
                  primaryKey: true,
                  autoIncrement: true
                },
                type: {
                  type: DataTypes.ENUM,
                  values: ['depositAccepted', 'depositComplete', 'withdrawRequested', 'withdrawAccepted', 'withdrawComplete', 'withdrawRejected', 'login_s', 'login_f', 'logout_s', 'ignoreme_s', 'ignoreme_f', 'help_s', 'help_f', 'account_s', 'account_f', 'myrank_s', 'myrank_f']
                },
                amount: {
                  type: DataTypes.BIGINT,
                  allowNull: true
                },
                spender_balance: {
                  type: DataTypes.BIGINT,
                  allowNull: true
                },
                earner_balance: {
                  type: DataTypes.BIGINT,
                  allowNull: true
                },
                failedAmount: {
                  type: DataTypes.STRING(4000),
                  allowNull: true
                },
                dashboardUserId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'dashboardUser',
                    // name of Source model
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL'
                },
                transactionId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'transaction',
                    // name of Source model
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL'
                },
                spenderId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'user',
                    // name of Source model
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL'
                },
                earnerId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'user',
                    // name of Source model
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL'
                },
                createdAt: {
                  allowNull: false,
                  type: DataTypes.DATE
                },
                updatedAt: {
                  allowNull: false,
                  type: DataTypes.DATE
                }
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
              return queryInterface.dropTable('activity');

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