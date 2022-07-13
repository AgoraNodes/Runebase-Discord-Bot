import {
  loadImage,
} from 'canvas';
import path from 'path';

export const loadEffect = async (
  effectName,
) => {
  const effectImage = [];
  effectImage[0] = await loadImage(path.join(
    __dirname,
    `../../../assets/images/battle/effects`,
    `${effectName}.png`,
  ));
  return effectImage;
};
