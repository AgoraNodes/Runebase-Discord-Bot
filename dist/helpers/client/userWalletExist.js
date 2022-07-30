"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userWalletExist = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var _embeds = require("../../embeds");

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var userWalletExist = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(message, functionName) {
    var t,
        activity,
        userId,
        user,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            t = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;

            if (message.user && message.user.id) {
              userId = message.user.id;
            } else if (message.author) {
              userId = message.author.id;
            } else {
              userId = message.user;
            }

            _context.next = 4;
            return _models["default"].user.findOne(_objectSpread({
              where: {
                user_id: "".concat(userId)
              },
              include: [{
                model: _models["default"].wallet,
                as: 'wallet',
                required: true,
                include: [{
                  model: _models["default"].address,
                  as: 'address',
                  required: true
                }]
              }]
            }, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 12;
              break;
            }

            _context.next = 8;
            return _models["default"].activity.create({
              type: "".concat(functionName, "_f")
            }, _objectSpread({}, t && [{
              lock: t.LOCK.UPDATE,
              transaction: t
            }]));

          case 8:
            activity = _context.sent;

            if (!(message.user && message.user.id || message.author && message.author.id)) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return message.reply({
              embeds: [(0, _embeds.userNotFoundMessage)(message, (0, _utils.capitalize)(functionName))]
            });

          case 12:
            return _context.abrupt("return", [user, activity]);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userWalletExist(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.userWalletExist = userWalletExist;