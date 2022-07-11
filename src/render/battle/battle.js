/* eslint-disable no-restricted-syntax */
import {
  createCanvas,
  loadImage,
} from 'canvas';
import path from 'path';
import {
  GIFEncoder,
  quantize,
  applyPalette,
} from 'gifenc';

import { loadPlayer } from './load/loadPlayer';
import { loadEnemy } from './load/loadEnemy';
import { loadOrbs } from './load/loadOrbs';
import { loadDebuff } from './load/loadDebuff';
import { loadBuff } from './load/loadBuff';

import { drawBackground } from './draw/drawBackground';
import { drawBattleLog } from './draw/drawBattleLog';
import { drawBattleScreenTools } from './draw/drawBattleScreenTools';
import { drawPlayer } from "./draw/drawPlayer";
import { drawEnemy } from './draw/drawEnemy';
import { drawUserBuffs } from './draw/drawUserBuffs';

export const renderBattleGif = async (
  currentUser,
  initialUserState,
  userCurrentSelectedSkills,
  battle,
  previousBattleState,
  previousUserState,
  currentSelectedMonster, // Selected monster
  battleInfoArray = false, // Enemies attacking the user
  stageOneInfoArray = false, // User Attacking Enemy
  retaliationInfoArray = false, // User Retaliating
  debuffDamageInfoArray = false, // Applying Debuff damage on enemies
) => {
  const userState = initialUserState;
  const zone = 'den';
  const enemyPosition = [];
  const playerPosition = [];
  const enemies = [];
  const buffImages = [];
  const debuffImages = [];
  const loadPromises = [];
  let { BattleMonsters } = previousBattleState;
  const { battleLogs } = previousBattleState;
  let mainSkill;
  let secondarySkill;
  let backgroundImage;
  let playerImage;
  let hpOrbs;
  let mpOrbs;
  let imageData;
  let palette;
  let imageIndex;

  loadPromises.push(
    new Promise((resolve, reject) => {
      loadImage(path.join(
        __dirname,
        `../../assets/images/skills/${userCurrentSelectedSkills.selectedMainSkill.skill.skillTree ? `${userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.class.name}/${userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.name}` : ``}`,
        `${userCurrentSelectedSkills.selectedMainSkill.skill.name}.png`,
      )).then((image) => {
        mainSkill = image;
        resolve();
      });
    }),
  );

  loadPromises.push(
    new Promise((resolve, reject) => {
      loadImage(path.join(
        __dirname,
        `../../assets/images/skills/${userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree ? `${userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.class.name}/${userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.name}` : ``}`,
        `${userCurrentSelectedSkills.selectedSecondarySkill.skill.name}.png`,
      )).then((image) => {
        secondarySkill = image;
        resolve();
      });
    }),
  );

  loadPromises.push(
    new Promise((resolve, reject) => {
      loadImage(path.join(__dirname, `../../assets/images/battle/background`, `${zone}.png`)).then((image) => {
        backgroundImage = image;
        resolve();
      });
    }),
  );

  loadPromises.push(
    new Promise((resolve, reject) => {
      loadPlayer(
        userState.class.name,
      ).then((image) => {
        playerImage = image;
        resolve();
      });
    }),
  );

  for (const [i, buff] of userState.buffs.entries()) {
    loadPromises.push(
      new Promise((resolve, reject) => {
        if (!buffImages[buff.name]) {
          loadBuff(
            buff.name,
          ).then((image) => {
            buffImages[buff.name] = image;
            resolve();
          });
        } else {
          resolve();
        }
      }),
    );
  }

  for (const [i, monsterInfoA] of stageOneInfoArray.entries()) {
    for (const [i, monsterToUpdateA] of monsterInfoA.monstersToUpdate.entries()) {
      for (const [i, debuff] of monsterToUpdateA.debuffs.entries()) {
        loadPromises.push(
          new Promise((resolve, reject) => {
            if (!debuffImages[debuff.name]) {
              loadDebuff(
                debuff.name,
              ).then((image) => {
                debuffImages[debuff.name] = image;
                resolve();
              });
            } else {
              resolve();
            }
          }),
        );
      }
    }
  }

  for (const [i, battleMonster] of BattleMonsters.entries()) {
    loadPromises.push(
      new Promise((resolve, reject) => {
        loadEnemy(
          battleMonster.monster.name,
        ).then((image) => {
          enemies[parseInt(battleMonster.id, 10)] = image;
          resolve();
        });
      }),
    );
    for (const [i, debuff] of battleMonster.debuffs.entries()) {
      loadPromises.push(
        new Promise((resolve, reject) => {
          if (!debuffImages[debuff.name]) {
            loadDebuff(
              debuff.name,
            ).then((image) => {
              debuffImages[debuff.name] = image;
              resolve();
            });
          } else {
            resolve();
          }
        }),
      );
    }
  }

  loadPromises.push(
    new Promise((resolve, reject) => {
      loadOrbs(
        userState,
        stageOneInfoArray,
        battleInfoArray,
      ).then(([
        hpOrbsReturn,
        mpOrbsReturn,
      ]) => {
        hpOrbs = hpOrbsReturn;
        mpOrbs = mpOrbsReturn;
        resolve();
      });
    }),
  );

  await Promise.all(loadPromises);

  const canvas = createCanvas(650, 300);
  const ctx = canvas.getContext('2d');
  const gif = GIFEncoder();

  console.log('Render Frame #1');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );

  drawUserBuffs(
    ctx, // Ctx drawing canvas
    userState, // User Object
    buffImages, // image array of player images
  );

  playerPosition[0] = drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    false, // user attacking [false || enemyImagePosition]
  );

  for (const [i, battleMonster] of BattleMonsters.entries()) {
    if (battleMonster.currentHp > 0) {
      enemyPosition[i] = drawEnemy(
        ctx, // CTX
        BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
        enemies[battleMonster.id], // Enemy Image
        debuffImages,
        false, // Moved To user?
        0, // Enemy Image Frame Shown
        playerPosition, // PlayerCords
        i, // Index
      );
    }
  }

  drawBattleScreenTools(
    ctx, // pass canvas ctx
    mainSkill,
    secondarySkill,
    hpOrbs[0],
    mpOrbs[0],
  );

  drawBattleLog(
    ctx,
    battleLogs,
  );

  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  palette = quantize(imageData.data, 256, { format: 'rgb333' });
  imageIndex = applyPalette(imageData.data, palette);
  gif.writeFrame(
    imageIndex,
    canvas.width,
    canvas.height,
    {
      palette,
      delay: 600,
      repeat: -1,
    },
  );

  console.log('Render Frame #2');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );

  for (const [i, battleMonster] of BattleMonsters.entries()) {
    if (battleMonster.currentHp > 0) {
      // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
      enemyPosition[i] = drawEnemy(
        ctx, // CTX
        BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
        enemies[battleMonster.id], // Enemy Image
        debuffImages,
        false, // Moved To user?
        0, // Enemy Image Frame Shown
        playerPosition, // PlayerCords
        i, // Index
        // findUpdatedMonsterState,
      );
    }
  }

  drawUserBuffs(
    ctx, // Ctx drawing canvas
    userState, // User Object
    buffImages, // image array of player images
  );

  const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === stageOneInfoArray[0].monsterId);
  // console.log('find enemy position after');
  // console.log(findAttackedEnemyByUser);
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

  battleLogs.unshift(...stageOneInfoArray[0].battleLogs);

  BattleMonsters = BattleMonsters.map((obj) => stageOneInfoArray[0].monstersToUpdate.find((o) => o.id === obj.id) || obj);

  drawBattleLog(
    ctx,
    battleLogs,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  console.log('before looping monsters');
  for (const monsterToUpdate of stageOneInfoArray[0].monstersToUpdate) {
    // console.log(monsterToUpdate);
    // console.log(enemyPosition);
    const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
    ctx.strokeText(
      monsterToUpdate.userDamage,
      monsterToUpdatePosition.x,
      monsterToUpdatePosition.y - 20,
      50,
    );
  }

  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  palette = quantize(imageData.data, 256, { format: 'rgb333' });
  imageIndex = applyPalette(imageData.data, palette);
  gif.writeFrame(
    imageIndex,
    canvas.width,
    canvas.height,
    {
      palette,
      delay: 200,
      repeat: -1,
    },
  );

  console.log('Render Frame #3');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );

  for (const [i, battleMonster] of BattleMonsters.entries()) {
    // console.log(i);
    // console.log('-');
    if (battleMonster.currentHp > 0) {
      enemyPosition[i] = drawEnemy(
        ctx, // CTX
        BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
        enemies[battleMonster.id], // Enemy Image
        debuffImages,
        false, // Moved To user?
        0, // Enemy Image Frame Shown
        playerPosition, // PlayerCords
        i, // Index
      );
    }
  }

  drawUserBuffs(
    ctx, // Ctx drawing canvas
    userState, // User Object
    buffImages, // image array of player images
  );

  playerPosition[0] = drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    findAttackedEnemyByUser, // user attacking [false || enemyImagePosition]
  );

  drawUserBuffs(
    ctx, // Ctx drawing canvas
    userState, // User Object
    buffImages, // image array of player images
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
    battleLogs,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  for (const monsterToUpdate of stageOneInfoArray[0].monstersToUpdate) {
    const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
    ctx.strokeText(
      monsterToUpdate.userDamage,
      monsterToUpdatePosition.x,
      monsterToUpdatePosition.y - 20,
      50,
    );
  }

  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  palette = quantize(imageData.data, 256, { format: 'rgb333' });
  imageIndex = applyPalette(imageData.data, palette);
  gif.writeFrame(
    imageIndex,
    canvas.width,
    canvas.height,
    {
      palette,
      delay: 600,
      repeat: -1,
    },
  );

  console.log('Render Frame #4');
  drawBackground(
    ctx,
    canvas,
    backgroundImage,
  );

  drawUserBuffs(
    ctx, // Ctx drawing canvas
    userState, // User Object
    buffImages, // image array of player images
  );

  playerPosition[0] = drawPlayer(
    ctx, // Ctx drawing canvas
    playerImage, // image array of player images
    0, // number of image in the array to show
    false, // user attacking [false || enemyImagePosition]
  );

  for (const [i, battleMonster] of BattleMonsters.entries()) {
    if (battleMonster.currentHp > 0) {
      enemyPosition[i] = drawEnemy(
        ctx, // CTX
        BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
        currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
        enemies[battleMonster.id], // Enemy Image
        debuffImages,
        false, // Moved To user?
        0, // Enemy Image Frame Shown
        playerPosition, // PlayerCords
        i, // Index
      );
    }
  }

  drawBattleScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbs[0],
    mpOrbs[1],
  );
  drawBattleLog(
    ctx,
    battleLogs,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  for (const monsterToUpdate of stageOneInfoArray[0].monstersToUpdate) {
    const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
    ctx.strokeText(
      monsterToUpdate.userDamage,
      monsterToUpdatePosition.x,
      monsterToUpdatePosition.y - 20,
      50,
    );
  }

  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  palette = quantize(imageData.data, 256, { format: 'rgb333' });
  imageIndex = applyPalette(imageData.data, palette);
  gif.writeFrame(
    imageIndex,
    canvas.width,
    canvas.height,
    {
      palette,
      delay: 400,
      repeat: -1,
    },
  );

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, battleInfo] of battleInfoArray.entries()) {
    console.log('Render Frame #5');
    drawBackground(
      ctx,
      canvas,
      backgroundImage,
    );

    drawUserBuffs(
      ctx, // Ctx drawing canvas
      userState, // User Object
      buffImages, // image array of player images
    );

    playerPosition[0] = drawPlayer(
      ctx, // Ctx drawing canvas
      playerImage, // image array of player images
      0, // number of image in the array to show
      false, // user attacking [false || enemyImagePosition]
    );

    for (const [i, battleMonster] of BattleMonsters.entries()) {
      if (battleMonster.currentHp > 0) {
        enemyPosition[i] = drawEnemy(
          ctx, // CTX
          BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
          currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
          enemies[battleMonster.id], // Enemy Image
          debuffImages,
          battleMonster.id === battleInfo.monsterId, // Moved To user?
          battleMonster.id === battleInfo.monsterId ? 0 : 0, // Enemy Image Frame Shown
          playerPosition[0], // PlayerCords
          i, // Index
        );
      }
    }
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbs[index + 1],
      mpOrbs[1],
    );
    drawBattleLog(
      ctx,
      battleLogs,
    );

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    palette = quantize(imageData.data, 256, { format: 'rgb333' });
    imageIndex = applyPalette(imageData.data, palette);
    gif.writeFrame(
      imageIndex,
      canvas.width,
      canvas.height,
      {
        palette,
        delay: 400,
        repeat: -1,
      },
    );

    console.log('Render Frame #6');
    drawBackground(
      ctx,
      canvas,
      backgroundImage,
    );

    drawUserBuffs(
      ctx, // Ctx drawing canvas
      userState, // User Object
      buffImages, // image array of player images
    );

    console.log('draw player');
    playerPosition[0] = drawPlayer(
      ctx, // Ctx drawing canvas
      playerImage, // image array of player images
      0, // number of image in the array to show
      false, // user attacking [false || enemyImagePosition]
    );
    for (const [i, battleMonster] of BattleMonsters.entries()) {
      if (battleMonster.currentHp > 0) {
        enemyPosition[i] = drawEnemy(
          ctx, // CTX
          BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
          currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
          enemies[battleMonster.id], // Enemy Image
          debuffImages,
          battleMonster.id === battleInfo.monsterId, // Moved To user?
          battleMonster.id === battleInfo.monsterId ? 1 : 0, // Enemy Image Frame Shown
          playerPosition[0], // PlayerCords
          i, // Index
        );
      }
    }
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbs[index + 1],
      mpOrbs[1],
    );
    // console.log(battleInfo);
    // console.log('battleInfo');
    battleLogs.unshift(...battleInfo.battleLogs);
    drawBattleLog(
      ctx,
      battleLogs,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    if (
      battleInfo.attackType === 'Blocked'
      || battleInfo.attackType === 'Parried'
      || battleInfo.attackType === 'Missed'
    ) {
      ctx.strokeText(
        battleInfo.attackType,
        playerPosition[0].x,
        playerPosition[0].y - 20,
        50,
      );
    } else {
      ctx.strokeText(
        battleInfo.damage,
        playerPosition[0].x,
        playerPosition[0].y - 20,
        50,
      );
    }

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    palette = quantize(imageData.data, 256, { format: 'rgb333' });
    imageIndex = applyPalette(imageData.data, palette);
    gif.writeFrame(
      imageIndex,
      canvas.width,
      canvas.height,
      {
        palette,
        delay: 200,
        repeat: -1,
      },
    );

    console.log('Render Frame #7');
    drawBackground(
      ctx,
      canvas,
      backgroundImage,
    );

    drawUserBuffs(
      ctx, // Ctx drawing canvas
      userState, // User Object
      buffImages, // image array of player images
    );

    playerPosition[0] = drawPlayer(
      ctx, // Ctx drawing canvas
      playerImage, // image array of player images
      0, // number of image in the array to show
      false, // user attacking [false || enemyImagePosition]
    );
    for (const [i, battleMonster] of BattleMonsters.entries()) {
      if (battleMonster.currentHp > 0) {
        enemyPosition[i] = drawEnemy(
          ctx, // CTX
          BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
          currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
          enemies[battleMonster.id], // Enemy Image
          debuffImages,
          battleMonster.id === battleInfo.monsterId, // Moved To user?
          battleMonster.id === battleInfo.monsterId ? 2 : 0, // Enemy Image Frame Shown
          playerPosition[0], // PlayerCords
          i, // Index
        );
      }
    }
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbs[index + 1],
      mpOrbs[1],
    );
    drawBattleLog(
      ctx,
      battleLogs,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    if (
      battleInfo.attackType === 'Blocked'
      || battleInfo.attackType === 'Parried'
      || battleInfo.attackType === 'Missed'
    ) {
      ctx.strokeText(
        battleInfo.attackType,
        playerPosition[0].x,
        playerPosition[0].y - 20,
        50,
      );
    } else {
      ctx.strokeText(
        battleInfo.damage,
        playerPosition[0].x,
        playerPosition[0].y - 20,
        50,
      );
    }

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    palette = quantize(imageData.data, 256, { format: 'rgb333' });
    imageIndex = applyPalette(imageData.data, palette);
    gif.writeFrame(
      imageIndex,
      canvas.width,
      canvas.height,
      {
        palette,
        delay: 200,
        repeat: -1,
      },
    );
    console.log('Render Frame #8');
    drawBackground(
      ctx,
      canvas,
      backgroundImage,
    );

    drawUserBuffs(
      ctx, // Ctx drawing canvas
      userState, // User Object
      buffImages, // image array of player images
    );

    playerPosition[0] = drawPlayer(
      ctx, // Ctx drawing canvas
      playerImage, // image array of player images
      0, // number of image in the array to show
      false, // user attacking [false || enemyImagePosition]
    );
    for (const [i, battleMonster] of BattleMonsters.entries()) {
      if (battleMonster.currentHp > 0) {
        enemyPosition[i] = drawEnemy(
          ctx, // CTX
          BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
          currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
          enemies[battleMonster.id], // Enemy Image
          debuffImages,
          battleMonster.id === battleInfo.monsterId, // Moved To user?
          battleMonster.id === battleInfo.monsterId ? 0 : 0, // Enemy Image Frame Shown
          playerPosition[0], // PlayerCords
          i, // Index
        );
      }
    }
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbs[index + 1],
      mpOrbs[1],
    );
    drawBattleLog(
      ctx,
      battleLogs,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    if (
      battleInfo.attackType === 'Blocked'
      || battleInfo.attackType === 'Parried'
      || battleInfo.attackType === 'Missed'
    ) {
      ctx.strokeText(
        battleInfo.attackType,
        playerPosition[0].x,
        playerPosition[0].y - 20,
        50,
      );
    } else {
      ctx.strokeText(
        battleInfo.damage,
        playerPosition[0].x,
        playerPosition[0].y - 20,
        50,
      );
    }

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    palette = quantize(imageData.data, 256, { format: 'rgb333' });
    imageIndex = applyPalette(imageData.data, palette);
    gif.writeFrame(
      imageIndex,
      canvas.width,
      canvas.height,
      {
        palette,
        delay: 200,
        repeat: -1,
      },
    );
    console.log('Render Frame #9');
    drawBackground(
      ctx,
      canvas,
      backgroundImage,
    );

    drawUserBuffs(
      ctx, // Ctx drawing canvas
      userState, // User Object
      buffImages, // image array of player images
    );

    playerPosition[0] = drawPlayer(
      ctx, // Ctx drawing canvas
      playerImage, // image array of player images
      0, // number of image in the array to show
      false, // user attacking [false || enemyImagePosition]
    );
    for (const [i, battleMonster] of BattleMonsters.entries()) {
      if (battleMonster.currentHp > 0) {
        enemyPosition[i] = drawEnemy(
          ctx, // CTX
          BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
          currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
          enemies[battleMonster.id], // Enemy Image
          debuffImages,
          false, // Moved To user?
          0, // Enemy Image Frame Shown
          playerPosition[0], // PlayerCords
          i, // Index
        );
      }
    }
    drawBattleScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbs[index + 1],
      mpOrbs[1],
    );
    drawBattleLog(
      ctx,
      battleLogs,
    );

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    palette = quantize(imageData.data, 256, { format: 'rgb333' });
    imageIndex = applyPalette(imageData.data, palette);
    gif.writeFrame(
      imageIndex,
      canvas.width,
      canvas.height,
      {
        palette,
        delay: 300,
        repeat: -1,
      },
    );
  }

  if (retaliationInfoArray && retaliationInfoArray.length > 0) {
    for (const [index, retaliationInfo] of retaliationInfoArray.entries()) {
      drawBackground(
        ctx,
        canvas,
        backgroundImage,
      );

      drawUserBuffs(
        ctx, // Ctx drawing canvas
        userState, // User Object
        buffImages, // image array of player images
      );

      playerPosition[0] = drawPlayer(
        ctx, // Ctx drawing canvas
        playerImage, // image array of player images
        0, // number of image in the array to show
        false, // user attacking [false || enemyImagePosition]
      );
      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            playerPosition, // PlayerCords
            i, // Index
          );
        }
      }

      drawBattleScreenTools(
        ctx, // pass canvas ctx
        mainSkill,
        secondarySkill,
        hpOrbs[hpOrbs.length - 1],
        mpOrbs[mpOrbs.length - 1],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      palette = quantize(imageData.data, 256, { format: 'rgb333' });
      imageIndex = applyPalette(imageData.data, palette);
      gif.writeFrame(
        imageIndex,
        canvas.width,
        canvas.height,
        {
          palette,
          delay: 600,
          repeat: -1,
        },
      );

      console.log('Render Frame #2');
      drawBackground(
        ctx,
        canvas,
        backgroundImage,
      );

      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            playerPosition, // PlayerCords
            i, // Index
            // findUpdatedMonsterState,
          );
        }
      }

      drawUserBuffs(
        ctx, // Ctx drawing canvas
        userState, // User Object
        buffImages, // image array of player images
      );

      const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === stageOneInfoArray[0].monsterId);
      // console.log('find enemy position after');
      // console.log(findAttackedEnemyByUser);
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
        hpOrbs[hpOrbs.length - 1],
        mpOrbs[mpOrbs.length - 1],
      );

      battleLogs.unshift(...retaliationInfo.battleLogs);

      BattleMonsters = BattleMonsters.map((obj) => retaliationInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      // console.log('before looping monsters');
      for (const monsterToUpdate of retaliationInfo.monstersToUpdate) {
        // console.log(monsterToUpdate);
        // console.log(enemyPosition);
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.strokeText(
          monsterToUpdate.userDamage,
          monsterToUpdatePosition.x,
          monsterToUpdatePosition.y - 20,
          50,
        );
      }

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      palette = quantize(imageData.data, 256, { format: 'rgb333' });
      imageIndex = applyPalette(imageData.data, palette);
      gif.writeFrame(
        imageIndex,
        canvas.width,
        canvas.height,
        {
          palette,
          delay: 200,
          repeat: -1,
        },
      );

      console.log('Render Frame #3');
      drawBackground(
        ctx,
        canvas,
        backgroundImage,
      );

      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            playerPosition, // PlayerCords
            i, // Index
          );
        }
      }

      drawUserBuffs(
        ctx, // Ctx drawing canvas
        userState, // User Object
        buffImages, // image array of player images
      );

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
        hpOrbs[hpOrbs.length - 1],
        mpOrbs[mpOrbs.length - 1],
      );

      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      for (const monsterToUpdate of retaliationInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.strokeText(
          monsterToUpdate.userDamage,
          monsterToUpdatePosition.x,
          monsterToUpdatePosition.y - 20,
          50,
        );
      }

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      palette = quantize(imageData.data, 256, { format: 'rgb333' });
      imageIndex = applyPalette(imageData.data, palette);
      gif.writeFrame(
        imageIndex,
        canvas.width,
        canvas.height,
        {
          palette,
          delay: 600,
          repeat: -1,
        },
      );

      console.log('Render Frame #4');
      drawBackground(
        ctx,
        canvas,
        backgroundImage,
      );

      drawUserBuffs(
        ctx, // Ctx drawing canvas
        userState, // User Object
        buffImages, // image array of player images
      );

      playerPosition[0] = drawPlayer(
        ctx, // Ctx drawing canvas
        playerImage, // image array of player images
        0, // number of image in the array to show
        false, // user attacking [false || enemyImagePosition]
      );

      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            playerPosition, // PlayerCords
            i, // Index
          );
        }
      }

      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[hpOrbs.length - 1],
        mpOrbs[mpOrbs.length - 1],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      for (const monsterToUpdate of retaliationInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.strokeText(
          monsterToUpdate.userDamage,
          monsterToUpdatePosition.x,
          monsterToUpdatePosition.y - 20,
          50,
        );
      }

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      palette = quantize(imageData.data, 256, { format: 'rgb333' });
      imageIndex = applyPalette(imageData.data, palette);
      gif.writeFrame(
        imageIndex,
        canvas.width,
        canvas.height,
        {
          palette,
          delay: 400,
          repeat: -1,
        },
      );

      console.log('Render Frame #4');
      drawBackground(
        ctx,
        canvas,
        backgroundImage,
      );

      drawUserBuffs(
        ctx, // Ctx drawing canvas
        userState, // User Object
        buffImages, // image array of player images
      );

      playerPosition[0] = drawPlayer(
        ctx, // Ctx drawing canvas
        playerImage, // image array of player images
        0, // number of image in the array to show
        false, // user attacking [false || enemyImagePosition]
      );

      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            playerPosition, // PlayerCords
            i, // Index
          );
        }
      }

      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[hpOrbs.length - 1],
        mpOrbs[mpOrbs.length - 1],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      palette = quantize(imageData.data, 256, { format: 'rgb333' });
      imageIndex = applyPalette(imageData.data, palette);
      gif.writeFrame(
        imageIndex,
        canvas.width,
        canvas.height,
        {
          palette,
          delay: 400,
          repeat: -1,
        },
      );
    }
  }

  // Apply Debuff Damage
  if (debuffDamageInfoArray && debuffDamageInfoArray.length > 0) {
    for (const [index, debuffDamageInfo] of debuffDamageInfoArray.entries()) {
      drawBackground(
        ctx,
        canvas,
        backgroundImage,
      );
      drawUserBuffs(
        ctx, // Ctx drawing canvas
        userState, // User Object
        buffImages, // image array of player images
      );
      playerPosition[0] = drawPlayer(
        ctx, // Ctx drawing canvas
        playerImage, // image array of player images
        0, // number of image in the array to show
        false, // user attacking [false || enemyImagePosition]
      );
      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            playerPosition, // PlayerCords
            i, // Index
          );
        }
      }

      drawBattleScreenTools(
        ctx, // pass canvas ctx
        mainSkill,
        secondarySkill,
        hpOrbs[hpOrbs.length - 1],
        mpOrbs[mpOrbs.length - 1],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      palette = quantize(imageData.data, 256, { format: 'rgb333' });
      imageIndex = applyPalette(imageData.data, palette);
      gif.writeFrame(
        imageIndex,
        canvas.width,
        canvas.height,
        {
          palette,
          delay: 600,
          repeat: -1,
        },
      );

      console.log('Render Frame #2 - 2');
      drawBackground(
        ctx,
        canvas,
        backgroundImage,
      );

      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          // const findUpdatedMonsterState = monsterInfo.find((element) => element.monsterId === battleMonster.id);
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            playerPosition, // PlayerCords
            i, // Index
            // findUpdatedMonsterState,
          );
        }
      }

      drawUserBuffs(
        ctx, // Ctx drawing canvas
        userState, // User Object
        buffImages, // image array of player images
      );

      // const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === debuffDamageInfo.monsterId);
      // console.log('find enemy position after');
      // console.log(findAttackedEnemyByUser);
      playerPosition[0] = drawPlayer(
        ctx, // Ctx drawing canvas
        playerImage, // image array of player images
        0, // number of image in the array to show
        false, // user attacking [false || enemyImagePosition]
      );

      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[hpOrbs.length - 1],
        mpOrbs[mpOrbs.length - 1],
      );

      battleLogs.unshift(...debuffDamageInfo.battleLogs);

      BattleMonsters = BattleMonsters.map((obj) => debuffDamageInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      // console.log('before looping monsters');
      for (const monsterToUpdate of debuffDamageInfo.monstersToUpdate) {
        console.log(monsterToUpdate);
        // console.log(monsterToUpdate);
        // console.log(enemyPosition);
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        console.log(monsterToUpdatePosition);
        console.log('123');
        ctx.strokeText(
          monsterToUpdate.userDamage,
          monsterToUpdatePosition.x,
          monsterToUpdatePosition.y - 20,
          50,
        );
      }

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      palette = quantize(imageData.data, 256, { format: 'rgb333' });
      imageIndex = applyPalette(imageData.data, palette);
      gif.writeFrame(
        imageIndex,
        canvas.width,
        canvas.height,
        {
          palette,
          delay: 200,
          repeat: -1,
        },
      );

      console.log('Render Frame #3');
      drawBackground(
        ctx,
        canvas,
        backgroundImage,
      );

      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            playerPosition, // PlayerCords
            i, // Index
          );
        }
      }

      drawUserBuffs(
        ctx, // Ctx drawing canvas
        userState, // User Object
        buffImages, // image array of player images
      );

      playerPosition[0] = drawPlayer(
        ctx, // Ctx drawing canvas
        playerImage, // image array of player images
        0, // number of image in the array to show
        false, // user attacking [false || enemyImagePosition]
      );

      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[hpOrbs.length - 1],
        mpOrbs[mpOrbs.length - 1],
      );

      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      for (const monsterToUpdate of debuffDamageInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.strokeText(
          monsterToUpdate.userDamage,
          monsterToUpdatePosition.x,
          monsterToUpdatePosition.y - 20,
          50,
        );
      }

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      palette = quantize(imageData.data, 256, { format: 'rgb333' });
      imageIndex = applyPalette(imageData.data, palette);
      gif.writeFrame(
        imageIndex,
        canvas.width,
        canvas.height,
        {
          palette,
          delay: 600,
          repeat: -1,
        },
      );

      console.log('Render Frame #4');
      drawBackground(
        ctx,
        canvas,
        backgroundImage,
      );

      drawUserBuffs(
        ctx, // Ctx drawing canvas
        userState, // User Object
        buffImages, // image array of player images
      );

      playerPosition[0] = drawPlayer(
        ctx, // Ctx drawing canvas
        playerImage, // image array of player images
        0, // number of image in the array to show
        false, // user attacking [false || enemyImagePosition]
      );

      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            playerPosition, // PlayerCords
            i, // Index
          );
        }
      }

      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[hpOrbs.length - 1],
        mpOrbs[mpOrbs.length - 1],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      for (const monsterToUpdate of debuffDamageInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.strokeText(
          monsterToUpdate.userDamage,
          monsterToUpdatePosition.x,
          monsterToUpdatePosition.y - 20,
          50,
        );
      }

      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      palette = quantize(imageData.data, 256, { format: 'rgb333' });
      imageIndex = applyPalette(imageData.data, palette);
      gif.writeFrame(
        imageIndex,
        canvas.width,
        canvas.height,
        {
          palette,
          delay: 400,
          repeat: -1,
        },
      );

      console.log('Render Frame #4 Debuff');
      drawBackground(
        ctx,
        canvas,
        backgroundImage,
      );

      drawUserBuffs(
        ctx, // Ctx drawing canvas
        userState, // User Object
        buffImages, // image array of player images
      );

      console.log('Render Frame #4 Debuff2');
      playerPosition[0] = drawPlayer(
        ctx, // Ctx drawing canvas
        playerImage, // image array of player images
        0, // number of image in the array to show
        false, // user attacking [false || enemyImagePosition]
      );
      console.log('Render Frame #4 Debuff3');
      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            false, // PlayerCords
            i, // Index
          );
        }
      }
      console.log('Render Frame #4 Debuff4');

      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[hpOrbs.length - 1],
        mpOrbs[mpOrbs.length - 1],
      );
      console.log('Render Frame #4 Debuff5');
      drawBattleLog(
        ctx,
        battleLogs,
      );
      console.log('Render Frame #4 Debuff6');
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      palette = quantize(imageData.data, 256, { format: 'rgb333' });
      imageIndex = applyPalette(imageData.data, palette);
      gif.writeFrame(
        imageIndex,
        canvas.width,
        canvas.height,
        {
          palette,
          delay: 400,
          repeat: -1,
        },
      );
    }
  }

  console.log('Render Frame #4 Debuff7');
  gif.finish();
  const bytes = gif.bytesView();
  const finalImage = Buffer.from(bytes);
  return finalImage;
};
