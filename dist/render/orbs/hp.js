"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderHpOrb = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

/* eslint-disable import/prefer-default-export */
var renderHpOrb = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentHp, maxHp) {
    var canvas, ctx, percentage, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            canvas = (0, _canvas.createCanvas)(100, 100);
            ctx = canvas.getContext('2d');
            percentage = currentHp / maxHp * 100;
            ctx.beginPath();
            ctx.arc(50, 50, 50, 0, 2 * Math.PI);
            ctx.clip();
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.fillRect(0, 0, 100, 100);
            ctx.fillStyle = 'red';
            ctx.translate(50, 50);
            ctx.rotate(Math.PI);
            ctx.translate(-50, -50);
            ctx.fillRect(0, 0, 100, percentage < 100 ? percentage : 100);
            ctx.font = 'bold 16px "HeartWarming"';
            ctx.textAlign = "center";
            ctx.fillStyle = 'white';
            ctx.translate(50, 50);
            ctx.rotate(Math.PI);
            ctx.translate(-50, -50);
            ctx.strokeText("".concat(currentHp, " / ").concat(maxHp), 50, 50, 100);
            ctx.fillText("".concat(currentHp, " / ").concat(maxHp), 50, 50, 100);
            _context.next = 23;
            return canvas.toBuffer();

          case 23:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderHpOrb(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderHpOrb = renderHpOrb;