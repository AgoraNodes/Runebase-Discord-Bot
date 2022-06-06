"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleInvalidAmountMessage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _messages = require("../../../messages");

var handleInvalidAmountMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(discordClient, message, capType) {
    var discordUser, discordChannel;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
              _context.next = 16;
              break;
            }

            _context.next = 3;
            return discordClient.users.cache.get(message.user.id);

          case 3:
            discordUser = _context.sent;

            if (!message.guildId) {
              _context.next = 12;
              break;
            }

            _context.next = 7;
            return discordClient.channels.cache.get(message.channelId);

          case 7:
            discordChannel = _context.sent;
            _context.next = 10;
            return discordChannel.send({
              embeds: [(0, _messages.invalidAmountMessage)(message.user.id, capType)]
            });

          case 10:
            _context.next = 14;
            break;

          case 12:
            _context.next = 14;
            return discordUser.send({
              embeds: [(0, _messages.invalidAmountMessage)(message.user.id, capType)]
            });

          case 14:
            _context.next = 22;
            break;

          case 16:
            if (!(message.channel.type === 'DM')) {
              _context.next = 19;
              break;
            }

            _context.next = 19;
            return message.author.send({
              embeds: [(0, _messages.invalidAmountMessage)(message.author.id, capType)]
            });

          case 19:
            if (!(message.channel.type === 'GUILD_TEXT')) {
              _context.next = 22;
              break;
            }

            _context.next = 22;
            return message.channel.send({
              embeds: [(0, _messages.invalidAmountMessage)(message.author.id, capType)]
            });

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleInvalidAmountMessage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.handleInvalidAmountMessage = handleInvalidAmountMessage;