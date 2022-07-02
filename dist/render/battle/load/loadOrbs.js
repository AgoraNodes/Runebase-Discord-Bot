"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadOrbs = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _hp = require("../../orbs/hp");

var _mp = require("../../orbs/mp");

var _calculateCharacterStats = require("../../../helpers/stats/calculateCharacterStats");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var loadOrbs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(previousUserState, battleInfoArray, monsterInfo) {
    var promises, bufferPromises, hpOrbsBuffer, mpOrbsBuffer, hpOrbs, mpOrbs, _yield$calculateChara, hp, mp, _iterator, _step, _loop, _iterator2, _step2, _loop2, _iterator3, _step3, _loop3, _iterator4, _step4, _loop4;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            promises = [];
            bufferPromises = [];
            hpOrbsBuffer = [];
            mpOrbsBuffer = [];
            hpOrbs = [];
            mpOrbs = [];
            _context.next = 8;
            return (0, _calculateCharacterStats.calculateCharacterStats)(previousUserState);

          case 8:
            _yield$calculateChara = _context.sent;
            hp = _yield$calculateChara.hp;
            mp = _yield$calculateChara.mp;
            bufferPromises.push(new Promise(function (resolve, reject) {
              (0, _hp.renderHpOrb)(hp.current, hp.max).then(function (buffer) {
                hpOrbsBuffer[0] = buffer;
                resolve();
              });
            }));
            bufferPromises.push(new Promise(function (resolve, reject) {
              (0, _mp.renderMpOrb)(mp.current, mp.max).then(function (buffer) {
                mpOrbsBuffer[0] = buffer;
                resolve();
              });
            }));

            if (battleInfoArray) {
              _iterator = _createForOfIteratorHelper(battleInfoArray.entries());

              try {
                _loop = function _loop() {
                  var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
                      index = _step$value[0],
                      info = _step$value[1];

                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _hp.renderHpOrb)(info.currentHp, hp.max).then(function (buffer) {
                      hpOrbsBuffer[index + 1] = buffer;
                      resolve();
                    });
                  }));
                };

                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _loop();
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }

            if (monsterInfo) {
              _iterator2 = _createForOfIteratorHelper(monsterInfo.entries());

              try {
                _loop2 = function _loop2() {
                  var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
                      index = _step2$value[0],
                      info = _step2$value[1];

                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _mp.renderMpOrb)(info.currentUserMp, mp.max).then(function (buffer) {
                      mpOrbsBuffer[index + 1] = buffer;
                      resolve();
                    });
                  }));
                };

                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  _loop2();
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }

            _context.next = 17;
            return Promise.all(bufferPromises);

          case 17:
            _iterator3 = _createForOfIteratorHelper(hpOrbsBuffer.entries());

            try {
              _loop3 = function _loop3() {
                var _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2),
                    index = _step3$value[0],
                    buffer = _step3$value[1];

                promises.push(new Promise(function (resolve, reject) {
                  (0, _canvas.loadImage)(buffer).then(function (image) {
                    hpOrbs[index] = image;
                    resolve();
                  });
                }));
              };

              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                _loop3();
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            _iterator4 = _createForOfIteratorHelper(mpOrbsBuffer.entries());

            try {
              _loop4 = function _loop4() {
                var _step4$value = (0, _slicedToArray2["default"])(_step4.value, 2),
                    index = _step4$value[0],
                    buffer = _step4$value[1];

                promises.push(new Promise(function (resolve, reject) {
                  (0, _canvas.loadImage)(buffer).then(function (image) {
                    mpOrbs[index] = image;
                    resolve();
                  });
                }));
              };

              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                _loop4();
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            console.log('before promise wait');
            _context.next = 24;
            return Promise.all(promises);

          case 24:
            return _context.abrupt("return", [hpOrbs, mpOrbs]);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadOrbs(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.loadOrbs = loadOrbs;