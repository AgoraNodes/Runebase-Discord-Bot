"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPickClassImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _discord = require("discord.js");

function printAtWordWrap(context, text, x, y, lineHeight, fitWidth) {
  fitWidth = fitWidth || 0;

  if (fitWidth <= 0) {
    context.fillText(text, x, y);
    return;
  }

  var words = text.split(' ');
  var currentLine = 0;
  var idx = 1;

  while (words.length > 0 && idx <= words.length) {
    var str = words.slice(0, idx).join(' ');
    var w = context.measureText(str).width;

    if (w > fitWidth) {
      if (idx == 1) {
        idx = 2;
      }

      context.fillText(words.slice(0, idx - 1).join(' '), x, y + lineHeight * currentLine);
      currentLine++;
      words = words.splice(idx - 1);
      idx = 1;
    } else {
      idx++;
    }
  }

  if (idx > 0) {
    context.fillText(words.join(' '), x, y + lineHeight * currentLine);
  }
}

var renderPickClassImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(start, classes, user) {
    var current, canvas, ctx, newClassImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _canvas.registerFont)(_path["default"].join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), {
              family: 'HeartWarming'
            });

          case 2:
            current = classes.slice(start, start + 1);
            canvas = (0, _canvas.createCanvas)(1400, 1050);
            ctx = canvas.getContext('2d');
            ctx.font = 'bold 30px "HeartWarming"';
            ctx.fillStyle = "#ccc"; // ctx.textAlign = "center";

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            _context.next = 11;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, '../../assets/images/classes', "".concat(current[0].classDescription.image, ".png")));

          case 11:
            newClassImage = _context.sent;
            ctx.drawImage(newClassImage, 0, 0, 500, 800);
            printAtWordWrap(ctx, current[0].classDescription.description, 500, 100, 35, 500);
            ctx.textAlign = "center";
            ctx.font = 'bold 50px "HeartWarming"';
            ctx.strokeText(current[0].name, 250, 880, 500);
            ctx.fillText(current[0].name, 250, 880, 500); // print default stats

            ctx.strokeText("Base Stats", 1200, 50, 200);
            ctx.fillText("Base stats", 1200, 50, 200);
            ctx.font = 'bold 35px "HeartWarming"'; // Strength

            ctx.strokeText("Strength: ".concat(current[0].strength), 1200, 150, 200);
            ctx.fillText("Strength: ".concat(current[0].strength), 1200, 150, 200); // Dexterity

            ctx.strokeText("Dexterity: ".concat(current[0].dexterity), 1200, 250, 200);
            ctx.fillText("Dexterity: ".concat(current[0].dexterity), 1200, 250, 200); // Vitality

            ctx.strokeText("Vitality: ".concat(current[0].vitality), 1200, 350, 200);
            ctx.fillText("Vitality: ".concat(current[0].vitality), 1200, 350, 200); // Energy

            ctx.strokeText("Energy: ".concat(current[0].energy), 1200, 450, 200);
            ctx.fillText("Energy: ".concat(current[0].energy), 1200, 450, 200); // Life

            ctx.strokeText("Life: ".concat(current[0].life), 1200, 550, 200);
            ctx.fillText("Life: ".concat(current[0].life), 1200, 550, 200); // Mana

            ctx.strokeText("Mana: ".concat(current[0].mana), 1200, 650, 200);
            ctx.fillText("Mana: ".concat(current[0].mana), 1200, 650, 200); // Stamina

            ctx.strokeText("Stamina: ".concat(current[0].stamina), 1200, 750, 200);
            ctx.fillText("Stamina: ".concat(current[0].stamina), 1200, 750, 200); // Picking a class

            ctx.fillStyle = "#fe5701";
            ctx.font = 'bold 70px "HeartWarming"';
            ctx.strokeText("".concat(user.username, " is picking a class"), 700, 1000, 1400);
            ctx.fillText("".concat(user.username, " is picking a class"), 700, 1000, 1400);
            return _context.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'class.png'));

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderPickClassImage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderPickClassImage = renderPickClassImage;