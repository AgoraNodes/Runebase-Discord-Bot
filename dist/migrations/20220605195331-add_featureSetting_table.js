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
              return queryInterface.createTable('featureSetting', {
                id: {
                  type: DataTypes.BIGINT,
                  allowNull: false,
                  primaryKey: true,
                  autoIncrement: true
                },
                type: {
                  type: DataTypes.ENUM,
                  values: ['global', 'local']
                },
                name: {
                  type: DataTypes.STRING,
                  allowNull: false
                },
                min: {
                  type: DataTypes.BIGINT,
                  allowNull: false,
                  defaultValue: 1000000
                },
                fee: {
                  type: DataTypes.SMALLINT,
                  allowNull: false,
                  defaultValue: 0
                },
                maxSampleSize: {
                  type: DataTypes.BIGINT,
                  allowNull: false,
                  defaultValue: 400
                },
                enabled: {
                  type: DataTypes.BOOLEAN,
                  allowNull: false
                },
                groupId: {
                  type: DataTypes.BIGINT,
                  allowNull: true,
                  references: {
                    model: 'group',
                    key: 'id'
                  }
                },
                channelId: {
                  type: DataTypes.BIGINT,
                  allowNull: true,
                  references: {
                    model: 'channel',
                    key: 'id'
                  }
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
              return queryInterface.dropTable('featureSetting');

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