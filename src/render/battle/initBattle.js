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

import { drawBackground } from "./draw/drawBackground";
import { drawBattleLog } from './draw/drawBattleLog';
import { drawBattleScreenTools } from './draw/drawBattleScreenTools';
import { drawPlayer } from "./draw/drawPlayer";
import { drawEnemy } from './draw/drawEnemy';
import { drawUserBuffs } from './draw/drawUserBuffs';

export const renderInitBattleGif = async (
  currentUser,
  initialUserState,
  userCurrentSelectedSkills,
  battle,
  previousBattleState,
  currentSelectedMonster,
  battleInfoArray = false,
  monsterInfo = false,
  retaliationInfoArray = false,
  debuffDamageInfoArray = false,
) => {
  const zone = 'den';
  const enemies = [];
  const loadPromises = [];
  const debuffImages = [];
  const buffImages = [];
  const { battleLogs } = previousBattleState;
  let mainSkill;
  let secondarySkill;
  let backgroundImage;
  let playerImage;
  let hpOrbs;
  let mpOrbs;
  let imageData;
  let palette;
  let index;

  console.log('1');
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
  console.log('2');
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
  console.log('3');
  loadPromises.push(
    new Promise((resolve, reject) => {
      loadImage(path.join(__dirname, `../../assets/images/battle/background`, `${zone}.png`)).then((image) => {
        backgroundImage = image;
        resolve();
      });
    }),
  );
  console.log('4');
  loadPromises.push(
    new Promise((resolve, reject) => {
      loadPlayer(
        currentUser.class.name,
      ).then((image) => {
        playerImage = image;
        resolve();
      });
    }),
  );
  console.log('5');
  for (const [i, buff] of currentUser.buffs.entries()) {
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
  // console.log('initBattle 1');
  for (const [i, battleMonster] of battle.BattleMonsters.entries()) {
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
    console.log('7');
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
    console.log('8');
    for (const [i, buff] of battleMonster.buffs.entries()) {
      loadPromises.push(
        new Promise((resolve, reject) => {
          if (!debuffImages[buff.name]) {
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
  console.log('9');
  loadPromises.push(
    new Promise((resolve, reject) => {
      loadOrbs(
        initialUserState,
        battleInfoArray,
        monsterInfo,
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
  console.log('10');
  await Promise.all(loadPromises);
  // console.log('initBattle 4');

  const canvas = createCanvas(650, 300);
  const ctx = canvas.getContext('2d');
  const gif = GIFEncoder();

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

  drawUserBuffs(
    ctx, // Ctx drawing canvas
    currentUser, // User Object
    buffImages, // image array of player images
  );

  for (const [i, battleMonster] of battle.BattleMonsters.entries()) {
    if (battleMonster.currentHp > 0) {
      drawEnemy(
        ctx, // CTX
        previousBattleState.BattleMonsters.find((element) => element.id === battleMonster.id), // MonsterState
        currentSelectedMonster.id === battleMonster.id, // is current Monster selected?
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
  palette = quantize(imageData.data, 256);
  index = applyPalette(imageData.data, palette);
  gif.writeFrame(
    index,
    canvas.width,
    canvas.height,
    { palette },
  );

  gif.finish();
  const bytes = gif.bytes();
  const finalImage = Buffer.from(bytes);
  return finalImage;
};
