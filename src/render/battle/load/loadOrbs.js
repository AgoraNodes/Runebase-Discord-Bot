/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  loadImage,
} from 'canvas';
import { renderHpOrb } from '../../orbs/hp';
import { renderMpOrb } from '../../orbs/mp';

export const loadOrbs = async (
  initialUserState,
  stageOneInfoArray,
  stageTwoInfoArray,
  stageThreeInfoArray,
  stageFourInfoArray,
  stageFiveInfoArray,
  orbsStartingPositionStageOne,
  orbsStartingPositionStageTwo,
  orbsStartingPositionStageThree,
  orbsStartingPositionStageFour,
  orbsStartingPositionStageFive,
) => {
  const promises = [];
  const bufferPromises = [];
  const hpOrbsBuffer = [];
  const mpOrbsBuffer = [];
  const hpOrbs = [];
  const mpOrbs = [];

  bufferPromises.push(
    new Promise((resolve, reject) => {
      renderHpOrb(
        initialUserState.hp.current,
        initialUserState.hp.max,
      ).then((buffer) => {
        hpOrbsBuffer[0] = buffer;
        resolve();
      });
    }),
  );

  bufferPromises.push(
    new Promise((resolve, reject) => {
      renderMpOrb(
        initialUserState.mp.current,
        initialUserState.mp.max,
      ).then((buffer) => {
        mpOrbsBuffer[0] = buffer;
        resolve();
      });
    }),
  );

  if (stageOneInfoArray) {
    for (const [index, info] of stageOneInfoArray.entries()) {
      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderMpOrb(
            info.userState.mp.current,
            info.userState.mp.max,
          ).then((buffer) => {
            mpOrbsBuffer[index + orbsStartingPositionStageOne] = buffer;
            resolve();
          });
        }),
      );

      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderHpOrb(
            info.userState.hp.current,
            info.userState.hp.max,
          ).then((buffer) => {
            hpOrbsBuffer[index + orbsStartingPositionStageOne] = buffer;
            resolve();
          });
        }),
      );
    }
  }

  if (stageTwoInfoArray) {
    for (const [index, info] of stageTwoInfoArray.entries()) {
      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderMpOrb(
            info.userState.mp.current,
            info.userState.mp.max,
          ).then((buffer) => {
            mpOrbsBuffer[index + orbsStartingPositionStageTwo] = buffer;
            resolve();
          });
        }),
      );

      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderHpOrb(
            info.userState.hp.current,
            info.userState.hp.max,
          ).then((buffer) => {
            hpOrbsBuffer[index + orbsStartingPositionStageTwo] = buffer;
            resolve();
          });
        }),
      );
    }
  }

  if (stageThreeInfoArray) {
    for (const [index, info] of stageThreeInfoArray.entries()) {
      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderMpOrb(
            info.userState.mp.current,
            info.userState.mp.max,
          ).then((buffer) => {
            mpOrbsBuffer[index + orbsStartingPositionStageThree] = buffer;
            resolve();
          });
        }),
      );

      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderHpOrb(
            info.userState.hp.current,
            info.userState.hp.max,
          ).then((buffer) => {
            hpOrbsBuffer[index + orbsStartingPositionStageThree] = buffer;
            resolve();
          });
        }),
      );
    }
  }

  if (stageFourInfoArray) {
    for (const [index, info] of stageFourInfoArray.entries()) {
      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderMpOrb(
            info.userState.mp.current,
            info.userState.mp.max,
          ).then((buffer) => {
            mpOrbsBuffer[index + orbsStartingPositionStageFour] = buffer;
            resolve();
          });
        }),
      );

      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderHpOrb(
            info.userState.hp.current,
            info.userState.hp.max,
          ).then((buffer) => {
            hpOrbsBuffer[index + orbsStartingPositionStageFour] = buffer;
            resolve();
          });
        }),
      );
    }
  }

  if (stageFiveInfoArray) {
    for (const [index, info] of stageFiveInfoArray.entries()) {
      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderMpOrb(
            info.userState.mp.current,
            info.userState.mp.max,
          ).then((buffer) => {
            mpOrbsBuffer[index + orbsStartingPositionStageFive] = buffer;
            resolve();
          });
        }),
      );

      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderHpOrb(
            info.userState.hp.current,
            info.userState.hp.max,
          ).then((buffer) => {
            hpOrbsBuffer[index + orbsStartingPositionStageFive] = buffer;
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
  // console.log('before promise wait');
  await Promise.all(promises);

  return [
    hpOrbs,
    mpOrbs,
  ];
};
