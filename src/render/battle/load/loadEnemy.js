import {
  loadImage,
} from 'canvas';
import path from 'path';

export const loadEnemy = async (
  enemyType,
) => {
  const enemyFrame = [];
  const promises = [];

  promises.push(
    new Promise((resolve, reject) => {
      loadImage(path.join(
        __dirname,
        `../../../assets/images/battle/monsters/${enemyType}/`,
        `${enemyType}.png`,
      )).then((image) => {
        enemyFrame[0] = image;
        resolve();
      });
    }),
  );
  promises.push(
    new Promise((resolve, reject) => {
      loadImage(path.join(
        __dirname,
        `../../../assets/images/battle/monsters/${enemyType}/`,
        `${enemyType}-1.png`,
      )).then((image) => {
        enemyFrame[1] = image;
        resolve();
      });
    }),
  );
  promises.push(
    new Promise((resolve, reject) => {
      loadImage(path.join(
        __dirname,
        `../../../assets/images/battle/monsters/${enemyType}/`,
        `${enemyType}-2.png`,
      )).then((image) => {
        enemyFrame[2] = image;
        resolve();
      });
    }),
  );
  console.log('before promise wait');
  await Promise.all(promises);

  return enemyFrame;
};
