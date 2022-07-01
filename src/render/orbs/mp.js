/* eslint-disable import/prefer-default-export */
import {
  createCanvas,
} from 'canvas';

export const renderMpOrb = async (
  currentMp,
  maxMp,
) => {
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext('2d');
  const percentage = (currentMp / maxMp) * 100;
  ctx.beginPath();
  ctx.arc(50, 50, 50, 0, 2 * Math.PI);
  ctx.clip();
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(0, 0, 100, 100);
  ctx.fillStyle = 'blue';
  ctx.translate(50, 50);
  ctx.rotate(Math.PI);
  ctx.translate(-50, -50);
  ctx.fillRect(
    0,
    0,
    100,
    percentage < 100 ? percentage : 100,
  );
  ctx.font = 'bold 16px "HeartWarming"';
  ctx.textAlign = "center";
  ctx.fillStyle = 'white';
  ctx.translate(50, 50);
  ctx.rotate(Math.PI);
  ctx.translate(-50, -50);
  ctx.strokeText(`${currentMp} / ${maxMp}`, 50, 50, 100);
  ctx.fillText(`${currentMp} / ${maxMp}`, 50, 50, 100);
  const finalImage = await canvas.toBuffer();
  return finalImage;
};
