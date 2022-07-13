"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawEnemy = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable no-restricted-syntax */
var drawEnemy = function drawEnemy(ctx, monster, isSelected, enemyFrame, debuffImages, effectImages) {
  var movedToUser = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var number = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  var playerPosition = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : {
    x: 0,
    y: 0
  };
  var index = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
  var updatedMonsterState = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
  var extraPositionX = 0;
  var extraPositionY = 0;
  var minusIndex = 0;

  if (index % 2 === 0 && index !== 0) {
    minusIndex = index / 2;
    extraPositionX = (index - minusIndex) * 30;
    extraPositionY = (index - minusIndex) * 30;
  }

  if (index % 2 !== 0 && index !== 0) {
    if (index > 2) {
      minusIndex = 1;
    }

    extraPositionX = (index - minusIndex) * -30;
    extraPositionY = (index - minusIndex) * -30;
  }

  var x = 0;
  var y = 0; // XP Bar

  ctx.lineJoin = 'round';
  var currentMonsterHp = updatedMonsterState ? updatedMonsterState.currentMonsterHp : monster.currentHp;
  var hpPercentage = currentMonsterHp / monster.maxHp;

  if (hpPercentage < 0) {
    hpPercentage = 0;
  }

  if (hpPercentage > 100) {
    hpPercentage = 0;
  }

  if (!movedToUser) {
    x = 280 + extraPositionX;
    y = 85 + extraPositionY;
  } else {
    x = playerPosition.x + 20;
    y = playerPosition.y;
  }

  if (isSelected) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#EEE621";
    ctx.strokeRect(x - 3, y + 55, 30, 1);
  } // console.log('before apply debuff');


  var _iterator = _createForOfIteratorHelper(monster.debuffs.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
          i = _step$value[0],
          debuff = _step$value[1];

      // console.log(debuffImages);
      // console.log(debuff);
      ctx.drawImage(debuffImages[debuff.name][0], x - 6 + i * 17, // x position
      y - 17, // y position
      debuffImages[debuff.name][0].width / 4, debuffImages[debuff.name][0].height / 4);
      ctx.lineWidth = 1;
      ctx.font = 'normal 10px "HeartWarming"';
      ctx.fillStyle = "red";
      ctx.fillText(debuff.rounds, x - 6 + i * 17, // x position
      y - 17, // y position
      50);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  ctx.lineWidth = 5; // Enemy Healthbar

  ctx.strokeStyle = 'black';
  ctx.strokeRect(x - 5, y, 40, 0);
  ctx.strokeStyle = 'red';
  ctx.strokeRect(x - 5, y, 40 * hpPercentage, 0); // Enemy Image

  ctx.drawImage(enemyFrame[number], x, // x position
  y, // y position
  enemyFrame[number].width / 1.5, enemyFrame[number].height / 1.5); // console.log(monster);
  // console.log('monster');

  if (monster.stunned) {
    ctx.drawImage(effectImages.stunned, x - 1, // x position
    y + 6, // y position
    effectImages.stunned.width * 0.5, effectImages.stunned.height * 0.5);
  }

  return {
    id: monster.id,
    x: x,
    y: y
  };
};

exports.drawEnemy = drawEnemy;