"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, DataTypes) {
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
              queryInterface.removeColumn('battle', 'UserClassId');
              queryInterface.removeColumn('buff', 'UserClassId');
              queryInterface.removeColumn('debuff', 'UserclassId');
              _context.next = 9;
              return transaction.commit();

            case 9:
              _context.next = 16;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);
              _context.next = 15;
              return transaction.rollback();

            case 15:
              throw _context.t0;

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 11]]);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface, DataTypes) {
      var transaction;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return queryInterface.sequelize.transaction();

            case 2:
              transaction = _context2.sent;
              _context2.prev = 3;
              queryInterface.addColumn('battle', 'UserClassId', {
                type: DataTypes.BIGINT,
                references: {
                  model: 'UserGroup',
                  // name of Source model
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
              });
              queryInterface.addColumn('buff', 'UserClassId', {
                type: DataTypes.BIGINT,
                references: {
                  model: 'UserGroup',
                  // name of Source model
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
              });
              queryInterface.addColumn('debuff', 'UserClassId', {
                type: DataTypes.BIGINT,
                references: {
                  model: 'UserGroup',
                  // name of Source model
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
              });
              _context2.next = 9;
              return transaction.commit();

            case 9:
              _context2.next = 16;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](3);
              _context2.next = 15;
              return transaction.rollback();

            case 15:
              throw _context2.t0;

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 11]]);
    }));

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};