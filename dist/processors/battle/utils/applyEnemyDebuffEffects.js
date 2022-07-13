"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable no-restricted-syntax */
var applyEnemyDebuffEffects = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(battleMonsterState) {
    var i, _iterator, _step, debuff;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Apply Armor Debuff if exists
            for (i = 0; i < battleMonsterState.length; i++) {
              if (battleMonsterState[i].debuffs && battleMonsterState[i].debuffs.length > 0) {
                _iterator = _createForOfIteratorHelper(battleMonsterState[i].debuffs);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    debuff = _step.value;

                    if (debuff.reducedArmor) {
                      battleMonsterState[i].monster.armor = Math.round(battleMonsterState[i].monster.defense - battleMonsterState[i].monster.defense / 100 * debuff.reducedArmor);
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }
            }

            return _context.abrupt("return", [battleMonsterState]);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function applyEnemyDebuffEffects(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = applyEnemyDebuffEffects;
exports["default"] = _default;