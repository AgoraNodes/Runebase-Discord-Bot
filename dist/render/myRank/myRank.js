"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMyRankImage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _discord = require("discord.js");

var renderMyRankImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(message, user, userWithUserGroup, currentRank, monthlyChatActivity, totalChatActivity, currentRankExp, nextRank) {
    var nextRankExp, currentExp, canvas, ctx, expBarWidth, avatar, reqExp, calculatedCurrentExp, percentage, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : currentRankExp;
            currentExp = userWithUserGroup.UserGroup.exp;
            canvas = (0, _canvas.createCanvas)(1000, 300);
            ctx = canvas.getContext('2d');
            expBarWidth = 600;

            if (!(message.type && message.type === _discord.InteractionType.ApplicationCommand)) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return (0, _canvas.loadImage)("https://cdn.discordapp.com/avatars/".concat(message.user.id, "/").concat(message.user.avatar, ".png?size=256"));

          case 8:
            avatar = _context.sent;
            _context.next = 14;
            break;

          case 11:
            _context.next = 13;
            return (0, _canvas.loadImage)("https://cdn.discordapp.com/avatars/".concat(message.author.id, "/").concat(message.author.avatar, ".png?size=256"));

          case 13:
            avatar = _context.sent;

          case 14:
            // circle for avatar
            ctx.beginPath();
            ctx.arc(120, 120, 110, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.fillStyle = "#3F3F3F";
            ctx.strokeStyle = "#164179";
            ctx.fill();
            ctx.closePath(); // XP Bar

            ctx.lineJoin = 'round';
            ctx.lineWidth = 69;
            ctx.strokeStyle = "#164179"; // shadow of xp bar

            ctx.strokeRect(323, 239, expBarWidth, 2); // empty bar

            ctx.strokeStyle = 'black';
            ctx.strokeRect(325, 240, expBarWidth, 0); // filled bar

            reqExp = nextRankExp - currentRankExp;
            calculatedCurrentExp = currentExp - currentRankExp;
            percentage = calculatedCurrentExp / reqExp * 100;

            if (percentage === Infinity) {
              percentage = currentExp / nextRankExp * 100;
            }

            ctx.strokeStyle = '#348128';
            ctx.strokeRect(323, 240, percentage < 100 ? expBarWidth * (calculatedCurrentExp / reqExp) : expBarWidth, 0); // Adding text

            ctx.font = 'bold 40px "HeartWarming"';
            ctx.fillStyle = "#fe5701";
            ctx.textAlign = "center";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.strokeText(user.username, 120, 275, 200);
            ctx.fillText(user.username, 120, 275, 200);
            ctx.strokeText(currentRank ? currentRank.name : 'Unranked', 722, 90, 100);
            ctx.fillText(currentRank ? currentRank.name : 'Unranked', 722, 90, 100);
            ctx.strokeText("".concat(currentRank ? currentRank.level : 0), 900, 90, 80);
            ctx.fillText("".concat(currentRank ? currentRank.level : 0), 900, 90, 80);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 25px "HeartWarming"';
            ctx.strokeText("Chat Activity Score", 450, 40, 300);
            ctx.fillText("Chat Activity Score", 450, 40, 300);
            ctx.strokeText("Rank", 720, 50, 200);
            ctx.fillText("Rank", 720, 50, 200);
            ctx.strokeText("Level", 900, 50, 200);
            ctx.fillText("Level", 900, 50, 200);
            ctx.strokeText("Current exp", 635, 160, 200);
            ctx.fillText("Current exp", 635, 160, 200);
            ctx.strokeText("prev", 345, 160, 200);
            ctx.fillText("prev", 345, 160, 200);
            ctx.strokeText("next", 905, 160, 200);
            ctx.fillText("next", 905, 160, 200);
            ctx.font = 'bold 25px "HeartWarming"';
            ctx.fillStyle = "#fe5701";
            ctx.strokeText(currentRankExp, 345, 190, 200);
            ctx.fillText(currentRankExp, 345, 190, 200);
            ctx.strokeText(nextRankExp, 905, 190, 200);
            ctx.fillText(nextRankExp, 905, 190, 200);
            ctx.strokeText(currentExp, 635, 190, 200);
            ctx.fillText(currentExp, 635, 190, 200); // chat scores

            ctx.strokeText(monthlyChatActivity ? monthlyChatActivity.count : 0, 350, 100, 200);
            ctx.fillText(monthlyChatActivity ? monthlyChatActivity.count : 0, 350, 100, 200);
            ctx.strokeText(totalChatActivity ? totalChatActivity.count : 0, 550, 100, 200);
            ctx.fillText(totalChatActivity ? totalChatActivity.count : 0, 550, 100, 200);
            ctx.fillStyle = 'white';
            ctx.strokeText('30 day', 350, 70, 200);
            ctx.fillText('30 day', 350, 70, 200);
            ctx.strokeText('Total', 550, 70, 200);
            ctx.fillText('Total', 550, 70, 200);
            ctx.font = 'bold 50px "HeartWarming"';
            ctx.fillStyle = "#fe5701";
            ctx.strokeText("".concat(percentage.toFixed(0), "%"), 640, 260, 200);
            ctx.fillText("".concat(percentage.toFixed(0), "%"), 640, 260, 200); // remove corners

            ctx.beginPath();
            ctx.arc(120, 120, 110, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip(); // Add the avatar

            ctx.drawImage(avatar, 10, 10, 220, 220);
            _context.next = 86;
            return canvas.toBuffer();

          case 86:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 88:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderMyRankImage(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderMyRankImage = renderMyRankImage;