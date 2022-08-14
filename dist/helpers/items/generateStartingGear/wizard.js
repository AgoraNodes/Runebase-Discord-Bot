"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateWizardStartGear = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _generateSpecificStartGear = require("./utils/generateSpecificStartGear");

var generateWizardStartGear = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
    var mainHand, offHand;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _generateSpecificStartGear.generateSpecificStartItem)('Short Staff', t);

          case 2:
            mainHand = _context.sent;
            offHand = null;
            return _context.abrupt("return", [mainHand, offHand]);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateWizardStartGear(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateWizardStartGear = generateWizardStartGear;