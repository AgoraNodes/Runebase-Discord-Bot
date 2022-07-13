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

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var loadOrbs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(initialUserState, stageZeroInfoArray, stageOneInfoArray, stageTwoInfoArray, stageThreeInfoArray, stageFourInfoArray, stageFiveInfoArray, stageSixInfoArray, stageSevenInfoArray, orbsStartingPositionStageZero, orbsStartingPositionStageOne, orbsStartingPositionStageTwo, orbsStartingPositionStageThree, orbsStartingPositionStageFour, orbsStartingPositionStageFive, orbsStartingPositionStageSix, orbsStartingPositionStageSeven) {
    var promises, bufferPromises, hpOrbsBuffer, mpOrbsBuffer, hpOrbs, mpOrbs, _iterator, _step, _loop, _iterator2, _step2, _loop2, _iterator3, _step3, _loop3, _iterator4, _step4, _loop4, _iterator5, _step5, _loop5, _iterator6, _step6, _loop6, _iterator7, _step7, _loop7, _iterator8, _step8, _loop8, _iterator9, _step9, _loop9, _iterator10, _step10, _loop10;

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
            console.log(initialUserState.hp);
            console.log('orbs buffer start');
            bufferPromises.push(new Promise(function (resolve, reject) {
              (0, _hp.renderHpOrb)(initialUserState.hp.current, initialUserState.hp.max).then(function (buffer) {
                hpOrbsBuffer[0] = buffer;
                resolve();
              });
            }));
            bufferPromises.push(new Promise(function (resolve, reject) {
              (0, _mp.renderMpOrb)(initialUserState.mp.current, initialUserState.mp.max).then(function (buffer) {
                mpOrbsBuffer[0] = buffer;
                resolve();
              });
            }));
            console.log('orbs buffer 2');

            if (stageZeroInfoArray) {
              _iterator = _createForOfIteratorHelper(stageZeroInfoArray.entries());

              try {
                _loop = function _loop() {
                  var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
                      index = _step$value[0],
                      info = _step$value[1];

                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _mp.renderMpOrb)(info.userState.mp.current, info.userState.mp.max).then(function (buffer) {
                      mpOrbsBuffer[index + orbsStartingPositionStageZero] = buffer;
                      resolve();
                    });
                  }));
                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _hp.renderHpOrb)(info.userState.hp.current, info.userState.hp.max).then(function (buffer) {
                      hpOrbsBuffer[index + orbsStartingPositionStageZero] = buffer;
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

            console.log('orbs buffer 3');

            if (stageOneInfoArray) {
              _iterator2 = _createForOfIteratorHelper(stageOneInfoArray.entries());

              try {
                _loop2 = function _loop2() {
                  var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
                      index = _step2$value[0],
                      info = _step2$value[1];

                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _mp.renderMpOrb)(info.userState.mp.current, info.userState.mp.max).then(function (buffer) {
                      mpOrbsBuffer[index + orbsStartingPositionStageOne] = buffer;
                      resolve();
                    });
                  }));
                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _hp.renderHpOrb)(info.userState.hp.current, info.userState.hp.max).then(function (buffer) {
                      hpOrbsBuffer[index + orbsStartingPositionStageOne] = buffer;
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

            console.log('orbs buffer 4');

            if (stageTwoInfoArray) {
              _iterator3 = _createForOfIteratorHelper(stageTwoInfoArray.entries());

              try {
                _loop3 = function _loop3() {
                  var _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2),
                      index = _step3$value[0],
                      info = _step3$value[1];

                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _mp.renderMpOrb)(info.userState.mp.current, info.userState.mp.max).then(function (buffer) {
                      mpOrbsBuffer[index + orbsStartingPositionStageTwo] = buffer;
                      resolve();
                    });
                  }));
                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _hp.renderHpOrb)(info.userState.hp.current, info.userState.hp.max).then(function (buffer) {
                      hpOrbsBuffer[index + orbsStartingPositionStageTwo] = buffer;
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
            }

            console.log('orbs buffer 5');

            if (stageThreeInfoArray) {
              _iterator4 = _createForOfIteratorHelper(stageThreeInfoArray.entries());

              try {
                _loop4 = function _loop4() {
                  var _step4$value = (0, _slicedToArray2["default"])(_step4.value, 2),
                      index = _step4$value[0],
                      info = _step4$value[1];

                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _mp.renderMpOrb)(info.userState.mp.current, info.userState.mp.max).then(function (buffer) {
                      mpOrbsBuffer[index + orbsStartingPositionStageThree] = buffer;
                      resolve();
                    });
                  }));
                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _hp.renderHpOrb)(info.userState.hp.current, info.userState.hp.max).then(function (buffer) {
                      hpOrbsBuffer[index + orbsStartingPositionStageThree] = buffer;
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
            }

            console.log('orbs buffer 6');

            if (stageFourInfoArray) {
              _iterator5 = _createForOfIteratorHelper(stageFourInfoArray.entries());

              try {
                _loop5 = function _loop5() {
                  var _step5$value = (0, _slicedToArray2["default"])(_step5.value, 2),
                      index = _step5$value[0],
                      info = _step5$value[1];

                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _mp.renderMpOrb)(info.userState.mp.current, info.userState.mp.max).then(function (buffer) {
                      mpOrbsBuffer[index + orbsStartingPositionStageFour] = buffer;
                      resolve();
                    });
                  }));
                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _hp.renderHpOrb)(info.userState.hp.current, info.userState.hp.max).then(function (buffer) {
                      hpOrbsBuffer[index + orbsStartingPositionStageFour] = buffer;
                      resolve();
                    });
                  }));
                };

                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  _loop5();
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
            }

            console.log('orbs buffer 7');

            if (stageFiveInfoArray) {
              _iterator6 = _createForOfIteratorHelper(stageFiveInfoArray.entries());

              try {
                _loop6 = function _loop6() {
                  var _step6$value = (0, _slicedToArray2["default"])(_step6.value, 2),
                      index = _step6$value[0],
                      info = _step6$value[1];

                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _mp.renderMpOrb)(info.userState.mp.current, info.userState.mp.max).then(function (buffer) {
                      mpOrbsBuffer[index + orbsStartingPositionStageFive] = buffer;
                      resolve();
                    });
                  }));
                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _hp.renderHpOrb)(info.userState.hp.current, info.userState.hp.max).then(function (buffer) {
                      hpOrbsBuffer[index + orbsStartingPositionStageFive] = buffer;
                      resolve();
                    });
                  }));
                };

                for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                  _loop6();
                }
              } catch (err) {
                _iterator6.e(err);
              } finally {
                _iterator6.f();
              }
            }

            console.log('orbs buffer 8');

            if (stageSixInfoArray) {
              _iterator7 = _createForOfIteratorHelper(stageSixInfoArray.entries());

              try {
                _loop7 = function _loop7() {
                  var _step7$value = (0, _slicedToArray2["default"])(_step7.value, 2),
                      index = _step7$value[0],
                      info = _step7$value[1];

                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _mp.renderMpOrb)(info.userState.mp.current, info.userState.mp.max).then(function (buffer) {
                      mpOrbsBuffer[index + orbsStartingPositionStageSix] = buffer;
                      resolve();
                    });
                  }));
                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _hp.renderHpOrb)(info.userState.hp.current, info.userState.hp.max).then(function (buffer) {
                      hpOrbsBuffer[index + orbsStartingPositionStageSix] = buffer;
                      resolve();
                    });
                  }));
                };

                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  _loop7();
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }
            }

            console.log('orbs buffer 9');

            if (stageSevenInfoArray) {
              _iterator8 = _createForOfIteratorHelper(stageSevenInfoArray.entries());

              try {
                _loop8 = function _loop8() {
                  var _step8$value = (0, _slicedToArray2["default"])(_step8.value, 2),
                      index = _step8$value[0],
                      info = _step8$value[1];

                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _mp.renderMpOrb)(info.userState.mp.current, info.userState.mp.max).then(function (buffer) {
                      mpOrbsBuffer[index + orbsStartingPositionStageSeven] = buffer;
                      resolve();
                    });
                  }));
                  bufferPromises.push(new Promise(function (resolve, reject) {
                    (0, _hp.renderHpOrb)(info.userState.hp.current, info.userState.hp.max).then(function (buffer) {
                      hpOrbsBuffer[index + orbsStartingPositionStageSeven] = buffer;
                      resolve();
                    });
                  }));
                };

                for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                  _loop8();
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }
            }

            console.log('orbs buffer 10');
            _context.next = 29;
            return Promise.all(bufferPromises);

          case 29:
            console.log('orbs buffer 11');
            _iterator9 = _createForOfIteratorHelper(hpOrbsBuffer.entries());

            try {
              _loop9 = function _loop9() {
                var _step9$value = (0, _slicedToArray2["default"])(_step9.value, 2),
                    index = _step9$value[0],
                    buffer = _step9$value[1];

                promises.push(new Promise(function (resolve, reject) {
                  (0, _canvas.loadImage)(buffer).then(function (image) {
                    hpOrbs[index] = image;
                    resolve();
                  });
                }));
              };

              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                _loop9();
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }

            _iterator10 = _createForOfIteratorHelper(mpOrbsBuffer.entries());

            try {
              _loop10 = function _loop10() {
                var _step10$value = (0, _slicedToArray2["default"])(_step10.value, 2),
                    index = _step10$value[0],
                    buffer = _step10$value[1];

                promises.push(new Promise(function (resolve, reject) {
                  (0, _canvas.loadImage)(buffer).then(function (image) {
                    mpOrbs[index] = image;
                    resolve();
                  });
                }));
              };

              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                _loop10();
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
            }

            console.log('orbs buffer 12'); // console.log('before promise wait');

            _context.next = 37;
            return Promise.all(promises);

          case 37:
            console.log('done orbs');
            return _context.abrupt("return", [hpOrbs, mpOrbs]);

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadOrbs(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17) {
    return _ref.apply(this, arguments);
  };
}();

exports.loadOrbs = loadOrbs;