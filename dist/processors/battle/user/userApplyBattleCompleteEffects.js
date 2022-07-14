"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

/* eslint-disable no-await-in-loop */
var userApplyBattleCompleteEffects = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(stageSevenInfoArray, userState, battle, totalHealedByLifeSteal, saveToDatabasePromises, t) {
    var relieve, battleLogs, percentageHealed, totalRelieveHealing, log;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(userState);
            console.log('userState');

            if (userState["class"].name === 'Warrior') {
              relieve = userState.UserClassSkills.find(function (element) {
                return element.skill.name === 'Relieve';
              });

              if (relieve) {
                battleLogs = [];
                percentageHealed = 10 + (relieve.points - 1) * 1;
                totalRelieveHealing = Math.round(userState.hp.max / 100 * percentageHealed);
                totalHealedByLifeSteal += totalRelieveHealing;
                userState.hp.current = userState.hp.current + totalRelieveHealing > userState.hp.max ? userState.hp.max : userState.hp.current + totalRelieveHealing; // Create Battle Log

                log = "Relieve healed ".concat(userState.user.username, " for ").concat(totalRelieveHealing);
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
                stageSevenInfoArray.push({
                  battleLogs: battleLogs,
                  monstersToUpdate: [],
                  receivedHeal: totalRelieveHealing,
                  userState: JSON.parse(JSON.stringify(userState))
                });
              }
            }

            return _context.abrupt("return", [stageSevenInfoArray, userState, totalHealedByLifeSteal, saveToDatabasePromises]);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userApplyBattleCompleteEffects(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

var _default = userApplyBattleCompleteEffects;
exports["default"] = _default;