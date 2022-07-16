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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(discordChannel, updatedUserGroup, amount, gainExpType) {
    var userJoined,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userJoined = _args.length > 4 && _args[4] !== undefined ? _args[4] : false;

            if (!(gainExpType === 'battle')) {
              _context.next = 4;
              break;
            }

            _context.next = 4;
            return discordChannel.send({
              content: "<@".concat(updatedUserGroup.user.user_id, ">"),
              embeds: [(0, _messages.gainBattleExpExpMessage)(updatedUserGroup.user.user_id, amount)]
            });

          case 4:
            if (!(gainExpType === 'activeTalker')) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return discordChannel.send({
              content: "<@".concat(updatedUserGroup.user.user_id, ">"),
              embeds: [(0, _messages.gainActiveTalkerExpMessage)(updatedUserGroup.user.user_id, amount)]
            });

          case 7:
            if (!(gainExpType === 'topggVote')) {
              _context.next = 10;
              break;
            }

            _context.next = 10;
            return discordChannel.send({
              content: "<@".concat(updatedUserGroup.user.user_id, ">"),
              embeds: [(0, _messages.gainVoteTopggExpMessage)(updatedUserGroup.user.user_id, amount)]
            });

          case 10:
            if (!(gainExpType === 'userJoined')) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return discordChannel.send({
              content: "<@".concat(updatedUserGroup.user.user_id, ">"),
              embeds: [(0, _messages.invitedNewUserRewardMessage)(updatedUserGroup.user.user_id, userJoined, amount)]
            });

          case 13:
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