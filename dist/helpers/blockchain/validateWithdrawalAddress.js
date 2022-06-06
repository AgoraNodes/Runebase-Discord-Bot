"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateWithdrawalAddress = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var _rclient = require("../../services/rclient");

var validateWithdrawalAddress = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(address, user, t) {
    var failWithdrawalActivity, getAddressInfo, isInvalidAddress, isNodeOffline;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isInvalidAddress = false;
            isNodeOffline = false;
            _context.prev = 2;
            _context.next = 5;
            return (0, _rclient.getInstance)().validateAddress(address);

          case 5:
            getAddressInfo = _context.sent;
            console.log(getAddressInfo);

            if (getAddressInfo && !getAddressInfo.isvalid) {
              isInvalidAddress = true;
            }

            if (getAddressInfo && getAddressInfo.isvalid) {
              isInvalidAddress = false;
            }

            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            isNodeOffline = true;

          case 14:
            if (!getAddressInfo) {
              isInvalidAddress = true;
            }

            if (!(isInvalidAddress || isNodeOffline)) {
              _context.next = 19;
              break;
            }

            _context.next = 18;
            return _models["default"].activity.create({
              type: "withdraw_f",
              spenderId: user.id
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 18:
            failWithdrawalActivity = _context.sent;

          case 19:
            return _context.abrupt("return", [isInvalidAddress, isNodeOffline, failWithdrawalActivity]);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 11]]);
  }));

  return function validateWithdrawalAddress(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateWithdrawalAddress = validateWithdrawalAddress;