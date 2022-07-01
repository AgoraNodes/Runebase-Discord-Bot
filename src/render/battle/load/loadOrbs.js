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
  const hpOrbsBuffer = [];
  const mpOrbsBuffer = [];
  const hpOrbs = [];
  const mpOrbs = [];
  const {
    hp,
    mp,
  } = await calculateCharacterStats(previousUserState);

  hpOrbsBuffer[0] = await renderHpOrb(
    hp.current,
    hp.max,
  );
  mpOrbsBuffer[0] = await renderMpOrb(
    mp.current,
    mp.max,
  );
  if (battleInfoArray) {
    for await (const [index, info] of battleInfoArray.entries()) {
      hpOrbsBuffer[index + 1] = await renderHpOrb(
        info.currentHp,
        hp.max,
      );
    }
  }
  if (monsterInfo) {
    for await (const [index, info] of monsterInfo.entries()) {
      mpOrbsBuffer[index + 1] = await renderMpOrb(
        info.currentUserMp,
        mp.max,
      );
    }
  }

  for await (const [index, buffer] of hpOrbsBuffer.entries()) {
    hpOrbs[index] = await loadImage(buffer);
  }
  for await (const [index, buffer] of mpOrbsBuffer.entries()) {
    mpOrbs[index] = await loadImage(buffer);
  }

  return [
    hpOrbs,
    mpOrbs,
  ];
};
