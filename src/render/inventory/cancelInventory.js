import {
  createCanvas,
} from 'canvas';

export const renderCancelInventoryImage = async (
  userCurrentCharacter,
) => {
  const canvas = createCanvas(500, 100);
  const ctx = canvas.getContext('2d');
  ctx.font = 'bold 30px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.textAlign = "center";
  ctx.strokeText(`${userCurrentCharacter.UserGroup.user.username} canceled inventory`, 250, 60, 500);
  ctx.fillText(`${userCurrentCharacter.UserGroup.user.username} canceled inventory`, 250, 60, 500);
  const finalImage = await canvas.toBuffer();
  return finalImage;
};
