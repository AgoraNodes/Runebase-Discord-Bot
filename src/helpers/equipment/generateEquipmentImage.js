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

export const generateEquipmentImage = async (
  currentUser,
  cannotSpendWarning,
) => {
  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const nextRank = await db.rank.findOne({
    where: {
      expNeeded: {
        [Op.gt]: currentUser.exp,
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
  const equipmentBackground = await loadImage(path.join(__dirname, '../../assets/images/equipment', `background.png`));
  ctx.drawImage(equipmentBackground, 0, 0, 960, 1300);

  const finalImage = await canvas.toBuffer();
  return finalImage;
};
