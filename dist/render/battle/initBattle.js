"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderInitBattleGif = void 0;

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

var renderInitBattleGif = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(currentUser, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, currentSelectedMonster) {
    var battleInfoArray,
        monsterInfo,
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
        playerPosition,
        finalImage,
        _args3 = arguments;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            battleInfoArray = _args3.length > 6 && _args3[6] !== undefined ? _args3[6] : false;
            monsterInfo = _args3.length > 7 && _args3[7] !== undefined ? _args3[7] : false;
            enemies = [];
            _context3.next = 5;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 5:
            zone = 'den';
            _context3.next = 8;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/battle/background", "".concat(zone, ".png")));

          case 8:
            backgroundImage = _context3.sent;
            battle.BattleMonsters.forEach( /*#__PURE__*/function () {
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
            _context3.next = 12;
            return (0, _loadPlayer.loadPlayer)(currentUser["class"].name);

          case 12:
            playerImage = _context3.sent;
            _context3.next = 15;
            return (0, _loadOrbs.loadOrbs)(previousUserState, battleInfoArray, monsterInfo);

          case 15:
            _yield$loadOrbs = _context3.sent;
            _yield$loadOrbs2 = (0, _slicedToArray2["default"])(_yield$loadOrbs, 2);
            hpOrbs = _yield$loadOrbs2[0];
            mpOrbs = _yield$loadOrbs2[1];
            _context3.next = 21;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.name, ".png")));

          case 21:
            mainSkill = _context3.sent;
            _context3.next = 24;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.name, ".png")));

          case 24:
            secondarySkill = _context3.sent;
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
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            playerPosition = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
            playerImage, // image array of player images
            0, // number of image in the array to show
            false // user attacking [false || enemyImagePosition]
            );
            battle.BattleMonsters.forEach( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(battleMonster, i) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (battleMonster.currentHp > 0) {
                          (0, _drawEnemy.drawEnemy)(ctx, // CTX
                          previousBattleState.BattleMonsters.find(function (element) {
                            return element.id === battleMonster.id;
                          }), // MonsterState
                          currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
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
              delay: 200
            });
            gif.render();
            _context3.next = 37;
            return new Promise(function (resolve, reject) {
              gif.on('finished', resolve);
            });

          case 37:
            finalImage = _context3.sent;
            return _context3.abrupt("return", finalImage);

          case 39:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function renderInitBattleGif(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderInitBattleGif = renderInitBattleGif;