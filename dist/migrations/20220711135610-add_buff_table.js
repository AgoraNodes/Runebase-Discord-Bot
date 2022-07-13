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
              return queryInterface.createTable('buff', {
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
                damageBonus: {
                  type: DataTypes.INTEGER
                },
                attackBonus: {
                  type: DataTypes.INTEGER
                },
                defenseBonus: {
                  type: DataTypes.INTEGER
                },
                parryBonus: {
                  type: DataTypes.INTEGER
                },
                lifeBonus: {
                  type: DataTypes.INTEGER
                },
                chance: {
                  type: DataTypes.INTEGER,
                  defaultValue: 100,
                  allowNull: false
                },
                rounds: {
                  type: DataTypes.INTEGER,
                  defaultValue: 1,
                  allowNull: false
                },
                "new": {
                  type: DataTypes.BOOLEAN,
                  defaultValue: true
                },
                BattleMonsterId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'BattleMonster',
                    // name of Source model
                    key: 'id'
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL'
                },
                UserClassId: {
                  type: DataTypes.BIGINT,
                  references: {
                    model: 'UserClass',
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
              return queryInterface.dropTable('buff');

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