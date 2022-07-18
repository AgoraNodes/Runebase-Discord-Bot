"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderClassPicked = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _discord = require("discord.js");

var renderClassPicked = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(start, classes, user) {
    var current, canvas, ctx, newClassImage, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            current = classes.slice(start, start + 1);
            canvas = (0, _canvas.createCanvas)(500, 970);
            ctx = canvas.getContext('2d');
            ctx.font = 'bold 60px "HeartWarming"';
            ctx.fillStyle = "#ccc";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.textAlign = "center";
            _context.next = 10;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../../assets/images/classes', "".concat(current[0].classDescription.name, ".png")));

          case 10:
            newClassImage = _context.sent;
            ctx.drawImage(newClassImage, 0, 0, 500, 800);
            ctx.strokeText("".concat(user.username), 250, 850, 500);
            ctx.fillText("".concat(user.username), 250, 850, 500);
            ctx.strokeText("picked ".concat(current[0].name, "!"), 250, 920, 500);
            ctx.fillText("picked ".concat(current[0].name, "!"), 250, 920, 500);
            _context.next = 18;
            return canvas.toBuffer();

          case 18:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderClassPicked(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderClassPicked = renderClassPicked;