"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _embeds = require("../../embeds");

var isUserInRealm = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, discordClient, message, isDefered) {
    var usedDeferReply, server;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            usedDeferReply = false;
            server = discordClient.guilds.cache.get(userCurrentCharacter.UserGroup.group.groupId);

            if (server.members.cache.get(userCurrentCharacter.UserGroup.user.user_id)) {
              _context.next = 25;
              break;
            }

            if (isDefered) {
              _context.next = 14;
              break;
            }

            _context.t0 = message;
            _context.t1 = "<@".concat(userCurrentCharacter.UserGroup.user.user_id, ">, ").concat(userCurrentCharacter.UserGroup.group.inviteLink);
            _context.next = 8;
            return (0, _embeds.needToBeInDiscordRealmEmbed)(userCurrentCharacter.UserGroup.group);

          case 8:
            _context.t2 = _context.sent;
            _context.t3 = [_context.t2];
            _context.t4 = {
              content: _context.t1,
              embeds: _context.t3,
              ephemeral: true
            };
            _context.next = 13;
            return _context.t0.reply.call(_context.t0, _context.t4);

          case 13:
            return _context.abrupt("return", [true, usedDeferReply]);

          case 14:
            _context.t5 = message;
            _context.t6 = "<@".concat(userCurrentCharacter.UserGroup.user.user_id, ">, ").concat(userCurrentCharacter.UserGroup.group.inviteLink);
            _context.next = 18;
            return (0, _embeds.needToBeInDiscordRealmEmbed)(userCurrentCharacter.UserGroup.group);

          case 18:
            _context.t7 = _context.sent;
            _context.t8 = [_context.t7];
            _context.t9 = {
              content: _context.t6,
              embeds: _context.t8,
              ephemeral: true
            };
            _context.next = 23;
            return _context.t5.editReply.call(_context.t5, _context.t9);

          case 23:
            usedDeferReply = true;
            return _context.abrupt("return", [true, usedDeferReply]);

          case 25:
            return _context.abrupt("return", [false, usedDeferReply]);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isUserInRealm(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _default = isUserInRealm;
exports["default"] = _default;