import {
  createCanvas,
  loadImage,
} from 'canvas';
import { renderItemImage } from "../item";

export const renderDestroyIventoryItemImage = async (
  start,
  currentUserCharacter,
) => {
  const current = currentUserCharacter.inventory.items.slice(start, start + 1);

  const inventoryItemOneBuffer = await renderItemImage(current[0]);
  const inventoryItemOne = await loadImage(inventoryItemOneBuffer);
  const canvas = createCanvas(inventoryItemOne.width, (inventoryItemOne.height + 40));
  const ctx = canvas.getContext('2d');

  // Inventory item one image
  ctx.drawImage(
    inventoryItemOne,
    0,
    0,
    inventoryItemOne.width,
    inventoryItemOne.height,
  );

  ctx.font = 'bold 15px "HeartWarming"';
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;

  ctx.strokeText(
    `Are you sure you want to destroy`,
    canvas.width / 2,
    inventoryItemOne.height,
    inventoryItemOne.width,
  );
  ctx.fillText(
    `Are you sure you want to destroy`,
    canvas.width / 2,
    inventoryItemOne.height,
    inventoryItemOne.width,
  );
  ctx.font = 'bold 15px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;

  ctx.strokeText(
    `${current[0].name}`,
    canvas.width / 2,
    inventoryItemOne.height + 20,
    inventoryItemOne.width,
  );
  ctx.fillText(
    `${current[0].name}`,
    canvas.width / 2,
    inventoryItemOne.height + 20,
    inventoryItemOne.width,
  );
  const finalImage = await canvas.toBuffer();
  return finalImage;
};
