import {
  createCanvas,
} from 'canvas';

export const renderGrayScaleIcon = async (
  icon,
) => {
  const canvas = createCanvas(
    icon.width,
    icon.height,
  );
  const ctx = canvas.getContext('2d');
  ctx.drawImage(icon, 0, 0);
  const id = ctx.getImageData(0, 0, icon.width, icon.height);
  ctx.clearRect(0, 0, icon.width, icon.height);
  const { data } = id;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[Number(i)];
    const g = data[i + 1];
    const b = data[i + 2];
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    data[Number(i)] = y;
    data[i + 1] = y;
    data[i + 2] = y;
  }
  ctx.putImageData(id, 0, 0);
  const finalImage = await canvas.toBuffer();
  return finalImage;
};
