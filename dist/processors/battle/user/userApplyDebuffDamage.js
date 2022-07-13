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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userState, battleMonsterState, battle, stageFourInfoArray, t) {
    var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, monster, _iteratorAbruptCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, debuffToCountDown;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context2.prev = 2;
            _iterator = _asyncIterator(battleMonsterState);

          case 4:
            _context2.next = 6;
            return _iterator.next();

          case 6:
            if (!(_iteratorAbruptCompletion = !(_step = _context2.sent).done)) {
              _context2.next = 42;
              break;
            }

            monster = _step.value;

            if (!(monster.currentHp > 0)) {
              _context2.next = 39;
              break;
            }

            if (!(monster.debuffs.length > 0)) {
              _context2.next = 39;
              break;
            }

            _iteratorAbruptCompletion2 = false;
            _didIteratorError2 = false;
            _context2.prev = 12;
            _iterator2 = _asyncIterator(monster.debuffs);

          case 14:
            _context2.next = 16;
            return _iterator2.next();

          case 16:
            if (!(_iteratorAbruptCompletion2 = !(_step2 = _context2.sent).done)) {
              _context2.next = 23;
              break;
            }

            debuffToCountDown = _step2.value;

            if (!(!debuffToCountDown["new"] && debuffToCountDown.minDmg && debuffToCountDown.maxDmg)) {
              _context2.next = 20;
              break;
            }

            return _context2.delegateYield( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              var battleLogs, monstersToUpdate, updatedMonster, randomAttackDamage, createBattleLog, createKillLog;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      // console.log('debuff 2');
                      battleLogs = [];
                      monstersToUpdate = [];
                      updatedMonster = JSON.parse(JSON.stringify(monster));
                      randomAttackDamage = (0, _utils.randomIntFromInterval)(debuffToCountDown.minDmg, debuffToCountDown.maxDmg); // Get Random Monster Damage
                      // Generate Battle log

                      _context.next = 6;
                      return _models["default"].battleLog.create({
                        battleId: battle.id,
                        log: "".concat(updatedMonster.monster.name, " suffers from ").concat(debuffToCountDown.name, " for ").concat(randomAttackDamage, " damage")
                      }, {
                        lock: t.LOCK.UPDATE,
                        transaction: t
                      });

                    case 6:
                      createBattleLog = _context.sent;
                      battleLogs.unshift(JSON.parse(JSON.stringify(createBattleLog))); // console.log('debuff 6');

                      if (!(updatedMonster.currentHp < 1)) {
                        _context.next = 13;
                        break;
                      }

                      _context.next = 11;
                      return _models["default"].battleLog.create({
                        battleId: battle.id,
                        log: "".concat(userState.user.username, " killed ").concat(updatedMonster.monster.name)
                      }, {
                        lock: t.LOCK.UPDATE,
                        transaction: t
                      });

                    case 11:
                      createKillLog = _context.sent;
                      battleLogs.unshift(JSON.parse(JSON.stringify(createKillLog)));

                    case 13:
                      // console.log('debuff 7');
                      updatedMonster.currentHp -= randomAttackDamage;
                      monstersToUpdate.push(_objectSpread(_objectSpread({}, updatedMonster), {}, {
                        userDamage: randomAttackDamage,
                        // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
                        // died: !(updatedMonster.currentHp > 0),
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

                    case 17:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })(), "t0", 20);

          case 20:
            _iteratorAbruptCompletion2 = false;
            _context2.next = 14;
            break;

          case 23:
            _context2.next = 29;
            break;

          case 25:
            _context2.prev = 25;
            _context2.t1 = _context2["catch"](12);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t1;

          case 29:
            _context2.prev = 29;
            _context2.prev = 30;

            if (!(_iteratorAbruptCompletion2 && _iterator2["return"] != null)) {
              _context2.next = 34;
              break;
            }

            _context2.next = 34;
            return _iterator2["return"]();

          case 34:
            _context2.prev = 34;

            if (!_didIteratorError2) {
              _context2.next = 37;
              break;
            }

            throw _iteratorError2;

          case 37:
            return _context2.finish(34);

          case 38:
            return _context2.finish(29);

          case 39:
            _iteratorAbruptCompletion = false;
            _context2.next = 4;
            break;

          case 42:
            _context2.next = 48;
            break;

          case 44:
            _context2.prev = 44;
            _context2.t2 = _context2["catch"](2);
            _didIteratorError = true;
            _iteratorError = _context2.t2;

          case 48:
            _context2.prev = 48;
            _context2.prev = 49;

            if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
              _context2.next = 53;
              break;
            }

            _context2.next = 53;
            return _iterator["return"]();

          case 53:
            _context2.prev = 53;

            if (!_didIteratorError) {
              _context2.next = 56;
              break;
            }

            throw _iteratorError;

          case 56:
            return _context2.finish(53);

          case 57:
            return _context2.finish(48);

          case 58:
            return _context2.abrupt("return", [stageFourInfoArray, battleMonsterState, userState]);

          case 59:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 44, 48, 58], [12, 25, 29, 39], [30,, 34, 38], [49,, 53, 57]]);
  }));

  return function userApplyDebuffDamage(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var _default = userApplyDebuffDamage;
exports["default"] = _default;