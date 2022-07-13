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

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
var removeNewTagFromBuffsAndDebuffs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCurrentCharacter, monsters, t) {
    var _iterator, _step, monsterToRemoveNewDebuffTag, _iterator4, _step4, monsterDebuff, _iterator5, _step5, monsterbuff, _iterator2, _step2, userBuff, _iterator3, _step3, userDebuff;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('start removing new tags from buffs & debuffs');
            _iterator = _createForOfIteratorHelper(monsters);
            _context.prev = 2;

            _iterator.s();

          case 4:
            if ((_step = _iterator.n()).done) {
              _context.next = 46;
              break;
            }

            monsterToRemoveNewDebuffTag = _step.value;

            if (!(monsterToRemoveNewDebuffTag.debuffs.length > 0)) {
              _context.next = 25;
              break;
            }

            _iterator4 = _createForOfIteratorHelper(monsterToRemoveNewDebuffTag.debuffs);
            _context.prev = 8;

            _iterator4.s();

          case 10:
            if ((_step4 = _iterator4.n()).done) {
              _context.next = 17;
              break;
            }

            monsterDebuff = _step4.value;

            if (!monsterDebuff["new"]) {
              _context.next = 15;
              break;
            }

            _context.next = 15;
            return monsterDebuff.update({
              "new": false
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 15:
            _context.next = 10;
            break;

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](8);

            _iterator4.e(_context.t0);

          case 22:
            _context.prev = 22;

            _iterator4.f();

            return _context.finish(22);

          case 25:
            if (!(monsterToRemoveNewDebuffTag.buffs.length > 0)) {
              _context.next = 44;
              break;
            }

            _iterator5 = _createForOfIteratorHelper(monsterToRemoveNewDebuffTag.buffs);
            _context.prev = 27;

            _iterator5.s();

          case 29:
            if ((_step5 = _iterator5.n()).done) {
              _context.next = 36;
              break;
            }

            monsterbuff = _step5.value;

            if (!monsterbuff["new"]) {
              _context.next = 34;
              break;
            }

            _context.next = 34;
            return monsterbuff.update({
              "new": false
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 34:
            _context.next = 29;
            break;

          case 36:
            _context.next = 41;
            break;

          case 38:
            _context.prev = 38;
            _context.t1 = _context["catch"](27);

            _iterator5.e(_context.t1);

          case 41:
            _context.prev = 41;

            _iterator5.f();

            return _context.finish(41);

          case 44:
            _context.next = 4;
            break;

          case 46:
            _context.next = 51;
            break;

          case 48:
            _context.prev = 48;
            _context.t2 = _context["catch"](2);

            _iterator.e(_context.t2);

          case 51:
            _context.prev = 51;

            _iterator.f();

            return _context.finish(51);

          case 54:
            if (!(userCurrentCharacter.buffs.length > 0)) {
              _context.next = 73;
              break;
            }

            _iterator2 = _createForOfIteratorHelper(userCurrentCharacter.buffs);
            _context.prev = 56;

            _iterator2.s();

          case 58:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 65;
              break;
            }

            userBuff = _step2.value;

            if (!userBuff["new"]) {
              _context.next = 63;
              break;
            }

            _context.next = 63;
            return userBuff.update({
              "new": false
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 63:
            _context.next = 58;
            break;

          case 65:
            _context.next = 70;
            break;

          case 67:
            _context.prev = 67;
            _context.t3 = _context["catch"](56);

            _iterator2.e(_context.t3);

          case 70:
            _context.prev = 70;

            _iterator2.f();

            return _context.finish(70);

          case 73:
            if (!(userCurrentCharacter.debuffs.length > 0)) {
              _context.next = 92;
              break;
            }

            _iterator3 = _createForOfIteratorHelper(userCurrentCharacter.debuffs);
            _context.prev = 75;

            _iterator3.s();

          case 77:
            if ((_step3 = _iterator3.n()).done) {
              _context.next = 84;
              break;
            }

            userDebuff = _step3.value;

            if (!userDebuff["new"]) {
              _context.next = 82;
              break;
            }

            _context.next = 82;
            return userDebuff.update({
              "new": false
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 82:
            _context.next = 77;
            break;

          case 84:
            _context.next = 89;
            break;

          case 86:
            _context.prev = 86;
            _context.t4 = _context["catch"](75);

            _iterator3.e(_context.t4);

          case 89:
            _context.prev = 89;

            _iterator3.f();

            return _context.finish(89);

          case 92:
            console.log('done removing new tag from buffs & debuffs');

          case 93:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 48, 51, 54], [8, 19, 22, 25], [27, 38, 41, 44], [56, 67, 70, 73], [75, 86, 89, 92]]);
  }));

  return function removeNewTagFromBuffsAndDebuffs(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = removeNewTagFromBuffsAndDebuffs;
exports["default"] = _default;