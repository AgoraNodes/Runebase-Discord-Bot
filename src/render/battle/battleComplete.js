import {
  createCanvas,
  registerFont,
} from 'canvas';
import path from 'path';
import _ from 'lodash';
import {
  MessageAttachment,
} from 'discord.js';

export const renderBattleComplete = async (
  currentCharacter,
  battle,
) => {
  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
  const canvas = createCanvas(1400, 300);
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 68px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText(`${currentCharacter.user.username} won battle#${battle.id}`, 700, 150, 1400);
  ctx.fillText(`${currentCharacter.user.username} won battle#${battle.id}`, 700, 150, 1400);

  return new MessageAttachment(canvas.toBuffer(), 'class.png');
};
