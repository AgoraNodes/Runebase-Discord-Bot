import {
  createCanvas,
  loadImage,
} from 'canvas';
import { renderItemImage } from "../item";

export const renderInventoryImage = async (
  currentUserCharacter,
  itemDestroyed,
  itemEquiped,
  cannotEquip,
  cannotEquipReason,
  start,
) => {
  const current = currentUserCharacter.inventory.items.slice(start, start + 1);

  // console.log(current);
  // console.log(current[0]);
  // console.log('after current select');

  const extraDestroyedHeight = itemDestroyed ? 20 : 0;
  const extraEquipedHeight = itemEquiped && !cannotEquip ? 20 : 0;
  const extraCannotEquipedHeight = cannotEquip ? 60 : 0;

  const inventoryItemOneBuffer = await renderItemImage(current[0]);
  const inventoryItemOne = await loadImage(inventoryItemOneBuffer);
  const canvas = createCanvas(
    inventoryItemOne.width,
    inventoryItemOne.height + 20 + extraDestroyedHeight + extraCannotEquipedHeight + extraEquipedHeight,
  );
  const ctx = canvas.getContext('2d');

  // Inventory item one image
  ctx.drawImage(
    inventoryItemOne,
    0,
    0,
    inventoryItemOne.width,
    inventoryItemOne.height,
  );

  ctx.font = 'bold 10px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;

  ctx.strokeText(
    `Showing items ${start + 1} out of ${currentUserCharacter.inventory.items.length}`,
    canvas.width / 2,
    inventoryItemOne.height,
    inventoryItemOne.width,
  );
  ctx.fillText(
    `Showing items ${start + 1} out of ${currentUserCharacter.inventory.items.length}`,
    canvas.width / 2,
    inventoryItemOne.height,
    inventoryItemOne.width,
  );

  if (itemDestroyed) {
    ctx.strokeText(
      `destroyed ${itemDestroyed.name}`,
      canvas.width / 2,
      inventoryItemOne.height + 20,
      inventoryItemOne.width,
    );
    ctx.fillText(
      `destroyed ${itemDestroyed.name}`,
      canvas.width / 2,
      inventoryItemOne.height + 20,
      inventoryItemOne.width,
    );
  }

  if (cannotEquip) {
    ctx.font = 'bold 15px "HeartWarming"';
    ctx.fillStyle = "red";
    ctx.lineWidth = 3;
    ctx.strokeText(
      `Unable to Equip`,
      canvas.width / 2,
      inventoryItemOne.height + 30,
      inventoryItemOne.width,
    );
    ctx.fillText(
      `Unable to Equip`,
      canvas.width / 2,
      inventoryItemOne.height + 30,
      inventoryItemOne.width,
    );
    ctx.strokeText(
      `${cannotEquipReason}`,
      canvas.width / 2,
      inventoryItemOne.height + 50,
      inventoryItemOne.width,
    );
    ctx.fillText(
      `${cannotEquipReason}`,
      canvas.width / 2,
      inventoryItemOne.height + 50,
      inventoryItemOne.width,
    );
  }
  if (itemEquiped && !cannotEquip) {
    ctx.strokeText(
      `equiped ${itemEquiped.name}`,
      canvas.width / 2,
      inventoryItemOne.height + 20,
      inventoryItemOne.width,
    );
    ctx.fillText(
      `equiped ${itemEquiped.name}`,
      canvas.width / 2,
      inventoryItemOne.height + 20,
      inventoryItemOne.width,
    );
  }
  const finalImage = await canvas.toBuffer();
  return finalImage;
};
