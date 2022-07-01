import {
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas';
import path from 'path';
import GIF from 'gif.node';

import { loadPlayer } from './load/loadPlayer';
import { loadEnemy } from './load/loadEnemy';
import { loadOrbs } from './load/loadOrbs';

import { drawBackground } from "./draw/drawBackground";
import { drawBattleLog } from './draw/drawBattleLog';
import { drawBattleScreenTools } from './draw/drawBattleScreenTools';
import { drawPlayer } from "./draw/drawPlayer";
import { drawEnemy } from './draw/drawEnemy';

export const renderInitBattleGif = async (
  currentUser,
  userCurrentSelectedSkills,
  battle,
  previousBattleState,
  previousUserState,
  monsterInfo = false,
  userInfo = false,
) => {
  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const zone = 'den';
  const backgroundImage = await loadImage(path.join(__dirname, `../../assets/images/battle/background`, `${zone}.png`));

  const enemyFrame = await loadEnemy(
    'Zombie',
  );

  const playerImage = await loadPlayer(
    currentUser.class.name,
  );

  const [
    hpOrbImageCurrent,
    mpOrbImageCurrent,
    hpOrbImagePrevious,
    mpOrbImagePrevious,
  ] = await loadOrbs(
    previousUserState,
    currentUser,
  );
  const mainSkill = await loadImage(path.join(
    __dirname,
    `../../assets/images/skills/${userCurrentSelectedSkills.selectedMainSkill.skill.skillTree ? `${userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.class.name}/${userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.name}` : ``}`,
    `${userCurrentSelectedSkills.selectedMainSkill.skill.name}.png`,
  ));

  const secondarySkill = await loadImage(path.join(
    __dirname,
    `../../assets/images/skills/${userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree ? `${userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.class.name}/${userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.name}` : ``}`,
    `${userCurrentSelectedSkills.selectedSecondarySkill.skill.name}.png`,
  ));

  const canvas = createCanvas(650, 300);
  const ctx = canvas.getContext('2d');

  const gif = new GIF({
    worker: 8,
    quality: 50,
    debug: false,
    width: canvas.width,
    height: canvas.height,
    repeat: -1,
  });

  await drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );

  drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    false, // user attacking [false || enemyImagePosition]
  );

  drawEnemy(
    ctx,
    previousBattleState.monsters[0],
    enemyFrame,
  );
  await drawBattleScreenTools(
    ctx, // pass canvas ctx
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImagePrevious,
  );
  await drawBattleLog(
    ctx,
    battle,
  );
  gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
    delay: 200,
  });
  await gif.render();
  const finalImage = await new Promise((resolve, reject) => {
    gif.on('finished', resolve);
  });
  return finalImage;
};
