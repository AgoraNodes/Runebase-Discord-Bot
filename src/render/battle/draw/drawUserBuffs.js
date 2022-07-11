/* eslint-disable no-restricted-syntax */
export const drawUserBuffs = (
  ctx, // Ctx drawing canvas
  currentUser, // User Object
  buffImages, // image array of player images
) => {
  // console.log('before apply debuff');
  for (const [i, buff] of currentUser.buffs.entries()) {
    // console.log(debuffImages);
    // console.log(debuff);
    ctx.drawImage(
      buffImages[buff.name][0],
      (0) + (i * 17), // x position
      2, // y position
      buffImages[buff.name][0].width / 4,
      buffImages[buff.name][0].height / 4,
    );
    ctx.lineWidth = 1;
    ctx.font = 'normal 10px "HeartWarming"';
    ctx.fillStyle = "red";
    ctx.fillText(
      buff.rounds,
      0 + (i * 17), // x position
      25, // y position
      50,
    );
  }
};
