import {
  createCanvas,
} from 'canvas';
import _ from 'lodash';
import {
  MessageAttachment,
} from 'discord.js';

export const renderUserDied = async (
  currentCharacter,
) => {
  const canvas = createCanvas(1400, 300);
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 68px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  // Picking a class
  ctx.strokeText(`${currentCharacter.UserGroup.user.username} you have died, please go heal first`, 700, 150, 1400);
  ctx.fillText(`${currentCharacter.UserGroup.user.username} you have died, please go heal first`, 700, 150, 1400);

  return new MessageAttachment(canvas.toBuffer(), 'userDied.png');
};
