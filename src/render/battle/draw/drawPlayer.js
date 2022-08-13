export const drawPlayer = (
  ctx,
  playerImage,
  number,
  inAttackPosition = false,
) => {
  let x = 0;
  let y = 0;
  if (inAttackPosition) {
    ctx.drawImage(
      playerImage[Number(number)],
      inAttackPosition.x - 20, // x position
      inAttackPosition.y, // y position
      playerImage[Number(number)].width,
      playerImage[Number(number)].height,
    );
  } else {
    x = 110;
    y = 130;
    ctx.drawImage(
      playerImage[Number(number)],
      x, // x position
      y, // y position
      playerImage[Number(number)].width,
      playerImage[Number(number)].height,
    );
  }
  return {
    x,
    y,
  };
};
