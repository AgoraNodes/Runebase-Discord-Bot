"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawUserBuffs = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable no-restricted-syntax */
var drawUserBuffs = function drawUserBuffs(ctx, // Ctx drawing canvas
currentUser, // User Object
buffImages // image array of player images
) {
  // console.log('before apply debuff');
  var _iterator = _createForOfIteratorHelper(currentUser.buffs.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
          i = _step$value[0],
          buff = _step$value[1];

      // console.log(debuffImages);
      // console.log(debuff);
      ctx.drawImage(buffImages[buff.name][0], 0 + i * 17, // x position
      2, // y position
      buffImages[buff.name][0].width / 4, buffImages[buff.name][0].height / 4);
      ctx.lineWidth = 1;
      ctx.font = 'normal 10px "HeartWarming"';
      ctx.fillStyle = "red";
      ctx.fillText(buff.rounds, 0 + i * 17, // x position
      25, // y position
      50);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

exports.drawUserBuffs = drawUserBuffs;