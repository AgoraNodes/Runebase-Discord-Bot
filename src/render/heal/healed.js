import {
  createCanvas,
  loadImage,
} from 'canvas';
import path from 'path';
import _ from 'lodash';
import {
  MessageAttachment,
} from 'discord.js';

export const renderHealed = async (
  start,
  classes,
  user,
) => {
  const current = classes.slice(start, start + 1);
  const canvas = createCanvas(500, 970);
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 60px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.textAlign = "center";
  const newClassImage = await loadImage(path.join(__dirname, '../../assets/images/classes', `${current[0].classDescription.image}.png`));
  ctx.drawImage(newClassImage, 0, 0, 500, 800);

  ctx.strokeText(`${user.username}`, 250, 850, 500);
  ctx.fillText(`${user.username}`, 250, 850, 500);
  ctx.strokeText(`picked ${current[0].name}!`, 250, 920, 500);
  ctx.fillText(`picked ${current[0].name}!`, 250, 920, 500);

  return new MessageAttachment(canvas.toBuffer(), 'picked.png');
};
