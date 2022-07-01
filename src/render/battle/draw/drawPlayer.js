export const drawPlayer = (
  ctx,
  playerImage,
  number,
  inAttackPosition = false,
) => {
  let x;
  let y;
  if (inAttackPosition) {
    x = 175;
    y = 60;
    ctx.drawImage(
      playerImage[number],
      x, // x position
      y, // y position
      playerImage[number].width,
      playerImage[number].height,
    );
  } else {
    x = 80;
    y = 70;
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
