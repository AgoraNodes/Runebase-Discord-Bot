"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTestGif = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _gifEncoder = _interopRequireDefault(require("gif-encoder-2"));

var _calculateCharacterStats = require("../helpers/stats/calculateCharacterStats");

var _hp = require("./orbs/hp");

var _mp = require("./orbs/mp");

// import db from '../models';
var background = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, zone) {
    var mapImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../assets/images/zone/background", "".concat(zone, ".png")));

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

var drawOrbs = function drawOrbs(ctx, hpOrbImage, mpOrbImage) {
  ctx.drawImage(hpOrbImage, 0, // x position
  132, // y position
  hpOrbImage.width / 1.5, hpOrbImage.height / 1.5);
  ctx.drawImage(mpOrbImage, 250, // x position
  132, // y position
  hpOrbImage.width / 1.5, hpOrbImage.height / 1.5);
};

var drawBattleLog = function drawBattleLog(ctx) {
  ctx.fillStyle = '#ccc';
  ctx.fillRect(320, 0, 130, 200);
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText('Battle log', 330, 20, 100);
  ctx.fillText('Battle log', 330, 20, 100);
};

var renderTestGif = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(currentUser) {
    var hpOrbBuffer, mpOrbBuffer, hpOrbImage, mpOrbImage, canvas, ctx, encoder, slice, finalImage;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 2:
            _context2.next = 4;
            return (0, _hp.renderHpOrb)(currentUser);

          case 4:
            hpOrbBuffer = _context2.sent;
            _context2.next = 7;
            return (0, _mp.renderMpOrb)(currentUser);

          case 7:
            mpOrbBuffer = _context2.sent;
            _context2.next = 10;
            return (0, _canvas.loadImage)(hpOrbBuffer);

          case 10:
            hpOrbImage = _context2.sent;
            _context2.next = 13;
            return (0, _canvas.loadImage)(mpOrbBuffer);

          case 13:
            mpOrbImage = _context2.sent;
            canvas = (0, _canvas.createCanvas)(450, 200);
            ctx = canvas.getContext('2d');
            encoder = new _gifEncoder["default"](450, 200);
            encoder.setDelay(200);
            encoder.setRepeat(-1);
            encoder.setQuality(30);
            encoder.start(); // frame 1

            slice = 200 / 5; // this is the width of each rectangle

            _context2.next = 24;
            return background(ctx, 'den');

          case 24:
            ctx.fillStyle = '#cc5803';
            ctx.fillRect(0, 0, slice, 200);
            drawOrbs(ctx, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx);
            encoder.addFrame(ctx); // frame 2

            _context2.next = 31;
            return background(ctx, 'den');

          case 31:
            ctx.fillStyle = '#e2711d';
            ctx.fillRect(slice, 0, slice, 200);
            drawOrbs(ctx, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx);
            encoder.addFrame(ctx); // frame 3

            _context2.next = 38;
            return background(ctx, 'den');

          case 38:
            ctx.fillStyle = '#fc7b03';
            ctx.fillRect(slice * 2, 0, slice, 200);
            drawOrbs(ctx, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx);
            encoder.addFrame(ctx); // frame 4

            _context2.next = 45;
            return background(ctx, 'den');

          case 45:
            ctx.fillStyle = '#ffb627';
            ctx.fillRect(slice * 3, 0, slice, 200);
            drawOrbs(ctx, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx);
            encoder.addFrame(ctx); // frame 5

            _context2.next = 52;
            return background(ctx, 'den');

          case 52:
            ctx.fillStyle = '#ffc971';
            ctx.fillRect(slice * 4, 0, slice, 200);
            drawOrbs(ctx, hpOrbImage, mpOrbImage);
            drawBattleLog(ctx);
            encoder.addFrame(ctx);
            encoder.finish();
            _context2.next = 60;
            return encoder.out.getData();

          case 60:
            finalImage = _context2.sent;
            return _context2.abrupt("return", finalImage);

          case 62:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function renderTestGif(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.renderTestGif = renderTestGif;