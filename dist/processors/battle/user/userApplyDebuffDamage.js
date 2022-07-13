"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../../../helpers/utils");

var _models = _interopRequireDefault(require("../../../models"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var userApplyDebuffDamage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, battleMonsterState, saveToDatabasePromises, battle, stageFourInfoArray, t) {
    var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, monster, _iteratorAbruptCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, debuffToCountDown;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context.prev = 2;
            _iterator = _asyncIterator(battleMonsterState);

          case 4:
            _context.next = 6;
            return _iterator.next();

          case 6:
            if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
              _context.next = 41;
              break;
            }

            monster = _step.value;

            if (!(monster.currentHp > 0)) {
              _context.next = 38;
              break;
            }

            if (!(monster.debuffs.length > 0)) {
              _context.next = 38;
              break;
            }

            _iteratorAbruptCompletion2 = false;
            _didIteratorError2 = false;
            _context.prev = 12;
            _iterator2 = _asyncIterator(monster.debuffs);

          case 14:
            _context.next = 16;
            return _iterator2.next();

          case 16:
            if (!(_iteratorAbruptCompletion2 = !(_step2 = _context.sent).done)) {
              _context.next = 22;
              break;
            }

            debuffToCountDown = _step2.value;

            if (!debuffToCountDown["new"] && debuffToCountDown.minDmg && debuffToCountDown.maxDmg) {
              (function () {
                var battleLogs = [];
                var monstersToUpdate = [];
                var updatedMonster = JSON.parse(JSON.stringify(monster));
                var randomAttackDamage = (0, _utils.randomIntFromInterval)(debuffToCountDown.minDmg, debuffToCountDown.maxDmg); // Get Random Monster Damage
                // Generate Battle log

                var log = "".concat(updatedMonster.monster.name, " suffers from ").concat(debuffToCountDown.name, " for ").concat(randomAttackDamage, " damage");
                saveToDatabasePromises.push(new Promise(function (resolve, reject) {
                  _models["default"].battleLog.create({
                    battleId: battle.id,
                    log: log
                  }, {
                    lock: t.LOCK.UPDATE,
                    transaction: t
                  }).then(function () {
                    return resolve();
                  });
                }));
                battleLogs.unshift({
                  log: log
                });

                if (updatedMonster.currentHp < 1) {
                  var _log = "".concat(userState.user.username, " killed ").concat(updatedMonster.monster.name);

                  saveToDatabasePromises.push(new Promise(function (resolve, reject) {
                    _models["default"].battleLog.create({
                      battleId: battle.id,
                      log: _log
                    }, {
                      lock: t.LOCK.UPDATE,
                      transaction: t
                    }).then(function () {
                      return resolve();
                    });
                  }));
                  battleLogs.unshift({
                    log: _log
                  });
                }

                updatedMonster.currentHp -= randomAttackDamage;
                monstersToUpdate.push(_objectSpread(_objectSpread({}, updatedMonster), {}, {
                  userDamage: randomAttackDamage,
                  attackType: debuffToCountDown.name
                }));
                battleMonsterState = battleMonsterState.map(function (obj) {
                  return monstersToUpdate.find(function (o) {
                    return o.id === obj.id;
                  }) || obj;
                });
                stageFourInfoArray.push({
                  monsterId: updatedMonster.id,
                  monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
                  battleLogs: battleLogs,
                  userState: JSON.parse(JSON.stringify(userState)),
                  ranged: false
                });
              })();
            }

          case 19:
            _iteratorAbruptCompletion2 = false;
            _context.next = 14;
            break;

          case 22:
            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](12);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 28:
            _context.prev = 28;
            _context.prev = 29;

            if (!(_iteratorAbruptCompletion2 && _iterator2["return"] != null)) {
              _context.next = 33;
              break;
            }

            _context.next = 33;
            return _iterator2["return"]();

          case 33:
            _context.prev = 33;

            if (!_didIteratorError2) {
              _context.next = 36;
              break;
            }

            throw _iteratorError2;

          case 36:
            return _context.finish(33);

          case 37:
            return _context.finish(28);

          case 38:
            _iteratorAbruptCompletion = false;
            _context.next = 4;
            break;

          case 41:
            _context.next = 47;
            break;

          case 43:
            _context.prev = 43;
            _context.t1 = _context["catch"](2);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 47:
            _context.prev = 47;
            _context.prev = 48;

            if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
              _context.next = 52;
              break;
            }

            _context.next = 52;
            return _iterator["return"]();

          case 52:
            _context.prev = 52;

            if (!_didIteratorError) {
              _context.next = 55;
              break;
            }

            throw _iteratorError;

          case 55:
            return _context.finish(52);

          case 56:
            return _context.finish(47);

          case 57:
            return _context.abrupt("return", [stageFourInfoArray, battleMonsterState, userState, saveToDatabasePromises]);

          case 58:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 43, 47, 57], [12, 24, 28, 38], [29,, 33, 37], [48,, 52, 56]]);
  }));

  return function userApplyDebuffDamage(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

var _default = userApplyDebuffDamage;
exports["default"] = _default;