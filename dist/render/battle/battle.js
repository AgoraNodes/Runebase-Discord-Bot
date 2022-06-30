"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderBattleGif = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _gif = _interopRequireDefault(require("gif.node"));

var _hp = require("../orbs/hp");

var _mp = require("../orbs/mp");

var _tools = require("./tools");

// import { calculateCharacterStats } from '../../helpers/stats/calculateCharacterStats';
var background = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, zone) {
    var mapImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/zone/background", "".concat(zone, ".png")));

          case 2:
            mapImage = _context.sent;
            ctx.drawImage(mapImage, 0, // x position
            0, // y position
            mapImage.width, mapImage.height);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function background(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var drawBattleLog = function drawBattleLog(ctx, battle) {
  ctx.fillStyle = 'white';
  ctx.fillRect(320, 0, 130, 200);
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText('Battle log', 330, 20, 100);
  ctx.fillText('Battle log', 330, 20, 100);
  ctx.font = 'normal 10px serif';
  ctx.fillStyle = 'black';

  for (var i = 0; i < battle.battleLogs.length; i++) {
    ctx.fillText(battle.battleLogs[i].log, 330, 25 + (i + 1) * 15, 100);
  }
};

var drawPlayer = function drawPlayer(ctx, inAttackPosition) {
  function drawBorder(xPos, yPos, width, height) {
    var thickness = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    ctx.fillStyle = '#FFF';
    ctx.fillRect(xPos - thickness, yPos - thickness, width + thickness * 2, height + thickness * 2);
  }

  var rectXPos = 80;
  var rectYPos = 70;
  var rectWidth = 20;
  var rectHeight = 50;

  if (inAttackPosition) {
    rectXPos = 175;
    rectYPos = 60;
    rectWidth = 20;
    rectHeight = 50;
  }

  drawBorder(rectXPos, rectYPos, rectWidth, rectHeight);
  ctx.fillStyle = '#000';
  ctx.fillRect(rectXPos, rectYPos, rectWidth, rectHeight);
};

var drawEnemy = function drawEnemy(ctx, monster, enemyFrame) {
  var movedToUser = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var number = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  // XP Bar
  ctx.lineJoin = 'round';
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  var hpPercentage = monster.BattleMonster.currentHp / monster.BattleMonster.maxHp;

  if (hpPercentage < 0) {
    hpPercentage = 0;
  }

  if (hpPercentage > 100) {
    hpPercentage = 0;
  } // empty bar


  if (!movedToUser) {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(185, 45, 40, 0);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(185, 45, 40 * hpPercentage, 0);
    ctx.drawImage(enemyFrame[number], 190, // x position
    45, // y position
    enemyFrame[number].width / 1.5, enemyFrame[number].height / 1.5);
  } else {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(110, 37, 40, 0);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(110, 37, 40 * hpPercentage, 0);
    ctx.drawImage(enemyFrame[number], 115, // x position
    37, // y position
    enemyFrame[number].width / 1.5, enemyFrame[number].height / 1.5);
  }
};

var renderBattleGif = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(currentUser, userCurrentSelectedSkills, battle, previousBattleState, previousUserState) {
    var monsterInfo,
        userInfo,
        enemyFrame,
        hpOrbBufferPrevious,
        mpOrbBufferPrevious,
        hpOrbBuffer,
        mpOrbBuffer,
        hpOrbImage,
        mpOrbImage,
        hpOrbImagePrevious,
        mpOrbImagePrevious,
        mainSkill,
        secondarySkill,
        canvas,
        ctx,
        gif,
        finalImage,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            monsterInfo = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : false;
            userInfo = _args2.length > 6 && _args2[6] !== undefined ? _args2[6] : false;
            _context2.next = 4;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 4:
            enemyFrame = [];
            _context2.next = 7;
            return (0, _hp.renderHpOrb)(previousUserState);

          case 7:
            hpOrbBufferPrevious = _context2.sent;
            _context2.next = 10;
            return (0, _mp.renderMpOrb)(previousUserState);

          case 10:
            mpOrbBufferPrevious = _context2.sent;
            _context2.next = 13;
            return (0, _hp.renderHpOrb)(currentUser);

          case 13:
            hpOrbBuffer = _context2.sent;
            _context2.next = 16;
            return (0, _mp.renderMpOrb)(currentUser);

          case 16:
            mpOrbBuffer = _context2.sent;
            _context2.next = 19;
            return (0, _canvas.loadImage)(hpOrbBuffer);

          case 19:
            hpOrbImage = _context2.sent;
            _context2.next = 22;
            return (0, _canvas.loadImage)(mpOrbBuffer);

          case 22:
            mpOrbImage = _context2.sent;
            _context2.next = 25;
            return (0, _canvas.loadImage)(hpOrbBufferPrevious);

          case 25:
            hpOrbImagePrevious = _context2.sent;
            _context2.next = 28;
            return (0, _canvas.loadImage)(mpOrbBufferPrevious);

          case 28:
            mpOrbImagePrevious = _context2.sent;
            _context2.next = 31;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/monsters/Zombie/", "zombie.png"));

          case 31:
            enemyFrame[0] = _context2.sent;
            _context2.next = 34;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/monsters/Zombie/", "zombie (8).png"));

          case 34:
            enemyFrame[1] = _context2.sent;
            _context2.next = 37;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/monsters/Zombie/", "zombie (6).png"));

          case 37:
            enemyFrame[2] = _context2.sent;
            _context2.next = 40;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.name, ".png")));

          case 40:
            mainSkill = _context2.sent;
            _context2.next = 43;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.name, ".png")));

          case 43:
            secondarySkill = _context2.sent;
            canvas = (0, _canvas.createCanvas)(450, 200);
            ctx = canvas.getContext('2d');
            gif = new _gif["default"]({
              worker: 8,
              quality: 50,
              debug: false,
              width: 450,
              height: 200,
              repeat: -1
            });
            _context2.next = 49;
            return background(ctx, 'den');

          case 49:
            drawPlayer(ctx, false);
            drawEnemy(ctx, previousBattleState.monsters[0], enemyFrame);
            (0, _tools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImagePrevious);
            drawBattleLog(ctx, battle);
            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 600
            }); // frame 4

            _context2.next = 56;
            return background(ctx, 'den');

          case 56:
            drawPlayer(ctx, true);
            drawEnemy(ctx, previousBattleState.monsters[0], enemyFrame);
            (0, _tools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImagePrevious);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 200
            }); // frame 5

            _context2.next = 66;
            return background(ctx, 'den');

          case 66:
            drawPlayer(ctx, true);
            drawEnemy(ctx, battle.monsters[0], enemyFrame);
            (0, _tools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 200
            }); // frame 7

            _context2.next = 76;
            return background(ctx, 'den');

          case 76:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame);
            (0, _tools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(userInfo.attackDamage, 193, 38, 50); // encoder.addFrame(ctx);

            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 400
            });

            if (!monsterInfo.alive) {
              _context2.next = 129;
              break;
            }

            _context2.next = 87;
            return background(ctx, 'den');

          case 87:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame);
            (0, _tools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImage);
            drawBattleLog(ctx, battle); // encoder.addFrame(ctx);

            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 400
            }); // frame 6

            _context2.next = 94;
            return background(ctx, 'den');

          case 94:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame, true);
            (0, _tools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50); // encoder.addFrame(ctx);

            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 200
            }); // frame 6

            _context2.next = 104;
            return background(ctx, 'den');

          case 104:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame, true, 1);
            (0, _tools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50); // encoder.addFrame(ctx);

            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 200
            }); // frame 6

            _context2.next = 114;
            return background(ctx, 'den');

          case 114:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame, true, 2);
            (0, _tools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50); // encoder.addFrame(ctx);

            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 200
            }); // frame 6

            _context2.next = 124;
            return background(ctx, 'den');

          case 124:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame);
            (0, _tools.drawBattleScreenTools)(ctx, mainSkill, secondarySkill, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx, battle); // encoder.addFrame(ctx);

            gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
              delay: 200
            });

          case 129:
            _context2.next = 131;
            return gif.render();

          case 131:
            _context2.next = 133;
            return new Promise(function (resolve, reject) {
              gif.on('finished', resolve);
            });

          case 133:
            finalImage = _context2.sent;
            return _context2.abrupt("return", finalImage);

          case 135:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function renderBattleGif(_x3, _x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.renderBattleGif = renderBattleGif;