import {
  loadImage,
} from 'canvas';
import path from 'path';

export const loadPlayer = async (
  playerClass,
) => {
  const playerImage = [];
  playerImage[0] = await loadImage(path.join(
    __dirname,
    `../../../assets/images/battle/player/${playerClass}/`,
    `${playerClass}.png`,
  ));
  return playerImage;
};
