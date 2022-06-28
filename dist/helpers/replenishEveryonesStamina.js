"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replenishEveryonesStamina = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var replenishEveryonesStamina = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var allUserCharacters, _iterator, _step, userChar;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].UserClass.findAll({
              include: [{
                model: _models["default"]["class"],
                as: 'class'
              }, {
                model: _models["default"].stats,
                as: 'stats'
              }, {
                model: _models["default"].condition,
                as: 'condition'
              }]
            });

          case 2:
            allUserCharacters = _context.sent;
            // eslint-disable-next-line no-restricted-syntax
            _iterator = _createForOfIteratorHelper(allUserCharacters);
            _context.prev = 4;

            _iterator.s();

          case 6:
            if ((_step = _iterator.n()).done) {
              _context.next = 15;
              break;
            }

            userChar = _step.value;
            console.log(userChar.condition);

            if (!(userChar.condition.stamina !== null)) {
              _context.next = 13;
              break;
            }

            if (!(userChar["class"].stamina + userChar.stats.stamina > userChar.condition.stamina)) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return userChar.condition.update({
              stamina: userChar["class"].stamina + userChar.stats.stamina
            });

          case 13:
            _context.next = 6;
            break;

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](4);

            _iterator.e(_context.t0);

          case 20:
            _context.prev = 20;

            _iterator.f();

            return _context.finish(20);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 17, 20, 23]]);
  }));

  return function replenishEveryonesStamina() {
    return _ref.apply(this, arguments);
  };
}();

exports.replenishEveryonesStamina = replenishEveryonesStamina;