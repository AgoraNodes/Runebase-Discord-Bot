"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBattleScreenTools = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var drawBattleScreenTools = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, mainSkill, secondarySkill, hpOrbImage, mpOrbImage) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.drawImage(mainSkill, 66, // x position
            175, // y position
            hpOrbImage.width / 4, hpOrbImage.height / 4);
            ctx.drawImage(secondarySkill, 225, // x position
            175, // y position
            hpOrbImage.width / 4, hpOrbImage.height / 4);
            ctx.drawImage(hpOrbImage, 0, // x position
            132, // y position
            hpOrbImage.width / 1.5, hpOrbImage.height / 1.5);
            ctx.drawImage(mpOrbImage, 250, // x position
            132, // y position
            hpOrbImage.width / 1.5, hpOrbImage.height / 1.5);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function drawBattleScreenTools(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.drawBattleScreenTools = drawBattleScreenTools;