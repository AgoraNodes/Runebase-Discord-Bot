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

var userApplyPreBuffBattleChance = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, // Current User State
  allRoundEffectsInfoArray, battleMonsterState, stageZeroInfoArray, // Array to fill with battle info
  battle, // battle database record
  useAttack, // Which attack is used by user
  selectedMonsterId, // which Monster do we have selected?
  saveToDatabasePromises, t // database transaction
  ) {
    var battleLogs, monstersToUpdate, selectedMonster, _iterator, _step, battleMonster, effects, _iterator2, _step2, debuff, isUnitStunned;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            battleLogs = [];
            monstersToUpdate = [];
            selectedMonster = battleMonsterState.find(function (element) {
              return element.id === selectedMonsterId;
            }); // Apply ALL AOE Debuffs here

            _iterator = _createForOfIteratorHelper(battleMonsterState);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                battleMonster = _step.value;
                effects = [];

                if (battleMonster.currentHp > 0) {
                  if (battleMonster.debuffs.length > 0) {
                    _iterator2 = _createForOfIteratorHelper(battleMonster.debuffs);

                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        debuff = _step2.value;

                        if (debuff.stun) {
                          isUnitStunned = Math.random() < Number(debuff.chance) / 100;

                          if (isUnitStunned) {
                            (function () {
                              // Generate Battle log
                              var log = "".concat(battleMonster.monster.name, " was stunned by ").concat(debuff.name);
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
                              effects.push('Stunned');
                            })();
                          }
                        }
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  }
                }

                allRoundEffectsInfoArray.push.apply(allRoundEffectsInfoArray, effects);

                if (effects.length > 0) {
                  monstersToUpdate.push(_objectSpread(_objectSpread({}, battleMonster), {}, {
                    stunned: true,
                    attackType: useAttack.name,
                    effects: effects
                  }));
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            battleMonsterState = battleMonsterState.map(function (obj) {
              return monstersToUpdate.find(function (o) {
                return o.id === obj.id;
              }) || obj;
            });
            stageZeroInfoArray.push({
              monsterId: selectedMonster.id,
              monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
              useAttack: useAttack,
              battleLogs: battleLogs,
              userState: JSON.parse(JSON.stringify(userState))
            });
            return _context.abrupt("return", [stageZeroInfoArray, userState, allRoundEffectsInfoArray, battleMonsterState, saveToDatabasePromises]);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userApplyPreBuffBattleChance(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
    return _ref.apply(this, arguments);
  };
}();

var _default = userApplyPreBuffBattleChance;
exports["default"] = _default;