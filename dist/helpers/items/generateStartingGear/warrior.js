"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateWarriorStartGear = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _generateSpecificStartGear = require("./utils/generateSpecificStartGear");

var generateWarriorStartGear = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
    var mainHand, offHand;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _generateSpecificStartGear.generateSpecificStartItem)('Short Sword', t);

          case 2:
            mainHand = _context.sent;
            _context.next = 5;
            return (0, _generateSpecificStartGear.generateSpecificStartItem)('Buckler', t);

          case 5:
            offHand = _context.sent;
            return _context.abrupt("return", [mainHand, offHand]);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateWarriorStartGear(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateWarriorStartGear = generateWarriorStartGear;