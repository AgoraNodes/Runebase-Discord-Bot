export const drawBackground = async (
  ctx,
  canvas,
  backgroundImage,
) => {
  ctx.drawImage(
    backgroundImage,
    0, // x position
    0, // y position
    backgroundImage.width,
    canvas.height,
  );
};
