/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  loadImage,
} from 'canvas';
import { renderHpOrb } from '../../orbs/hp';
import { renderMpOrb } from '../../orbs/mp';

export const loadOrbs = async (
  initialUserState,
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
) => {
  const promises = [];
  const bufferPromises = [];
  const hpOrbsBuffer = [];
  const mpOrbsBuffer = [];
  const hpOrbs = [];
  const mpOrbs = [];

  console.log(initialUserState.hp);
  console.log('orbs buffer start');
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
  console.log('orbs buffer 2');
  if (stageZeroInfoArray) {
    for (const [index, info] of stageZeroInfoArray.entries()) {
      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderMpOrb(
            info.userState.mp.current,
            info.userState.mp.max,
          ).then((buffer) => {
            mpOrbsBuffer[index + orbsStartingPositionStageZero] = buffer;
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
            hpOrbsBuffer[index + orbsStartingPositionStageZero] = buffer;
            resolve();
          });
        }),
      );
    }
  }
  console.log('orbs buffer 3');
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
  console.log('orbs buffer 4');
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
  console.log('orbs buffer 5');
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
  console.log('orbs buffer 6');
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
  console.log('orbs buffer 7');
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
  console.log('orbs buffer 8');
  if (stageSixInfoArray) {
    for (const [index, info] of stageSixInfoArray.entries()) {
      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderMpOrb(
            info.userState.mp.current,
            info.userState.mp.max,
          ).then((buffer) => {
            mpOrbsBuffer[index + orbsStartingPositionStageSix] = buffer;
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
            hpOrbsBuffer[index + orbsStartingPositionStageSix] = buffer;
            resolve();
          });
        }),
      );
    }
  }
  console.log('orbs buffer 9');
  if (stageSevenInfoArray) {
    for (const [index, info] of stageSevenInfoArray.entries()) {
      bufferPromises.push(
        new Promise((resolve, reject) => {
          renderMpOrb(
            info.userState.mp.current,
            info.userState.mp.max,
          ).then((buffer) => {
            mpOrbsBuffer[index + orbsStartingPositionStageSeven] = buffer;
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
            hpOrbsBuffer[index + orbsStartingPositionStageSeven] = buffer;
            resolve();
          });
        }),
      );
    }
  }
  console.log('orbs buffer 10');
  await Promise.all(bufferPromises);
  console.log('orbs buffer 11');
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
  console.log('orbs buffer 12');
  // console.log('before promise wait');
  await Promise.all(promises);
  console.log('done orbs');
  return [
    hpOrbs,
    mpOrbs,
  ];
};
