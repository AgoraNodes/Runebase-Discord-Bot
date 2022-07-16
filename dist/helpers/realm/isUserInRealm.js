"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var isUserInRealm = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(discordClient, userCurrentCharacter) {
    var isInRealm, server;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isInRealm = false;
            console.log(userCurrentCharacter.UserGroup);
            console.log('isUserInRealm Start');
            server = discordClient.guilds.cache.get(userCurrentCharacter.UserGroup.group.groupId);

            if (server.members.cache.get(userCurrentCharacter.UserGroup.user.user_id)) {
              isInRealm = true;
            }

            return _context.abrupt("return", isInRealm);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isUserInRealm(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = isUserInRealm;
exports["default"] = _default;