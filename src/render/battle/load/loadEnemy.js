import {
  loadImage,
} from 'canvas';
import path from 'path';

export const loadEnemy = async (
  enemyType,
) => {
  const enemyFrame = [];
  enemyFrame[0] = await loadImage(path.join(
    __dirname,
    `../../../assets/images/battle/monsters/${enemyType}/`,
    `${enemyType}.png`,
  ));
  enemyFrame[1] = await loadImage(path.join(
    __dirname,
    `../../../assets/images/battle/monsters/${enemyType}/`,
    `${enemyType}-1.png`,
  ));
  enemyFrame[2] = await loadImage(path.join(
    __dirname,
    `../../../assets/images/battle/monsters/${enemyType}/`,
    `${enemyType}-2.png`,
  ));
  return enemyFrame;
};
