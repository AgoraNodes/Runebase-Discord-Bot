"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMaintenanceOrDisabled = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var _embeds = require("../embeds");

var isMaintenanceOrDisabled = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(message, side) {
    var client,
        botSetting,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
            _context.next = 3;
            return _models["default"].setting.findOne({
              where: {
                name: side
              }
            });

          case 3:
            botSetting = _context.sent;

            if (botSetting.enabled) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return message.reply({
              embeds: [(0, _embeds.discordBotDisabledMessage)()]
            })["catch"](function (e) {
              console.log(e);
            });

          case 7:
            _context.next = 12;
            break;

          case 9:
            if (!botSetting.maintenance) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return message.reply({
              embeds: [(0, _embeds.discordBotMaintenanceMessage)()]
            })["catch"](function (e) {
              console.log(e);
            });

          case 12:
            console.log(botSetting);
            return _context.abrupt("return", botSetting);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isMaintenanceOrDisabled(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.isMaintenanceOrDisabled = isMaintenanceOrDisabled;