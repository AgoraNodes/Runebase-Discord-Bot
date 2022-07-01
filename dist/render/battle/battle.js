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

var _gif = _interopRequireDefault(require("gif.node"));

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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(currentUser, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, currentSelectedMonster) {
    var battleInfoArray,
        monsterInfo,
        enemyPosition,
        playerPosition,
        enemies,
        zone,
        backgroundImage,
        playerImage,
        _yield$loadOrbs,
        _yield$loadOrbs2,
        hpOrbs,
        mpOrbs,
        mainSkill,
        secondarySkill,
        canvas,
        ctx,
        gif,
        findAttackedEnemyByUser,
        _iterator,
        _step,
        _loop,
        finalImage,
        _args11 = arguments;

    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            battleInfoArray = _args11.length > 6 && _args11[6] !== undefined ? _args11[6] : false;
            monsterInfo = _args11.length > 7 && _args11[7] !== undefined ? _args11[7] : false;
            enemyPosition = [];
            playerPosition = [];
            enemies = [];
            _context11.next = 7;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 7:
            zone = 'den';
            _context11.next = 10;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/battle/background", "".concat(zone, ".png")));

          case 10:
            backgroundImage = _context11.sent;
            _context11.next = 13;
            return (0, _loadPlayer.loadPlayer)(currentUser["class"].name);

          case 13:
            playerImage = _context11.sent;
            console.log('start render gif 1');
            previousBattleState.BattleMonsters.forEach( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(battleMonster, i) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _loadEnemy.loadEnemy)(battleMonster.monster.name);

                      case 2:
                        enemies[parseInt(battleMonster.id, 10)] = _context.sent;

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x7, _x8) {
                return _ref2.apply(this, arguments);
              };
            }());
            console.log('start render gif 22');
            _context11.next = 19;
            return (0, _loadOrbs.loadOrbs)(previousUserState, battleInfoArray, monsterInfo);

          case 19:
            _yield$loadOrbs = _context11.sent;
            _yield$loadOrbs2 = (0, _slicedToArray2["default"])(_yield$loadOrbs, 2);
            hpOrbs = _yield$loadOrbs2[0];
            mpOrbs = _yield$loadOrbs2[1];
            console.log('start render gif 3');
            _context11.next = 26;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.name, ".png")));

          case 26:
            mainSkill = _context11.sent;
            _context11.next = 29;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.name, ".png")));

          case 29:
            secondarySkill = _context11.sent;
            console.log('start render gif 2');
            canvas = (0, _canvas.createCanvas)(650, 300);
            ctx = canvas.getContext('2d');
            gif = new _gif["default"]({
              worker: 8,
              quality: 50,
              debug: false,
              width: canvas.width,
              height: canvas.height,
              repeat: -1
            });
            console.log('Render Frame #1');
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
            playerImage, // image array of player images
            0, // number of image in the array to show
            false // user attacking [false || enemyImagePosition]
            );
            previousBattleState.BattleMonsters.forEach( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(battleMonster, i) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
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

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x9, _x10) {
                return _ref3.apply(this, arguments);
              };
            }());
            (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, // pass canvas ctx
            mainSkill, secondarySkill, hpOrbs[0], mpOrbs[0]);
            (0, _drawBattleLog.drawBattleLog)(ctx, battle);
            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 600
            });
            console.log('Render Frame #2');
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            previousBattleState.BattleMonsters.forEach( /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(battleMonster, i) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
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

                      case 1:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x11, _x12) {
                return _ref4.apply(this, arguments);
              };
            }());
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
            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 200
            });
            console.log('Render Frame #3');
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            battle.BattleMonsters.forEach( /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(battleMonster, i) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
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

                      case 1:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x13, _x14) {
                return _ref5.apply(this, arguments);
              };
            }());
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
            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 200
            });
            console.log('Render Frame #4');
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
            playerImage, // image array of player images
            0, // number of image in the array to show
            false // user attacking [false || enemyImagePosition]
            );
            battle.BattleMonsters.forEach( /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(battleMonster, i) {
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
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

                      case 1:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x15, _x16) {
                return _ref6.apply(this, arguments);
              };
            }());
            (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[0], mpOrbs[1]);
            (0, _drawBattleLog.drawBattleLog)(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(monsterInfo[0].userDamage, findAttackedEnemyByUser.x, findAttackedEnemyByUser.y - 20, 50);
            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 400
            }); // eslint-disable-next-line no-restricted-syntax

            _iterator = _createForOfIteratorHelper(battleInfoArray.entries());

            try {
              _loop = function _loop() {
                var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
                    index = _step$value[0],
                    battleInfo = _step$value[1];

                console.log('Render Frame #5');
                (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                playerImage, // image array of player images
                0, // number of image in the array to show
                false // user attacking [false || enemyImagePosition]
                );
                battle.BattleMonsters.forEach( /*#__PURE__*/function () {
                  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(battleMonster, i) {
                    return _regenerator["default"].wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
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

                          case 1:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  return function (_x17, _x18) {
                    return _ref7.apply(this, arguments);
                  };
                }());
                (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + 1], mpOrbs[1]);
                (0, _drawBattleLog.drawBattleLog)(ctx, battle);
                gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
                  delay: 400
                });
                console.log('Render Frame #6');
                (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                console.log('draw player');
                playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                playerImage, // image array of player images
                0, // number of image in the array to show
                false // user attacking [false || enemyImagePosition]
                );
                battle.BattleMonsters.forEach( /*#__PURE__*/function () {
                  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(battleMonster, i) {
                    return _regenerator["default"].wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
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

                          case 1:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x19, _x20) {
                    return _ref8.apply(this, arguments);
                  };
                }());
                console.log('draw screenTools');
                (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + 1], mpOrbs[1]);
                console.log('draw battleLog');
                (0, _drawBattleLog.drawBattleLog)(ctx, battle);
                ctx.lineWidth = 1;
                ctx.font = 'bold 13px "HeartWarming"';
                ctx.strokeText(battleInfo.damage, playerPosition[0].x, playerPosition[0].y - 20, 50);
                gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
                  delay: 200
                });
                console.log('Render Frame #7');
                (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                playerImage, // image array of player images
                0, // number of image in the array to show
                false // user attacking [false || enemyImagePosition]
                );
                battle.BattleMonsters.forEach( /*#__PURE__*/function () {
                  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(battleMonster, i) {
                    return _regenerator["default"].wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
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

                          case 1:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));

                  return function (_x21, _x22) {
                    return _ref9.apply(this, arguments);
                  };
                }());
                (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + 1], mpOrbs[1]);
                (0, _drawBattleLog.drawBattleLog)(ctx, battle);
                ctx.lineWidth = 1;
                ctx.font = 'bold 13px "HeartWarming"';
                ctx.strokeText(battleInfo.damage, playerPosition[0].x, playerPosition[0].y - 20, 50);
                gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
                  delay: 200
                });
                console.log('Render Frame #8');
                (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                playerImage, // image array of player images
                0, // number of image in the array to show
                false // user attacking [false || enemyImagePosition]
                );
                battle.BattleMonsters.forEach( /*#__PURE__*/function () {
                  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(battleMonster, i) {
                    return _regenerator["default"].wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
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

                          case 1:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x23, _x24) {
                    return _ref10.apply(this, arguments);
                  };
                }());
                (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + 1], mpOrbs[1]);
                (0, _drawBattleLog.drawBattleLog)(ctx, battle);
                ctx.lineWidth = 1;
                ctx.font = 'bold 13px "HeartWarming"';
                ctx.strokeText(battleInfo.damage, playerPosition[0].x, playerPosition[0].y - 20, 50);
                gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
                  delay: 200
                });
                console.log('Render Frame #9');
                (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
                playerPosition[0] = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
                playerImage, // image array of player images
                0, // number of image in the array to show
                false // user attacking [false || enemyImagePosition]
                );
                battle.BattleMonsters.forEach( /*#__PURE__*/function () {
                  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(battleMonster, i) {
                    return _regenerator["default"].wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
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

                          case 1:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }));

                  return function (_x25, _x26) {
                    return _ref11.apply(this, arguments);
                  };
                }());
                (0, _drawBattleScreenTools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbs[index + 1], mpOrbs[1]);
                (0, _drawBattleLog.drawBattleLog)(ctx, battle);
                gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
                  delay: 300
                });
              };

              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                _loop();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            gif.render();
            _context11.next = 81;
            return new Promise(function (resolve, reject) {
              console.log('Resolving Gif render');
              gif.on('finished', resolve);
            });

          case 81:
            finalImage = _context11.sent;
            return _context11.abrupt("return", finalImage);

          case 83:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function renderBattleGif(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderBattleGif = renderBattleGif;