"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchBalance = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _settings = _interopRequireDefault(require("../../config/settings"));

var _rclient = require("../../services/rclient");

var fetchBalance = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.locals.name = 'balance';
            _context.next = 3;
            return (0, _rclient.getInstance)().getWalletInfo();

          case 3:
            response = _context.sent;
            res.locals.result = {
              amount: response.balance
            };
            next();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchBalance(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchBalance = fetchBalance;