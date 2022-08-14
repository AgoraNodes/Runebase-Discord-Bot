"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSkillDescriptionImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _lodash = _interopRequireDefault(require("lodash"));

/* eslint-disable no-restricted-syntax */
var renderSkillDescriptionImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var jsonSkillInfo,
        userHasSkill,
        canvas,
        ctx,
        finalImage,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            jsonSkillInfo = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
            userHasSkill = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
            canvas = (0, _canvas.createCanvas)(350, 457);
            ctx = canvas.getContext('2d');
            ctx.font = 'bold 25px "HeartWarming"';
            ctx.fillStyle = "#ccc";
            ctx.font = 'bold 18px "HeartWarming"';
            ctx.textAlign = "center";
            ctx.shadowBlur = 3;
            ctx.shadowColor = "red";
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "red";
            ctx.strokeText(jsonSkillInfo.name, canvas.width / 2, 50, 345);
            ctx.fillText(jsonSkillInfo.name, canvas.width / 2, 50, 345);
            ctx.stroke();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "black";
            ctx.shadowBlur = 0;
            ctx.shadowColor = "none";

            if (jsonSkillInfo) {
              (function () {
                ctx.font = 'bold 10px "HeartWarming"'; // Box width

                var bw = 305; // Box height

                var bh = 18 * 21; // Padding

                var p = 2;

                if (userHasSkill) {
                  ctx.fillStyle = "rgba(16, 12, 131, 0.3)";
                  ctx.fillRect(40, p + 60 + userHasSkill.points * 18, 305, 18);
                }

                ctx.fillStyle = '#F9DC5C';
                ctx.fillRect(0, p + 60, 43, bh);
                ctx.fillRect(40, p + 60, 305, 18);
                var totalColumns = Object.keys(jsonSkillInfo.initial).length;
                var columnWidth = bw / totalColumns;

                for (var x = 0; x <= bw; x += columnWidth) {
                  ctx.fillStyle = '#F9DC5C';
                  ctx.strokeStyle = "black";
                  ctx.lineWidth = "3";
                  ctx.beginPath();
                  ctx.moveTo(40 + x + p, p + 60);
                  ctx.lineTo(40 + x + p, bh + p + 60);
                  ctx.stroke();

                  if (x === 0) {
                    ctx.fillStyle = 'white';
                    ctx.lineWidth = "1";
                    ctx.beginPath();
                    ctx.font = 'bold 10px "HeartWarming"';
                    Object.entries(jsonSkillInfo.initial).forEach(function (_ref2, i) {
                      var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
                          key = _ref3[0],
                          value = _ref3[1];

                      ctx.strokeText(key, 40 + (i + 1) * columnWidth - columnWidth / 2, p + 74, columnWidth);
                      ctx.fillText(key, 40 + (i + 1) * columnWidth - columnWidth / 2, p + 74, columnWidth);
                    });
                    ctx.stroke();
                  }
                }

                var _loop = function _loop(_x) {
                  ctx.strokeStyle = "black";
                  ctx.lineWidth = "3";
                  ctx.beginPath();
                  ctx.moveTo(p, 60 + _x + p);
                  ctx.lineTo(345, 60 + _x + p);
                  ctx.stroke();
                  ctx.fillStyle = 'white';
                  ctx.lineWidth = "1";
                  ctx.beginPath();
                  ctx.font = 'bold 10px "HeartWarming"';
                  ctx.strokeText('Level', 19, p + 74, 60);
                  ctx.fillText('Level', 19, p + 74, 60);
                  ctx.stroke();
                  ctx.beginPath();

                  if (_x !== 0 && _x <= 360) {
                    ctx.strokeText(_x / 18, 19, p + 74 + _x, 60);
                    ctx.fillText(_x / 18, 19, p + 74 + _x, 60);
                    Object.entries(jsonSkillInfo.initial).forEach(function (_ref4, p) {
                      var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
                          key = _ref5[0],
                          value = _ref5[1];

                      var skillValue;

                      if (key === 'rounds' || key === 'heal %') {
                        skillValue = Math.round(value + jsonSkillInfo.next[String(key)] * (_x / 18 - 1));
                      } else {
                        skillValue = value + jsonSkillInfo.next[String(key)] * (_x / 18 - 1);
                      }

                      ctx.strokeText(skillValue, 40 + (p + 1) * columnWidth - columnWidth / 2, p + 74 + _x, columnWidth);
                      ctx.fillText(skillValue, 40 + (p + 1) * columnWidth - columnWidth / 2, p + 74 + _x, columnWidth);
                    });
                  }

                  ctx.stroke();
                };

                for (var _x = 0; _x <= bh; _x += 18) {
                  _loop(_x);
                }
              })();
            } else {
              ctx.beginPath();
              ctx.strokeText('skillInfo not found', canvas.width / 2, 110, 350);
              ctx.fillText('skillInfo not found', canvas.width / 2, 110, 350);
              ctx.stroke();
            } //


            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.strokeStyle = '#FFD700';
            ctx.beginPath();
            ctx.rect(1, 30, 349, 422);
            ctx.stroke();
            _context.next = 30;
            return canvas.toBuffer();

          case 30:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderSkillDescriptionImage() {
    return _ref.apply(this, arguments);
  };
}();

exports.renderSkillDescriptionImage = renderSkillDescriptionImage;