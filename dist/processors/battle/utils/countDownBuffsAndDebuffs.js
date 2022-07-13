"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// TODO: Use Promises to push to database
var countDownBuffsAndDebuffs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(stageFiveInfoArray, userState, battleMonsterState, t) {
    var newUserBuffsArray, monstersToUpdate, _iterator, _step, monsterToCountDownDebuff, newBattleMonstersDebuffArrays, _iterator3, _step3, monsterDebuff, _iterator2, _step2, userBuff;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newUserBuffsArray = [];
            monstersToUpdate = []; // Count Down Debuffs

            _iterator = _createForOfIteratorHelper(battleMonsterState);
            _context.prev = 3;

            _iterator.s();

          case 5:
            if ((_step = _iterator.n()).done) {
              _context.next = 39;
              break;
            }

            monsterToCountDownDebuff = _step.value;

            if (!(monsterToCountDownDebuff.currentHp > 0)) {
              _context.next = 37;
              break;
            }

            newBattleMonstersDebuffArrays = [];

            if (!(monsterToCountDownDebuff.debuffs.length > 0)) {
              _context.next = 35;
              break;
            }

            _iterator3 = _createForOfIteratorHelper(monsterToCountDownDebuff.debuffs);
            _context.prev = 11;

            _iterator3.s();

          case 13:
            if ((_step3 = _iterator3.n()).done) {
              _context.next = 27;
              break;
            }

            monsterDebuff = _step3.value;

            if (monsterDebuff["new"]) {
              newBattleMonstersDebuffArrays.push(monsterDebuff);
            }

            if (!(monsterDebuff.rounds >= 1 && !monsterDebuff["new"])) {
              _context.next = 22;
              break;
            }

            _context.next = 19;
            return _models["default"].debuff.decrement('rounds', {
              by: 1,
              where: {
                id: monsterDebuff.id
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 19:
            newBattleMonstersDebuffArrays.push(_objectSpread(_objectSpread({}, monsterDebuff), {}, {
              rounds: monsterDebuff.rounds - 1
            }));
            _context.next = 25;
            break;

          case 22:
            if (!(monsterDebuff.rounds < 1)) {
              _context.next = 25;
              break;
            }

            _context.next = 25;
            return _models["default"].debuff.destroy({
              where: {
                id: monsterDebuff.id
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 25:
            _context.next = 13;
            break;

          case 27:
            _context.next = 32;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](11);

            _iterator3.e(_context.t0);

          case 32:
            _context.prev = 32;

            _iterator3.f();

            return _context.finish(32);

          case 35:
            monsterToCountDownDebuff.debuffs = newBattleMonstersDebuffArrays;
            monstersToUpdate.push(monsterToCountDownDebuff);

          case 37:
            _context.next = 5;
            break;

          case 39:
            _context.next = 44;
            break;

          case 41:
            _context.prev = 41;
            _context.t1 = _context["catch"](3);

            _iterator.e(_context.t1);

          case 44:
            _context.prev = 44;

            _iterator.f();

            return _context.finish(44);

          case 47:
            if (!(userState.buffs.length > 0)) {
              _context.next = 78;
              break;
            }

            _iterator2 = _createForOfIteratorHelper(userState.buffs);
            _context.prev = 49;

            _iterator2.s();

          case 51:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 70;
              break;
            }

            userBuff = _step2.value;

            if (!userBuff["new"]) {
              _context.next = 58;
              break;
            }

            console.log('user buff is new');
            newUserBuffsArray.push(userBuff);
            _context.next = 68;
            break;

          case 58:
            if (!(userBuff.rounds >= 1 && !userBuff["new"])) {
              _context.next = 65;
              break;
            }

            console.log('user buff is not new');
            newUserBuffsArray.push(_objectSpread(_objectSpread({}, userBuff), {}, {
              rounds: userBuff.rounds - 1
            }));
            _context.next = 63;
            return _models["default"].buff.decrement('rounds', {
              by: 1,
              where: {
                id: userBuff.id
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 63:
            _context.next = 68;
            break;

          case 65:
            if (!(userBuff.rounds <= 1)) {
              _context.next = 68;
              break;
            }

            _context.next = 68;
            return _models["default"].buff.destroy({
              where: {
                id: userBuff.id
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 68:
            _context.next = 51;
            break;

          case 70:
            _context.next = 75;
            break;

          case 72:
            _context.prev = 72;
            _context.t2 = _context["catch"](49);

            _iterator2.e(_context.t2);

          case 75:
            _context.prev = 75;

            _iterator2.f();

            return _context.finish(75);

          case 78:
            userState.buffs = newUserBuffsArray;
            stageFiveInfoArray.push({
              monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
              userState: JSON.parse(JSON.stringify(userState))
            });
            return _context.abrupt("return", [stageFiveInfoArray, userState, battleMonsterState]);

          case 81:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 41, 44, 47], [11, 29, 32, 35], [49, 72, 75, 78]]);
  }));

  return function countDownBuffsAndDebuffs(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _default = countDownBuffsAndDebuffs;
exports["default"] = _default;