import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import {
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas';
import path from 'path';
// import db from '../models';
import GIFEncoder from 'gif-encoder-2';
import { calculateCharacterStats } from '../helpers/stats/calculateCharacterStats';
import { renderHpOrb } from './orbs/hp';
import { renderMpOrb } from './orbs/mp';

const background = async (
  ctx,
  zone,
) => {
  const mapImage = await loadImage(path.join(__dirname, `../assets/images/zone/background`, `${zone}.png`));
  ctx.drawImage(
    mapImage,
    0, // x position
    0, // y position
    mapImage.width,
    mapImage.height,
  );
};

const drawOrbs = (
  ctx,
  hpOrbImage,
  mpOrbImage,
) => {
  ctx.drawImage(
    hpOrbImage,
    0, // x position
    132, // y position
    hpOrbImage.width / 1.5,
    hpOrbImage.height / 1.5,
  );
  ctx.drawImage(
    mpOrbImage,
    250, // x position
    132, // y position
    hpOrbImage.width / 1.5,
    hpOrbImage.height / 1.5,
  );
};
const drawBattleLog = (ctx) => {
  ctx.fillStyle = '#ccc';
  ctx.fillRect(320, 0, 130, 200);
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText('Battle log', 330, 20, 100);
  ctx.fillText('Battle log', 330, 20, 100);
};

export const renderTestGif = async (
  currentUser,
) => {
  await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
  const hpOrbBuffer = await renderHpOrb(
    currentUser,
  );
  const mpOrbBuffer = await renderMpOrb(
    currentUser,
  );
  const hpOrbImage = await loadImage(hpOrbBuffer);
  const mpOrbImage = await loadImage(mpOrbBuffer);

  const canvas = createCanvas(450, 200);
  const ctx = canvas.getContext('2d');

  const encoder = new GIFEncoder(450, 200);
  encoder.setDelay(200);
  encoder.setRepeat(-1);
  encoder.setQuality(30);
  encoder.start();
  // frame 1
  const slice = 200 / 5; // this is the width of each rectangle
  await background(
    ctx,
    'den',
  );
  ctx.fillStyle = '#cc5803';
  ctx.fillRect(0, 0, slice, 200);
  drawOrbs(
    ctx,
    hpOrbImage,
    mpOrbImage,
  );
  drawBattleLog(ctx);
  encoder.addFrame(ctx);

  // frame 2
  await background(
    ctx,
    'den',
  );
  ctx.fillStyle = '#e2711d';
  ctx.fillRect(slice, 0, slice, 200);
  drawOrbs(
    ctx,
    hpOrbImage,
    mpOrbImage,
  );
  drawBattleLog(ctx);
  encoder.addFrame(ctx);

  // frame 3
  await background(
    ctx,
    'den',
  );
  ctx.fillStyle = '#fc7b03';
  ctx.fillRect(slice * 2, 0, slice, 200);
  drawOrbs(
    ctx,
    hpOrbImage,
    mpOrbImage,
  );
  drawBattleLog(ctx);
  encoder.addFrame(ctx);

  // frame 4
  await background(
    ctx,
    'den',
  );
  ctx.fillStyle = '#ffb627';
  ctx.fillRect(slice * 3, 0, slice, 200);
  drawOrbs(
    ctx,
    hpOrbImage,
    mpOrbImage,
  );
  drawBattleLog(ctx);
  encoder.addFrame(ctx);

  // frame 5
  await background(
    ctx,
    'den',
  );
  ctx.fillStyle = '#ffc971';
  ctx.fillRect(slice * 4, 0, slice, 200);
  drawOrbs(
    ctx,
    hpOrbImage,
    mpOrbImage,
  );
  drawBattleLog(ctx);
  encoder.addFrame(ctx);

  encoder.finish();
  const finalImage = await encoder.out.getData();
  return finalImage;
};
