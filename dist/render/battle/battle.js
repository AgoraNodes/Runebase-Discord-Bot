"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderBattleGif = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _gifEncoder = _interopRequireDefault(require("gif-encoder-2"));

var _calculateCharacterStats = require("../../helpers/stats/calculateCharacterStats");

var _hp = require("../orbs/hp");

var _mp = require("../orbs/mp");

// import db from '../models';
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

var drawScreenTools = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx, mainSkill, secondarySkill, hpOrbImage, mpOrbImage) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ctx.drawImage(mainSkill, 60, // x position
            175, // y position
            hpOrbImage.width / 4, hpOrbImage.height / 4);
            ctx.drawImage(secondarySkill, 225, // x position
            175, // y position
            hpOrbImage.width / 4, hpOrbImage.height / 4);
            ctx.drawImage(hpOrbImage, 0, // x position
            132, // y position
            hpOrbImage.width / 1.5, hpOrbImage.height / 1.5);
            ctx.drawImage(mpOrbImage, 250, // x position
            132, // y position
            hpOrbImage.width / 1.5, hpOrbImage.height / 1.5);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function drawScreenTools(_x3, _x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
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
  ctx.strokeStyle = "red"; // empty bar

  if (!movedToUser) {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(185, 45, 40, 0);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(185, 45, 40 * (monster.BattleMonster.currentHp / monster.BattleMonster.maxHp), 0);
    ctx.drawImage(enemyFrame[number], 190, // x position
    45, // y position
    enemyFrame[number].width / 1.5, enemyFrame[number].height / 1.5);
  } else {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(110, 37, 40, 0);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(110, 37, 40 * (monster.BattleMonster.currentHp / monster.BattleMonster.maxHp), 0);
    ctx.drawImage(enemyFrame[number], 115, // x position
    37, // y position
    enemyFrame[number].width / 1.5, enemyFrame[number].height / 1.5);
  }
};

var renderBattleGif = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(currentUser, userCurrentSelectedSkills, battle, previousBattleState, previousUserState) {
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
        encoder,
        slice,
        finalImage,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            monsterInfo = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : false;
            userInfo = _args3.length > 6 && _args3[6] !== undefined ? _args3[6] : false;
            console.log(previousUserState.condition);
            console.log('previous user state');
            console.log(currentUser.condition);
            console.log('next user state');
            console.log('renderBattlegif');
            console.log('123');
            _context3.next = 10;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 10:
            enemyFrame = [];
            _context3.next = 13;
            return (0, _hp.renderHpOrb)(previousUserState);

          case 13:
            hpOrbBufferPrevious = _context3.sent;
            _context3.next = 16;
            return (0, _mp.renderMpOrb)(previousUserState);

          case 16:
            mpOrbBufferPrevious = _context3.sent;
            _context3.next = 19;
            return (0, _hp.renderHpOrb)(currentUser);

          case 19:
            hpOrbBuffer = _context3.sent;
            _context3.next = 22;
            return (0, _mp.renderMpOrb)(currentUser);

          case 22:
            mpOrbBuffer = _context3.sent;
            _context3.next = 25;
            return (0, _canvas.loadImage)(hpOrbBuffer);

          case 25:
            hpOrbImage = _context3.sent;
            _context3.next = 28;
            return (0, _canvas.loadImage)(mpOrbBuffer);

          case 28:
            mpOrbImage = _context3.sent;
            _context3.next = 31;
            return (0, _canvas.loadImage)(hpOrbBufferPrevious);

          case 31:
            hpOrbImagePrevious = _context3.sent;
            _context3.next = 34;
            return (0, _canvas.loadImage)(mpOrbBufferPrevious);

          case 34:
            mpOrbImagePrevious = _context3.sent;
            _context3.next = 37;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/monsters/Zombie/", "zombie.png"));

          case 37:
            enemyFrame[0] = _context3.sent;
            _context3.next = 40;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/monsters/Zombie/", "zombie (8).png"));

          case 40:
            enemyFrame[1] = _context3.sent;
            _context3.next = 43;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/monsters/Zombie/", "zombie (6).png"));

          case 43:
            enemyFrame[2] = _context3.sent;
            _context3.next = 46;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedMainSkill.skill.name, ".png")));

          case 46:
            mainSkill = _context3.sent;
            _context3.next = 49;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skills/".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree ? "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree["class"].name, "/").concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.name) : ""), "".concat(userCurrentSelectedSkills.selectedSecondarySkill.skill.name, ".png")));

          case 49:
            secondarySkill = _context3.sent;
            canvas = (0, _canvas.createCanvas)(450, 200);
            ctx = canvas.getContext('2d');
            encoder = new _gifEncoder["default"](450, 200);
            encoder.setDelay(200);
            encoder.setRepeat(-1);
            encoder.setQuality(30);
            encoder.start(); // frame 1

            slice = 200 / 5; // this is the width of each rectangle

            _context3.next = 60;
            return background(ctx, 'den');

          case 60:
            drawPlayer(ctx, false);
            drawEnemy(ctx, previousBattleState.monsters[0], enemyFrame);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImagePrevious);
            drawBattleLog(ctx, battle);
            encoder.addFrame(ctx); // frame 2

            _context3.next = 67;
            return background(ctx, 'den');

          case 67:
            drawPlayer(ctx, false);
            drawEnemy(ctx, previousBattleState.monsters[0], enemyFrame);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImagePrevious);
            drawBattleLog(ctx, battle);
            encoder.addFrame(ctx); // frame 3

            _context3.next = 74;
            return background(ctx, 'den');

          case 74:
            drawPlayer(ctx, false);
            drawEnemy(ctx, previousBattleState.monsters[0], enemyFrame);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImagePrevious);
            drawBattleLog(ctx, battle);
            encoder.addFrame(ctx); // frame 4

            _context3.next = 81;
            return background(ctx, 'den');

          case 81:
            drawPlayer(ctx, true);
            drawEnemy(ctx, previousBattleState.monsters[0], enemyFrame);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImagePrevious);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
            encoder.addFrame(ctx); // frame 5

            _context3.next = 91;
            return background(ctx, 'den');

          case 91:
            drawPlayer(ctx, true);
            drawEnemy(ctx, battle.monsters[0], enemyFrame);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
            encoder.addFrame(ctx); // frame 6

            _context3.next = 101;
            return background(ctx, 'den');

          case 101:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
            encoder.addFrame(ctx); // frame 7

            _context3.next = 111;
            return background(ctx, 'den');

          case 111:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
            encoder.addFrame(ctx);

            if (!monsterInfo.alive) {
              _context3.next = 171;
              break;
            }

            _context3.next = 122;
            return background(ctx, 'den');

          case 122:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImage);
            drawBattleLog(ctx, battle);
            encoder.addFrame(ctx); // frame 9

            _context3.next = 129;
            return background(ctx, 'den');

          case 129:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImage);
            drawBattleLog(ctx, battle);
            encoder.addFrame(ctx); // frame 6

            _context3.next = 136;
            return background(ctx, 'den');

          case 136:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame, true);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImagePrevious, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50);
            encoder.addFrame(ctx); // frame 6

            _context3.next = 146;
            return background(ctx, 'den');

          case 146:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame, true, 1);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50);
            encoder.addFrame(ctx); // frame 6

            _context3.next = 156;
            return background(ctx, 'den');

          case 156:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame, true, 2);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx, battle);
            ctx.lineWidth = 1;
            ctx.font = 'bold 13px "HeartWarming"';
            ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50);
            encoder.addFrame(ctx); // frame 6

            _context3.next = 166;
            return background(ctx, 'den');

          case 166:
            drawPlayer(ctx, false);
            drawEnemy(ctx, battle.monsters[0], enemyFrame);
            drawScreenTools(ctx, mainSkill, secondarySkill, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx, battle);
            encoder.addFrame(ctx);

          case 171:
            encoder.finish();
            _context3.next = 174;
            return encoder.out.getData();

          case 174:
            finalImage = _context3.sent;
            return _context3.abrupt("return", finalImage);

          case 176:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function renderBattleGif(_x8, _x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

exports.renderBattleGif = renderBattleGif;