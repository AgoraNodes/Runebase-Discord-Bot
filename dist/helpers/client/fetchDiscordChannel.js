"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDiscordChannel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discord = require("discord.js");

var fetchDiscordChannel = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(discordClient, message) {
    var discordChannel;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(message.type && message.type === _discord.InteractionType.ApplicationCommand)) {
              _context.next = 12;
              break;
            }

            if (!message.guildId) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return discordClient.channels.cache.get(message.channelId);

          case 4:
            discordChannel = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.next = 9;
            return discordClient.users.cache.get(message.user.id);

          case 9:
            discordChannel = _context.sent;

          case 10:
            _context.next = 20;
            break;

          case 12:
            if (!(message.channel.type === _discord.ChannelType.DM)) {
              _context.next = 16;
              break;
            }

            _context.next = 15;
            return discordClient.channels.cache.get(message.channelId);

          case 15:
            discordChannel = _context.sent;

          case 16:
            if (!(message.channel.type === _discord.ChannelType.GuildText)) {
              _context.next = 20;
              break;
            }

            _context.next = 19;
            return discordClient.channels.cache.get(message.channelId);

          case 19:
            discordChannel = _context.sent;

          case 20:
            return _context.abrupt("return", discordChannel);

          case 21:
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