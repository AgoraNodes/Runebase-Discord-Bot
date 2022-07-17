"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _messages = require("../messages");

var testPlayerReadyness = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, message, isDefered) {
    var usedDeferReply;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            usedDeferReply = false;

            if (userCurrentCharacter) {
              _context.next = 10;
              break;
            }

            if (isDefered) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return message.reply({
              content: (0, _messages.notSelectedClassYetMessage)(),
              ephemeral: true
            });

          case 5:
            return _context.abrupt("return", [true, usedDeferReply]);

          case 6:
            _context.next = 8;
            return message.editReply({
              content: (0, _messages.notSelectedClassYetMessage)(),
              ephemeral: true
            });

          case 8:
            usedDeferReply = true;
            return _context.abrupt("return", [true, usedDeferReply]);

          case 10:
            if (userCurrentCharacter.UserGroup.user.currentRealmId) {
              _context.next = 19;
              break;
            }

            if (isDefered) {
              _context.next = 15;
              break;
            }

            _context.next = 14;
            return message.reply({
              content: (0, _messages.notSelectedRealmYetMessage)(),
              ephemeral: true
            });

          case 14:
            return _context.abrupt("return", [true, usedDeferReply]);

          case 15:
            _context.next = 17;
            return message.editReply({
              content: (0, _messages.notSelectedRealmYetMessage)(),
              ephemeral: true
            });

          case 17:
            usedDeferReply = true;
            return _context.abrupt("return", [true, usedDeferReply]);

          case 19:
            return _context.abrupt("return", [false, usedDeferReply]);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function testPlayerReadyness(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = testPlayerReadyness;
exports["default"] = _default;