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
import _ from 'lodash';
import { renderGrayScaleIcon } from './grayScaleIcon';

function printAtWordWrap(context, text, x, y, lineHeight, fitWidth) {
  fitWidth = fitWidth || 0;

  if (fitWidth <= 0) {
    context.fillText(text, x, y);
    return;
  }
  let words = text.split(' ');
  let currentLine = 0;
  let idx = 1;
  while (words.length > 0 && idx <= words.length) {
    const str = words.slice(0, idx).join(' ');
    const w = context.measureText(str).width;
    if (w > fitWidth) {
      if (idx == 1) {
        idx = 2;
      }
      context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
      currentLine++;
      words = words.splice(idx - 1);
      idx = 1;
    } else { idx++; }
  }
  if (idx > 0) { context.fillText(words.join(' '), x, y + (lineHeight * currentLine)); }
}

export const renderSkillDescriptionImage = async (
  userCharacter,
  skillTree,
  skillTreeIndex,
  selectedSkill,
) => {
  const skillTreeMenuImage = await loadImage(path.join(__dirname, `../../assets/images/skilltree/`, `skillTreeMenu.png`));
  const skillTreeImage = await loadImage(path.join(__dirname, `../../assets/images/skilltree/`, `skilltree${skillTreeIndex}.png`));
  const canvas = createCanvas(
    345,
    457,
  );
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 25px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  // ctx.textAlign = "center";
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 10;

  ctx.beginPath();
  ctx.rect(
    5,
    30,
    335,
    422,
  );
  ctx.stroke();

  console.log(selectedSkill.name);

  ctx.font = 'bold 18px "HeartWarming"';
  ctx.textAlign = "center";
  ctx.shadowBlur = 30;
  ctx.shadowColor = "red";
  ctx.beginPath();
  ctx.lineWidth = "3";
  ctx.strokeStyle = "red";
  ctx.strokeText(
    selectedSkill.name,
    canvas.width / 2,
    70,
    345,
  );
  ctx.fillText(
    selectedSkill.name,
    canvas.width / 2,
    70,
    345,
  );

  ctx.strokeText(
    'skill modifier table goes here',
    canvas.width / 2,
    110,
    345,
  );
  ctx.fillText(
    'skill modifier table goes here',
    canvas.width / 2,
    110,
    345,
  );

  ctx.strokeText(
    'skill description',
    canvas.width / 2,
    150,
    345,
  );
  ctx.fillText(
    'skill description',
    canvas.width / 2,
    150,
    345,
  );

  const finalImage = await canvas.toBuffer();
  return finalImage;
};
