"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

var _utils = require("../../../helpers/utils");

var isFailedAttack = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, lvl, block, defense, regularAttack, battle, battleLogs, remainingMonster, useAttack, saveToDatabasePromises, t) {
    var individualBattleObject, attackFailed, randomMonsterAttackRating, monsterHitChance, isBlocked, isParried, isNotMissed, log, _log, _log2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // TODO: Maybe resist attacks based on resistance? (if attackType === 'Fire' then some logic)
            attackFailed = false;
            randomMonsterAttackRating = (0, _utils.randomIntFromInterval)(useAttack.minAr, useAttack.maxAr); // Get Random Monster Damage

            if (useAttack.damageType.name === 'Physical') {
              // Chance To Hit = 200% * {AR / (AR + DR)} * {Alvl / (Alvl + Dlvl)}
              // AR = Attacker's Attack Rating
              // DR = Defender's Defense rating
              // Alvl = Attacker's level
              // Dlvl = Defender's level
              monsterHitChance = 200 * (randomMonsterAttackRating / (randomMonsterAttackRating + defense)) * (remainingMonster.monster.level / (remainingMonster.monster.level + lvl)) * 100;
              isBlocked = Math.random() < Number(block) / 100; // Did We block the attack?

              isParried = Math.random() < Number(regularAttack.parry) / 100; // Did We parry the attack?

              isNotMissed = Math.random() < Number(monsterHitChance) / 100; // Did Monster hit user?

              if (!isNotMissed) {
                log = "".concat(remainingMonster.monster.name, " ").concat(useAttack.name, " missed ").concat(userState.user.username);
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
                individualBattleObject = {
                  monsterId: remainingMonster.id,
                  attackType: 'Missed',
                  damage: 0,
                  userState: JSON.parse(JSON.stringify(userState)),
                  useAttack: useAttack,
                  battleLogs: battleLogs,
                  monstersToUpdate: []
                };
                attackFailed = true;
              } else if (isBlocked) {
                _log = "".concat(userState.user.username, " blocked ").concat(remainingMonster.monster.name, " ").concat(useAttack.name);
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
                individualBattleObject = {
                  monsterId: remainingMonster.id,
                  attackType: 'Blocked',
                  damage: 0,
                  userState: JSON.parse(JSON.stringify(userState)),
                  useAttack: useAttack,
                  battleLogs: battleLogs,
                  monstersToUpdate: []
                };
                attackFailed = true;
              } else if (isParried) {
                _log2 = "".concat(userState.user.username, " parried ").concat(remainingMonster.monster.name, " ").concat(useAttack.name);
                saveToDatabasePromises.push(new Promise(function (resolve, reject) {
                  _models["default"].battleLog.create({
                    battleId: battle.id,
                    log: _log2
                  }, {
                    lock: t.LOCK.UPDATE,
                    transaction: t
                  }).then(function () {
                    return resolve();
                  });
                }));
                battleLogs.unshift({
                  log: _log2
                });
                individualBattleObject = {
                  monsterId: remainingMonster.id,
                  attackType: 'Parried',
                  damage: 0,
                  userState: JSON.parse(JSON.stringify(userState)),
                  useAttack: useAttack,
                  battleLogs: battleLogs,
                  monstersToUpdate: []
                };
                attackFailed = true;
              }
            }

            return _context.abrupt("return", [individualBattleObject, attackFailed, saveToDatabasePromises]);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isFailedAttack(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref.apply(this, arguments);
  };
}();

var _default = isFailedAttack;
exports["default"] = _default;