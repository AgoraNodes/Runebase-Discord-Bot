"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMinimumMessage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discord = require("discord.js");

var _embeds = require("../../../embeds");

var handleMinimumMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(discordClient, message, setting, capType) {
    var discordUser, discordChannel;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(message.type && message.type === _discord.InteractionType.ApplicationCommand)) {
              _context.next = 18;
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
              embeds: [(0, _embeds.minimumMessage)(message.user.id, setting, capType)]
            });

          case 10:
            _context.next = 16;
            break;

          case 12:
            console.log('before min amount send');
            _context.next = 15;
            return discordUser.send({
              embeds: [(0, _embeds.minimumMessage)(message.user.id, setting, capType)]
            });

          case 15:
            console.log('after min amount send');

          case 16:
            _context.next = 24;
            break;

          case 18:
            if (!(message.channel.type === _discord.ChannelType.DM)) {
              _context.next = 21;
              break;
            }

            _context.next = 21;
            return message.author.send({
              embeds: [(0, _embeds.minimumMessage)(message.author.id, setting, capType)]
            });

          case 21:
            if (!(message.channel.type === _discord.ChannelType.GuildText)) {
              _context.next = 24;
              break;
            }

            _context.next = 24;
            return message.channel.send({
              embeds: [(0, _embeds.minimumMessage)(message.author.id, setting, capType)]
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleMinimumMessage(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.handleMinimumMessage = handleMinimumMessage;