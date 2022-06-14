"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchItemDifficulty = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../models"));

var fetchItemDifficulty = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var options;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              order: [['id', 'ASC']]
            };
            res.locals.name = 'itemDifficulty';
            _context.next = 4;
            return _models["default"].itemDifficulty.count(options);

          case 4:
            res.locals.count = _context.sent;
            _context.next = 7;
            return _models["default"].itemDifficulty.findAll(options);

          case 7:
            res.locals.result = _context.sent;
            next();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchItemDifficulty(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchItemDifficulty = fetchItemDifficulty;