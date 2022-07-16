"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSkillScreen = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discord = require("discord.js");

var _canvas = require("canvas");

var _skillTree = require("./skillTree");

var _skillDescription = require("./skillDescription");

// import skills from './skills.json';
var renderSkillScreen = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userCharacter, skillTree, skillTreeIndex, selectedSkill, jsonSkillInfo, failReason) {
    var skillTreeImageBuffer, userHasSkill, skillDescriptionImageBuffer, skillTreeImage, skillDescriptionImage, failReasonHeight, canvas, ctx;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _skillTree.renderSkillTreeImage)(userCharacter, skillTree, skillTreeIndex, selectedSkill);

          case 2:
            skillTreeImageBuffer = _context.sent;
            console.log('1');
            userHasSkill = userCharacter.UserGroupClassSkills.find(function (o) {
              return o.skillId === selectedSkill.id;
            });
            _context.next = 7;
            return (0, _skillDescription.renderSkillDescriptionImage)(jsonSkillInfo, userHasSkill);

          case 7:
            skillDescriptionImageBuffer = _context.sent;
            _context.next = 10;
            return (0, _canvas.loadImage)(skillTreeImageBuffer);

          case 10:
            skillTreeImage = _context.sent;
            _context.next = 13;
            return (0, _canvas.loadImage)(skillDescriptionImageBuffer);

          case 13:
            skillDescriptionImage = _context.sent;
            failReasonHeight = failReason ? 25 : 0;
            canvas = (0, _canvas.createCanvas)(skillTreeImage.width + skillDescriptionImage.width, skillTreeImage.height + failReasonHeight);
            ctx = canvas.getContext('2d');
            ctx.drawImage(skillTreeImage, 0, 0, skillTreeImage.width, skillTreeImage.height);

            if (selectedSkill) {
              ctx.drawImage(skillDescriptionImage, skillTreeImage.width, 0, skillDescriptionImage.width, skillDescriptionImage.height);
            }

            if (failReason) {
              ctx.font = 'bold 15px "HeartWarming"';
              ctx.fillStyle = "red";
              ctx.strokeStyle = 'black';
              ctx.lineWidth = 3;
              ctx.textAlign = "center";
              ctx.strokeText(failReason, skillTreeImage.width / 2, skillTreeImage.height + 15, skillTreeImage.width);
              ctx.fillText(failReason, skillTreeImage.width / 2, skillTreeImage.height + 15, skillTreeImage.width);
            }

            console.log('5');
            return _context.abrupt("return", new _discord.MessageAttachment(canvas.toBuffer(), 'skillTree.png'));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderSkillScreen(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderSkillScreen = renderSkillScreen;