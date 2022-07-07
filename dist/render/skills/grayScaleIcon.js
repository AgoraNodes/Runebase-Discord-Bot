"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderGrayScaleIcon = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var renderGrayScaleIcon = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(icon) {
    var canvas, ctx, id, data, i, r, g, b, y, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            canvas = (0, _canvas.createCanvas)(icon.width, icon.height);
            ctx = canvas.getContext('2d');
            ctx.drawImage(icon, 0, 0);
            id = ctx.getImageData(0, 0, icon.width, icon.height);
            ctx.clearRect(0, 0, icon.width, icon.height);
            data = id.data;

            for (i = 0; i < data.length; i += 4) {
              r = data[i];
              g = data[i + 1];
              b = data[i + 2];
              y = 0.299 * r + 0.587 * g + 0.114 * b;
              data[i] = y;
              data[i + 1] = y;
              data[i + 2] = y;
            }

            ctx.putImageData(id, 0, 0);
            _context.next = 10;
            return canvas.toBuffer();

          case 10:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderGrayScaleIcon(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderGrayScaleIcon = renderGrayScaleIcon;