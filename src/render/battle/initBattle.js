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
  currentSelectedMonster,
  battleInfoArray = false,
  monsterInfo = false,
) => {
  const enemies = [];
  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const zone = 'den';
  const backgroundImage = await loadImage(path.join(__dirname, `../../assets/images/battle/background`, `${zone}.png`));

  battle.BattleMonsters.forEach(async (battleMonster, i) => {
    enemies[parseInt(battleMonster.id, 10)] = await loadEnemy(
      battleMonster.monster.name,
    );
  });

  const playerImage = await loadPlayer(
    currentUser.class.name,
  );

  const [
    hpOrbs,
    mpOrbs,
  ] = await loadOrbs(
    previousUserState,
    battleInfoArray,
    monsterInfo,
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

  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );

  const playerPosition = drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    false, // user attacking [false || enemyImagePosition]
  );

  battle.BattleMonsters.forEach(async (battleMonster, i) => {
    if (battleMonster.currentHp > 0) {
      drawEnemy(
        ctx, // CTX
        previousBattleState.BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
        currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
        enemies[battleMonster.id], // Enemy Image
        false, // Moved To user?
        0, // Enemy Image Frame Shown
        playerPosition, // PlayerCords
        i, // Index
      );
    }
  });

  drawBattleScreenTools(
    ctx, // pass canvas ctx
    mainSkill,
    secondarySkill,
    hpOrbs[0],
    mpOrbs[0],
  );

  drawBattleLog(
    ctx,
    battle,
  );

  gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
    delay: 200,
  });

  gif.render();

  const finalImage = await new Promise((resolve, reject) => {
    gif.on('finished', resolve);
  });
  return finalImage;
};
