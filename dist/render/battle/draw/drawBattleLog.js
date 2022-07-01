"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBattleLog = void 0;

var drawBattleLog = function drawBattleLog(ctx, battle) {
  ctx.fillStyle = 'white';
  ctx.fillRect(420, 0, 230, 300);
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText('Battle log', 430, 16, 210);
  ctx.fillText('Battle log', 430, 16, 210);
  ctx.font = 'normal 15px serif';
  ctx.fillStyle = 'black';

  for (var i = 0; i < battle.battleLogs.length; i++) {
    ctx.fillText(battle.battleLogs[i].log, 430, 17 + (i + 1) * 20, 210);
  }
};

exports.drawBattleLog = drawBattleLog;