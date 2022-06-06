"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleExperienceMessage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _messages = require("../../../messages");

var handleExperienceMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(discordChannel, updatedUser, amount, gainExpType) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(gainExpType === 'testExp')) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return discordChannel.send({
              content: "<@".concat(updatedUser.user_id, ">"),
              embeds: [(0, _messages.gainTestExpMessage)(updatedUser.user_id, amount)]
            });

          case 3:
            if (!(gainExpType === 'topggVote')) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return discordChannel.send({
              content: "<@".concat(updatedUser.user_id, ">"),
              embeds: [(0, _messages.gainVoteTopggExpMessage)(updatedUser.user_id, amount)]
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleExperienceMessage(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.handleExperienceMessage = handleExperienceMessage;