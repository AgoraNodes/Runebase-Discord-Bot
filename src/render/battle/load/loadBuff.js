import {
  loadImage,
} from 'canvas';
import path from 'path';

export const loadBuff = async (
  buffName,
) => {
  const buffImage = [];
  buffImage[0] = await loadImage(path.join(
    __dirname,
    `../../../assets/images/buff/`,
    `${buffName}.png`,
  ));
  return buffImage;
};
