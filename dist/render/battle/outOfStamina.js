"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderOutOfStamina = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _lodash = _interopRequireDefault(require("lodash"));

var _discord = require("discord.js");

var renderOutOfStamina = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentCharacter) {
    var canvas, ctx;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            canvas = (0, _canvas.createCanvas)(1400, 300);
            ctx = canvas.getContext('2d');
            ctx.font = 'bold 68px "HeartWarming"';
            ctx.fillStyle = "#ccc";
            ctx.textAlign = "center";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3; // Picking a class

            ctx.strokeText("".concat(currentCharacter.UserGroup.user.username, " you are out of stamina, come back tomorrow"), 700, 150, 1400);
            ctx.fillText("".concat(currentCharacter.UserGroup.user.username, " you are out of stamina, come back tomorrow"), 700, 150, 1400);
            return _context.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'outOfStamina.png'));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderOutOfStamina(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderOutOfStamina = renderOutOfStamina;