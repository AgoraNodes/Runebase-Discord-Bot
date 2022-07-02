/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  loadImage,
} from 'canvas';
import { renderHpOrb } from '../../orbs/hp';
import { renderMpOrb } from '../../orbs/mp';
import { calculateCharacterStats } from '../../../helpers/stats/calculateCharacterStats';

export const loadOrbs = async (
  previousUserState,
  battleInfoArray,
  monsterInfo,
) => {
  const promises = [];
  const bufferPromises = [];
  const hpOrbsBuffer = [];
  const mpOrbsBuffer = [];
  const hpOrbs = [];
  const mpOrbs = [];
  const {
    hp,
    mp,
  } = await calculateCharacterStats(previousUserState);

  bufferPromises.push(
    new Promise((resolve, reject) => {
      renderHpOrb(
        hp.current,
        hp.max,
      ).then((buffer) => {
        hpOrbsBuffer[0] = buffer;
        resolve();
      });
    }),
  );

  bufferPromises.push(
    new Promise((resolve, reject) => {
      renderMpOrb(
        mp.current,
        mp.max,
      ).then((buffer) => {
        mpOrbsBuffer[0] = buffer;
        resolve();
      });
    }),
  );

  if (battleInfoArray) {
    for (const [index, info] of battleInfoArray.entries()) {
      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderHpOrb(
            info.currentHp,
            hp.max,
          ).then((buffer) => {
            hpOrbsBuffer[index + 1] = buffer;
            resolve();
          });
        }),
      );
    }
  }
  if (monsterInfo) {
    for (const [index, info] of monsterInfo.entries()) {
      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderMpOrb(
            info.currentUserMp,
            mp.max,
          ).then((buffer) => {
            mpOrbsBuffer[index + 1] = buffer;
            resolve();
          });
        }),
      );
    }
  }
  await Promise.all(bufferPromises);

  for (const [index, buffer] of hpOrbsBuffer.entries()) {
    promises.push(
      new Promise((resolve, reject) => {
        loadImage(buffer).then((image) => {
          hpOrbs[index] = image;
          resolve();
        });
      }),
    );
  }
  for (const [index, buffer] of mpOrbsBuffer.entries()) {
    promises.push(
      new Promise((resolve, reject) => {
        loadImage(buffer).then((image) => {
          mpOrbs[index] = image;
          resolve();
        });
      }),
    );
  }
  console.log('before promise wait');
  await Promise.all(promises);

  return [
    hpOrbs,
    mpOrbs,
  ];
};
