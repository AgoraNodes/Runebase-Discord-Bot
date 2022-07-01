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
      playerImage[number],
      inAttackPosition.x - 20, // x position
      inAttackPosition.y, // y position
      playerImage[number].width,
      playerImage[number].height,
    );
  } else {
    x = 110;
    y = 130;
    ctx.drawImage(
      playerImage[number],
      x, // x position
      y, // y position
      playerImage[number].width,
      playerImage[number].height,
    );
  }
  return {
    x,
    y,
  };
};
