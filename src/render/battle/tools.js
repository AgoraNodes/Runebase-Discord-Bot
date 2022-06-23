export const drawBattleScreenTools = async (
  ctx,
  mainSkill,
  secondarySkill,
  hpOrbImage,
  mpOrbImage,
) => {
  ctx.drawImage(
    mainSkill,
    66, // x position
    175, // y position
    hpOrbImage.width / 4,
    hpOrbImage.height / 4,
  );
  ctx.drawImage(
    secondarySkill,
    225, // x position
    175, // y position
    hpOrbImage.width / 4,
    hpOrbImage.height / 4,
  );
  ctx.drawImage(
    hpOrbImage,
    0, // x position
    132, // y position
    hpOrbImage.width / 1.5,
    hpOrbImage.height / 1.5,
  );
  ctx.drawImage(
    mpOrbImage,
    250, // x position
    132, // y position
    hpOrbImage.width / 1.5,
    hpOrbImage.height / 1.5,
  );
};
