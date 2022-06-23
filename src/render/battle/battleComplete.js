import {
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas';
import path from 'path';
import _ from 'lodash';
import {
  MessageAttachment,
} from 'discord.js';

export const renderBattleComplete = async (
  currentCharacter,
  xpEarned,
) => {
  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
  const canvas = createCanvas(1400, 1050);
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 30px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  // ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  // Picking a class
  ctx.strokeText(`${currentCharacter.user.username} you won the battle and earned ${xpEarned} exp`, 700, 1000, 1400);
  ctx.fillText(`${currentCharacter.user.username} you won the battle and earned ${xpEarned} exp`, 700, 1000, 1400);

  return new MessageAttachment(canvas.toBuffer(), 'class.png');
};
