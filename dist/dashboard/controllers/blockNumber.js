"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchBlockNumber = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var _settings = _interopRequireDefault(require("../../config/settings"));

var _rclient = require("../../services/rclient");

var fetchBlockNumber = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var response, dbBlockNumber;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _rclient.getInstance)().getBlockCount();

          case 2:
            response = _context.sent;
            _context.next = 5;
            return _models["default"].block.findOne({
              order: [['id', 'DESC']]
            });

          case 5:
            dbBlockNumber = _context.sent;
            res.locals.name = 'blockNumber';
            res.locals.result = {
              blockNumberNode: response,
              blockNumberDb: dbBlockNumber.id
            };
            next();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchBlockNumber(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchBlockNumber = fetchBlockNumber;