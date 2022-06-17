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
import db from '../../models';

export const generateStatsImage = async (
  currentUser,
  cannotSpendWarning,
) => {
  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const nextRank = await db.rank.findOne({
    where: {
      expNeeded: {
        [Op.gt]: currentUser.user.exp,
      },
    },
    order: [
      ['id', 'ASC'],
    ],
  });

  const nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : currentUser.user.ranks[0].expNeeded;

  const countedSpendAttributes = currentUser.stats.strength
    + currentUser.stats.dexterity
    + currentUser.stats.vitality
    + currentUser.stats.energy;
  const canSpendAttributes = countedSpendAttributes < (currentUser.user.ranks[0].id * 5);
  const AttributesToSpend = (currentUser.user.ranks[0].id * 5) - countedSpendAttributes;

  const canvas = createCanvas(960, 1400);
  const ctx = canvas.getContext('2d');
  const BackgroundImageStats = await loadImage(path.join(__dirname, '../../assets/images', `stats_background.png`));
  const unspendAttributesBoxImage = await loadImage(path.join(__dirname, '../../assets/images', `unspendAttributesBox.png`));
  ctx.drawImage(BackgroundImageStats, 0, 0, 960, 1300);

  if (canSpendAttributes) {
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
    ctx.strokeText(AttributesToSpend, 410, 1125, 540);
    ctx.fillText(AttributesToSpend, 410, 1125, 540);
  }

  ctx.fillStyle = "#ccc";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.textAlign = "center";
  ctx.font = 'bold 35px "HeartWarming"';

  // username
  ctx.strokeText(currentUser.user.username, 290, 70, 540);
  ctx.fillText(currentUser.user.username, 290, 70, 540);

  // character classname
  ctx.strokeText(currentUser.user.currentClass.name, 760, 70, 240);
  ctx.fillText(currentUser.user.currentClass.name, 760, 70, 240);

  // level
  ctx.strokeText('Level', 100, 135, 240);
  ctx.fillText('level', 100, 135, 240);
  ctx.strokeText(currentUser.user.ranks[0].id, 100, 175, 240);
  ctx.fillText(currentUser.user.ranks[0].id, 100, 175, 240);

  // Experience
  ctx.strokeText('Experience', 375, 135, 240);
  ctx.fillText('Experience', 375, 135, 240);
  ctx.strokeText(currentUser.user.exp, 375, 175, 240);
  ctx.fillText(currentUser.user.exp, 375, 175, 240);

  // Next level
  ctx.strokeText('Next level', 760, 135, 240);
  ctx.fillText('Next level', 760, 135, 240);
  ctx.strokeText(nextRankExp, 760, 175, 240); // Change this to next level exp
  ctx.fillText(nextRankExp, 760, 175, 240);

  ctx.font = 'bold 30px "HeartWarming"';

  // Strength
  console.log(currentUser.user.currentClass);
  const strengthPoints = currentUser.user.currentClass.strength + currentUser.stats.strength;
  ctx.strokeText(`Strength`, 125, 290, 200);
  ctx.fillText(`Strength`, 125, 290, 200);
  ctx.strokeText(strengthPoints, 288, 290, 200);
  ctx.fillText(strengthPoints, 288, 290, 200);

  // Dexterity
  const dexterityPoints = currentUser.user.currentClass.dexterity + currentUser.stats.dexterity;
  ctx.strokeText(`Dexterity`, 125, 475, 200);
  ctx.fillText(`Dexterity`, 125, 475, 200);
  ctx.strokeText(dexterityPoints, 288, 475, 200);
  ctx.fillText(dexterityPoints, 288, 475, 200);

  // Vitality
  const vitalityPoints = currentUser.user.currentClass.vitality + currentUser.stats.vitality;
  ctx.strokeText(`Vitality`, 125, 735, 200);
  ctx.fillText(`Vitality`, 125, 735, 200);
  ctx.strokeText(vitalityPoints, 288, 735, 200);
  ctx.fillText(vitalityPoints, 288, 735, 200);

  // Energy
  const energyPoints = currentUser.user.currentClass.energy + currentUser.stats.energy;
  ctx.strokeText(`Energy`, 125, 920, 200);
  ctx.fillText(`Energy`, 125, 920, 200);
  ctx.strokeText(energyPoints, 288, 920, 200);
  ctx.fillText(energyPoints, 288, 920, 200);

  // attack 1
  ctx.strokeText(`Attack Damage`, 635, 290, 200);
  ctx.fillText(`Attack Damage`, 635, 290, 200);
  ctx.strokeText(`1-2`, 855, 290, 200);
  ctx.fillText(`1-2`, 855, 290, 200);

  // attack 2
  ctx.strokeText(`Attack Damage`, 635, 360, 200);
  ctx.fillText(`Attack Damage`, 635, 360, 200);
  ctx.strokeText(`1-2`, 855, 360, 200);
  ctx.fillText(`1-2`, 855, 360, 200);

  // attack rating 1
  const attackRatingOne = currentUser.user.currentClass.attackRating + (currentUser.stats.dexterity * 5);
  ctx.strokeText(`Attack Rating`, 645, 475, 200);
  ctx.fillText(`Attack Rating`, 645, 475, 200);
  ctx.strokeText(attackRatingOne, 875, 475, 200);
  ctx.fillText(attackRatingOne, 875, 475, 200);

  // attack rating 2
  const attackRatingTwo = currentUser.user.currentClass.attackRating + (currentUser.stats.dexterity * 5);
  console.log(currentUser.stats.dexterity * 5);
  console.log(attackRatingTwo);
  console.log('attackRating2');
  ctx.strokeText(`Attack Rating`, 645, 545, 200);
  ctx.fillText(`Attack Rating`, 645, 545, 200);
  ctx.strokeText(attackRatingTwo, 875, 545, 200);
  ctx.fillText(attackRatingTwo, 875, 545, 200);

  // Defense
  const { defense } = currentUser.user.currentClass;
  ctx.strokeText(`Defense`, 645, 620, 200);
  ctx.fillText(`Defense`, 645, 620, 200);
  ctx.strokeText(defense, 875, 620, 200);
  ctx.fillText(defense, 875, 620, 200);

  // Stamina
  const staminaPoints = currentUser.user.currentClass.stamina + currentUser.stats.stamina;
  const currentStaminaPoints = currentUser.condition.stamina;
  ctx.strokeText(`Stamina`, 585, 735, 200);
  ctx.fillText(`Stamina`, 585, 735, 200);
  ctx.strokeText(currentStaminaPoints, 755, 735, 200);
  ctx.fillText(currentStaminaPoints, 755, 735, 200);
  ctx.strokeText(staminaPoints, 875, 735, 200);
  ctx.fillText(staminaPoints, 875, 735, 200);

  // Life
  const lifePoints = currentUser.user.currentClass.life + currentUser.stats.life;
  const currentLifePoints = currentUser.condition.life;
  ctx.strokeText(`Life`, 585, 805, 200);
  ctx.fillText(`Life`, 585, 805, 200);
  ctx.strokeText(currentLifePoints, 755, 805, 200);
  ctx.fillText(currentLifePoints, 755, 805, 200);
  ctx.strokeText(lifePoints, 875, 805, 200);
  ctx.fillText(lifePoints, 875, 805, 200);

  // Mana
  const manaPoints = currentUser.user.currentClass.mana + currentUser.stats.mana;
  const currentManaPoints = currentUser.condition.mana;
  ctx.strokeText(`Mana`, 585, 920, 200);
  ctx.fillText(`Mana`, 585, 920, 200);
  ctx.strokeText(currentManaPoints, 755, 920, 200);
  ctx.fillText(currentManaPoints, 755, 920, 200);
  ctx.strokeText(manaPoints, 875, 920, 200);
  ctx.fillText(manaPoints, 875, 920, 200);

  // Fire resistance
  ctx.strokeText(`Fire resistance`, 665, 1038, 240);
  ctx.fillText(`Fire resistance`, 665, 1038, 240);
  ctx.strokeText(`0`, 875, 1038, 240);
  ctx.fillText(`0`, 875, 1038, 240);

  // Cold resistance
  ctx.strokeText(`Cold resistance`, 665, 1110, 240);
  ctx.fillText(`Cold resistance`, 665, 1110, 240);
  ctx.strokeText(`0`, 875, 1110, 240);
  ctx.fillText(`0`, 875, 1110, 240);

  // Lightning resistance
  ctx.strokeText(`Lightning resistance`, 665, 1182, 240);
  ctx.fillText(`Lightning resistance`, 665, 1182, 240);
  ctx.strokeText(`0`, 875, 1182, 240);
  ctx.fillText(`0`, 875, 1182, 240);

  // Poision resistance
  ctx.strokeText(`Poision resistance`, 665, 1254, 240);
  ctx.fillText(`Poision resistance`, 665, 1254, 240);
  ctx.strokeText(`0`, 875, 1254, 240);
  ctx.fillText(`0`, 875, 1254, 240);

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
  ctx.strokeText(`${currentUser.user.username}'s ${currentUser.user.currentClass.name} stats`, 480, 1380, 960);
  ctx.fillText(`${currentUser.user.username}'s ${currentUser.user.currentClass.name} stats`, 480, 1380, 960);

  const finalImage = await canvas.toBuffer();
  return finalImage;
};
