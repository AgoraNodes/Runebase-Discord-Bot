"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderBattleGif = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _gifenc = require("gifenc");

var _loadPlayer = require("./load/loadPlayer");

var _loadEnemy = require("./load/loadEnemy");

var _loadOrbs = require("./load/loadOrbs");

var _loadDebuff = require("./load/loadDebuff");

var _loadBuff = require("./load/loadBuff");

var _drawBackground = require("./draw/drawBackground");

var _drawBattleLog = require("./draw/drawBattleLog");

var _drawBattleScreenTools = require("./draw/drawBattleScreenTools");

var _drawPlayer = require("./draw/drawPlayer");

var _drawEnemy = require("./draw/drawEnemy");

var _drawUserBuffs = require("./draw/drawUserBuffs");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var renderBattleGif = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(initialUserState, // The initial UserState
  userCurrentSelectedSkills, // The Selected User Skills
  previousBattleState, // The previous battle state
  currentSelectedMonster) {
    var stageZeroInfoArray,
        stageOneInfoArray,
        stageTwoInfoArray,
        stageThreeInfoArray,
        stageFourInfoArray,
        stageFiveInfoArray,
        stageSixInfoArray,
        stageSevenInfoArray,
        userState,
        zone,
        enemyPosition,
        playerPosition,
        enemies,
        buffImages,
        debuffImages,
        effectImages,
        loadPromises,
        BattleMonsters,
        battleLogs,
        mainSkill,
        secondarySkill,
        backgroundImage,
        playerImage,
        hpOrbs,
        mpOrbs,
        imageData,
        palette,
        imageIndex,
        orbsStartingPositionStageZero,
        orbsStartingPositionStageOne,
        orbsStartingPositionStageTwo,
        orbsStartingPositionStageThree,
        orbsStartingPositionStageFour,
        orbsStartingPositionStageFive,
        orbsStartingPositionStageSix,
        orbsStartingPositionStageSeven,
        _iterator,
        _step,
        _loop51,
        _iterator2,
        _step2,
        _loop,
        _iterator3,
        _step3,
        _step3$value,
        i,
        monsterInfoA,
        _iterator4,
        _step4,
        _step4$value,
        _i,
        monsterToUpdateA,
        _iterator5,
        _step5,
        _loop2,
        _iterator6,
        _step6,
        _loop52,
        canvas,
        ctx,
        gif,
        _iterator7,
        _step7,
        _loop54,
        _iterator8,
        _step8,
        _loop3,
        _iterator15,
        _step15,
        _loop9,
        _iterator22,
        _step22,
        _loop16,
        _iterator28,
        _step28,
        _loop22,
        _iterator37,
        _step37,
        _loop31,
        _iterator46,
        _step46,
        _loop40,
        _iterator52,
        _step52,
        _step52$value,
        index,
        stageSevenInfo,
        _iterator53,
        _step53,
        _loop46,
        _iterator54,
        _step54,
        _loop47,
        _iterator55,
        _step55,
        _loop48,
        _iterator56,
        _step56,
        _loop49,
        _iterator57,
        _step57,
        _loop50,
        bytes,
        finalImage,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stageZeroInfoArray = _args.length > 4 && _args[4] !== undefined ? _args[4] : false;
            stageOneInfoArray = _args.length > 5 && _args[5] !== undefined ? _args[5] : false;
            stageTwoInfoArray = _args.length > 6 && _args[6] !== undefined ? _args[6] : false;
            stageThreeInfoArray = _args.length > 7 && _args[7] !== undefined ? _args[7] : false;
            stageFourInfoArray = _args.length > 8 && _args[8] !== undefined ? _args[8] : false;
            stageFiveInfoArray = _args.length > 9 && _args[9] !== undefined ? _args[9] : false;
            stageSixInfoArray = _args.length > 10 && _args[10] !== undefined ? _args[10] : false;
            stageSevenInfoArray = _args.length > 11 && _args[11] !== undefined ? _args[11] : false;
            userState = initialUserState;
            zone = 'den';
            enemyPosition = [];
            playerPosition = [];
            enemies = [];
            buffImages = [];
            debuffImages = [];
            effectImages = [];
            loadPromises = [];
            BattleMonsters = previousBattleState.BattleMonsters;
            battleLogs = previousBattleState.battleLogs;
            console.log('1');
            orbsStartingPositionStageZero = 1;
            orbsStartingPositionStageOne = 1 + stageZeroInfoArray.length;
            orbsStartingPositionStageTwo = 1 + stageZeroInfoArray.length + stageOneInfoArray.length;
            orbsStartingPositionStageThree = 1 + stageZeroInfoArray.length + stageOneInfoArray.length + stageTwoInfoArray.length;
            orbsStartingPositionStageFour = 1 + stageZeroInfoArray.length + stageOneInfoArray.length + stageTwoInfoArray.length + stageThreeInfoArray.length;
            orbsStartingPositionStageFive = 1 + stageZeroInfoArray.length + stageOneInfoArray.length + stageTwoInfoArray.length + stageThreeInfoArray.length + stageFourInfoArray.length;
            orbsStartingPositionStageSix = 1 + stageZeroInfoArray.length + stageOneInfoArray.length + stageTwoInfoArray.length + stageThreeInfoArray.length + stageFourInfoArray.length + stageFiveInfoArray.length;
            orbsStartingPositionStageSeven = 1 + stageZeroInfoArray.length + stageOneInfoArray.length + stageTwoInfoArray.length + stageThreeInfoArray.length + stageFourInfoArray.length + stageFiveInfoArray.length + stageSixInfoArray.length;
            console.log('2'); // Figure out a way to better load all of the battle effects without loading every single one
            // Maybe additional array comming from battle processor with all of the effects fired during processing

            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/battle/effects", "stun.png")).then(function (image) {
                effectImages.stunned = image;
                resolve();
              });
            }));
            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.name, ".png"))).then(function (image) {
                mainSkill = image;
                resolve();
              });
            }));
            console.log(3);
            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.name, ".png"))).then(function (image) {
                secondarySkill = image;
                resolve();
              });
            }));
            console.log('4');
            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/battle/background", "".concat(zone, ".png"))).then(function (image) {
                backgroundImage = image;
                resolve();
              });
            }));
            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _loadPlayer.loadPlayer)(userState["class"].name).then(function (image) {
                playerImage = image;
                resolve();
              });
            }));
            console.log('5');
            _iterator = _createForOfIteratorHelper(userState.buffs.entries());

            try {
              _loop51 = function _loop51() {
                var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
                    i = _step$value[0],
                    buff = _step$value[1];

                loadPromises.push(new Promise(function (resolve, reject) {
                  if (!buffImages[buff.name]) {
                    (0, _loadBuff.loadBuff)(buff.name).then(function (image) {
                      buffImages[buff.name] = image;
                      resolve();
                    });
                  } else {
                    resolve();
                  }
                }));
              };

              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                _loop51();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            console.log('6');

            if (stageTwoInfoArray && stageTwoInfoArray.length > 0) {
              _iterator2 = _createForOfIteratorHelper(stageTwoInfoArray[stageTwoInfoArray.length - 1].userState.buffs.entries());

              try {
                _loop = function _loop() {
                  var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
                      i = _step2$value[0],
                      buff = _step2$value[1];

                  loadPromises.push(new Promise(function (resolve, reject) {
                    if (!buffImages[buff.name]) {
                      (0, _loadBuff.loadBuff)(buff.name).then(function (image) {
                        buffImages[buff.name] = image;
                        resolve();
                      });
                    } else {
                      resolve();
                    }
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

            console.log('7');

            if (stageOneInfoArray && stageOneInfoArray.length > 0) {
              _iterator3 = _createForOfIteratorHelper(stageOneInfoArray.entries());

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2), i = _step3$value[0], monsterInfoA = _step3$value[1];
                  _iterator4 = _createForOfIteratorHelper(monsterInfoA.monstersToUpdate.entries());

                  try {
                    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                      _step4$value = (0, _slicedToArray2["default"])(_step4.value, 2), _i = _step4$value[0], monsterToUpdateA = _step4$value[1];
                      _iterator5 = _createForOfIteratorHelper(monsterToUpdateA.debuffs.entries());

                      try {
                        _loop2 = function _loop2() {
                          var _step5$value = (0, _slicedToArray2["default"])(_step5.value, 2),
                              i = _step5$value[0],
                              debuff = _step5$value[1];

                          loadPromises.push(new Promise(function (resolve, reject) {
                            if (!debuffImages[debuff.name]) {
                              (0, _loadDebuff.loadDebuff)(debuff.name).then(function (image) {
                                debuffImages[debuff.name] = image;
                                resolve();
                              });
                            } else {
                              resolve();
                            }
                          }));
                        };

                        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                          _loop2();
                        }
                      } catch (err) {
                        _iterator5.e(err);
                      } finally {
                        _iterator5.f();
                      }
                    }
                  } catch (err) {
                    _iterator4.e(err);
                  } finally {
                    _iterator4.f();
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }

            console.log('7');
            _iterator6 = _createForOfIteratorHelper(BattleMonsters.entries());

            try {
              _loop52 = function _loop52() {
                var _step6$value = (0, _slicedToArray2["default"])(_step6.value, 2),
                    i = _step6$value[0],
                    battleMonster = _step6$value[1];

                loadPromises.push(new Promise(function (resolve, reject) {
                  (0, _loadEnemy.loadEnemy)(battleMonster.monster.name).then(function (image) {
                    enemies[parseInt(battleMonster.id, 10)] = image;
                    resolve();
                  });
                }));

                var _iterator58 = _createForOfIteratorHelper(battleMonster.debuffs.entries()),
                    _step58;

                try {
                  var _loop53 = function _loop53() {
                    var _step58$value = (0, _slicedToArray2["default"])(_step58.value, 2),
                        i = _step58$value[0],
                        debuff = _step58$value[1];

                    loadPromises.push(new Promise(function (resolve, reject) {
                      if (!debuffImages[debuff.name]) {
                        (0, _loadDebuff.loadDebuff)(debuff.name).then(function (image) {
                          debuffImages[debuff.name] = image;
                          resolve();
                        });
                      } else {
                        resolve();
                      }
                    }));
                  };

                  for (_iterator58.s(); !(_step58 = _iterator58.n()).done;) {
                    _loop53();
                  }
                } catch (err) {
                  _iterator58.e(err);
                } finally {
                  _iterator58.f();
                }
              };

              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                _loop52();
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }

            console.log('8');
            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _loadOrbs.loadOrbs)(userState, stageZeroInfoArray, stageOneInfoArray, stageTwoInfoArray, stageThreeInfoArray, stageFourInfoArray, stageFiveInfoArray, stageSixInfoArray, stageSevenInfoArray, orbsStartingPositionStageZero, orbsStartingPositionStageOne, orbsStartingPositionStageTwo, orbsStartingPositionStageThree, orbsStartingPositionStageFour, orbsStartingPositionStageFive, orbsStartingPositionStageSix, orbsStartingPositionStageSeven).then(function (_ref2) {
                var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
                    hpOrbsReturn = _ref3[0],
                    mpOrbsReturn = _ref3[1];

                hpOrbs = hpOrbsReturn;
                mpOrbs = mpOrbsReturn;
                resolve();
              });
            }));
            _context.next = 50;
            return Promise.all(loadPromises);

          case 50:
            console.log('10');
            canvas = (0, _canvas.createCanvas)(650, 300);
            ctx = canvas.getContext('2d');
            gif = (0, _gifenc.GIFEncoder)(); // One Frame To Start Gif (Resting Frame) (Battle Init screen)
            // PreStages

            console.log('Render PreStage # -1');
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
            userState, // User Object
            buffImages // image array of player images
            );
            playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
            playerImage, // image array of player images
            0, // number of image in the array to show
            false // user attacking [false || enemyImagePosition]
            );
            _iterator7 = _createForOfIteratorHelper(BattleMonsters.entries());

            try {
              _loop54 = function _loop54() {
                var _step7$value = (0, _slicedToArray2["default"])(_step7.value, 2),
                    i = _step7$value[0],
                    battleMonster = _step7$value[1];

                if (battleMonster.currentHp > 0) {
                  enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                  BattleMonsters.find(function (element) {
                    return element.id === battleMonster.id;
                  }), // MonsterState
                  currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                  enemies[battleMonster.id], // Enemy Image
                  debuffImages, effectImages, false, // Moved To user?
                  0, // Enemy Image Frame Shown
                  playerPosition, // PlayerCords
                  i // Index
                  );
                }
              };

              for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                _loop54();
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }

            (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, // pass canvas ctx
            mainSkill, secondarySkill, hpOrbs[0], mpOrbs[0]);
            (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            palette = (0, _gifenc.quantize)(imageData.data, 256, {
              format: 'rgb333'
            });
            imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
            gif.writeFrame(imageIndex, canvas.width, canvas.height, {
              palette: palette,
              delay: 600,
              repeat: -1
            }); // Render Stage 0

            console.log('Render Stage #0');

            if (stageZeroInfoArray && stageZeroInfoArray.length > 0) {
              _iterator8 = _createForOfIteratorHelper(stageZeroInfoArray.entries());

              try {
                _loop3 = function _loop3() {
                  var _step8$value = (0, _slicedToArray2["default"])(_step8.value, 2),
                      indexs = _step8$value[0],
                      stageZeroInfo = _step8$value[1];

                  userState = stageZeroInfo.userState;
                  battleLogs.unshift.apply(battleLogs, (0, _toConsumableArray2["default"])(stageZeroInfo.battleLogs));
                  BattleMonsters = BattleMonsters.map(function (obj) {
                    return stageZeroInfo.monstersToUpdate.find(function (o) {
                      return o.id === obj.id;
                    }) || obj;
                  });

                  var _iterator9 = _createForOfIteratorHelper(stageZeroInfo.monstersToUpdate),
                      _step9;

                  try {
                    var _loop4 = function _loop4() {
                      var monsterToUpdate = _step9.value;
                      var monsterToUpdatePosition = enemyPosition.find(function (element) {
                        return element && element.id === monsterToUpdate.id;
                      });

                      var _iterator10 = _createForOfIteratorHelper(monsterToUpdate.effects.entries()),
                          _step10;

                      try {
                        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                          var _step10$value = (0, _slicedToArray2["default"])(_step10.value, 2),
                              index = _step10$value[0],
                              stageZeroInfoEffect = _step10$value[1];

                          (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);

                          var _iterator11 = _createForOfIteratorHelper(BattleMonsters.entries()),
                              _step11;

                          try {
                            var _loop5 = function _loop5() {
                              var _step11$value = (0, _slicedToArray2["default"])(_step11.value, 2),
                                  i = _step11$value[0],
                                  battleMonster = _step11$value[1];

                              if (battleMonster.currentHp > 0) {
                                // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
                                enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                                BattleMonsters.find(function (element) {
                                  return element.id === battleMonster.id;
                                }), // MonsterState
                                currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                                enemies[battleMonster.id], // Enemy Image
                                debuffImages, effectImages, false, // Moved To user?
                                0, // Enemy Image Frame Shown
                                playerPosition, // PlayerCords
                                i, // Index
                                false // findUpdatedMonsterState,
                                );
                              }
                            };

                            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                              _loop5();
                            }
                          } catch (err) {
                            _iterator11.e(err);
                          } finally {
                            _iterator11.f();
                          }

                          (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                          userState, // User Object
                          buffImages // image array of player images
                          ); // Find enemy position to move to for close ranged attacks (unused for now in effects)
                          // const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === stageZeroInfo.monsterId);

                          playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                          playerImage, // image array of player images
                          0, // number of image in the array to show
                          false // user attacking [false || enemyImagePosition]
                          );
                          (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[orbsStartingPositionStageZero + indexs], mpOrbs[orbsStartingPositionStageZero + indexs]);
                          (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                          ctx.lineWidth = 1;
                          ctx.font = 'bold 13px "HeartWarming"';
                          ctx.fillStyle = 'red';

                          var _iterator12 = _createForOfIteratorHelper(stageZeroInfo.monstersToUpdate),
                              _step12;

                          try {
                            var _loop6 = function _loop6() {
                              var monsterToUpdate = _step12.value;
                              var monsterToUpdatePosition = enemyPosition.find(function (element) {
                                return element && element.id === monsterToUpdate.id;
                              });
                              ctx.fillText(stageZeroInfoEffect, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                            };

                            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                              _loop6();
                            }
                          } catch (err) {
                            _iterator12.e(err);
                          } finally {
                            _iterator12.f();
                          }

                          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                          palette = (0, _gifenc.quantize)(imageData.data, 256, {
                            format: 'rgb333'
                          });
                          imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                          gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                            palette: palette,
                            delay: 300,
                            repeat: -1
                          });
                          (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);

                          var _iterator13 = _createForOfIteratorHelper(BattleMonsters.entries()),
                              _step13;

                          try {
                            var _loop7 = function _loop7() {
                              var _step13$value = (0, _slicedToArray2["default"])(_step13.value, 2),
                                  i = _step13$value[0],
                                  battleMonster = _step13$value[1];

                              if (battleMonster.currentHp > 0) {
                                enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                                BattleMonsters.find(function (element) {
                                  return element.id === battleMonster.id;
                                }), // MonsterState
                                currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                                enemies[battleMonster.id], // Enemy Image
                                debuffImages, effectImages, false, // Moved To user?
                                0, // Enemy Image Frame Shown
                                playerPosition, // PlayerCords
                                i // Index
                                );
                              }
                            };

                            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                              _loop7();
                            }
                          } catch (err) {
                            _iterator13.e(err);
                          } finally {
                            _iterator13.f();
                          }

                          (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                          userState, // User Object
                          buffImages // image array of player images
                          );
                          playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                          playerImage, // image array of player images
                          0, // number of image in the array to show
                          false // user attacking [false || enemyImagePosition]
                          );
                          (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                          userState, // User Object
                          buffImages // image array of player images
                          );
                          (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[orbsStartingPositionStageZero + indexs], mpOrbs[orbsStartingPositionStageZero + indexs]);
                          (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                          ctx.lineWidth = 1;
                          ctx.font = 'bold 13px "HeartWarming"';
                          ctx.fillStyle = 'red';

                          var _iterator14 = _createForOfIteratorHelper(stageZeroInfo.monstersToUpdate),
                              _step14;

                          try {
                            var _loop8 = function _loop8() {
                              var monsterToUpdate = _step14.value;
                              var monsterToUpdatePosition = enemyPosition.find(function (element) {
                                return element && element.id === monsterToUpdate.id;
                              });
                              ctx.fillText(stageZeroInfoEffect, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                            };

                            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                              _loop8();
                            }
                          } catch (err) {
                            _iterator14.e(err);
                          } finally {
                            _iterator14.f();
                          }

                          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                          palette = (0, _gifenc.quantize)(imageData.data, 256, {
                            format: 'rgb333'
                          });
                          imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                          gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                            palette: palette,
                            delay: 600,
                            repeat: -1
                          });
                        }
                      } catch (err) {
                        _iterator10.e(err);
                      } finally {
                        _iterator10.f();
                      }
                    };

                    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                      _loop4();
                    }
                  } catch (err) {
                    _iterator9.e(err);
                  } finally {
                    _iterator9.f();
                  }
                };

                for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                  _loop3();
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }
            }

            console.log('Render Stage #1'); // Render Stage One

            if (stageOneInfoArray && stageOneInfoArray.length > 0) {
              _iterator15 = _createForOfIteratorHelper(stageOneInfoArray.entries());

              try {
                _loop9 = function _loop9() {
                  var _step15$value = (0, _slicedToArray2["default"])(_step15.value, 2),
                      index = _step15$value[0],
                      stageOneInfo = _step15$value[1];

                  console.log(stageOneInfo.monstersToUpdate);
                  userState = stageOneInfo.userState;
                  battleLogs.unshift.apply(battleLogs, (0, _toConsumableArray2["default"])(stageOneInfo.battleLogs));
                  BattleMonsters = BattleMonsters.map(function (obj) {
                    return stageOneInfo.monstersToUpdate.find(function (o) {
                      return o.id === obj.id;
                    }) || obj;
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);

                  var _iterator16 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step16;

                  try {
                    var _loop10 = function _loop10() {
                      var _step16$value = (0, _slicedToArray2["default"])(_step16.value, 2),
                          i = _step16$value[0],
                          battleMonster = _step16$value[1];

                      if (battleMonster.currentHp > 0) {
                        // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        // findUpdatedMonsterState,
                        );
                      }
                    };

                    for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                      _loop10();
                    }
                  } catch (err) {
                    _iterator16.e(err);
                  } finally {
                    _iterator16.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  var findAttackedEnemyByUser = enemyPosition.find(function (element) {
                    return element && element.id === stageOneInfo.monsterId;
                  }); // console.log('find enemy position after');
                  // console.log(findAttackedEnemyByUser);

                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  stageOneInfo.useAttack.ranged ? false : findAttackedEnemyByUser // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[orbsStartingPositionStageOne + index], mpOrbs[orbsStartingPositionStageOne + index]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  var _iterator17 = _createForOfIteratorHelper(stageOneInfo.monstersToUpdate),
                      _step17;

                  try {
                    var _loop11 = function _loop11() {
                      var monsterToUpdate = _step17.value;
                      // console.log(monsterToUpdate);
                      // console.log(enemyPosition);
                      var monsterToUpdatePosition = enemyPosition.find(function (element) {
                        return element && element.id === monsterToUpdate.id;
                      });
                      ctx.fillText(monsterToUpdate.userDamage, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                    };

                    for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
                      _loop11();
                    }
                  } catch (err) {
                    _iterator17.e(err);
                  } finally {
                    _iterator17.f();
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 200,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);

                  var _iterator18 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step18;

                  try {
                    var _loop12 = function _loop12() {
                      var _step18$value = (0, _slicedToArray2["default"])(_step18.value, 2),
                          i = _step18$value[0],
                          battleMonster = _step18$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
                      _loop12();
                    }
                  } catch (err) {
                    _iterator18.e(err);
                  } finally {
                    _iterator18.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  findAttackedEnemyByUser // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[orbsStartingPositionStageOne + index], mpOrbs[orbsStartingPositionStageOne + index]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  var _iterator19 = _createForOfIteratorHelper(stageOneInfo.monstersToUpdate),
                      _step19;

                  try {
                    var _loop13 = function _loop13() {
                      var monsterToUpdate = _step19.value;
                      var monsterToUpdatePosition = enemyPosition.find(function (element) {
                        return element && element.id === monsterToUpdate.id;
                      });
                      ctx.fillText(monsterToUpdate.userDamage, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                    };

                    for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
                      _loop13();
                    }
                  } catch (err) {
                    _iterator19.e(err);
                  } finally {
                    _iterator19.f();
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator20 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step20;

                  try {
                    var _loop14 = function _loop14() {
                      var _step20$value = (0, _slicedToArray2["default"])(_step20.value, 2),
                          i = _step20$value[0],
                          battleMonster = _step20$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                      _loop14();
                    }
                  } catch (err) {
                    _iterator20.e(err);
                  } finally {
                    _iterator20.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[orbsStartingPositionStageOne + index], mpOrbs[orbsStartingPositionStageOne + index]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  var _iterator21 = _createForOfIteratorHelper(stageOneInfo.monstersToUpdate),
                      _step21;

                  try {
                    var _loop15 = function _loop15() {
                      var monsterToUpdate = _step21.value;
                      var monsterToUpdatePosition = enemyPosition.find(function (element) {
                        return element && element.id === monsterToUpdate.id;
                      });
                      ctx.fillText(monsterToUpdate.userDamage, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                    };

                    for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
                      _loop15();
                    }
                  } catch (err) {
                    _iterator21.e(err);
                  } finally {
                    _iterator21.f();
                  }

                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'green';

                  if (stageOneInfo.receivedHeal) {
                    ctx.fillText("+".concat(stageOneInfo.receivedHeal), playerPosition[0].x, playerPosition[0].y - 20, 50);
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                };

                for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                  _loop9();
                }
              } catch (err) {
                _iterator15.e(err);
              } finally {
                _iterator15.f();
              }
            }

            console.log('Render Stage #2'); // Render Stage Two

            if (stageTwoInfoArray && stageTwoInfoArray.length > 0) {
              _iterator22 = _createForOfIteratorHelper(stageTwoInfoArray.entries());

              try {
                _loop16 = function _loop16() {
                  var _step22$value = (0, _slicedToArray2["default"])(_step22.value, 2),
                      index = _step22$value[0],
                      stageTwoInfo = _step22$value[1];

                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  console.log('|1');
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );
                  console.log('|2');

                  var _iterator23 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step23;

                  try {
                    var _loop17 = function _loop17() {
                      var _step23$value = (0, _slicedToArray2["default"])(_step23.value, 2),
                          i = _step23$value[0],
                          battleMonster = _step23$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, battleMonster.id === stageTwoInfo.monsterId, // Moved To user?
                        battleMonster.id === stageTwoInfo.monsterId ? 0 : 0, // Enemy Image Frame Shown
                        playerPosition[0], // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
                      _loop17();
                    }
                  } catch (err) {
                    _iterator23.e(err);
                  } finally {
                    _iterator23.f();
                  }

                  console.log('|3');
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageTwo], mpOrbs[index + orbsStartingPositionStageTwo]);
                  console.log('|4');
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 400,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  console.log('draw player');
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator24 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step24;

                  try {
                    var _loop18 = function _loop18() {
                      var _step24$value = (0, _slicedToArray2["default"])(_step24.value, 2),
                          i = _step24$value[0],
                          battleMonster = _step24$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, battleMonster.id === stageTwoInfo.monsterId, // Moved To user?
                        battleMonster.id === stageTwoInfo.monsterId ? 1 : 0, // Enemy Image Frame Shown
                        playerPosition[0], // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
                      _loop18();
                    }
                  } catch (err) {
                    _iterator24.e(err);
                  } finally {
                    _iterator24.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageTwo], mpOrbs[index + orbsStartingPositionStageTwo]);
                  console.log(stageTwoInfo.monstersToUpdate);
                  userState = stageTwoInfo.userState;
                  battleLogs.unshift.apply(battleLogs, (0, _toConsumableArray2["default"])(stageTwoInfo.battleLogs));
                  BattleMonsters = BattleMonsters.map(function (obj) {
                    return stageTwoInfo.monstersToUpdate.find(function (o) {
                      return o.id === obj.id;
                    }) || obj;
                  });
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  if (stageTwoInfo.attackType === 'Blocked' || stageTwoInfo.attackType === 'Parried' || stageTwoInfo.attackType === 'Missed') {
                    ctx.fillText(stageTwoInfo.attackType, playerPosition[0].x, playerPosition[0].y - 20, 50);
                  } else {
                    ctx.fillText(stageTwoInfo.damage, playerPosition[0].x, playerPosition[0].y - 20, 50);
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 200,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator25 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step25;

                  try {
                    var _loop19 = function _loop19() {
                      var _step25$value = (0, _slicedToArray2["default"])(_step25.value, 2),
                          i = _step25$value[0],
                          battleMonster = _step25$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, battleMonster.id === stageTwoInfo.monsterId, // Moved To user?
                        battleMonster.id === stageTwoInfo.monsterId ? 2 : 0, // Enemy Image Frame Shown
                        playerPosition[0], // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
                      _loop19();
                    }
                  } catch (err) {
                    _iterator25.e(err);
                  } finally {
                    _iterator25.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageTwo], mpOrbs[index + orbsStartingPositionStageTwo]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  if (stageTwoInfo.attackType === 'Blocked' || stageTwoInfo.attackType === 'Parried' || stageTwoInfo.attackType === 'Missed') {
                    ctx.fillText(stageTwoInfo.attackType, playerPosition[0].x, playerPosition[0].y - 20, 50);
                  } else {
                    ctx.fillText(stageTwoInfo.damage, playerPosition[0].x, playerPosition[0].y - 20, 50);
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 200,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator26 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step26;

                  try {
                    var _loop20 = function _loop20() {
                      var _step26$value = (0, _slicedToArray2["default"])(_step26.value, 2),
                          i = _step26$value[0],
                          battleMonster = _step26$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, battleMonster.id === stageTwoInfo.monsterId, // Moved To user?
                        battleMonster.id === stageTwoInfo.monsterId ? 0 : 0, // Enemy Image Frame Shown
                        playerPosition[0], // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
                      _loop20();
                    }
                  } catch (err) {
                    _iterator26.e(err);
                  } finally {
                    _iterator26.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageTwo], mpOrbs[index + orbsStartingPositionStageTwo]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  if (stageTwoInfo.attackType === 'Blocked' || stageTwoInfo.attackType === 'Parried' || stageTwoInfo.attackType === 'Missed') {
                    ctx.fillText(stageTwoInfo.attackType, playerPosition[0].x, playerPosition[0].y - 20, 50);
                  } else {
                    ctx.fillText(stageTwoInfo.damage, playerPosition[0].x, playerPosition[0].y - 20, 50);
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 200,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator27 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step27;

                  try {
                    var _loop21 = function _loop21() {
                      var _step27$value = (0, _slicedToArray2["default"])(_step27.value, 2),
                          i = _step27$value[0],
                          battleMonster = _step27$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition[0], // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
                      _loop21();
                    }
                  } catch (err) {
                    _iterator27.e(err);
                  } finally {
                    _iterator27.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageTwo], mpOrbs[index + orbsStartingPositionStageTwo]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 300,
                    repeat: -1
                  });
                };

                for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
                  _loop16();
                }
              } catch (err) {
                _iterator22.e(err);
              } finally {
                _iterator22.f();
              }
            }

            console.log('Render Stage #3'); // Render Stage Three

            if (stageThreeInfoArray && stageThreeInfoArray.length > 0) {
              _iterator28 = _createForOfIteratorHelper(stageThreeInfoArray.entries());

              try {
                _loop22 = function _loop22() {
                  var _step28$value = (0, _slicedToArray2["default"])(_step28.value, 2),
                      index = _step28$value[0],
                      stageThreeInfo = _step28$value[1];

                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator29 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step29;

                  try {
                    var _loop23 = function _loop23() {
                      var _step29$value = (0, _slicedToArray2["default"])(_step29.value, 2),
                          i = _step29$value[0],
                          battleMonster = _step29$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
                      _loop23();
                    }
                  } catch (err) {
                    _iterator29.e(err);
                  } finally {
                    _iterator29.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, // pass canvas ctx
                  mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageThree], mpOrbs[index + orbsStartingPositionStageThree]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);

                  var _iterator30 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step30;

                  try {
                    var _loop24 = function _loop24() {
                      var _step30$value = (0, _slicedToArray2["default"])(_step30.value, 2),
                          i = _step30$value[0],
                          battleMonster = _step30$value[1];

                      if (battleMonster.currentHp > 0) {
                        // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        // findUpdatedMonsterState,
                        );
                      }
                    };

                    for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
                      _loop24();
                    }
                  } catch (err) {
                    _iterator30.e(err);
                  } finally {
                    _iterator30.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  var findAttackedEnemyByUser = enemyPosition.find(function (element) {
                    return element && element.id === stageThreeInfo.monsterId;
                  }); // console.log('find enemy position after');
                  // console.log(findAttackedEnemyByUser);

                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  findAttackedEnemyByUser // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageThree], mpOrbs[index + orbsStartingPositionStageThree]);
                  userState = stageThreeInfo.userState;
                  battleLogs.unshift.apply(battleLogs, (0, _toConsumableArray2["default"])(stageThreeInfo.battleLogs));
                  BattleMonsters = BattleMonsters.map(function (obj) {
                    return stageThreeInfo.monstersToUpdate.find(function (o) {
                      return o.id === obj.id;
                    }) || obj;
                  });
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  var _iterator31 = _createForOfIteratorHelper(stageThreeInfo.monstersToUpdate),
                      _step31;

                  try {
                    var _loop25 = function _loop25() {
                      var monsterToUpdate = _step31.value;
                      var monsterToUpdatePosition = enemyPosition.find(function (element) {
                        return element && element.id === monsterToUpdate.id;
                      });
                      ctx.fillText(monsterToUpdate.userDamage, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                    };

                    for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
                      _loop25();
                    }
                  } catch (err) {
                    _iterator31.e(err);
                  } finally {
                    _iterator31.f();
                  }

                  console.log('Render Frame #2-8');
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 200,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);

                  var _iterator32 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step32;

                  try {
                    var _loop26 = function _loop26() {
                      var _step32$value = (0, _slicedToArray2["default"])(_step32.value, 2),
                          i = _step32$value[0],
                          battleMonster = _step32$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
                      _loop26();
                    }
                  } catch (err) {
                    _iterator32.e(err);
                  } finally {
                    _iterator32.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  findAttackedEnemyByUser // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageThree], mpOrbs[index + orbsStartingPositionStageThree]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  var _iterator33 = _createForOfIteratorHelper(stageThreeInfo.monstersToUpdate),
                      _step33;

                  try {
                    var _loop27 = function _loop27() {
                      var monsterToUpdate = _step33.value;
                      var monsterToUpdatePosition = enemyPosition.find(function (element) {
                        return element && element.id === monsterToUpdate.id;
                      });
                      ctx.fillText(monsterToUpdate.userDamage, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                    };

                    for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
                      _loop27();
                    }
                  } catch (err) {
                    _iterator33.e(err);
                  } finally {
                    _iterator33.f();
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator34 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step34;

                  try {
                    var _loop28 = function _loop28() {
                      var _step34$value = (0, _slicedToArray2["default"])(_step34.value, 2),
                          i = _step34$value[0],
                          battleMonster = _step34$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
                      _loop28();
                    }
                  } catch (err) {
                    _iterator34.e(err);
                  } finally {
                    _iterator34.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageThree], mpOrbs[index + orbsStartingPositionStageThree]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  var _iterator35 = _createForOfIteratorHelper(stageThreeInfo.monstersToUpdate),
                      _step35;

                  try {
                    var _loop29 = function _loop29() {
                      var monsterToUpdate = _step35.value;
                      var monsterToUpdatePosition = enemyPosition.find(function (element) {
                        return element && element.id === monsterToUpdate.id;
                      });
                      ctx.fillText(monsterToUpdate.userDamage, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                    };

                    for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
                      _loop29();
                    }
                  } catch (err) {
                    _iterator35.e(err);
                  } finally {
                    _iterator35.f();
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 400,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator36 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step36;

                  try {
                    var _loop30 = function _loop30() {
                      var _step36$value = (0, _slicedToArray2["default"])(_step36.value, 2),
                          i = _step36$value[0],
                          battleMonster = _step36$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
                      _loop30();
                    }
                  } catch (err) {
                    _iterator36.e(err);
                  } finally {
                    _iterator36.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageThree], mpOrbs[index + orbsStartingPositionStageThree]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'green';

                  if (stageThreeInfo.receivedHeal) {
                    ctx.fillText("+".concat(stageThreeInfo.receivedHeal), playerPosition[0].x, playerPosition[0].y - 20, 50);
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                };

                for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
                  _loop22();
                }
              } catch (err) {
                _iterator28.e(err);
              } finally {
                _iterator28.f();
              }
            }

            console.log('Render Stage #4'); // Render Stage Four
            // Apply Debuff Damage

            if (stageFourInfoArray && stageFourInfoArray.length > 0) {
              _iterator37 = _createForOfIteratorHelper(stageFourInfoArray.entries());

              try {
                _loop31 = function _loop31() {
                  var _step37$value = (0, _slicedToArray2["default"])(_step37.value, 2),
                      index = _step37$value[0],
                      stageFourInfo = _step37$value[1];

                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator38 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step38;

                  try {
                    var _loop32 = function _loop32() {
                      var _step38$value = (0, _slicedToArray2["default"])(_step38.value, 2),
                          i = _step38$value[0],
                          battleMonster = _step38$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
                      _loop32();
                    }
                  } catch (err) {
                    _iterator38.e(err);
                  } finally {
                    _iterator38.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, // pass canvas ctx
                  mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageFour], mpOrbs[index + orbsStartingPositionStageFour]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);

                  var _iterator39 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step39;

                  try {
                    var _loop33 = function _loop33() {
                      var _step39$value = (0, _slicedToArray2["default"])(_step39.value, 2),
                          i = _step39$value[0],
                          battleMonster = _step39$value[1];

                      if (battleMonster.currentHp > 0) {
                        // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        // findUpdatedMonsterState,
                        );
                      }
                    };

                    for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
                      _loop33();
                    }
                  } catch (err) {
                    _iterator39.e(err);
                  } finally {
                    _iterator39.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  ); // const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === debuffDamageInfo.monsterId);
                  // console.log('find enemy position after');
                  // console.log(findAttackedEnemyByUser);

                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageFour], mpOrbs[index + orbsStartingPositionStageFour]);
                  userState = stageFourInfo.userState;
                  battleLogs.unshift.apply(battleLogs, (0, _toConsumableArray2["default"])(stageFourInfo.battleLogs));
                  BattleMonsters = BattleMonsters.map(function (obj) {
                    return stageFourInfo.monstersToUpdate.find(function (o) {
                      return o.id === obj.id;
                    }) || obj;
                  });
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red'; // console.log('before looping monsters');

                  var _iterator40 = _createForOfIteratorHelper(stageFourInfo.monstersToUpdate),
                      _step40;

                  try {
                    var _loop34 = function _loop34() {
                      var monsterToUpdate = _step40.value;
                      console.log(monsterToUpdate); // console.log(monsterToUpdate);
                      // console.log(enemyPosition);

                      var monsterToUpdatePosition = enemyPosition.find(function (element) {
                        return element && element.id === monsterToUpdate.id;
                      });
                      console.log(monsterToUpdatePosition);
                      console.log('123');
                      ctx.fillText(monsterToUpdate.userDamage, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                    };

                    for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
                      _loop34();
                    }
                  } catch (err) {
                    _iterator40.e(err);
                  } finally {
                    _iterator40.f();
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 200,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);

                  var _iterator41 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step41;

                  try {
                    var _loop35 = function _loop35() {
                      var _step41$value = (0, _slicedToArray2["default"])(_step41.value, 2),
                          i = _step41$value[0],
                          battleMonster = _step41$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
                      _loop35();
                    }
                  } catch (err) {
                    _iterator41.e(err);
                  } finally {
                    _iterator41.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageFour], mpOrbs[index + orbsStartingPositionStageFour]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  var _iterator42 = _createForOfIteratorHelper(stageFourInfo.monstersToUpdate),
                      _step42;

                  try {
                    var _loop36 = function _loop36() {
                      var monsterToUpdate = _step42.value;
                      var monsterToUpdatePosition = enemyPosition.find(function (element) {
                        return element && element.id === monsterToUpdate.id;
                      });
                      ctx.fillText(monsterToUpdate.userDamage, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                    };

                    for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
                      _loop36();
                    }
                  } catch (err) {
                    _iterator42.e(err);
                  } finally {
                    _iterator42.f();
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator43 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step43;

                  try {
                    var _loop37 = function _loop37() {
                      var _step43$value = (0, _slicedToArray2["default"])(_step43.value, 2),
                          i = _step43$value[0],
                          battleMonster = _step43$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
                      _loop37();
                    }
                  } catch (err) {
                    _iterator43.e(err);
                  } finally {
                    _iterator43.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageFour], mpOrbs[index + orbsStartingPositionStageFour]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'red';

                  var _iterator44 = _createForOfIteratorHelper(stageFourInfo.monstersToUpdate),
                      _step44;

                  try {
                    var _loop38 = function _loop38() {
                      var monsterToUpdate = _step44.value;
                      var monsterToUpdatePosition = enemyPosition.find(function (element) {
                        return element && element.id === monsterToUpdate.id;
                      });
                      ctx.fillText(monsterToUpdate.userDamage, monsterToUpdatePosition.x, monsterToUpdatePosition.y - 20, 50);
                    };

                    for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
                      _loop38();
                    }
                  } catch (err) {
                    _iterator44.e(err);
                  } finally {
                    _iterator44.f();
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 400,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator45 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step45;

                  try {
                    var _loop39 = function _loop39() {
                      var _step45$value = (0, _slicedToArray2["default"])(_step45.value, 2),
                          i = _step45$value[0],
                          battleMonster = _step45$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        false, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
                      _loop39();
                    }
                  } catch (err) {
                    _iterator45.e(err);
                  } finally {
                    _iterator45.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageFour], mpOrbs[index + orbsStartingPositionStageFour]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 400,
                    repeat: -1
                  });
                };

                for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
                  _loop31();
                }
              } catch (err) {
                _iterator37.e(err);
              } finally {
                _iterator37.f();
              }
            }

            console.log('Render Stage #5'); // Count Down Buffs And Debuffs

            if (stageFiveInfoArray && stageFiveInfoArray.length > 0) {
              _iterator46 = _createForOfIteratorHelper(stageFiveInfoArray.entries());

              try {
                _loop40 = function _loop40() {
                  var _step46$value = (0, _slicedToArray2["default"])(_step46.value, 2),
                      index = _step46$value[0],
                      stageFiveInfo = _step46$value[1];

                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator47 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step47;

                  try {
                    var _loop41 = function _loop41() {
                      var _step47$value = (0, _slicedToArray2["default"])(_step47.value, 2),
                          i = _step47$value[0],
                          battleMonster = _step47$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
                      _loop41();
                    }
                  } catch (err) {
                    _iterator47.e(err);
                  } finally {
                    _iterator47.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, // pass canvas ctx
                  mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageFive], mpOrbs[index + orbsStartingPositionStageFive]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);

                  var _iterator48 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step48;

                  try {
                    var _loop42 = function _loop42() {
                      var _step48$value = (0, _slicedToArray2["default"])(_step48.value, 2),
                          i = _step48$value[0],
                          battleMonster = _step48$value[1];

                      if (battleMonster.currentHp > 0) {
                        // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        // findUpdatedMonsterState,
                        );
                      }
                    };

                    for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
                      _loop42();
                    }
                  } catch (err) {
                    _iterator48.e(err);
                  } finally {
                    _iterator48.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  ); // const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === debuffDamageInfo.monsterId);
                  // console.log('find enemy position after');
                  // console.log(findAttackedEnemyByUser);

                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageFive], mpOrbs[index + orbsStartingPositionStageFive]);
                  console.log(stageFiveInfo);
                  userState = stageFiveInfo.userState;
                  BattleMonsters = BattleMonsters.map(function (obj) {
                    return stageFiveInfo.monstersToUpdate.find(function (o) {
                      return o.id === obj.id;
                    }) || obj;
                  });
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 200,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);

                  var _iterator49 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step49;

                  try {
                    var _loop43 = function _loop43() {
                      var _step49$value = (0, _slicedToArray2["default"])(_step49.value, 2),
                          i = _step49$value[0],
                          battleMonster = _step49$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
                      _loop43();
                    }
                  } catch (err) {
                    _iterator49.e(err);
                  } finally {
                    _iterator49.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageFive], mpOrbs[index + orbsStartingPositionStageFive]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator50 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step50;

                  try {
                    var _loop44 = function _loop44() {
                      var _step50$value = (0, _slicedToArray2["default"])(_step50.value, 2),
                          i = _step50$value[0],
                          battleMonster = _step50$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
                      _loop44();
                    }
                  } catch (err) {
                    _iterator50.e(err);
                  } finally {
                    _iterator50.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageFive], mpOrbs[index + orbsStartingPositionStageFive]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 400,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );

                  var _iterator51 = _createForOfIteratorHelper(BattleMonsters.entries()),
                      _step51;

                  try {
                    var _loop45 = function _loop45() {
                      var _step51$value = (0, _slicedToArray2["default"])(_step51.value, 2),
                          i = _step51$value[0],
                          battleMonster = _step51$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        false, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
                      _loop45();
                    }
                  } catch (err) {
                    _iterator51.e(err);
                  } finally {
                    _iterator51.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageFive], mpOrbs[index + orbsStartingPositionStageFive]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 400,
                    repeat: -1
                  });
                };

                for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
                  _loop40();
                }
              } catch (err) {
                _iterator46.e(err);
              } finally {
                _iterator46.f();
              }
            }

            console.log('Render Stage #7'); // Count Down Buffs And Debuffs

            if (stageSevenInfoArray && stageSevenInfoArray.length > 0) {
              _iterator52 = _createForOfIteratorHelper(stageSevenInfoArray.entries());

              try {
                for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
                  _step52$value = (0, _slicedToArray2["default"])(_step52.value, 2), index = _step52$value[0], stageSevenInfo = _step52$value[1];
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );
                  _iterator53 = _createForOfIteratorHelper(BattleMonsters.entries());

                  try {
                    _loop46 = function _loop46() {
                      var _step53$value = (0, _slicedToArray2["default"])(_step53.value, 2),
                          i = _step53$value[0],
                          battleMonster = _step53$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
                      _loop46();
                    }
                  } catch (err) {
                    _iterator53.e(err);
                  } finally {
                    _iterator53.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, // pass canvas ctx
                  mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageSeven], mpOrbs[index + orbsStartingPositionStageSeven]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  _iterator54 = _createForOfIteratorHelper(BattleMonsters.entries());

                  try {
                    _loop47 = function _loop47() {
                      var _step54$value = (0, _slicedToArray2["default"])(_step54.value, 2),
                          i = _step54$value[0],
                          battleMonster = _step54$value[1];

                      if (battleMonster.currentHp > 0) {
                        // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        // findUpdatedMonsterState,
                        );
                      }
                    };

                    for (_iterator54.s(); !(_step54 = _iterator54.n()).done;) {
                      _loop47();
                    }
                  } catch (err) {
                    _iterator54.e(err);
                  } finally {
                    _iterator54.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  ); // const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === debuffDamageInfo.monsterId);
                  // console.log('find enemy position after');
                  // console.log(findAttackedEnemyByUser);

                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageSeven], mpOrbs[index + orbsStartingPositionStageSeven]); // console.log(stageSevenInfo);

                  userState = stageSevenInfo.userState;
                  battleLogs.unshift.apply(battleLogs, (0, _toConsumableArray2["default"])(stageSevenInfo.battleLogs)); // BattleMonsters = BattleMonsters.map((obj) => stageSevenInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 300,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  _iterator55 = _createForOfIteratorHelper(BattleMonsters.entries());

                  try {
                    _loop48 = function _loop48() {
                      var _step55$value = (0, _slicedToArray2["default"])(_step55.value, 2),
                          i = _step55$value[0],
                          battleMonster = _step55$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator55.s(); !(_step55 = _iterator55.n()).done;) {
                      _loop48();
                    }
                  } catch (err) {
                    _iterator55.e(err);
                  } finally {
                    _iterator55.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageSeven], mpOrbs[index + orbsStartingPositionStageSeven]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  ctx.lineWidth = 1;
                  ctx.font = 'bold 13px "HeartWarming"';
                  ctx.fillStyle = 'green';

                  if (stageSevenInfo.receivedHeal) {
                    ctx.fillText("+".concat(stageSevenInfo.receivedHeal), playerPosition[0].x, playerPosition[0].y - 20, 50);
                  }

                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 500,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  );
                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );
                  _iterator56 = _createForOfIteratorHelper(BattleMonsters.entries());

                  try {
                    _loop49 = function _loop49() {
                      var _step56$value = (0, _slicedToArray2["default"])(_step56.value, 2),
                          i = _step56$value[0],
                          battleMonster = _step56$value[1];

                      if (battleMonster.currentHp > 0) {
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        );
                      }
                    };

                    for (_iterator56.s(); !(_step56 = _iterator56.n()).done;) {
                      _loop49();
                    }
                  } catch (err) {
                    _iterator56.e(err);
                  } finally {
                    _iterator56.f();
                  }

                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, // pass canvas ctx
                  mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageSeven], mpOrbs[index + orbsStartingPositionStageSeven]);
                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 600,
                    repeat: -1
                  });
                  (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                  _iterator57 = _createForOfIteratorHelper(BattleMonsters.entries());

                  try {
                    _loop50 = function _loop50() {
                      var _step57$value = (0, _slicedToArray2["default"])(_step57.value, 2),
                          i = _step57$value[0],
                          battleMonster = _step57$value[1];

                      if (battleMonster.currentHp > 0) {
                        // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
                        enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                        BattleMonsters.find(function (element) {
                          return element.id === battleMonster.id;
                        }), // MonsterState
                        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                        enemies[battleMonster.id], // Enemy Image
                        debuffImages, effectImages, false, // Moved To user?
                        0, // Enemy Image Frame Shown
                        playerPosition, // PlayerCords
                        i // Index
                        // findUpdatedMonsterState,
                        );
                      }
                    };

                    for (_iterator57.s(); !(_step57 = _iterator57.n()).done;) {
                      _loop50();
                    }
                  } catch (err) {
                    _iterator57.e(err);
                  } finally {
                    _iterator57.f();
                  }

                  (0, _drawUserBuffs.drawUserBuffs)(ctx, // Ctx drawing canvas
                  userState, // User Object
                  buffImages // image array of player images
                  ); // const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === debuffDamageInfo.monsterId);
                  // console.log('find enemy position after');
                  // console.log(findAttackedEnemyByUser);

                  playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                  playerImage, // image array of player images
                  0, // number of image in the array to show
                  false // user attacking [false || enemyImagePosition]
                  );
                  (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + orbsStartingPositionStageSeven], mpOrbs[index + orbsStartingPositionStageSeven]); // console.log(stageSevenInfo);
                  // userState = stageSevenInfo.userState;
                  // battleLogs.unshift(...stageSevenInfo.battleLogs);
                  // BattleMonsters = BattleMonsters.map((obj) => stageSevenInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

                  (0, _drawBattleLog.drawBattleLog)(ctx, battleLogs);
                  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  palette = (0, _gifenc.quantize)(imageData.data, 256, {
                    format: 'rgb333'
                  });
                  imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
                  gif.writeFrame(imageIndex, canvas.width, canvas.height, {
                    palette: palette,
                    delay: 300,
                    repeat: -1
                  });
                }
              } catch (err) {
                _iterator52.e(err);
              } finally {
                _iterator52.f();
              }
            }

            gif.finish();
            bytes = gif.bytesView();
            finalImage = Buffer.from(bytes);
            return _context.abrupt("return", finalImage);

          case 84:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderBattleGif(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderBattleGif = renderBattleGif;