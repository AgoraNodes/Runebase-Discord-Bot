"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isFailedAttack = _interopRequireDefault(require("./isFailedAttack"));

var _utils = require("../../../helpers/utils");

var _models = _interopRequireDefault(require("../../../models"));

var _calculateCritDamage3 = _interopRequireDefault(require("../utils/calculateCritDamage"));

var _utils2 = require("../utils/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var userApplyRetliation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, totalHealedByLifeSteal, saveToDatabasePromises, battleMonsterState, allRoundEffectsInfoArray, battle, retaliationArray, stageThreeInfoArray, useAttack, lvl, t) {
    var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context2.prev = 2;
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
              var retaliation, battleLogs, monstersToUpdate, attackFailed, lifeStolen, individualBattleObject, monster, updatedMonster, _yield$isFailedAttack, _yield$isFailedAttack2, randomAttackDamage, didWeCrit, _calculateCritDamage, _calculateCritDamage2, log, _log, addAmountLife;

              return _regenerator["default"].wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      retaliation = _step.value;
                      battleLogs = [];
                      monstersToUpdate = [];
                      attackFailed = true;
                      lifeStolen = false;
                      individualBattleObject = void 0;
                      monster = battleMonsterState.find(function (x) {
                        return x.id === retaliation.monsterId;
                      });

                      if (!(monster && monster.currentHp > 0)) {
                        _context.next = 24;
                        break;
                      }

                      updatedMonster = JSON.parse(JSON.stringify(monster));
                      _context.next = 11;
                      return (0, _isFailedAttack["default"])(userState, lvl, useAttack, battle, battleLogs, updatedMonster, monstersToUpdate, saveToDatabasePromises, t);

                    case 11:
                      _yield$isFailedAttack = _context.sent;
                      _yield$isFailedAttack2 = (0, _slicedToArray2["default"])(_yield$isFailedAttack, 4);
                      battleLogs = _yield$isFailedAttack2[0];
                      monstersToUpdate = _yield$isFailedAttack2[1];
                      attackFailed = _yield$isFailedAttack2[2];
                      saveToDatabasePromises = _yield$isFailedAttack2[3];

                      if (!attackFailed) {
                        randomAttackDamage = (0, _utils.randomIntFromInterval)(useAttack.min, useAttack.max); // Get Random Damage

                        lifeStolen = (0, _utils2.lifeSteal)(randomAttackDamage, useAttack.lifeSteal);
                        didWeCrit = false;
                        _calculateCritDamage = (0, _calculateCritDamage3["default"])(randomAttackDamage, useAttack.crit);
                        _calculateCritDamage2 = (0, _slicedToArray2["default"])(_calculateCritDamage, 2);
                        didWeCrit = _calculateCritDamage2[0];
                        randomAttackDamage = _calculateCritDamage2[1];
                        // Generate Battle log
                        log = "".concat(userState.UserGroup.user.username, " used ").concat(useAttack.name, " on ").concat(updatedMonster.monster.name, " for ").concat(randomAttackDamage, " damage");
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
                          _log = "".concat(userState.UserGroup.user.username, " killed ").concat(updatedMonster.monster.name);
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
                          didWeCrit: didWeCrit,
                          userDamage: randomAttackDamage,
                          attackType: useAttack.name
                        }));
                      }

                      battleMonsterState = battleMonsterState.map(function (obj) {
                        return monstersToUpdate.find(function (o) {
                          return o.id === obj.id;
                        }) || obj;
                      });
                      totalHealedByLifeSteal += lifeStolen || 0;
                      addAmountLife = lifeStolen || 0;
                      userState.hp.current = userState.hp.current + addAmountLife > userState.hp.max ? userState.hp.max : userState.hp.current + addAmountLife;
                      individualBattleObject = {
                        monsterId: updatedMonster.id,
                        monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
                        userState: JSON.parse(JSON.stringify(userState)),
                        battleLogs: battleLogs,
                        useAttack: useAttack,
                        receivedHeal: lifeStolen || false
                      };
                      stageThreeInfoArray.push(individualBattleObject);

                    case 24:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop);
            });
            _iterator = _asyncIterator(retaliationArray);

          case 5:
            _context2.next = 7;
            return _iterator.next();

          case 7:
            if (!(_iteratorAbruptCompletion = !(_step = _context2.sent).done)) {
              _context2.next = 12;
              break;
            }

            return _context2.delegateYield(_loop(), "t0", 9);

          case 9:
            _iteratorAbruptCompletion = false;
            _context2.next = 5;
            break;

          case 12:
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t1 = _context2["catch"](2);
            _didIteratorError = true;
            _iteratorError = _context2.t1;

          case 18:
            _context2.prev = 18;
            _context2.prev = 19;

            if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
              _context2.next = 23;
              break;
            }

            _context2.next = 23;
            return _iterator["return"]();

          case 23:
            _context2.prev = 23;

            if (!_didIteratorError) {
              _context2.next = 26;
              break;
            }

            throw _iteratorError;

          case 26:
            return _context2.finish(23);

          case 27:
            return _context2.finish(18);

          case 28:
            return _context2.abrupt("return", [stageThreeInfoArray, userState, battleMonsterState, allRoundEffectsInfoArray, totalHealedByLifeSteal, saveToDatabasePromises]);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, null, [[2, 14, 18, 28], [19,, 23, 27]]);
  }));

  return function userApplyRetliation(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref.apply(this, arguments);
  };
}();

var _default = userApplyRetliation;
exports["default"] = _default;