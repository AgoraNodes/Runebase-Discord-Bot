"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBackground = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var drawBackground = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, canvas, backgroundImage) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.drawImage(backgroundImage, 0, // x position
            0, // y position
            backgroundImage.width, canvas.height);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function drawBackground(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.drawBackground = drawBackground;