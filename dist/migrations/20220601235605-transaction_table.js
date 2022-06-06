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
              return queryInterface.createTable('transaction', {
                id: {
                  type: DataTypes.BIGINT,
                  allowNull: false,
                  primaryKey: true,
                  autoIncrement: true
                },
                txid: {
                  type: DataTypes.STRING,
                  allowNull: true
                },
                transactionId: {
                  type: DataTypes.STRING,
                  allowNull: true
                },
                type: {
                  type: DataTypes.ENUM,
                  values: ['receive', 'send']
                },
                amount: {
                  type: DataTypes.BIGINT,
                  allowNull: false
                },
                feeAmount: {
                  type: DataTypes.BIGINT,
                  allowNull: false,
                  defaultValue: 0
                },
                confirmations: {
                  type: DataTypes.SMALLINT,
                  allowNull: false,
                  defaultValue: 0
                },
                phase: {
                  type: DataTypes.ENUM,
                  values: ['review', 'pending', 'confirming', 'confirmed', 'rejected', 'failed']
                },
                to_from: {
                  type: DataTypes.STRING,
                  allowNull: true
                },
                memo: {
                  type: DataTypes.STRING(512),
                  allowNull: true
                },
                userId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'user',
                    // name of Source model
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL'
                },
                addressId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'address',
                    // name of Source model
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL'
                },
                blockId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'block',
                    // name of Source model
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL'
                },
                tokenId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'token',
                    // name of Source model
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL'
                },
                addressExternalId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'addressExternal',
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
              return queryInterface.dropTable('transaction');

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