import {
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas';
import path from 'path';
import { generateModifierStringArray } from "./generateModifierStringArray";

export const generateItemImage = async (
  newItem,
) => {
  const modifierStringArray = await generateModifierStringArray(newItem.dataValues);
  console.log('modifierString');
  console.log(modifierStringArray);
  const levelReqHeight = newItem.levelReq ? 25 : 0;

  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
  const itemImage = await loadImage(path.join(__dirname, `../../assets/images/items/${newItem.itemBase.itemFamily.itemType.name}/${newItem.itemBase.itemFamily.name}`, `${newItem.itemBase.name}.png`));
  const canvas = createCanvas(
    200,
    (itemImage.height) + 95 + (modifierStringArray.length * 25) + levelReqHeight,
  );
  const ctx = canvas.getContext('2d');

  console.log(newItem.itemBase.name);
  console.log(newItem.itemBase.itemFamily.name);
  console.log(newItem.itemBase.itemFamily.itemType.name);

  ctx.lineWidth = 1;
  ctx.fillStyle = "#3F3F3F";
  ctx.strokeStyle = "#164179";
  ctx.textAlign = "center";

  ctx.drawImage(
    itemImage,
    (canvas.width / 2) - (itemImage.width / 2),
    0,

  );

  // item name
  ctx.font = 'bold 15px "HeartWarming"';
  ctx.fillStyle = newItem.itemQuality.color;
  ctx.strokeStyle = "#164179";
  ctx.strokeText(
    newItem.name,
    100,
    (itemImage.height) + 20,
    200,
  );
  ctx.fillText(
    newItem.name,
    100,
    (itemImage.height) + 20,
    200,
  );

  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  ctx.font = 'bold 15px "HeartWarming"';
  // Level Req

  if (newItem.levelReq) {
    ctx.strokeText(
      `Lvl Requirement: ${newItem.levelReq}`,
      100,
      (itemImage.height) + 45,
      200,
    );
    ctx.fillText(
      `Lvl Requirement: ${newItem.levelReq}`,
      100,
      (itemImage.height) + 45,
      200,
    );
  }

  // item defense

  ctx.strokeText(
    `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))} (upped from ${newItem.defense} / ${newItem.ed}% )`,
    // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
    100,
    (itemImage.height) + 45 + levelReqHeight,
    200,
  );
  ctx.fillText(
    `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))} (upped from ${newItem.defense} / ${newItem.ed}% )`,
    // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
    100,
    (itemImage.height) + 45 + levelReqHeight,
    200,
  );

  // item durability
  ctx.strokeText(
    `Durability: ${newItem.durability} of ${newItem.itemBase.durability}`,
    100,
    (itemImage.height) + 70 + levelReqHeight,
    200,
  );
  ctx.fillText(
    `Durability: ${newItem.durability} of ${newItem.itemBase.durability}`,
    100,
    (itemImage.height) + 70 + levelReqHeight,
    200,
  );

  // item modifiers
  ctx.font = 'bold 15px "HeartWarming"';
  ctx.fillStyle = newItem.itemQuality.color;
  ctx.strokeStyle = "#164179";

  for (let i = 0; i < modifierStringArray.length; i++) {
    ctx.strokeText(
      modifierStringArray[i],
      100,
      (itemImage.height) + 95 + (i * 25) + levelReqHeight,
      200,
    );
    ctx.fillText(
      modifierStringArray[i],
      100,
      (itemImage.height) + 95 + (i * 25) + levelReqHeight,
      200,
    );
  }
  const finalImage = await canvas.toBuffer();
  return finalImage;
};
