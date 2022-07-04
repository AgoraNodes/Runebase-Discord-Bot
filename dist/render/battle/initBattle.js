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

(0, _canvas.registerFont)(_path["default"].join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), {
  family: 'HeartWarming'
});

var renderInitBattleGif = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentUser, userCurrentSelectedSkills, battle, previousBattleState, previousUserState, currentSelectedMonster) {
    var battleInfoArray,
        monsterInfo,
        zone,
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
        index,
        _iterator,
        _step,
        _loop,
        canvas,
        ctx,
        gif,
        playerPosition,
        _iterator2,
        _step2,
        _loop2,
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
            console.log('initBattle 1');
            _iterator = _createForOfIteratorHelper(battle.BattleMonsters.entries());

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
            _context.next = 15;
            return Promise.all(loadPromises);

          case 15:
            console.log('initBattle 4');
            canvas = (0, _canvas.createCanvas)(650, 300);
            ctx = canvas.getContext('2d');
            gif = (0, _gifenc.GIFEncoder)();
            (0, _drawBackground.drawBackground)(ctx, canvas, backgroundImage);
            playerPosition = (0, _drawPlayer.drawPlayer)(ctx, // Ctx drawing canvas
            playerImage, // image array of player images
            0, // number of image in the array to show
            false // user attacking [false || enemyImagePosition]
            );
            _iterator2 = _createForOfIteratorHelper(battle.BattleMonsters.entries());

            try {
              _loop2 = function _loop2() {
                var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
                    i = _step2$value[0],
                    battleMonster = _step2$value[1];

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
            palette = (0, _gifenc.quantize)(imageData.data, 256);
            index = (0, _gifenc.applyPalette)(imageData.data, palette);
            gif.writeFrame(index, canvas.width, canvas.height, {
              palette: palette
            });
            gif.finish();
            bytes = gif.bytes();
            finalImage = Buffer.from(bytes);
            return _context.abrupt("return", finalImage);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderInitBattleGif(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderInitBattleGif = renderInitBattleGif;