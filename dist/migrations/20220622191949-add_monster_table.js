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
              return queryInterface.createTable('monster', {
                id: {
                  type: DataTypes.BIGINT,
                  allowNull: false,
                  primaryKey: true,
                  autoIncrement: true
                },
                name: {
                  type: DataTypes.STRING,
                  allowNull: false
                },
                level: {
                  type: DataTypes.SMALLINT,
                  allowNull: false
                },
                minHp: {
                  type: DataTypes.BIGINT,
                  allowNull: false
                },
                maxHp: {
                  type: DataTypes.BIGINT,
                  allowNull: false
                },
                exp: {
                  type: DataTypes.SMALLINT,
                  allowNull: false
                },
                defense: {
                  type: DataTypes.SMALLINT,
                  allowNull: false
                },
                block: {
                  type: DataTypes.SMALLINT,
                  allowNull: false
                },
                minDamage: {
                  type: DataTypes.SMALLINT,
                  allowNull: false
                },
                maxDamage: {
                  type: DataTypes.SMALLINT,
                  allowNull: false
                },
                FR: {
                  type: DataTypes.SMALLINT,
                  allowNull: false
                },
                CR: {
                  type: DataTypes.SMALLINT,
                  allowNull: false
                },
                PR: {
                  type: DataTypes.SMALLINT,
                  allowNull: false
                },
                LR: {
                  type: DataTypes.SMALLINT,
                  allowNull: false
                },
                damageTypeId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'damageType',
                    // name of Source model
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL'
                },
                monsterTypeId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'monsterType',
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
              return queryInterface.dropTable('monster');

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