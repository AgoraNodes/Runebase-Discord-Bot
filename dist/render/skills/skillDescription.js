"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSkillDescriptionImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _canvas = require("canvas");

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _grayScaleIcon = require("./grayScaleIcon");

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

var renderSkillDescriptionImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCharacter, skillTree, skillTreeIndex, selectedSkill) {
    var skillTreeMenuImage, skillTreeImage, canvas, ctx, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skilltree/", "skillTreeMenu.png"));

          case 2:
            skillTreeMenuImage = _context.sent;
            _context.next = 5;
            return (0, _canvas.loadImage)(_path["default"].join(__dirname, "../../assets/images/skilltree/", "skilltree".concat(skillTreeIndex, ".png")));

          case 5:
            skillTreeImage = _context.sent;
            canvas = (0, _canvas.createCanvas)(345, 457);
            ctx = canvas.getContext('2d');
            ctx.font = 'bold 25px "HeartWarming"';
            ctx.fillStyle = "#ccc"; // ctx.textAlign = "center";

            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.rect(5, 30, 335, 422);
            ctx.stroke();
            console.log(selectedSkill.name);
            ctx.font = 'bold 18px "HeartWarming"';
            ctx.textAlign = "center";
            ctx.shadowBlur = 30;
            ctx.shadowColor = "red";
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "red";
            ctx.strokeText(selectedSkill.name, canvas.width / 2, 70, 345);
            ctx.fillText(selectedSkill.name, canvas.width / 2, 70, 345);
            ctx.strokeText('skill modifier table goes here', canvas.width / 2, 110, 345);
            ctx.fillText('skill modifier table goes here', canvas.width / 2, 110, 345);
            ctx.strokeText('skill description', canvas.width / 2, 150, 345);
            ctx.fillText('skill description', canvas.width / 2, 150, 345);
            _context.next = 31;
            return canvas.toBuffer();

          case 31:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderSkillDescriptionImage(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderSkillDescriptionImage = renderSkillDescriptionImage;