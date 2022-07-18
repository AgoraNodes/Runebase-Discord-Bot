import {
  createCanvas,
} from 'canvas';
import _ from 'lodash';

export const renderBattleComplete = async (
  currentCharacter,
  battle,
) => {
  const canvas = createCanvas(1400, 300);
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 68px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText(`${currentCharacter.UserGroup.user.username} won battle#${battle.id}`, 700, 150, 1400);
  ctx.fillText(`${currentCharacter.UserGroup.user.username} won battle#${battle.id}`, 700, 150, 1400);

  const finalImage = canvas.toBuffer();
  return finalImage;
};
