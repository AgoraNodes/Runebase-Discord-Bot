"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMpOrb = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _calculateCharacterStats = require("../../helpers/stats/calculateCharacterStats");

/* eslint-disable import/prefer-default-export */
var renderMpOrb = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentUser) {
    var _yield$calculateChara, mp, canvas, ctx, percentage, finalImage;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _calculateCharacterStats.calculateCharacterStats)(currentUser);

          case 2:
            _yield$calculateChara = _context.sent;
            mp = _yield$calculateChara.mp;
            canvas = (0, _canvas.createCanvas)(100, 100);
            ctx = canvas.getContext('2d');
            percentage = mp.current / mp.max * 100;
            ctx.beginPath();
            ctx.arc(50, 50, 50, 0, 2 * Math.PI);
            ctx.clip();
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.fillRect(0, 0, 100, 100);
            ctx.fillStyle = 'blue';
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
            ctx.strokeText("".concat(mp.current, " / ").concat(mp.max), 50, 50, 100);
            ctx.fillText("".concat(mp.current, " / ").concat(mp.max), 50, 50, 100);
            _context.next = 27;
            return canvas.toBuffer();

          case 27:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderMpOrb(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderMpOrb = renderMpOrb;