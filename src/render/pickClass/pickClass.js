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

export const renderPickClassImage = async (
  start,
  classes,
  user,
) => {
  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
  const current = classes.slice(start, start + 1);
  const canvas = createCanvas(1400, 1050);
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 30px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  // ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  const newClassImage = await loadImage(path.join(__dirname, '../../assets/images/classes', `${current[0].classDescription.image}.png`));
  ctx.drawImage(newClassImage, 0, 0, 500, 800);
  printAtWordWrap(
    ctx,
    current[0].classDescription.description,
    500,
    100,
    35,
    500,
  );

  ctx.textAlign = "center";
  ctx.font = 'bold 50px "HeartWarming"';
  ctx.strokeText(current[0].name, 250, 880, 500);
  ctx.fillText(current[0].name, 250, 880, 500);

  // print default stats

  ctx.strokeText("Base Stats", 1200, 50, 200);
  ctx.fillText("Base stats", 1200, 50, 200);

  ctx.font = 'bold 35px "HeartWarming"';

  // Strength
  ctx.strokeText(`Strength: ${current[0].strength}`, 1200, 150, 200);
  ctx.fillText(`Strength: ${current[0].strength}`, 1200, 150, 200);

  // Dexterity
  ctx.strokeText(`Dexterity: ${current[0].dexterity}`, 1200, 250, 200);
  ctx.fillText(`Dexterity: ${current[0].dexterity}`, 1200, 250, 200);

  // Vitality
  ctx.strokeText(`Vitality: ${current[0].vitality}`, 1200, 350, 200);
  ctx.fillText(`Vitality: ${current[0].vitality}`, 1200, 350, 200);

  // Energy
  ctx.strokeText(`Energy: ${current[0].energy}`, 1200, 450, 200);
  ctx.fillText(`Energy: ${current[0].energy}`, 1200, 450, 200);

  // Life
  ctx.strokeText(`Life: ${current[0].life}`, 1200, 550, 200);
  ctx.fillText(`Life: ${current[0].life}`, 1200, 550, 200);

  // Mana
  ctx.strokeText(`Mana: ${current[0].mana}`, 1200, 650, 200);
  ctx.fillText(`Mana: ${current[0].mana}`, 1200, 650, 200);

  // Stamina
  ctx.strokeText(`Stamina: ${current[0].stamina}`, 1200, 750, 200);
  ctx.fillText(`Stamina: ${current[0].stamina}`, 1200, 750, 200);

  // Picking a class
  ctx.fillStyle = "#fe5701";
  ctx.font = 'bold 70px "HeartWarming"';
  ctx.strokeText(`${user.username} is picking a class`, 700, 1000, 1400);
  ctx.fillText(`${user.username} is picking a class`, 700, 1000, 1400);

  return new MessageAttachment(canvas.toBuffer(), 'class.png');
};
