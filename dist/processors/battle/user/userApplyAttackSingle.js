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

var userApplyAttackSingle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, // Current User State
  battleMonsterState, allRoundEffectsInfoArray, totalHealedByLifeSteal, lvl, // Users Level
  stageOneInfoArray, // Array to fill with battle info
  battle, // battle database record
  useAttack, // Which attack is used by user
  selectedMonsterId, // which Monster do we have selected?
  saveToDatabasePromises, t // database transaction
  ) {
    var battleLogs, monstersToUpdate, attackFailed, lifeStolen, updatedMonster, _yield$isFailedAttack, _yield$isFailedAttack2, randomAttackDamage, didUserCrit, _calculateCritDamage, _calculateCritDamage2, didUserStun, log, _log, addAmountLife;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            battleLogs = [];
            monstersToUpdate = [];
            attackFailed = true;
            lifeStolen = false; // APPLY USER Single MONSTER attack

            updatedMonster = battleMonsterState.find(function (element) {
              return element.id === selectedMonsterId;
            });
            _context.next = 7;
            return (0, _isFailedAttack["default"])(userState, lvl, useAttack, battle, battleLogs, updatedMonster, monstersToUpdate, saveToDatabasePromises, t);

          case 7:
            _yield$isFailedAttack = _context.sent;
            _yield$isFailedAttack2 = (0, _slicedToArray2["default"])(_yield$isFailedAttack, 4);
            battleLogs = _yield$isFailedAttack2[0];
            monstersToUpdate = _yield$isFailedAttack2[1];
            attackFailed = _yield$isFailedAttack2[2];
            saveToDatabasePromises = _yield$isFailedAttack2[3];

            // TODO: Apply Damage reductions? based on attackType (useAttack.attackType)
            if (!attackFailed) {
              console.log('Stage #1 - Attack Not Failed (User Attacking)');
              randomAttackDamage = (0, _utils.randomIntFromInterval)(useAttack.min, useAttack.max); // Random attack damage between min-max

              lifeStolen = (0, _utils2.lifeSteal)(randomAttackDamage, useAttack.lifeSteal); // Test Crit

              didUserCrit = false;
              _calculateCritDamage = (0, _calculateCritDamage3["default"])(randomAttackDamage, useAttack.crit);
              _calculateCritDamage2 = (0, _slicedToArray2["default"])(_calculateCritDamage, 2);
              didUserCrit = _calculateCritDamage2[0];
              randomAttackDamage = _calculateCritDamage2[1];
              console.log('Stage #1 - After Calculating User Crit Damage'); // Test Stun

              didUserStun = Math.random() < Number(useAttack.stun) / 100;
              updatedMonster.currentHp -= randomAttackDamage; // Generate Battle log

              console.log('Stage #1 - Generating Battle Logs');
              log = "".concat(userState.UserGroup.user.username, " used ").concat(useAttack.name, " on ").concat(updatedMonster.monster.name, " for ").concat(randomAttackDamage, " damage").concat(didUserCrit ? ' (crit)' : '');
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

              if (updatedMonster.stunned) {
                allRoundEffectsInfoArray.push('Stunned');
              }

              monstersToUpdate.push(_objectSpread(_objectSpread({}, updatedMonster), {}, {
                didUserCrit: didUserCrit,
                stunned: updatedMonster.stunned ? true : didUserStun,
                userDamage: randomAttackDamage,
                attackType: useAttack.name
              }));
            }

            battleMonsterState = battleMonsterState.map(function (obj) {
              return monstersToUpdate.find(function (o) {
                return o.id === obj.id;
              }) || obj;
            });
            userState.mp.current -= useAttack.cost;
            totalHealedByLifeSteal += lifeStolen || 0;
            addAmountLife = lifeStolen || 0;
            userState.hp.current = userState.hp.current + addAmountLife > userState.hp.max ? userState.hp.max : userState.hp.current + addAmountLife;
            stageOneInfoArray.push({
              monsterId: updatedMonster.id,
              monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
              useAttack: useAttack,
              battleLogs: battleLogs,
              receivedHeal: lifeStolen || false,
              userState: JSON.parse(JSON.stringify(userState))
            });
            console.log('Stage #1 - Returning Values');
            return _context.abrupt("return", [stageOneInfoArray, userState, battleMonsterState, allRoundEffectsInfoArray, totalHealedByLifeSteal, saveToDatabasePromises]);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userApplyAttackSingle(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref.apply(this, arguments);
  };
}();

var _default = userApplyAttackSingle;
exports["default"] = _default;