"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

var _utils = require("../../../helpers/utils");

var _pickRandomMonsterAttack = _interopRequireDefault(require("./pickRandomMonsterAttack"));

var _isFailedAttack = _interopRequireDefault(require("./isFailedAttack"));

var _calculateUserRetaliation = _interopRequireDefault(require("./calculateUserRetaliation"));

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var monstersApplyAttack = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, // Current User State
  saveToDatabasePromises, battleMonsterState, lvl, // Users Level
  block, // users Block
  defense, // Users defense
  regularAttack, // Users Regular Attack
  stageTwoInfoArray, // Array to fill with battle info
  battle, // battle database record
  t // database transaction
  ) {
    var totalDamageByMonsters, retaliationArray, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, remainingMonster, individualBattleObject, attackFailed, battleLogs, _pickRandomMonsterAtt, _pickRandomMonsterAtt2, useAttack, randomMonsterAttackDamage, _yield$isFailedAttack, _yield$isFailedAttack2, retaliate;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // const newUserState = JSON.parse(JSON.stringify(userState));
            // let currentUserHp = userCurrentCharacter.condition.life;
            totalDamageByMonsters = 0;
            retaliationArray = []; // eslint-disable-next-line no-restricted-syntax

            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context.prev = 4;
            _iterator = _asyncIterator(battleMonsterState);

          case 6:
            _context.next = 8;
            return _iterator.next();

          case 8:
            if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
              _context.next = 34;
              break;
            }

            remainingMonster = _step.value;

            if (!(remainingMonster.currentHp > 0 && !remainingMonster.stunned)) {
              _context.next = 31;
              break;
            }

            individualBattleObject = void 0;
            attackFailed = true;
            battleLogs = [];

            if (!(userState.hp.current > 0)) {
              _context.next = 31;
              break;
            }

            _pickRandomMonsterAtt = (0, _pickRandomMonsterAttack["default"])(remainingMonster), _pickRandomMonsterAtt2 = (0, _slicedToArray2["default"])(_pickRandomMonsterAtt, 1), useAttack = _pickRandomMonsterAtt2[0];
            randomMonsterAttackDamage = (0, _utils.randomIntFromInterval)(useAttack.minDmg, useAttack.maxDmg); // Get Random Monster Damage

            _context.next = 19;
            return (0, _isFailedAttack["default"])(userState, lvl, block, defense, regularAttack, battle, battleLogs, remainingMonster, useAttack, saveToDatabasePromises, t);

          case 19:
            _yield$isFailedAttack = _context.sent;
            _yield$isFailedAttack2 = (0, _slicedToArray2["default"])(_yield$isFailedAttack, 3);
            individualBattleObject = _yield$isFailedAttack2[0];
            attackFailed = _yield$isFailedAttack2[1];
            saveToDatabasePromises = _yield$isFailedAttack2[2];

            if (!attackFailed) {
              (function () {
                var log = "".concat(remainingMonster.monster.name, " used ").concat(useAttack.name, " on ").concat(userState.user.username, " for ").concat(randomMonsterAttackDamage, " damage");
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
                userState.hp.current -= randomMonsterAttackDamage;
                totalDamageByMonsters += randomMonsterAttackDamage;
                individualBattleObject = {
                  monsterId: remainingMonster.id,
                  useAttack: useAttack,
                  damage: randomMonsterAttackDamage,
                  userState: JSON.parse(JSON.stringify(userState)),
                  battleLogs: battleLogs,
                  monstersToUpdate: []
                };
              })();
            }

            if (userState.hp.current < 1) {
              (function () {
                var log = "".concat(remainingMonster.monster.name, " killed ").concat(userState.user.username);
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
              })();
            }

            stageTwoInfoArray.push(individualBattleObject);
            _context.next = 29;
            return (0, _calculateUserRetaliation["default"])(userState, remainingMonster.id);

          case 29:
            retaliate = _context.sent;

            if (retaliate && retaliate.length > 0) {
              retaliationArray.push.apply(retaliationArray, (0, _toConsumableArray2["default"])(retaliate));
            }

          case 31:
            _iteratorAbruptCompletion = false;
            _context.next = 6;
            break;

          case 34:
            _context.next = 40;
            break;

          case 36:
            _context.prev = 36;
            _context.t0 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 40:
            _context.prev = 40;
            _context.prev = 41;

            if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
              _context.next = 45;
              break;
            }

            _context.next = 45;
            return _iterator["return"]();

          case 45:
            _context.prev = 45;

            if (!_didIteratorError) {
              _context.next = 48;
              break;
            }

            throw _iteratorError;

          case 48:
            return _context.finish(45);

          case 49:
            return _context.finish(40);

          case 50:
            return _context.abrupt("return", [totalDamageByMonsters, userState, battleMonsterState, stageTwoInfoArray, retaliationArray, saveToDatabasePromises]);

          case 51:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 36, 40, 50], [41,, 45, 49]]);
  }));

  return function monstersApplyAttack(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10) {
    return _ref.apply(this, arguments);
  };
}();

var _default = monstersApplyAttack;
exports["default"] = _default;