"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCancelSkillPick = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _lodash = _interopRequireDefault(require("lodash"));

var _discord = require("discord.js");

var renderCancelSkillPick = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter) {
    var canvas, ctx;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            canvas = (0, _canvas.createCanvas)(500, 100);
            ctx = canvas.getContext('2d');
            ctx.font = 'bold 30px "HeartWarming"';
            ctx.fillStyle = "#ccc";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.textAlign = "center";
            ctx.strokeText("".concat(userCurrentCharacter.user.username, " canceled skill selection"), 250, 60, 500);
            ctx.fillText("".concat(userCurrentCharacter.user.username, " canceled skill selection"), 250, 60, 500);
            return _context.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'cancelSelection.png'));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderCancelSkillPick(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderCancelSkillPick = renderCancelSkillPick;