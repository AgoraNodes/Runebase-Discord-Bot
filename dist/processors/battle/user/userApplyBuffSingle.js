"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../../../models"));

var userApplyBuffSingle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, allRoundBuffsInfoArray, stageOneInfoArray, battle, useAttack, selectedMonsterId, saveToDatabasePromises, t) {
    var battleLogs, existingBuff, index, buffObject, log;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            battleLogs = [];
            existingBuff = userState.buffs.find(function (x) {
              return x.name === useAttack.name;
            });

            if (!existingBuff) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return _models["default"].buff.destroy({
              where: {
                id: existingBuff.id
              },
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 5:
            index = userState.buffs.findIndex(function (o) {
              return o.id === existingBuff.id;
            });
            if (index !== -1) userState.buffs.splice(index, 1);

          case 7:
            if (!existingBuff) {
              allRoundBuffsInfoArray.push(useAttack.name);
            }

            buffObject = {
              name: useAttack.name,
              UserClassId: userState.id,
              damageBonus: useAttack.damageBonus ? useAttack.damageBonus : null,
              attackBonus: useAttack.attackBonus ? useAttack.attackBonus : null,
              defenseBonus: useAttack.defenseBonus ? useAttack.defenseBonus : null,
              parryBonus: useAttack.parryBonus ? useAttack.parryBonus : null,
              lifeBonus: useAttack.lifeBonus ? useAttack.lifeBonus : null,
              chance: useAttack.chance ? useAttack.chance : 100,
              "new": true,
              rounds: useAttack.rounds
            };
            saveToDatabasePromises.push(new Promise(function (resolve, reject) {
              _models["default"].buff.create(buffObject, {
                lock: t.LOCK.UPDATE,
                transaction: t
              }).then(function () {
                return resolve();
              });
            }));
            userState.buffs.unshift(buffObject);
            log = "".concat(userState.user.username, " used ").concat(useAttack.name);
            saveToDatabasePromises.push(new Promise(function (resolve, reject) {
              _models["default"].battleLog.create({
                battleId: battle.id,
                log: log
              }, {
                lock: t.LOCK.UPDATE,
                transaction: t
              }).then(resolve());
            }));
            battleLogs.unshift({
              log: log
            });
            userState.mp.current -= useAttack.cost;
            stageOneInfoArray.push({
              monsterId: selectedMonsterId,
              monstersToUpdate: [],
              useAttack: useAttack,
              battleLogs: battleLogs,
              userState: JSON.parse(JSON.stringify(userState))
            });
            console.log('done applying buff');
            return _context.abrupt("return", [stageOneInfoArray, userState, allRoundBuffsInfoArray, saveToDatabasePromises]);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userApplyBuffSingle(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

var _default = userApplyBuffSingle;
exports["default"] = _default;