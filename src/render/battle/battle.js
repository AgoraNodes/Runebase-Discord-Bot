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

import { drawBackground } from './draw/drawBackground';
import { drawBattleLog } from './draw/drawBattleLog';
import { drawBattleScreenTools } from './draw/drawBattleScreenTools';
import { drawPlayer } from "./draw/drawPlayer";
import { drawEnemy } from './draw/drawEnemy';

export const renderBattleGif = async (
  currentUser,
  userCurrentSelectedSkills,
  battle,
  previousBattleState,
  previousUserState,
  monsterInfo = false,
  userInfo = false,
) => {
  // console.log(previousUserState.condition);
  // console.log('previous user state');
  // console.log(currentUser.condition);
  // console.log('next user state');
  // console.log('renderBattlegif');
  // console.log('123');
  let enemy;
  let player;

  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const zone = 'den';
  const backgroundImage = await loadImage(path.join(__dirname, `../../assets/images/battle/background`, `${zone}.png`));

  const playerImage = await loadPlayer(
    currentUser.class.name,
  );

  const enemyFrame = await loadEnemy(
    'Zombie',
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

  console.log('Render Frame #1');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );
  player = drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    false, // user attacking [false || enemyImagePosition]
  );
  enemy = await drawEnemy(
    ctx,
    previousBattleState.monsters[0],
    enemyFrame,
  );
  console.log(enemy);
  drawBattleScreenTools(
    ctx, // pass canvas ctx
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImagePrevious,
  );
  drawBattleLog(
    ctx,
    battle,
  );
  gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
    delay: 600,
  });

  console.log('Render Frame #2');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );

  enemy = await drawEnemy(
    ctx,
    previousBattleState.monsters[0],
    enemyFrame,
  );

  player = drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    true, // user attacking [false || enemyImagePosition]
  );

  drawBattleScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImagePrevious,
  );
  drawBattleLog(
    ctx,
    battle,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
  gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
    delay: 200,
  });

  console.log('Render Frame #3');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );

  drawEnemy(
    ctx,
    battle.monsters[0],
    enemyFrame,
  );

  drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    true, // user attacking [false || enemyImagePosition]
  );

  drawBattleScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImageCurrent,
  );

  drawBattleLog(
    ctx,
    battle,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
  gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
    delay: 200,
  });

  console.log('Render Frame #4');
  drawBackground(
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
    battle.monsters[0],
    enemyFrame,
  );
  drawBattleScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImageCurrent,
  );
  drawBattleLog(
    ctx,
    battle,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
  gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
    delay: 400,
  });
  if (monsterInfo.alive) {
    console.log('Render Frame #5');
    drawBackground(
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
      battle.monsters[0],
      enemyFrame,
    );
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImagePrevious,
      mpOrbImageCurrent,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
      delay: 400,
    });

    console.log('Render Frame #6');
    drawBackground(
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
      battle.monsters[0],
      enemyFrame,
      true,
    );
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImagePrevious,
      mpOrbImageCurrent,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50);
    gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
      delay: 200,
    });

    console.log('Render Frame #7');
    drawBackground(
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
      battle.monsters[0],
      enemyFrame,
      true,
      1,
    );
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImageCurrent,
      mpOrbImageCurrent,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50);
    // encoder.addFrame(ctx);
    gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
      delay: 200,
    });

    console.log('Render Frame #8');
    drawBackground(
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
      battle.monsters[0],
      enemyFrame,
      true,
      2,
    );
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImageCurrent,
      mpOrbImageCurrent,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50);
    // encoder.addFrame(ctx);
    gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
      delay: 200,
    });

    console.log('Render Frame #9');
    drawBackground(
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
      battle.monsters[0],
      enemyFrame,
    );
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImageCurrent,
      mpOrbImageCurrent,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
      delay: 200,
    });
  }
  console.log('before gif render');
  gif.render();
  const finalImage = await new Promise((resolve, reject) => {
    console.log('Resolving Gif render');
    gif.on('finished', resolve);
  });
  return finalImage;
};
