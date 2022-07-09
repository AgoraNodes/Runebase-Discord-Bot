"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Critical Hit'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Critical Kick'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Critical Throw'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Healing Hit'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Parry'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Relieve'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Resistance'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Retaliate'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Though Skin'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Axeman'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Maceman'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Polearm Master'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Spearman'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Swordsman'
              });
              queryInterface.bulkUpdate('skill', {
                passive: true
              }, {
                name: 'Throwing Master'
              });

            case 15:
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
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Critical Hit'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Critical Kick'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Critical Throw'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Healing Hit'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Parry'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Relieve'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Resistance'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Retaliate'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Though Skin'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Axeman'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Maceman'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Polearm Master'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Spearman'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Swordsman'
              });
              queryInterface.bulkUpdate('skill', {
                passive: false
              }, {
                name: 'Throwing Master'
              });

            case 15:
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