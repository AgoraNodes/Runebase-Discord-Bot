/* eslint-disable import/prefer-default-export */
import {
  createCanvas,
  registerFont,
} from 'canvas';
import path from 'path';
import { calculateCharacterStats } from '../../helpers/stats/calculateCharacterStats';

export const renderHpOrb = async (
  currentUser,
) => {
  const {
    hp,
  } = await calculateCharacterStats(currentUser);
  console.log(hp);
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext('2d');
  const percentage = (hp.current / hp.max) * 100;
  ctx.beginPath();
  ctx.arc(50, 50, 50, 0, 2 * Math.PI);
  ctx.clip();
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(0, 0, 100, 100);
  ctx.fillStyle = 'red';
  ctx.translate(50, 50);
  ctx.rotate(Math.PI);
  ctx.translate(-50, -50);
  ctx.fillRect(
    0,
    0,
    100,
    percentage < 100 ? percentage : 100,
  );
  const finalImage = await canvas.toBuffer();
  return finalImage;
};