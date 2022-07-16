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

var isFailedAttack = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, lvl, useAttack, battle, battleLogs, updatedMonster, updatedMonstersArray, saveToDatabasePromises, t) {
    var attackFailed, Alvl, userHitChance, isBlocked, isParried, isNotMissed, log, _log, _log2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // TODO: Maybe resist attacks based on resistance? (if attackType === 'Fire' then some logic)
            attackFailed = false;

            if (useAttack.attackType === 'Physical') {
              // Chance To Hit = 200% * {AR / (AR + DR)} * {Alvl / (Alvl + Dlvl)}
              // AR = Attacker's Attack Rating
              // DR = Defender's Defense rating
              // Alvl = Attacker's level
              // Dlvl = Defender's level
              Alvl = lvl > 0 ? lvl : 1;
              userHitChance = 200 * (useAttack.ar / (useAttack.ar + updatedMonster.monster.defense)) * (Alvl / (Alvl + updatedMonster.monster.level)) * 100;
              isBlocked = Math.random() < Number(updatedMonster.monster.block) / 100; // Did We block the attack?

              isParried = Math.random() < Number(updatedMonster.monster.parry) / 100; // Did monster parry the attack?

              isNotMissed = Math.random() < Number(userHitChance) / 100; // Did User hit monster?

              if (!isNotMissed) {
                updatedMonstersArray.push(_objectSpread(_objectSpread({}, updatedMonster), {}, {
                  userDamage: 'Missed',
                  attackType: 'Missed'
                })); // Create battleLog

                log = "".concat(userState.UserGroup.user.username, " ").concat(useAttack.name, " missed ").concat(updatedMonster.monster.name);
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
                attackFailed = true;
              } else if (isBlocked) {
                updatedMonstersArray.push(_objectSpread(_objectSpread({}, updatedMonster), {}, {
                  // the updated monster info
                  userDamage: 'Blocked',
                  // Damage to show on hit
                  attackType: 'Blocked' // TODO: Attack Type should be used to determin the animation to pick

                }));
                _log = "".concat(updatedMonster.monster.name, " blocked ").concat(userState.UserGroup.user.username, " ").concat(useAttack.name);
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
                attackFailed = true;
              } else if (isParried) {
                updatedMonstersArray.push(_objectSpread(_objectSpread({}, updatedMonster), {}, {
                  userDamage: 'Parried',
                  attackType: 'Parried'
                }));
                _log2 = "".concat(updatedMonster.monster.name, " parried ").concat(userState.UserGroup.user.username, " ").concat(useAttack.name);
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
                attackFailed = true;
              }
            }

            return _context.abrupt("return", [battleLogs, updatedMonstersArray, attackFailed, saveToDatabasePromises]);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isFailedAttack(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
    return _ref.apply(this, arguments);
  };
}();

var _default = isFailedAttack;
exports["default"] = _default;