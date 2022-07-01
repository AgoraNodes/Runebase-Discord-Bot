"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawPlayer = void 0;

var drawPlayer = function drawPlayer(ctx, playerImage, number) {
  var inAttackPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var x = 0;
  var y = 0;

  if (inAttackPosition) {
    ctx.drawImage(playerImage[number], inAttackPosition.x - 20, // x position
    inAttackPosition.y, // y position
    playerImage[number].width, playerImage[number].height);
  } else {
    x = 110;
    y = 130;
    ctx.drawImage(playerImage[number], x, // x position
    y, // y position
    playerImage[number].width, playerImage[number].height);
  }

  return {
    x: x,
    y: y
  };
};

exports.drawPlayer = drawPlayer;