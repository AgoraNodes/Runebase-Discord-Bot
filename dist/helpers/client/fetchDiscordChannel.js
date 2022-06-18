"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDiscordChannel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fetchDiscordChannel = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(discordClient, message) {
    var discordChannel;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(message);

            if (!(message.type && message.type === 'APPLICATION_COMMAND')) {
              _context.next = 13;
              break;
            }

            if (!message.guildId) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return discordClient.channels.cache.get(message.channelId);

          case 5:
            discordChannel = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return discordClient.users.cache.get(message.user.id);

          case 10:
            discordChannel = _context.sent;

          case 11:
            _context.next = 21;
            break;

          case 13:
            if (!(message.channel.type === 'DM')) {
              _context.next = 17;
              break;
            }

            _context.next = 16;
            return discordClient.channels.cache.get(message.channelId);

          case 16:
            discordChannel = _context.sent;

          case 17:
            if (!(message.channel.type === 'GUILD_TEXT')) {
              _context.next = 21;
              break;
            }

            _context.next = 20;
            return discordClient.channels.cache.get(message.channelId);

          case 20:
            discordChannel = _context.sent;

          case 21:
            return _context.abrupt("return", discordChannel);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchDiscordChannel(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchDiscordChannel = fetchDiscordChannel;