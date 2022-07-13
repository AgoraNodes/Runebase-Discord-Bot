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

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var userApplyDebuffAoE = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, battleMonsterState, stageOneInfoArray, battle, useAttack, selectedMonsterId, saveToDatabasePromises, t) {
    var battleLogs, monstersToUpdate, selectedMonster, _iterator, _step, _loop;

    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            battleLogs = [];
            monstersToUpdate = [];
            selectedMonster = battleMonsterState.find(function (element) {
              return element.id === selectedMonsterId;
            }); // Apply ALL AOE Debuffs here

            _iterator = _createForOfIteratorHelper(battleMonsterState);
            _context2.prev = 4;
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
              var battleMonster, BattleMonsterToUpdate, existingDebuff, index, debuffObject, log;
              return _regenerator["default"].wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      battleMonster = _step.value;
                      BattleMonsterToUpdate = JSON.parse(JSON.stringify(battleMonster));

                      if (!(battleMonster.currentHp > 0)) {
                        _context.next = 17;
                        break;
                      }

                      existingDebuff = battleMonster.debuffs.find(function (x) {
                        return x.name === useAttack.name;
                      });

                      if (!existingDebuff) {
                        _context.next = 9;
                        break;
                      }

                      _context.next = 7;
                      return _models["default"].debuff.destroy({
                        where: {
                          id: existingDebuff.id
                        },
                        lock: t.LOCK.UPDATE,
                        transaction: t
                      });

                    case 7:
                      index = BattleMonsterToUpdate.debuffs.findIndex(function (o) {
                        return o.id === existingDebuff.id;
                      });
                      if (index !== -1) BattleMonsterToUpdate.debuffs.splice(index, 1);

                    case 9:
                      debuffObject = {
                        name: useAttack.name,
                        "new": true,
                        rounds: useAttack.rounds,
                        BattleMonsterId: battleMonster.id,
                        reducedArmor: useAttack.reducedArmor ? useAttack.reducedArmor : null,
                        minDmg: useAttack.min ? useAttack.min : null,
                        maxDmg: useAttack.max ? useAttack.max : null,
                        stun: useAttack.stun ? useAttack.stun : null
                      };
                      saveToDatabasePromises.push(new Promise(function (resolve, reject) {
                        _models["default"].debuff.create(debuffObject, {
                          lock: t.LOCK.UPDATE,
                          transaction: t
                        }).then(function () {
                          return resolve();
                        });
                      }));
                      BattleMonsterToUpdate.debuffs.unshift(debuffObject);
                      battleMonsterState = battleMonsterState.map(function (obj) {
                        return [BattleMonsterToUpdate].find(function (o) {
                          return o.id === obj.id;
                        }) || obj;
                      });
                      monstersToUpdate.push(_objectSpread(_objectSpread({}, BattleMonsterToUpdate), {}, {
                        userDamage: useAttack.name,
                        attackType: useAttack.name
                      })); // Generate Battle Log

                      log = "".concat(userState.user.username, " used ").concat(useAttack.name, " on ").concat(selectedMonster.monster.name);
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

                    case 17:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop);
            });

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context2.next = 11;
              break;
            }

            return _context2.delegateYield(_loop(), "t0", 9);

          case 9:
            _context2.next = 7;
            break;

          case 11:
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t1 = _context2["catch"](4);

            _iterator.e(_context2.t1);

          case 16:
            _context2.prev = 16;

            _iterator.f();

            return _context2.finish(16);

          case 19:
            userState.mp.current -= useAttack.cost;
            stageOneInfoArray.push({
              monsterId: selectedMonsterId,
              monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
              useAttack: useAttack,
              battleLogs: battleLogs,
              userState: JSON.parse(JSON.stringify(userState))
            });
            return _context2.abrupt("return", [stageOneInfoArray, userState, battleMonsterState, saveToDatabasePromises]);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, null, [[4, 13, 16, 19]]);
  }));

  return function userApplyDebuffAoE(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

var _default = userApplyDebuffAoE;
exports["default"] = _default;