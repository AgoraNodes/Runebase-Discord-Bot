"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderBattleGif = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _gifenc = require("gifenc");

var _loadPlayer = require("./load/loadPlayer");

var _loadEnemy = require("./load/loadEnemy");

var _loadOrbs = require("./load/loadOrbs");

var _drawBackground = require("./draw/drawBackground");

var _drawBattleLog = require("./draw/drawBattleLog");

var _drawBattleScreenTools = require("./draw/drawBattleScreenTools");

var _drawPlayer = require("./draw/drawPlayer");

var _drawEnemy = require("./draw/drawEnemy");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var renderBattleGif = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentUser, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, currentSelectedMonster) {
    var battleInfoArray,
        monsterInfo,
        zone,
        enemyPosition,
        playerPosition,
        enemies,
        loadPromises,
        mainSkill,
        secondarySkill,
        backgroundImage,
        playerImage,
        hpOrbs,
        mpOrbs,
        imageData,
        palette,
        imageIndex,
        _iterator,
        _step,
        _loop,
        canvas,
        ctx,
        gif,
        _iterator2,
        _step2,
        _loop2,
        _iterator3,
        _step3,
        _loop3,
        findAttackedEnemyByUser,
        _iterator4,
        _step4,
        _loop4,
        _iterator5,
        _step5,
        _loop5,
        _iterator6,
        _step6,
        _step6$value,
        index,
        battleInfo,
        _iterator7,
        _step7,
        _loop6,
        _iterator8,
        _step8,
        _loop7,
        _iterator9,
        _step9,
        _loop8,
        _iterator10,
        _step10,
        _loop9,
        _iterator11,
        _step11,
        _loop10,
        bytes,
        finalImage,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            battleInfoArray = _args.length > 6 && _args[6] !== undefined ? _args[6] : false;
            monsterInfo = _args.length > 7 && _args[7] !== undefined ? _args[7] : false;
            zone = 'den';
            enemyPosition = [];
            playerPosition = [];
            enemies = [];
            loadPromises = [];
            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.name, ".png"))).then(function (image) {
                mainSkill = image;
                resolve();
              });
            }));
            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.name, ".png"))).then(function (image) {
                secondarySkill = image;
                resolve();
              });
            }));
            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/battle/background", "".concat(zone, ".png"))).then(function (image) {
                backgroundImage = image;
                resolve();
              });
            }));
            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _loadPlayer.loadPlayer)(currentUser["class"].name).then(function (image) {
                playerImage = image;
                resolve();
              });
            }));
            _iterator = _createForOfIteratorHelper(previousBattleState.BattleMonsters.entries());

            try {
              _loop = function _loop() {
                var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
                    i = _step$value[0],
                    battleMonster = _step$value[1];

                loadPromises.push(new Promise(function (resolve, reject) {
                  (0, _loadEnemy.loadEnemy)(battleMonster.monster.name).then(function (image) {
                    enemies[parseInt(battleMonster.id, 10)] = image;
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

            loadPromises.push(new Promise(function (resolve, reject) {
              (0, _loadOrbs.loadOrbs)(previousUserState, battleInfoArray, monsterInfo).then(function (_ref2) {
                var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
                    hpOrbsReturn = _ref3[0],
                    mpOrbsReturn = _ref3[1];

                hpOrbs = hpOrbsReturn;
                mpOrbs = mpOrbsReturn;
                resolve();
              });
            }));
            _context.next = 16;
            return Promise.all(loadPromises);

          case 16:
            canvas = (0, _canvas.createCanvas)(650, 300);
            ctx = canvas.getContext('2d');
            gif = (0, _gifenc.GIFEncoder)();
            console.log('Render Frame #1');
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
            playerImage, // image array of player images
            0, // number of image in the array to show
            false // user attacking [false || enemyImagePosition]
            );
            _iterator2 = _createForOfIteratorHelper(previousBattleState.BattleMonsters.entries());

            try {
              _loop2 = function _loop2() {
                var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
                    i = _step2$value[0],
                    battleMonster = _step2$value[1];

                if (battleMonster.currentHp > 0) {
                  enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                  previousBattleState.BattleMonsters.find(function (element) {
                    return element.id === battleMonster.id;
                  }), // MonsterState
                  currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                  enemies[battleMonster.id], // Enemy Image
                  false, // Moved To user?
                  0, // Enemy Image Frame Shown
                  playerPosition, // PlayerCords
                  i // Index
                  );
                }
              };

              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                _loop2();
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, // pass canvas ctx
            mainSkill, secondarySkill, hpOrbs[0], mpOrbs[0]);
            (0, _drawBattleLog.drawBattleLog)(ctx, battle);
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
            console.log('Render Frame #2');
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            _iterator3 = _createForOfIteratorHelper(previousBattleState.BattleMonsters.entries());

            try {
              _loop3 = function _loop3() {
                var _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2),
                    i = _step3$value[0],
                    battleMonster = _step3$value[1];

                if (battleMonster.currentHp > 0) {
                  // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
                  enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                  previousBattleState.BattleMonsters.find(function (element) {
                    return element.id === battleMonster.id;
                  }), // MonsterState
                  currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                  enemies[battleMonster.id], // Enemy Image
                  false, // Moved To user?
                  0, // Enemy Image Frame Shown
                  playerPosition, // PlayerCords
                  i // Index
                  // findUpdatedMonsterState,
                  );
                }
              };

              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                _loop3();
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            console.log(enemyPosition);
            console.log('find enemy position before');
            findAttackedEnemyByUser = enemyPosition.find(function (element) {
              return element && element.id === monsterInfo[0].monsterId;
            });
            console.log('find enemy position after');
            console.log(findAttackedEnemyByUser);
            playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
            playerImage, // image array of player images
            0, // number of image in the array to show
            findAttackedEnemyByUser // user attacking [false || enemyImagePosition]
            );
            (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[0], mpOrbs[0]);
            (0, _drawBattleLog.drawBattleLog)(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(monsterInfo[0].userDamage, findAttackedEnemyByUser.x, findAttackedEnemyByUser.y - 20, 50);
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
            console.log('Render Frame #3');
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            _iterator4 = _createForOfIteratorHelper(battle.BattleMonsters.entries());

            try {
              _loop4 = function _loop4() {
                var _step4$value = (0, _slicedToArray2["default"])(_step4.value, 2),
                    i = _step4$value[0],
                    battleMonster = _step4$value[1];

                if (battleMonster.currentHp > 0) {
                  enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                  battle.BattleMonsters.find(function (element) {
                    return element.id === battleMonster.id;
                  }), // MonsterState
                  currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                  enemies[battleMonster.id], // Enemy Image
                  false, // Moved To user?
                  0, // Enemy Image Frame Shown
                  playerPosition, // PlayerCords
                  i // Index
                  );
                }
              };

              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                _loop4();
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
            playerImage, // image array of player images
            0, // number of image in the array to show
            findAttackedEnemyByUser // user attacking [false || enemyImagePosition]
            );
            (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[0], mpOrbs[1]);
            (0, _drawBattleLog.drawBattleLog)(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(monsterInfo[0].userDamage, findAttackedEnemyByUser.x, findAttackedEnemyByUser.y - 20, 50);
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
            console.log('Render Frame #4');
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
            playerImage, // image array of player images
            0, // number of image in the array to show
            false // user attacking [false || enemyImagePosition]
            );
            _iterator5 = _createForOfIteratorHelper(battle.BattleMonsters.entries());

            try {
              _loop5 = function _loop5() {
                var _step5$value = (0, _slicedToArray2["default"])(_step5.value, 2),
                    i = _step5$value[0],
                    battleMonster = _step5$value[1];

                if (battleMonster.currentHp > 0) {
                  enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                  battle.BattleMonsters.find(function (element) {
                    return element.id === battleMonster.id;
                  }), // MonsterState
                  currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                  enemies[battleMonster.id], // Enemy Image
                  false, // Moved To user?
                  0, // Enemy Image Frame Shown
                  playerPosition, // PlayerCords
                  i // Index
                  );
                }
              };

              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                _loop5();
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }

            (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[0], mpOrbs[1]);
            (0, _drawBattleLog.drawBattleLog)(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(monsterInfo[0].userDamage, findAttackedEnemyByUser.x, findAttackedEnemyByUser.y - 20, 50);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            palette = (0, _gifenc.quantize)(imageData.data, 256, {
              format: 'rgb333'
            });
            imageIndex = (0, _gifenc.applyPalette)(imageData.data, palette);
            gif.writeFrame(imageIndex, canvas.width, canvas.height, {
              palette: palette,
              delay: 400,
              repeat: -1
            }); // eslint-disable-next-line no-restricted-syntax

            _iterator6 = _createForOfIteratorHelper(battleInfoArray.entries());

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                _step6$value = (0, _slicedToArray2["default"])(_step6.value, 2), index = _step6$value[0], battleInfo = _step6$value[1];
                console.log('Render Frame #5');
                (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                playerImage, // image array of player images
                0, // number of image in the array to show
                false // user attacking [false || enemyImagePosition]
                );
                _iterator7 = _createForOfIteratorHelper(battle.BattleMonsters.entries());

                try {
                  _loop6 = function _loop6() {
                    var _step7$value = (0, _slicedToArray2["default"])(_step7.value, 2),
                        i = _step7$value[0],
                        battleMonster = _step7$value[1];

                    if (battleMonster.currentHp > 0) {
                      enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                      battle.BattleMonsters.find(function (element) {
                        return element.id === battleMonster.id;
                      }), // MonsterState
                      currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                      enemies[battleMonster.id], // Enemy Image
                      battleMonster.id === battleInfo.monsterId, // Moved To user?
                      battleMonster.id === battleInfo.monsterId ? 0 : 0, // Enemy Image Frame Shown
                      playerPosition[0], // PlayerCords
                      i // Index
                      );
                    }
                  };

                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    _loop6();
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }

                (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + 1], mpOrbs[1]);
                (0, _drawBattleLog.drawBattleLog)(ctx, battle);
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
                console.log('Render Frame #6');
                (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                console.log('draw player');
                playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                playerImage, // image array of player images
                0, // number of image in the array to show
                false // user attacking [false || enemyImagePosition]
                );
                _iterator8 = _createForOfIteratorHelper(battle.BattleMonsters.entries());

                try {
                  _loop7 = function _loop7() {
                    var _step8$value = (0, _slicedToArray2["default"])(_step8.value, 2),
                        i = _step8$value[0],
                        battleMonster = _step8$value[1];

                    if (battleMonster.currentHp > 0) {
                      enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                      battle.BattleMonsters.find(function (element) {
                        return element.id === battleMonster.id;
                      }), // MonsterState
                      currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                      enemies[battleMonster.id], // Enemy Image
                      battleMonster.id === battleInfo.monsterId, // Moved To user?
                      battleMonster.id === battleInfo.monsterId ? 1 : 0, // Enemy Image Frame Shown
                      playerPosition[0], // PlayerCords
                      i // Index
                      );
                    }
                  };

                  for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                    _loop7();
                  }
                } catch (err) {
                  _iterator8.e(err);
                } finally {
                  _iterator8.f();
                }

                console.log('draw screenTools');
                (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + 1], mpOrbs[1]);
                console.log('draw battleLog');
                (0, _drawBattleLog.drawBattleLog)(ctx, battle);
                ctx.lineWidth = 1;
                ctx.font = 'bold 13px "HeartWarming"';
                ctx.strokeText(battleInfo.damage, playerPosition[0].x, playerPosition[0].y - 20, 50);
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
                console.log('Render Frame #7');
                (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                playerImage, // image array of player images
                0, // number of image in the array to show
                false // user attacking [false || enemyImagePosition]
                );
                _iterator9 = _createForOfIteratorHelper(battle.BattleMonsters.entries());

                try {
                  _loop8 = function _loop8() {
                    var _step9$value = (0, _slicedToArray2["default"])(_step9.value, 2),
                        i = _step9$value[0],
                        battleMonster = _step9$value[1];

                    if (battleMonster.currentHp > 0) {
                      enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                      battle.BattleMonsters.find(function (element) {
                        return element.id === battleMonster.id;
                      }), // MonsterState
                      currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                      enemies[battleMonster.id], // Enemy Image
                      battleMonster.id === battleInfo.monsterId, // Moved To user?
                      battleMonster.id === battleInfo.monsterId ? 2 : 0, // Enemy Image Frame Shown
                      playerPosition[0], // PlayerCords
                      i // Index
                      );
                    }
                  };

                  for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                    _loop8();
                  }
                } catch (err) {
                  _iterator9.e(err);
                } finally {
                  _iterator9.f();
                }

                (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + 1], mpOrbs[1]);
                (0, _drawBattleLog.drawBattleLog)(ctx, battle);
                ctx.lineWidth = 1;
                ctx.font = 'bold 13px "HeartWarming"';
                ctx.strokeText(battleInfo.damage, playerPosition[0].x, playerPosition[0].y - 20, 50);
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
                console.log('Render Frame #8');
                (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                playerImage, // image array of player images
                0, // number of image in the array to show
                false // user attacking [false || enemyImagePosition]
                );
                _iterator10 = _createForOfIteratorHelper(battle.BattleMonsters.entries());

                try {
                  _loop9 = function _loop9() {
                    var _step10$value = (0, _slicedToArray2["default"])(_step10.value, 2),
                        i = _step10$value[0],
                        battleMonster = _step10$value[1];

                    if (battleMonster.currentHp > 0) {
                      enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                      battle.BattleMonsters.find(function (element) {
                        return element.id === battleMonster.id;
                      }), // MonsterState
                      currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                      enemies[battleMonster.id], // Enemy Image
                      battleMonster.id === battleInfo.monsterId, // Moved To user?
                      battleMonster.id === battleInfo.monsterId ? 0 : 0, // Enemy Image Frame Shown
                      playerPosition[0], // PlayerCords
                      i // Index
                      );
                    }
                  };

                  for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                    _loop9();
                  }
                } catch (err) {
                  _iterator10.e(err);
                } finally {
                  _iterator10.f();
                }

                (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + 1], mpOrbs[1]);
                (0, _drawBattleLog.drawBattleLog)(ctx, battle);
                ctx.lineWidth = 1;
                ctx.font = 'bold 13px "HeartWarming"';
                ctx.strokeText(battleInfo.damage, playerPosition[0].x, playerPosition[0].y - 20, 50);
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
                console.log('Render Frame #9');
                (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                playerImage, // image array of player images
                0, // number of image in the array to show
                false // user attacking [false || enemyImagePosition]
                );
                _iterator11 = _createForOfIteratorHelper(battle.BattleMonsters.entries());

                try {
                  _loop10 = function _loop10() {
                    var _step11$value = (0, _slicedToArray2["default"])(_step11.value, 2),
                        i = _step11$value[0],
                        battleMonster = _step11$value[1];

                    if (battleMonster.currentHp > 0) {
                      enemyPosition[i] = (0, _drawEnemy.drawEnemy)(ctx, // CTX
                      battle.BattleMonsters.find(function (element) {
                        return element.id === battleMonster.id;
                      }), // MonsterState
                      currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
                      enemies[battleMonster.id], // Enemy Image
                      false, // Moved To user?
                      0, // Enemy Image Frame Shown
                      playerPosition[0], // PlayerCords
                      i // Index
                      );
                    }
                  };

                  for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                    _loop10();
                  }
                } catch (err) {
                  _iterator11.e(err);
                } finally {
                  _iterator11.f();
                }

                (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + 1], mpOrbs[1]);
                (0, _drawBattleLog.drawBattleLog)(ctx, battle);
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
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }

            gif.finish();
            bytes = gif.bytesView();
            finalImage = Buffer.from(bytes);
            return _context.abrupt("return", finalImage);

          case 83:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderBattleGif(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderBattleGif = renderBattleGif;