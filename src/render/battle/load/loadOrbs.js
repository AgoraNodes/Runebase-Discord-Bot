import {
  loadImage,
} from 'canvas';
import { renderHpOrb } from '../../orbs/hp';
import { renderMpOrb } from '../../orbs/mp';

export const loadOrbs = async (
  previousUserState,
  currentUser,
) => {
  const hpOrbBufferPrevious = await renderHpOrb(
    previousUserState,
  );
  const mpOrbBufferPrevious = await renderMpOrb(
    previousUserState,
  );
  const hpOrbBuffer = await renderHpOrb(
    currentUser,
  );
  const mpOrbBuffer = await renderMpOrb(
    currentUser,
  );
  const hpOrbImage = await loadImage(hpOrbBuffer);
  const mpOrbImage = await loadImage(mpOrbBuffer);
  const hpOrbImagePrevious = await loadImage(hpOrbBufferPrevious);
  const mpOrbImagePrevious = await loadImage(mpOrbBufferPrevious);
  return [
    hpOrbImage,
    mpOrbImage,
    hpOrbImagePrevious,
    mpOrbImagePrevious,
  ];
};
