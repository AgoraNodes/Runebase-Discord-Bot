import {
  loadImage,
} from 'canvas';
import path from 'path';

export const loadDebuff = async (
  debuffName,
) => {
  const playerImage = [];
  playerImage[0] = await loadImage(path.join(
    __dirname,
    `../../../assets/images/debuff/`,
    `${debuffName}.png`,
  ));
  return playerImage;
};
