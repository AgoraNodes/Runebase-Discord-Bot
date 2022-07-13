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
  initialUserState, // The initial UserState
  userCurrentSelectedSkills, // The Selected User Skills
  previousBattleState, // The previous battle state
  currentSelectedMonster, // Selected monster
  stageZeroInfoArray = false, // User Attacking Enemy
  stageOneInfoArray = false, // User Attacking Enemy
  stageTwoInfoArray = false, // Enemies attacking the user
  stageThreeInfoArray = false, // User Retaliating
  stageFourInfoArray = false, // Applying Debuff damage on enemies
  stageFiveInfoArray = false, // Count Down Buffs and Debuffs at near end of round
  stageSixInfoArray = false, // Stage 6 After Round User Effects (example: userHeal each Round)
  stageSevenInfoArray = false, // (Battle Complete effects) (Mana/Health REGEN)
) => {
  let userState = initialUserState;
  const zone = 'den';
  const enemyPosition = [];
  const playerPosition = [];
  const enemies = [];
  const buffImages = [];
  const debuffImages = [];
  const effectImages = [];
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
  console.log('1');

  const orbsStartingPositionStageZero = 1;
  const orbsStartingPositionStageOne = 1
    + stageZeroInfoArray.length;
  const orbsStartingPositionStageTwo = 1
    + stageZeroInfoArray.length
    + stageOneInfoArray.length;
  const orbsStartingPositionStageThree = 1
    + stageZeroInfoArray.length
    + stageOneInfoArray.length
    + stageTwoInfoArray.length;
  const orbsStartingPositionStageFour = 1
    + stageZeroInfoArray.length
    + stageOneInfoArray.length
    + stageTwoInfoArray.length
    + stageThreeInfoArray.length;
  const orbsStartingPositionStageFive = 1
    + stageZeroInfoArray.length
    + stageOneInfoArray.length
    + stageTwoInfoArray.length
    + stageThreeInfoArray.length
    + stageFourInfoArray.length;
  const orbsStartingPositionStageSix = 1
    + stageZeroInfoArray.length
    + stageOneInfoArray.length
    + stageTwoInfoArray.length
    + stageThreeInfoArray.length
    + stageFourInfoArray.length
    + stageFiveInfoArray.length;
  const orbsStartingPositionStageSeven = 1
    + stageZeroInfoArray.length
    + stageOneInfoArray.length
    + stageTwoInfoArray.length
    + stageThreeInfoArray.length
    + stageFourInfoArray.length
    + stageFiveInfoArray.length
    + stageSixInfoArray.length;
  console.log('2');
  // Figure out a way to better load all of the battle effects without loading every single one
  // Maybe additional array comming from battle processor with all of the effects fired during processing
  loadPromises.push(
    new Promise((resolve, reject) => {
      loadImage(path.join(
        __dirname,
        `../../assets/images/battle/effects`,
        `stun.png`,
      )).then((image) => {
        effectImages.stunned = image;
        resolve();
      });
    }),
  );

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
  console.log(3);
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
  console.log('4');
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
  console.log('5');
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
  console.log('6');
  if (stageTwoInfoArray && stageTwoInfoArray.length > 0) {
    for (const [i, buff] of stageTwoInfoArray[stageTwoInfoArray.length - 1].userState.buffs.entries()) {
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
  }
  console.log('7');
  if (stageOneInfoArray && stageOneInfoArray.length > 0) {
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
  }
  console.log('7');
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
  console.log('8');
  loadPromises.push(
    new Promise((resolve, reject) => {
      loadOrbs(
        userState,
        stageZeroInfoArray,
        stageOneInfoArray,
        stageTwoInfoArray,
        stageThreeInfoArray,
        stageFourInfoArray,
        stageFiveInfoArray,
        stageSixInfoArray,
        stageSevenInfoArray,
        orbsStartingPositionStageZero,
        orbsStartingPositionStageOne,
        orbsStartingPositionStageTwo,
        orbsStartingPositionStageThree,
        orbsStartingPositionStageFour,
        orbsStartingPositionStageFive,
        orbsStartingPositionStageSix,
        orbsStartingPositionStageSeven,
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
  console.log('10');
  const canvas = createCanvas(650, 300);
  const ctx = canvas.getContext('2d');
  const gif = GIFEncoder();

  // One Frame To Start Gif (Resting Frame) (Battle Init screen)
  // PreStages
  console.log('Render PreStage # -1');
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
        effectImages,
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

  // Render Stage 0
  console.log('Render Stage #0');
  if (stageZeroInfoArray && stageZeroInfoArray.length > 0) {
    for (const [indexs, stageZeroInfo] of stageZeroInfoArray.entries()) {
      userState = stageZeroInfo.userState;
      battleLogs.unshift(...stageZeroInfo.battleLogs);
      BattleMonsters = BattleMonsters.map((obj) => stageZeroInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

      for (const monsterToUpdate of stageZeroInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        for (const [index, stageZeroInfoEffect] of monsterToUpdate.effects.entries()) {
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
                effectImages,
                false, // Moved To user?
                0, // Enemy Image Frame Shown
                playerPosition, // PlayerCords
                i, // Index
                false, // findUpdatedMonsterState,
              );
            }
          }
          drawUserBuffs(
            ctx, // Ctx drawing canvas
            userState, // User Object
            buffImages, // image array of player images
          );

          // Find enemy position to move to for close ranged attacks (unused for now in effects)
          // const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === stageZeroInfo.monsterId);

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
            hpOrbs[orbsStartingPositionStageZero + indexs],
            mpOrbs[orbsStartingPositionStageZero + indexs],
          );

          drawBattleLog(
            ctx,
            battleLogs,
          );
          ctx.lineWidth = 1;
          ctx.font = 'bold 13px "HeartWarming"';
          ctx.fillStyle = 'red';
          for (const monsterToUpdate of stageZeroInfo.monstersToUpdate) {
            const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
            ctx.fillText(
              stageZeroInfoEffect,
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
              delay: 300,
              repeat: -1,
            },
          );

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
                effectImages,
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

          drawUserBuffs(
            ctx, // Ctx drawing canvas
            userState, // User Object
            buffImages, // image array of player images
          );

          drawBattleScreenTools(
            ctx,
            mainSkill,
            secondarySkill,
            hpOrbs[orbsStartingPositionStageZero + indexs],
            mpOrbs[orbsStartingPositionStageZero + indexs],
          );

          drawBattleLog(
            ctx,
            battleLogs,
          );
          ctx.lineWidth = 1;
          ctx.font = 'bold 13px "HeartWarming"';
          ctx.fillStyle = 'red';
          for (const monsterToUpdate of stageZeroInfo.monstersToUpdate) {
            const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
            ctx.fillText(
              stageZeroInfoEffect,
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
        }
      }
    }
  }

  console.log('Render Stage #1');
  // Render Stage One
  if (stageOneInfoArray && stageOneInfoArray.length > 0) {
    for (const [index, stageOneInfo] of stageOneInfoArray.entries()) {
      console.log(stageOneInfo.monstersToUpdate);
      userState = stageOneInfo.userState;
      battleLogs.unshift(...stageOneInfo.battleLogs);
      BattleMonsters = BattleMonsters.map((obj) => stageOneInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

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
            effectImages,
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

      const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === stageOneInfo.monsterId);
      // console.log('find enemy position after');
      // console.log(findAttackedEnemyByUser);
      playerPosition[0] = drawPlayer(
        ctx, // Ctx drawing canvas
        playerImage, // image array of player images
        0, // number of image in the array to show
        stageOneInfo.useAttack.ranged ? false : findAttackedEnemyByUser, // user attacking [false || enemyImagePosition]
      );

      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[orbsStartingPositionStageOne + index],
        mpOrbs[orbsStartingPositionStageOne + index],
      );

      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      for (const monsterToUpdate of stageOneInfo.monstersToUpdate) {
        // console.log(monsterToUpdate);
        // console.log(enemyPosition);
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.fillText(
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
            effectImages,
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
        hpOrbs[orbsStartingPositionStageOne + index],
        mpOrbs[orbsStartingPositionStageOne + index],
      );

      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      for (const monsterToUpdate of stageOneInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.fillText(
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
            effectImages,
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
        hpOrbs[orbsStartingPositionStageOne + index],
        mpOrbs[orbsStartingPositionStageOne + index],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      for (const monsterToUpdate of stageOneInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.fillText(
          monsterToUpdate.userDamage,
          monsterToUpdatePosition.x,
          monsterToUpdatePosition.y - 20,
          50,
        );
      }

      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'green';
      if (
        stageOneInfo.receivedHeal
      ) {
        ctx.fillText(
          `+${stageOneInfo.receivedHeal}`,
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
          delay: 600,
          repeat: -1,
        },
      );
    }
  }

  console.log('Render Stage #2');
  // Render Stage Two
  if (stageTwoInfoArray && stageTwoInfoArray.length > 0) {
    for (const [index, stageTwoInfo] of stageTwoInfoArray.entries()) {
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

      console.log('|1');
      playerPosition[0] = drawPlayer(
        ctx, // Ctx drawing canvas
        playerImage, // image array of player images
        0, // number of image in the array to show
        false, // user attacking [false || enemyImagePosition]
      );
      console.log('|2');

      for (const [i, battleMonster] of BattleMonsters.entries()) {
        if (battleMonster.currentHp > 0) {
          enemyPosition[i] = drawEnemy(
            ctx, // CTX
            BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
            currentSelectedMonster && currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
            enemies[battleMonster.id], // Enemy Image
            debuffImages,
            effectImages,
            battleMonster.id === stageTwoInfo.monsterId, // Moved To user?
            battleMonster.id === stageTwoInfo.monsterId ? 0 : 0, // Enemy Image Frame Shown
            playerPosition[0], // PlayerCords
            i, // Index
          );
        }
      }
      console.log('|3');
      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[index + orbsStartingPositionStageTwo],
        mpOrbs[index + orbsStartingPositionStageTwo],
      );
      console.log('|4');
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
            effectImages,
            battleMonster.id === stageTwoInfo.monsterId, // Moved To user?
            battleMonster.id === stageTwoInfo.monsterId ? 1 : 0, // Enemy Image Frame Shown
            playerPosition[0], // PlayerCords
            i, // Index
          );
        }
      }

      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[index + orbsStartingPositionStageTwo],
        mpOrbs[index + orbsStartingPositionStageTwo],
      );

      console.log(stageTwoInfo.monstersToUpdate);
      userState = stageTwoInfo.userState;
      battleLogs.unshift(...stageTwoInfo.battleLogs);
      BattleMonsters = BattleMonsters.map((obj) => stageTwoInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      if (
        stageTwoInfo.attackType === 'Blocked'
        || stageTwoInfo.attackType === 'Parried'
        || stageTwoInfo.attackType === 'Missed'
      ) {
        ctx.fillText(
          stageTwoInfo.attackType,
          playerPosition[0].x,
          playerPosition[0].y - 20,
          50,
        );
      } else {
        ctx.fillText(
          stageTwoInfo.damage,
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
            effectImages,
            battleMonster.id === stageTwoInfo.monsterId, // Moved To user?
            battleMonster.id === stageTwoInfo.monsterId ? 2 : 0, // Enemy Image Frame Shown
            playerPosition[0], // PlayerCords
            i, // Index
          );
        }
      }
      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[index + orbsStartingPositionStageTwo],
        mpOrbs[index + orbsStartingPositionStageTwo],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      if (
        stageTwoInfo.attackType === 'Blocked'
        || stageTwoInfo.attackType === 'Parried'
        || stageTwoInfo.attackType === 'Missed'
      ) {
        ctx.fillText(
          stageTwoInfo.attackType,
          playerPosition[0].x,
          playerPosition[0].y - 20,
          50,
        );
      } else {
        ctx.fillText(
          stageTwoInfo.damage,
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
            effectImages,
            battleMonster.id === stageTwoInfo.monsterId, // Moved To user?
            battleMonster.id === stageTwoInfo.monsterId ? 0 : 0, // Enemy Image Frame Shown
            playerPosition[0], // PlayerCords
            i, // Index
          );
        }
      }
      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[index + orbsStartingPositionStageTwo],
        mpOrbs[index + orbsStartingPositionStageTwo],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      if (
        stageTwoInfo.attackType === 'Blocked'
        || stageTwoInfo.attackType === 'Parried'
        || stageTwoInfo.attackType === 'Missed'
      ) {
        ctx.fillText(
          stageTwoInfo.attackType,
          playerPosition[0].x,
          playerPosition[0].y - 20,
          50,
        );
      } else {
        ctx.fillText(
          stageTwoInfo.damage,
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageTwo],
        mpOrbs[index + orbsStartingPositionStageTwo],
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
  }

  console.log('Render Stage #3');
  // Render Stage Three
  if (stageThreeInfoArray && stageThreeInfoArray.length > 0) {
    for (const [index, stageThreeInfo] of stageThreeInfoArray.entries()) {
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageThree],
        mpOrbs[index + orbsStartingPositionStageThree],
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
            effectImages,
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

      const findAttackedEnemyByUser = enemyPosition.find((element) => element && element.id === stageThreeInfo.monsterId);
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
        hpOrbs[index + orbsStartingPositionStageThree],
        mpOrbs[index + orbsStartingPositionStageThree],
      );

      userState = stageThreeInfo.userState;
      battleLogs.unshift(...stageThreeInfo.battleLogs);
      BattleMonsters = BattleMonsters.map((obj) => stageThreeInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

      drawBattleLog(
        ctx,
        battleLogs,
      );

      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      for (const monsterToUpdate of stageThreeInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.fillText(
          monsterToUpdate.userDamage,
          monsterToUpdatePosition.x,
          monsterToUpdatePosition.y - 20,
          50,
        );
      }
      console.log('Render Frame #2-8');
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageThree],
        mpOrbs[index + orbsStartingPositionStageThree],
      );

      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      for (const monsterToUpdate of stageThreeInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.fillText(
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageThree],
        mpOrbs[index + orbsStartingPositionStageThree],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      for (const monsterToUpdate of stageThreeInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.fillText(
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageThree],
        mpOrbs[index + orbsStartingPositionStageThree],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );

      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'green';
      if (
        stageThreeInfo.receivedHeal
      ) {
        ctx.fillText(
          `+${stageThreeInfo.receivedHeal}`,
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
          delay: 600,
          repeat: -1,
        },
      );
    }
  }

  console.log('Render Stage #4');
  // Render Stage Four
  // Apply Debuff Damage
  if (stageFourInfoArray && stageFourInfoArray.length > 0) {
    for (const [index, stageFourInfo] of stageFourInfoArray.entries()) {
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageFour],
        mpOrbs[index + orbsStartingPositionStageFour],
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageFour],
        mpOrbs[index + orbsStartingPositionStageFour],
      );

      userState = stageFourInfo.userState;
      battleLogs.unshift(...stageFourInfo.battleLogs);
      BattleMonsters = BattleMonsters.map((obj) => stageFourInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      // console.log('before looping monsters');
      for (const monsterToUpdate of stageFourInfo.monstersToUpdate) {
        console.log(monsterToUpdate);
        // console.log(monsterToUpdate);
        // console.log(enemyPosition);
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        console.log(monsterToUpdatePosition);
        console.log('123');
        ctx.fillText(
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageFour],
        mpOrbs[index + orbsStartingPositionStageFour],
      );

      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      for (const monsterToUpdate of stageFourInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.fillText(
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageFour],
        mpOrbs[index + orbsStartingPositionStageFour],
      );
      drawBattleLog(
        ctx,
        battleLogs,
      );
      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'red';
      for (const monsterToUpdate of stageFourInfo.monstersToUpdate) {
        const monsterToUpdatePosition = enemyPosition.find((element) => element && element.id === monsterToUpdate.id);
        ctx.fillText(
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
            effectImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            false, // PlayerCords
            i, // Index
          );
        }
      }

      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[index + orbsStartingPositionStageFour],
        mpOrbs[index + orbsStartingPositionStageFour],
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

  console.log('Render Stage #5');
  // Count Down Buffs And Debuffs
  if (stageFiveInfoArray && stageFiveInfoArray.length > 0) {
    for (const [index, stageFiveInfo] of stageFiveInfoArray.entries()) {
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageFive],
        mpOrbs[index + orbsStartingPositionStageFive],
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageFive],
        mpOrbs[index + orbsStartingPositionStageFive],
      );
      console.log(stageFiveInfo);
      userState = stageFiveInfo.userState;
      BattleMonsters = BattleMonsters.map((obj) => stageFiveInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

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
          delay: 200,
          repeat: -1,
        },
      );

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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageFive],
        mpOrbs[index + orbsStartingPositionStageFive],
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageFive],
        mpOrbs[index + orbsStartingPositionStageFive],
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
            effectImages,
            false, // Moved To user?
            0, // Enemy Image Frame Shown
            false, // PlayerCords
            i, // Index
          );
        }
      }

      drawBattleScreenTools(
        ctx,
        mainSkill,
        secondarySkill,
        hpOrbs[index + orbsStartingPositionStageFive],
        mpOrbs[index + orbsStartingPositionStageFive],
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

  console.log('Render Stage #7');
  // Count Down Buffs And Debuffs
  if (stageSevenInfoArray && stageSevenInfoArray.length > 0) {
    for (const [index, stageSevenInfo] of stageSevenInfoArray.entries()) {
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageSeven],
        mpOrbs[index + orbsStartingPositionStageSeven],
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageSeven],
        mpOrbs[index + orbsStartingPositionStageSeven],
      );
      // console.log(stageSevenInfo);
      userState = stageSevenInfo.userState;
      battleLogs.unshift(...stageSevenInfo.battleLogs);
      // BattleMonsters = BattleMonsters.map((obj) => stageSevenInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageSeven],
        mpOrbs[index + orbsStartingPositionStageSeven],
      );

      drawBattleLog(
        ctx,
        battleLogs,
      );

      ctx.lineWidth = 1;
      ctx.font = 'bold 13px "HeartWarming"';
      ctx.fillStyle = 'green';
      if (
        stageSevenInfo.receivedHeal
      ) {
        ctx.fillText(
          `+${stageSevenInfo.receivedHeal}`,
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
          delay: 500,
          repeat: -1,
        },
      );

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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageSeven],
        mpOrbs[index + orbsStartingPositionStageSeven],
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
            effectImages,
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
        hpOrbs[index + orbsStartingPositionStageSeven],
        mpOrbs[index + orbsStartingPositionStageSeven],
      );
      // console.log(stageSevenInfo);
      // userState = stageSevenInfo.userState;
      // battleLogs.unshift(...stageSevenInfo.battleLogs);
      // BattleMonsters = BattleMonsters.map((obj) => stageSevenInfo.monstersToUpdate.find((o) => o.id === obj.id) || obj);

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
  }

  gif.finish();
  const bytes = gif.bytesView();
  const finalImage = Buffer.from(bytes);
  return finalImage;
};
