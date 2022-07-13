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

/* eslint-disable no-restricted-syntax */
var removeNewTagFromBuffsAndDebuffs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userState, battleMonsterState, allRoundBuffsInfoArray, allRoundDebuffsInfoArray, saveToDatabasePromisesOne, t) {
    var monstersToUpdate, _iterator, _step, monsterToRemoveNewDebuffTag, updatedDebuffs, updatedBuffs, debuffs, _iterator4, _step4, _loop3, buffs, _iterator5, _step5, _loop4, newUserBuffsArray, newUserDebuffsArray, _iterator2, _step2, _loop, _iterator3, _step3, _loop2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            monstersToUpdate = []; // Remove Debuff "new" tag from Monsters

            _iterator = _createForOfIteratorHelper(battleMonsterState);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                monsterToRemoveNewDebuffTag = _step.value;
                updatedDebuffs = [];
                updatedBuffs = [];

                if (monsterToRemoveNewDebuffTag.debuffs.length > 0) {
                  debuffs = monsterToRemoveNewDebuffTag.debuffs;
                  _iterator4 = _createForOfIteratorHelper(debuffs);

                  try {
                    _loop3 = function _loop3() {
                      var monsterDebuff = _step4.value;

                      if (monsterDebuff["new"]) {
                        saveToDatabasePromisesOne.push(new Promise(function (resolve, reject) {
                          _models["default"].debuff.update({
                            "new": false
                          }, {
                            where: {
                              id: monsterDebuff.id
                            },
                            lock: t.LOCK.UPDATE,
                            transaction: t
                          }).then(function () {
                            return resolve();
                          });
                        }));
                      } // Alternative to removing all the duplicates at the end of the processor?
                      // allRoundDebuffsInfoArray.push([
                      //   ...allRoundDebuffsInfoArray,
                      //   monsterDebuff.name,
                      // ]);


                      allRoundDebuffsInfoArray.push(monsterDebuff.name);
                      updatedDebuffs.push(_objectSpread(_objectSpread({}, monsterDebuff), {}, {
                        "new": false
                      }));
                    };

                    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                      _loop3();
                    }
                  } catch (err) {
                    _iterator4.e(err);
                  } finally {
                    _iterator4.f();
                  }

                  monsterToRemoveNewDebuffTag.debuffs = updatedDebuffs;
                }

                if (monsterToRemoveNewDebuffTag.buffs.length > 0) {
                  buffs = monsterToRemoveNewDebuffTag.buffs;
                  _iterator5 = _createForOfIteratorHelper(buffs);

                  try {
                    _loop4 = function _loop4() {
                      var monsterbuff = _step5.value;

                      if (monsterbuff["new"]) {
                        saveToDatabasePromisesOne.push(new Promise(function (resolve, reject) {
                          _models["default"].buff.update({
                            "new": false
                          }, {
                            where: {
                              id: monsterbuff.id
                            },
                            lock: t.LOCK.UPDATE,
                            transaction: t
                          }).then(function () {
                            return resolve();
                          });
                        }));
                      }

                      allRoundBuffsInfoArray.push(monsterbuff);
                      updatedBuffs.push(_objectSpread(_objectSpread({}, monsterbuff), {}, {
                        "new": false
                      }));
                    };

                    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                      _loop4();
                    }
                  } catch (err) {
                    _iterator5.e(err);
                  } finally {
                    _iterator5.f();
                  }

                  monsterToRemoveNewDebuffTag.buffs = updatedBuffs;
                }

                monstersToUpdate.push(monsterToRemoveNewDebuffTag);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            newUserBuffsArray = [];
            newUserDebuffsArray = [];

            if (userState.buffs.length > 0) {
              _iterator2 = _createForOfIteratorHelper(userState.buffs);

              try {
                _loop = function _loop() {
                  var userBuff = _step2.value;

                  if (userBuff["new"]) {
                    saveToDatabasePromisesOne.push(new Promise(function (resolve, reject) {
                      _models["default"].buff.update({
                        "new": false
                      }, {
                        where: {
                          id: userBuff.id
                        },
                        lock: t.LOCK.UPDATE,
                        transaction: t
                      }).then(function () {
                        return resolve();
                      });
                    }));
                  }

                  allRoundBuffsInfoArray.push(userBuff.name);
                  newUserBuffsArray.push(_objectSpread(_objectSpread({}, userBuff), {}, {
                    "new": false
                  }));
                };

                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  _loop();
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }

            if (userState.debuffs.length > 0) {
              _iterator3 = _createForOfIteratorHelper(userState.debuffs);

              try {
                _loop2 = function _loop2() {
                  var userDebuff = _step3.value;

                  if (userDebuff["new"]) {
                    saveToDatabasePromisesOne.push(new Promise(function (resolve, reject) {
                      _models["default"].debuff.update({
                        "new": false
                      }, {
                        where: {
                          id: userDebuff.id
                        },
                        lock: t.LOCK.UPDATE,
                        transaction: t
                      }).then(function () {
                        return resolve();
                      });
                    }));
                  }

                  allRoundDebuffsInfoArray.push(userDebuff.name);
                  newUserDebuffsArray.push(_objectSpread(_objectSpread({}, userDebuff), {}, {
                    "new": false
                  }));
                };

                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  _loop2();
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }

            battleMonsterState = battleMonsterState.map(function (obj) {
              return monstersToUpdate.find(function (o) {
                return o.id === obj.id;
              }) || obj;
            });
            userState.buffs = newUserBuffsArray;
            userState.debuffs = newUserDebuffsArray;
            return _context.abrupt("return", [userState, battleMonsterState, allRoundBuffsInfoArray, allRoundDebuffsInfoArray, saveToDatabasePromisesOne]);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function removeNewTagFromBuffsAndDebuffs(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

var _default = removeNewTagFromBuffsAndDebuffs;
exports["default"] = _default;