"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadDebuff = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var loadDebuff = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(debuffName) {
    var playerImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            playerImage = [];
            _context.next = 3;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../../assets/images/debuff/", "".concat(debuffName, ".png")));

          case 3:
            playerImage[0] = _context.sent;
            return _context.abrupt("return", playerImage);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadDebuff(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.loadDebuff = loadDebuff;