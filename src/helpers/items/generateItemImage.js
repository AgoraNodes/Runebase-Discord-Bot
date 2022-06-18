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
  const strengthReqHeight = newItem.itemBase.strengthReq ? 25 : 0;
  const dexterityReqHeight = newItem.itemBase.dexterityReq ? 25 : 0;
  const shieldAndBootsDamageHeight = (
    (
      newItem.itemBase.itemFamily.itemType.name === "Shields"
      || newItem.itemBase.itemFamily.itemType.name === "Boots"
    )
    && newItem.minDamage
    && newItem.maxDamage) ? 25 : 0;
  const isWeapon = !!((
    newItem.itemBase.itemFamily.itemType.name === "Axes"
    || newItem.itemBase.itemFamily.itemType.name === "Bows"
    || newItem.itemBase.itemFamily.itemType.name === "Crossbows"
    || newItem.itemBase.itemFamily.itemType.name === "Daggers"
    || newItem.itemBase.itemFamily.itemType.name === "Javelins"
    || newItem.itemBase.itemFamily.itemType.name === "Maces"
    || newItem.itemBase.itemFamily.itemType.name === "Polearms"
  ));
  const isClassSpecific = !!((
    newItem.itemBase.itemFamily.itemType.name === "Barbarian Helms"
    || newItem.itemBase.itemFamily.itemType.name === "Druid Pelts"
    || newItem.itemBase.itemFamily.itemType.name === "Necromancer Shrunken Heads"
    || newItem.itemBase.itemFamily.itemType.name === "Paladin Shields"
    || newItem.itemBase.itemFamily.itemType.name === "Amazon Weapons"
    || newItem.itemBase.itemFamily.itemType.name === "Sorceress Orbs"
    || newItem.itemBase.itemFamily.itemType.name === "Assassin Katars"
  ));
  const isShield = newItem.itemBase.itemFamily.itemType.name === "Shields";
  const isBow = newItem.itemBase.itemFamily.itemType.name === "Bows";
  const isRing = newItem.itemBase.itemFamily.itemType.name === "Rings";
  const isAmulet = newItem.itemBase.itemFamily.itemType.name === "Amulets";
  const extraWeaponsHeight = isWeapon ? 25 : 0;
  const extraShieldBlockHeight = isShield ? 25 : 0;
  const classSpecificHeight = isClassSpecific ? 25 : 0;
  const minusBowHeight = isBow ? -25 : 0;
  const minusRingwHeight = isBow ? -25 : 0;
  const minusAmuletHeight = isBow ? -25 : 0;
  const totalExtraHeight = levelReqHeight
    + strengthReqHeight
    + dexterityReqHeight
    + shieldAndBootsDamageHeight
    + extraWeaponsHeight
    + extraShieldBlockHeight
    + minusBowHeight
    + minusRingwHeight
    + minusAmuletHeight
    + classSpecificHeight;

  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
  const itemImage = await loadImage(path.join(__dirname, `../../assets/images/items/${newItem.itemBase.itemFamily.itemType.name}/${newItem.itemBase.itemFamily.name}`, `${newItem.itemBase.name}.png`));
  const canvas = createCanvas(
    200,
    (itemImage.height) + 95 + (modifierStringArray.length * 25) + totalExtraHeight,
  );
  const ctx = canvas.getContext('2d');

  // console.log(newItem.itemBase.name);
  // console.log(newItem.itemBase.itemFamily.name);
  // console.log(newItem.itemBase.itemFamily.itemType.name);

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

  // item defense
  if (newItem.defense) {
    const realDefenseValue = Math.round((newItem.defense * (1 + (newItem.eDefense ? newItem.eDefense / 100 : 0))));
    ctx.strokeText(
      `Defense: ${realDefenseValue}${newItem.eDefense ? ` (upped from ${newItem.defense})` : ``}`,
      // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
      100,
      (itemImage.height) + 45,
      200,
    );
    ctx.fillText(
      `Defense: ${realDefenseValue}${newItem.eDefense ? ` (upped from ${newItem.defense})` : ``}`,
      // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
      100,
      (itemImage.height) + 45,
      200,
    );
  }

  if (isWeapon) {
    if (newItem.itemBase.itemFamily.twoHanded) {
      // item durability
      ctx.strokeText(
        `Two-Handed`,
        100,
        (itemImage.height) + 45,
        200,
      );
      ctx.fillText(
        `Two-Handed`,
        100,
        (itemImage.height) + 45,
        200,
      );
    } else {
      // item durability
      ctx.strokeText(
        `One-Handed`,
        100,
        (itemImage.height) + 45,
        200,
      );
      ctx.fillText(
        `One-Handed`,
        100,
        (itemImage.height) + 45,
        200,
      );
    }
  }

  if (isShield) {
    ctx.strokeText(
      `Chance to Block: ${newItem.itemBase.block}%`,
      100,
      (itemImage.height) + 70,
      200,
    );
    ctx.fillText(
      `Chance to Block: ${newItem.itemBase.block}%`,
      100,
      (itemImage.height) + 70,
      200,
    );
  }

  // item attack damage
  if (newItem.minDamage && newItem.maxDamage) {
    let extraDamageString = '';
    if (newItem.itemBase.itemFamily.itemType.name === "Shields") {
      extraDamageString = 'Smite ';
    }
    if (newItem.itemBase.itemFamily.itemType.name === "Boots") {
      extraDamageString = 'Kick ';
    }
    const realMinDamageValue = Math.round((newItem.minDamage * (1 + (newItem.eDamage ? newItem.eDamage / 100 : 0))));
    const realMaxDamageValue = Math.round((newItem.maxDamage * (1 + (newItem.eDamage ? newItem.eDamage / 100 : 0))));
    ctx.strokeText(
      `${extraDamageString}Damage: ${realMinDamageValue} - ${realMaxDamageValue}${newItem.eDamage ? ` (upped from ${newItem.minDamage} - ${newItem.maxDamage})` : ``}`,
      // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
      100,
      (itemImage.height) + 45 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
    ctx.fillText(
      `${extraDamageString}Damage: ${realMinDamageValue} - ${realMaxDamageValue}${newItem.eDamage ? ` (upped from ${newItem.minDamage} - ${newItem.maxDamage})` : ``}`,
      // `Defense: ${Math.round((newItem.defense * (1 + (newItem.ed / 100))))}`,
      100,
      (itemImage.height) + 45 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
  }

  // item durability
  if (!isBow && !isRing && !isAmulet) {
    ctx.strokeText(
      `Durability: ${newItem.durability} of ${newItem.itemBase.durability}`,
      100,
      (itemImage.height) + 70 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
    ctx.fillText(
      `Durability: ${newItem.durability} of ${newItem.itemBase.durability}`,
      100,
      (itemImage.height) + 70 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
  }

  if (newItem.itemBase.itemFamily.itemType.name === "Barbarian Helms") {
    ctx.strokeText(
      `(Barbarian Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
    ctx.fillText(
      `(Barbarian Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
  }

  if (newItem.itemBase.itemFamily.itemType.name === "Druid Pelts") {
    ctx.strokeText(
      `(Druid Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
    ctx.fillText(
      `(Druid Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
  }

  if (newItem.itemBase.itemFamily.itemType.name === "Paladin Shields") {
    ctx.strokeText(
      `(Paladin Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
    ctx.fillText(
      `(Paladin Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
  }

  if (newItem.itemBase.itemFamily.itemType.name === "Necromancer Shrunken Heads") {
    ctx.strokeText(
      `(Necromancer Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
    ctx.fillText(
      `(Necromancer Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
  }

  if (newItem.itemBase.itemFamily.itemType.name === "Assassin Katars") {
    ctx.strokeText(
      `(Assasin Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
    ctx.fillText(
      `(Assasin Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
  }

  if (newItem.itemBase.itemFamily.itemType.name === "Amazon Weapons") {
    ctx.strokeText(
      `(Amazon Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
    ctx.fillText(
      `(Amazon Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
  }

  if (newItem.itemBase.itemFamily.itemType.name === "Sorceress Orbs") {
    ctx.strokeText(
      `(Sorceress Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
    ctx.fillText(
      `(Sorceress Only)`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight,
      200,
    );
  }

  // Level Req
  if (newItem.levelReq) {
    ctx.strokeText(
      `Lvl Requirement: ${newItem.levelReq}`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight,
      200,
    );
    ctx.fillText(
      `Lvl Requirement: ${newItem.levelReq}`,
      100,
      (itemImage.height) + 95 + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight,
      200,
    );
  }

  // Strength Req
  if (newItem.itemBase.strengthReq) {
    ctx.strokeText(
      `Strength Requirement: ${newItem.itemBase.strengthReq}`,
      100,
      (itemImage.height) + 95 + (levelReqHeight) + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight,
      200,
    );
    ctx.fillText(
      `Strength Requirement: ${newItem.itemBase.strengthReq}`,
      100,
      (itemImage.height) + 95 + (levelReqHeight) + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight,
      200,
    );
  }

  // Strength Req
  if (newItem.itemBase.dexterityReq) {
    ctx.strokeText(
      `Dexterity Requirement: ${newItem.itemBase.dexterityReq}`,
      100,
      (itemImage.height) + 95 + (levelReqHeight) + (strengthReqHeight) + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight,
      200,
    );
    ctx.fillText(
      `Dexterity Requirement: ${newItem.itemBase.dexterityReq}`,
      100,
      (itemImage.height) + 95 + (levelReqHeight) + (strengthReqHeight) + shieldAndBootsDamageHeight + extraWeaponsHeight + extraShieldBlockHeight + minusBowHeight + classSpecificHeight + minusRingwHeight + minusAmuletHeight,
      200,
    );
  }

  // item modifiers
  ctx.font = 'bold 15px "HeartWarming"';
  ctx.fillStyle = newItem.itemQuality.color;
  ctx.strokeStyle = "#164179";

  for (let i = 0; i < modifierStringArray.length; i++) {
    ctx.strokeText(
      modifierStringArray[i],
      100,
      (itemImage.height) + 95 + (i * 25) + totalExtraHeight,
      200,
    );
    ctx.fillText(
      modifierStringArray[i],
      100,
      (itemImage.height) + 95 + (i * 25) + totalExtraHeight,
      200,
    );
  }

  const finalImage = await canvas.toBuffer();
  return finalImage;
};
