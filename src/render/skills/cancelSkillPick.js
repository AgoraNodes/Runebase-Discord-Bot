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

export const renderCancelSkillPick = async (
  userCurrentCharacter,
) => {
  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
  const canvas = createCanvas(500, 100);
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 30px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.textAlign = "center";

  ctx.strokeText(`${userCurrentCharacter.user.username} canceled skill selection`, 250, 60, 500);
  ctx.fillText(`${userCurrentCharacter.user.username} canceled skill selection`, 250, 60, 500);

  return new MessageAttachment(canvas.toBuffer(), 'cancelSelection.png');
};