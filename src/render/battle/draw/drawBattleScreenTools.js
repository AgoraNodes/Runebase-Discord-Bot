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
    275, // y position
    hpOrbImage.width / 4,
    hpOrbImage.height / 4,
  );
  ctx.drawImage(
    secondarySkill,
    325, // x position
    275, // y position
    hpOrbImage.width / 4,
    hpOrbImage.height / 4,
  );
  ctx.drawImage(
    hpOrbImage,
    0, // x position
    232, // y position
    hpOrbImage.width / 1.5,
    hpOrbImage.height / 1.5,
  );
  ctx.drawImage(
    mpOrbImage,
    350, // x position
    232, // y position
    hpOrbImage.width / 1.5,
    hpOrbImage.height / 1.5,
  );
};
