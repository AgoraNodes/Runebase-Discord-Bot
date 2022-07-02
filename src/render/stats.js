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
import { calculateCharacterStats } from '../helpers/stats/calculateCharacterStats';

export const renderStatsImage = async (
  currentUser,
  cannotSpendWarning,
) => {
  const {
    unspedAttributes,
    username,
    currentClass,
    lvl,
    exp,
    expNext,
    strength,
    dexterity,
    vitality,
    energy,
    hp,
    mp,
    stamina,
    ar,
    attackOne,
    attackTwo,
    defense,
    FR,
    PR,
    LR,
    CR,
  } = await calculateCharacterStats(currentUser);
  await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const canvas = createCanvas(960, 1400);
  const ctx = canvas.getContext('2d');
  const BackgroundImageStats = await loadImage(path.join(__dirname, '../assets/images', `stats_background.png`));
  const unspendAttributesBoxImage = await loadImage(path.join(__dirname, '../assets/images', `unspendAttributesBox.png`));
  ctx.drawImage(BackgroundImageStats, 0, 0, 960, 1300);

  if (unspedAttributes > 0) {
    ctx.drawImage(unspendAttributesBoxImage, 10, 1070, 495, 82);

    ctx.fillStyle = "red";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.font = 'bold 25px "HeartWarming"';
    ctx.strokeText('Stats Points', 155, 1105, 540);
    ctx.fillText('Stats Points', 155, 1105, 540);
    ctx.strokeText('Remaining', 155, 1130, 540);
    ctx.fillText('Remaining', 155, 1130, 540);

    ctx.fillStyle = "#ccc";
    ctx.font = 'bold 45px "HeartWarming"';
    ctx.strokeText(unspedAttributes, 410, 1125, 540);
    ctx.fillText(unspedAttributes, 410, 1125, 540);
  }

  ctx.fillStyle = "#ccc";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.textAlign = "center";
  ctx.font = 'bold 35px "HeartWarming"';

  // username
  ctx.strokeText(username, 290, 70, 540);
  ctx.fillText(username, 290, 70, 540);

  // character classname
  ctx.strokeText(currentClass, 760, 70, 240);
  ctx.fillText(currentClass, 760, 70, 240);

  // level
  ctx.strokeText('Level', 100, 135, 240);
  ctx.fillText('level', 100, 135, 240);
  ctx.strokeText(lvl, 100, 175, 240);
  ctx.fillText(lvl, 100, 175, 240);

  // Experience
  ctx.strokeText('Experience', 375, 135, 240);
  ctx.fillText('Experience', 375, 135, 240);
  ctx.strokeText(exp, 375, 175, 240);
  ctx.fillText(exp, 375, 175, 240);

  // Next level
  ctx.strokeText('Next level', 760, 135, 240);
  ctx.fillText('Next level', 760, 135, 240);
  ctx.strokeText(expNext, 760, 175, 240); // Change this to next level exp
  ctx.fillText(expNext, 760, 175, 240);

  ctx.font = 'bold 30px "HeartWarming"';

  // Strength
  console.log(currentClass);

  ctx.strokeText(`Strength`, 125, 290, 200);
  ctx.fillText(`Strength`, 125, 290, 200);
  ctx.strokeText(strength, 288, 290, 200);
  ctx.fillText(strength, 288, 290, 200);

  // Dexterity

  ctx.strokeText(`Dexterity`, 125, 475, 200);
  ctx.fillText(`Dexterity`, 125, 475, 200);
  ctx.strokeText(dexterity, 288, 475, 200);
  ctx.fillText(dexterity, 288, 475, 200);

  // Vitality

  ctx.strokeText(`Vitality`, 125, 735, 200);
  ctx.fillText(`Vitality`, 125, 735, 200);
  ctx.strokeText(vitality, 288, 735, 200);
  ctx.fillText(vitality, 288, 735, 200);

  // Energy

  ctx.strokeText(`Energy`, 125, 920, 200);
  ctx.fillText(`Energy`, 125, 920, 200);
  ctx.strokeText(energy, 288, 920, 200);
  ctx.fillText(energy, 288, 920, 200);

  // attack 1
  console.log('before attackOne name');
  ctx.strokeText(`${attackOne.name}`, 635, 290, 200);
  ctx.fillText(`${attackOne.name}`, 635, 290, 200);
  ctx.strokeText(`${attackOne.min}-${attackOne.max}`, 855, 290, 200);
  ctx.fillText(`${attackOne.min}-${attackOne.max}`, 855, 290, 200);

  // attack 2
  ctx.strokeText(`${attackTwo.name}`, 635, 360, 200);
  ctx.fillText(`${attackTwo.name}`, 635, 360, 200);
  ctx.strokeText(`${attackTwo.min}-${attackTwo.max}`, 855, 360, 200);
  ctx.fillText(`${attackTwo.min}-${attackTwo.max}`, 855, 360, 200);

  // attack rating 1

  ctx.strokeText(`Attack Rating`, 645, 475, 200);
  ctx.fillText(`Attack Rating`, 645, 475, 200);
  ctx.strokeText(attackOne.ar, 875, 475, 200);
  ctx.fillText(attackOne.ar, 875, 475, 200);

  // attack rating 2
  ctx.strokeText(`Attack Rating`, 645, 545, 200);
  ctx.fillText(`Attack Rating`, 645, 545, 200);
  ctx.strokeText(attackTwo.ar, 875, 545, 200);
  ctx.fillText(attackTwo.ar, 875, 545, 200);

  // Defense

  ctx.strokeText(`Defense`, 645, 620, 200);
  ctx.fillText(`Defense`, 645, 620, 200);
  ctx.strokeText(defense, 875, 620, 200);
  ctx.fillText(defense, 875, 620, 200);

  // Stamina

  ctx.strokeText(`Stamina`, 585, 735, 200);
  ctx.fillText(`Stamina`, 585, 735, 200);
  ctx.strokeText(stamina.current, 755, 735, 200);
  ctx.fillText(stamina.current, 755, 735, 200);
  ctx.strokeText(stamina.max, 875, 735, 200);
  ctx.fillText(stamina.max, 875, 735, 200);

  // Life

  ctx.strokeText(`Life`, 585, 805, 200);
  ctx.fillText(`Life`, 585, 805, 200);
  ctx.strokeText(hp.current, 755, 805, 200);
  ctx.fillText(hp.current, 755, 805, 200);
  ctx.strokeText(hp.max, 875, 805, 200);
  ctx.fillText(hp.max, 875, 805, 200);

  // Mana

  ctx.strokeText(`Mana`, 585, 920, 200);
  ctx.fillText(`Mana`, 585, 920, 200);
  ctx.strokeText(mp.current, 755, 920, 200);
  ctx.fillText(mp.current, 755, 920, 200);
  ctx.strokeText(mp.max, 875, 920, 200);
  ctx.fillText(mp.max, 875, 920, 200);

  // Fire resistance
  ctx.strokeText(`Fire resistance`, 665, 1038, 240);
  ctx.fillText(`Fire resistance`, 665, 1038, 240);
  ctx.strokeText(FR, 875, 1038, 240);
  ctx.fillText(FR, 875, 1038, 240);

  // Cold resistance
  ctx.strokeText(`Cold resistance`, 665, 1110, 240);
  ctx.fillText(`Cold resistance`, 665, 1110, 240);
  ctx.strokeText(CR, 875, 1110, 240);
  ctx.fillText(CR, 875, 1110, 240);

  // Lightning resistance
  ctx.strokeText(`Lightning resistance`, 665, 1182, 240);
  ctx.fillText(`Lightning resistance`, 665, 1182, 240);
  ctx.strokeText(LR, 875, 1182, 240);
  ctx.fillText(LR, 875, 1182, 240);

  // Poision resistance
  ctx.strokeText(`Poision resistance`, 665, 1254, 240);
  ctx.fillText(`Poision resistance`, 665, 1254, 240);
  ctx.strokeText(PR, 875, 1254, 240);
  ctx.fillText(PR, 875, 1254, 240);

  if (cannotSpendWarning) {
    ctx.fillStyle = "red";
    ctx.font = 'bold 35px "HeartWarming"';
    ctx.strokeText('Warning', 245, 1190, 540);
    ctx.fillText('Warning', 245, 1190, 540);
    ctx.strokeText('Unable to spend stats', 245, 1230, 540);
    ctx.fillText('Unable to spend stats', 245, 1230, 540);
  }
  // bottom stats message
  ctx.fillStyle = "#fe5701";
  ctx.font = 'bold 70px "HeartWarming"';
  ctx.strokeText(`${username}'s ${currentClass} stats`, 480, 1380, 960);
  ctx.fillText(`${username}'s ${currentClass} stats`, 480, 1380, 960);

  const finalImage = await canvas.toBuffer();
  return finalImage;
};
