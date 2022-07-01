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
  currentSelectedMonster,
  battleInfoArray = false,
  monsterInfo = false,
) => {
  console.log('start render gif');
  // console.log(previousUserState.condition);
  // console.log('previous user state');
  // console.log(currentUser.condition);
  // console.log('next user state');
  // console.log('renderBattlegif');
  // console.log('123');
  const enemyPosition = [];
  const playerPosition = [];
  const enemies = [];
  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const zone = 'den';
  const backgroundImage = await loadImage(path.join(__dirname, `../../assets/images/battle/background`, `${zone}.png`));

  const playerImage = await loadPlayer(
    currentUser.class.name,
  );
  console.log('start render gif 1');

  previousBattleState.BattleMonsters.forEach(async (battleMonster, i) => {
    enemies[parseInt(battleMonster.id, 10)] = await loadEnemy(
      battleMonster.monster.name,
    );
  });
  console.log('start render gif 22');
  // const enemyFrame = await loadEnemy(
  //   'Zombie',
  // );

  const [
    hpOrbs,
    mpOrbs,
  ] = await loadOrbs(
    previousUserState,
    battleInfoArray,
    monsterInfo,
  );
  console.log('start render gif 3');
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
  console.log('start render gif 2');
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
  console.log('start render gif 3');
  console.log('Render Frame #1');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );
  playerPosition[0] = drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    false, // user attacking [false || enemyImagePosition]
  );

  previousBattleState.BattleMonsters.forEach(async (battleMonster, i) => {
    if (battleMonster.currentHp > 0) {
      enemyPosition[i] = drawEnemy(
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
    delay: 600,
  });

  console.log('Render Frame #2');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );

  console.log(previousBattleState.BattleMonsters);
  console.log('888');
  console.log(battle.BattleMonsters);
  console.log('777');

  previousBattleState.BattleMonsters.forEach(async (battleMonster, i) => {
    if (battleMonster.currentHp > 0) {
      // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
      enemyPosition[i] = drawEnemy(
        ctx, // CTX
        previousBattleState.BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
        currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
        enemies[battleMonster.id], // Enemy Image
        false, // Moved To user?
        0, // Enemy Image Frame Shown
        playerPosition, // PlayerCords
        i, // Index
        // findUpdatedMonsterState,
      );
    }
  });

  console.log(enemyPosition);
  console.log('find enemy position before');

  const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === monsterInfo[0].monsterId);
  console.log('find enemy position after');
  console.log(findAttackedEnemyByUser);
  playerPosition[0] = drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    findAttackedEnemyByUser, // user attacking [false || enemyImagePosition]
  );

  drawBattleScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbs[0],
    mpOrbs[0],
  );
  drawBattleLog(
    ctx,
    battle,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText(
    monsterInfo[0].userDamage,
    findAttackedEnemyByUser.x,
    findAttackedEnemyByUser.y - 20,
    50,
  );
  gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
    delay: 200,
  });

  console.log('Render Frame #3');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );

  battle.BattleMonsters.forEach(async (battleMonster, i) => {
    if (battleMonster.currentHp > 0) {
      enemyPosition[i] = drawEnemy(
        ctx, // CTX
        battle.BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
        currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
        enemies[battleMonster.id], // Enemy Image
        false, // Moved To user?
        0, // Enemy Image Frame Shown
        playerPosition, // PlayerCords
        i, // Index
      );
    }
  });

  playerPosition[0] = drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    findAttackedEnemyByUser, // user attacking [false || enemyImagePosition]
  );

  drawBattleScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbs[0],
    mpOrbs[1],
  );

  drawBattleLog(
    ctx,
    battle,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText(
    monsterInfo[0].userDamage,
    findAttackedEnemyByUser.x,
    findAttackedEnemyByUser.y - 20,
    50,
  );
  gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
    delay: 200,
  });

  console.log('Render Frame #4');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );
  playerPosition[0] = drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    false, // user attacking [false || enemyImagePosition]
  );
  battle.BattleMonsters.forEach(async (battleMonster, i) => {
    if (battleMonster.currentHp > 0) {
      enemyPosition[i] = drawEnemy(
        ctx, // CTX
        battle.BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
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
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbs[0],
    mpOrbs[1],
  );
  drawBattleLog(
    ctx,
    battle,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText(
    monsterInfo[0].userDamage,
    findAttackedEnemyByUser.x,
    findAttackedEnemyByUser.y - 20,
    50,
  );
  gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
    delay: 400,
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, battleInfo] of battleInfoArray.entries()) {
    console.log('Render Frame #5');
    drawBackground(
      ctx,
      canvas,
      backgroundImage,
    );
    playerPosition[0] = drawPlayer(
      ctx, // Ctx drawing canvas
      playerImage, // image array of player images
      0, // number of image in the array to show
      false, // user attacking [false || enemyImagePosition]
    );

    battle.BattleMonsters.forEach(async (battleMonster, i) => {
      if (battleMonster.currentHp > 0) {
        enemyPosition[i] = drawEnemy(
          ctx, // CTX
          battle.BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
          currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
          enemies[battleMonster.id], // Enemy Image
          battleMonster.id === battleInfo.monsterId, // Moved To user?
          battleMonster.id === battleInfo.monsterId ? 0 : 0, // Enemy Image Frame Shown
          playerPosition[0], // PlayerCords
          i, // Index
        );
      }
    });
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbs[index + 1],
      mpOrbs[1],
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

    console.log('draw player');
    playerPosition[0] = drawPlayer(
      ctx, // Ctx drawing canvas
      playerImage, // image array of player images
      0, // number of image in the array to show
      false, // user attacking [false || enemyImagePosition]
    );
    battle.BattleMonsters.forEach(async (battleMonster, i) => {
      if (battleMonster.currentHp > 0) {
        enemyPosition[i] = drawEnemy(
          ctx, // CTX
          battle.BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
          currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
          enemies[battleMonster.id], // Enemy Image
          battleMonster.id === battleInfo.monsterId, // Moved To user?
          battleMonster.id === battleInfo.monsterId ? 1 : 0, // Enemy Image Frame Shown
          playerPosition[0], // PlayerCords
          i, // Index
        );
      }
    });
    console.log('draw screenTools');
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbs[index + 1],
      mpOrbs[1],
    );
    console.log('draw battleLog');
    drawBattleLog(
      ctx,
      battle,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    ctx.strokeText(
      battleInfo.damage,
      playerPosition[0].x,
      playerPosition[0].y - 20,
      50,
    );
    gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
      delay: 200,
    });

    console.log('Render Frame #7');
    drawBackground(
      ctx,
      canvas,
      backgroundImage,
    );
    playerPosition[0] = drawPlayer(
      ctx, // Ctx drawing canvas
      playerImage, // image array of player images
      0, // number of image in the array to show
      false, // user attacking [false || enemyImagePosition]
    );
    battle.BattleMonsters.forEach(async (battleMonster, i) => {
      if (battleMonster.currentHp > 0) {
        enemyPosition[i] = drawEnemy(
          ctx, // CTX
          battle.BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
          currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
          enemies[battleMonster.id], // Enemy Image
          battleMonster.id === battleInfo.monsterId, // Moved To user?
          battleMonster.id === battleInfo.monsterId ? 2 : 0, // Enemy Image Frame Shown
          playerPosition[0], // PlayerCords
          i, // Index
        );
      }
    });
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbs[index + 1],
      mpOrbs[1],
    );
    drawBattleLog(
      ctx,
      battle,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    ctx.strokeText(
      battleInfo.damage,
      playerPosition[0].x,
      playerPosition[0].y - 20,
      50,
    );
    gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
      delay: 200,
    });
    console.log('Render Frame #8');
    drawBackground(
      ctx,
      canvas,
      backgroundImage,
    );
    playerPosition[0] = drawPlayer(
      ctx, // Ctx drawing canvas
      playerImage, // image array of player images
      0, // number of image in the array to show
      false, // user attacking [false || enemyImagePosition]
    );
    battle.BattleMonsters.forEach(async (battleMonster, i) => {
      if (battleMonster.currentHp > 0) {
        enemyPosition[i] = drawEnemy(
          ctx, // CTX
          battle.BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
          currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
          enemies[battleMonster.id], // Enemy Image
          battleMonster.id === battleInfo.monsterId, // Moved To user?
          battleMonster.id === battleInfo.monsterId ? 0 : 0, // Enemy Image Frame Shown
          playerPosition[0], // PlayerCords
          i, // Index
        );
      }
    });
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbs[index + 1],
      mpOrbs[1],
    );
    drawBattleLog(
      ctx,
      battle,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    ctx.strokeText(
      battleInfo.damage,
      playerPosition[0].x,
      playerPosition[0].y - 20,
      50,
    );
    gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
      delay: 200,
    });
    console.log('Render Frame #9');
    drawBackground(
      ctx,
      canvas,
      backgroundImage,
    );
    playerPosition[0] = drawPlayer(
      ctx, // Ctx drawing canvas
      playerImage, // image array of player images
      0, // number of image in the array to show
      false, // user attacking [false || enemyImagePosition]
    );
    battle.BattleMonsters.forEach(async (battleMonster, i) => {
      if (battleMonster.currentHp > 0) {
        enemyPosition[i] = drawEnemy(
          ctx, // CTX
          battle.BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
          currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
          enemies[battleMonster.id], // Enemy Image
          false, // Moved To user?
          0, // Enemy Image Frame Shown
          playerPosition[0], // PlayerCords
          i, // Index
        );
      }
    });
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbs[index + 1],
      mpOrbs[1],
    );
    drawBattleLog(
      ctx,
      battle,
    );
    gif.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height), {
      delay: 300,
    });
  }

  gif.render();
  const finalImage = await new Promise((resolve, reject) => {
    console.log('Resolving Gif render');
    gif.on('finished', resolve);
  });
  return finalImage;
};
