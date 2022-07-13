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

var userApplyDebuffSingle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, battleMonsterState, stageOneInfoArray, battle, useAttack, selectedMonsterId, saveToDatabasePromises, t) {
    var battleLogs, updatedMonster, existingDebuff, index, debuffObject, log, monstersToUpdate;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            battleLogs = [];
            updatedMonster = battleMonsterState.find(function (element) {
              return element.id === selectedMonsterId;
            }); // Apply ALL Single Unit Debuffs here

            if (!(updatedMonster.currentHp > 0)) {
              _context.next = 15;
              break;
            }

            existingDebuff = updatedMonster.debuffs.find(function (x) {
              return x.name === useAttack.name;
            });

            if (!existingDebuff) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return existingDebuff.destroy({
              lock: t.LOCK.UPDATE,
              transaction: t
            });

          case 7:
            index = updatedMonster.debuffs.findIndex(function (o) {
              return o.id === existingDebuff.id;
            });
            if (index !== -1) updatedMonster.debuffs.splice(index, 1);

          case 9:
            debuffObject = {
              name: useAttack.name,
              "new": true,
              rounds: useAttack.rounds,
              BattleMonsterId: updatedMonster.id,
              reducedArmor: useAttack.reducedArmor ? useAttack.reducedArmor : null,
              minDmg: useAttack.min ? useAttack.min : null,
              maxDmg: useAttack.max ? useAttack.max : null
            };
            saveToDatabasePromises.push(new Promise(function (resolve, reject) {
              _models["default"].debuff.create(debuffObject, {
                lock: t.LOCK.UPDATE,
                transaction: t
              }).then(function () {
                return resolve();
              });
            }));
            updatedMonster.debuffs.unshift(debuffObject);
            log = "".concat(userState.user.username, " used ").concat(useAttack.name, " on ").concat(updatedMonster.monster.name);
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

          case 15:
            userState.mp.current -= useAttack.cost;
            monstersToUpdate = [_objectSpread(_objectSpread({}, updatedMonster), {}, {
              userDamage: useAttack.name,
              attackType: useAttack.name
            })];
            battleMonsterState = battleMonsterState.map(function (obj) {
              return monstersToUpdate.find(function (o) {
                return o.id === obj.id;
              }) || obj;
            });
            stageOneInfoArray.push({
              monsterId: updatedMonster.id,
              monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
              useAttack: useAttack,
              battleLogs: battleLogs,
              userState: JSON.parse(JSON.stringify(userState))
            });
            return _context.abrupt("return", [stageOneInfoArray, userState, battleMonsterState, saveToDatabasePromises]);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userApplyDebuffSingle(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

var _default = userApplyDebuffSingle;
exports["default"] = _default;