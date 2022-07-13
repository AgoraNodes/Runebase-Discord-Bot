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

var _models = _interopRequireDefault(require("../../../models"));

var _utils = require("../../../helpers/utils");

var _isFailedAttack = _interopRequireDefault(require("./isFailedAttack"));

var _calculateCritDamage3 = _interopRequireDefault(require("../utils/calculateCritDamage"));

var _utils2 = require("../utils/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var userApplyAttackAoE = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, // Current User State
  battleMonsterState, allRoundEffectsInfoArray, totalHealedByLifeSteal, lvl, // Users Level
  stageOneInfoArray, // Array to fill with battle info
  battle, // battle database record
  useAttack, // Which attack is used by user
  selectedMonsterId, // which Monster do we have selected?
  saveToDatabasePromises, t // database transaction
  ) {
    var battleLogs, monstersToUpdate, attackFailed, lifeStolen, _iterator, _step, battleMonster, updatedMonster, _yield$isFailedAttack, _yield$isFailedAttack2, addAmountLife;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            battleLogs = [];
            monstersToUpdate = [];
            attackFailed = true;
            lifeStolen = false; // let totalLifeStolen = 0;
            // Apply ALL AOE Debuffs here

            _iterator = _createForOfIteratorHelper(battleMonsterState);
            _context.prev = 5;

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context.next = 22;
              break;
            }

            battleMonster = _step.value;
            updatedMonster = battleMonster;

            if (!(updatedMonster.currentHp > 0)) {
              _context.next = 20;
              break;
            }

            _context.next = 13;
            return (0, _isFailedAttack["default"])(userState, lvl, useAttack, battle, battleLogs, updatedMonster, monstersToUpdate, saveToDatabasePromises, t);

          case 13:
            _yield$isFailedAttack = _context.sent;
            _yield$isFailedAttack2 = (0, _slicedToArray2["default"])(_yield$isFailedAttack, 4);
            battleLogs = _yield$isFailedAttack2[0];
            monstersToUpdate = _yield$isFailedAttack2[1];
            attackFailed = _yield$isFailedAttack2[2];
            saveToDatabasePromises = _yield$isFailedAttack2[3];

            // TODO: Apply Damage reductions? based on attackType (useAttack.attackType)
            if (!attackFailed) {
              (function () {
                // Apply Damage to monster
                var randomAttackDamage = (0, _utils.randomIntFromInterval)(useAttack.min, useAttack.max); // Random attack damage between min-max

                lifeStolen += (0, _utils2.lifeSteal)(randomAttackDamage, useAttack.lifeSteal);
                var didUserCrit = false;

                var _calculateCritDamage = (0, _calculateCritDamage3["default"])(randomAttackDamage, useAttack.crit);

                var _calculateCritDamage2 = (0, _slicedToArray2["default"])(_calculateCritDamage, 2);

                didUserCrit = _calculateCritDamage2[0];
                randomAttackDamage = _calculateCritDamage2[1];
                // Test Stun
                var didUserStun = Math.random() < Number(useAttack.stun) / 100;
                updatedMonster.currentHp -= randomAttackDamage; // Generate Battle log

                var log = "".concat(userState.user.username, " used ").concat(useAttack.name, " on ").concat(updatedMonster.monster.name, " for ").concat(randomAttackDamage, " damage").concat(didUserCrit ? ' (crit)' : '');
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
                } // Push new monster state


                if (updatedMonster.stunned) {
                  allRoundEffectsInfoArray.push('Stunned');
                }

                monstersToUpdate.push(_objectSpread(_objectSpread({}, updatedMonster), {}, {
                  didUserCrit: didUserCrit,
                  stunned: updatedMonster.stunned ? true : didUserStun,
                  userDamage: randomAttackDamage,
                  attackType: useAttack.name
                }));
              })();
            }

          case 20:
            _context.next = 7;
            break;

          case 22:
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](5);

            _iterator.e(_context.t0);

          case 27:
            _context.prev = 27;

            _iterator.f();

            return _context.finish(27);

          case 30:
            // Replace old battlemonster state with new state
            battleMonsterState = battleMonsterState.map(function (obj) {
              return monstersToUpdate.find(function (o) {
                return o.id === obj.id;
              }) || obj;
            });
            totalHealedByLifeSteal += lifeStolen || 0;
            addAmountLife = lifeStolen || 0;
            userState.hp.current = userState.hp.current + addAmountLife > userState.hp.max ? userState.hp.max : userState.hp.current + addAmountLife; // Push into StageOneInfoArray -> Passed to rendering

            stageOneInfoArray.push({
              monsterId: selectedMonsterId,
              monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
              receivedHeal: lifeStolen || false,
              useAttack: useAttack,
              battleLogs: battleLogs,
              userState: JSON.parse(JSON.stringify(userState))
            });
            return _context.abrupt("return", [stageOneInfoArray, userState, battleMonsterState, allRoundEffectsInfoArray, totalHealedByLifeSteal, saveToDatabasePromises]);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 24, 27, 30]]);
  }));

  return function userApplyAttackAoE(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref.apply(this, arguments);
  };
}();

var _default = userApplyAttackAoE;
exports["default"] = _default;