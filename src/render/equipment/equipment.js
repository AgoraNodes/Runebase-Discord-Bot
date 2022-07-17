import {
  createCanvas,
  loadImage,
} from 'canvas';
import path from 'path';

export const renderEquipmentImage = async (
  userCurrentCharacter,
) => {
  let helmImage;
  let amuletImage;
  let mainHandImage;
  let offHandImage;
  let armorImage;
  let glovesImage;
  let ringSlotOneImage;
  let ringSlotTwoImage;
  let beltImage;
  let bootsImage;

  const equipmentBackground = await loadImage(path.join(__dirname, '../../assets/images/equipment', `background.png`));

  const canvas = createCanvas(equipmentBackground.width, equipmentBackground.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(equipmentBackground, 0, 0, equipmentBackground.width, equipmentBackground.height);

  if (userCurrentCharacter.equipment.helm) {
    helmImage = await loadImage(
      path.join(
        __dirname,
        `../../assets/images/items/${userCurrentCharacter.equipment.helm.itemBase.itemFamily.itemType.name}/${userCurrentCharacter.equipment.helm.itemBase.itemFamily.name}`,
        `${userCurrentCharacter.equipment.helm.itemBase.name}.png`,
      ),
    );
  }
  if (userCurrentCharacter.equipment.armor) {
    armorImage = await loadImage(
      path.join(
        __dirname,
        `../../assets/images/items/${userCurrentCharacter.equipment.armor.itemBase.itemFamily.itemType.name}/${userCurrentCharacter.equipment.armor.itemBase.itemFamily.name}`,
        `${userCurrentCharacter.equipment.armor.itemBase.name}.png`,
      ),
    );
  }
  if (userCurrentCharacter.equipment.mainHand) {
    mainHandImage = await loadImage(
      path.join(
        __dirname,
        `../../assets/images/items/${userCurrentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name}/${userCurrentCharacter.equipment.mainHand.itemBase.itemFamily.name}`,
        `${userCurrentCharacter.equipment.mainHand.itemBase.name}.png`,
      ),
    );
  }
  if (userCurrentCharacter.equipment.offHand) {
    offHandImage = await loadImage(
      path.join(
        __dirname,
        `../../assets/images/items/${userCurrentCharacter.equipment.offHand.itemBase.itemFamily.itemType.name}/${userCurrentCharacter.equipment.offHand.itemBase.itemFamily.name}`,
        `${userCurrentCharacter.equipment.offHand.itemBase.name}.png`,
      ),
    );
  }
  if (userCurrentCharacter.equipment.boots) {
    bootsImage = await loadImage(
      path.join(
        __dirname,
        `../../assets/images/items/${userCurrentCharacter.equipment.boots.itemBase.itemFamily.itemType.name}/${userCurrentCharacter.equipment.boots.itemBase.itemFamily.name}`,
        `${userCurrentCharacter.equipment.boots.itemBase.name}.png`,
      ),
    );
  }

  if (userCurrentCharacter.equipment.gloves) {
    glovesImage = await loadImage(
      path.join(
        __dirname,
        `../../assets/images/items/${userCurrentCharacter.equipment.gloves.itemBase.itemFamily.itemType.name}/${userCurrentCharacter.equipment.gloves.itemBase.itemFamily.name}`,
        `${userCurrentCharacter.equipment.gloves.itemBase.name}.png`,
      ),
    );
  }

  if (userCurrentCharacter.equipment.belt) {
    beltImage = await loadImage(
      path.join(
        __dirname,
        `../../assets/images/items/${userCurrentCharacter.equipment.belt.itemBase.itemFamily.itemType.name}/${userCurrentCharacter.equipment.belt.itemBase.itemFamily.name}`,
        `${userCurrentCharacter.equipment.belt.itemBase.name}.png`,
      ),
    );
  }

  if (userCurrentCharacter.equipment.amulet) {
    amuletImage = await loadImage(
      path.join(
        __dirname,
        `../../assets/images/items/${userCurrentCharacter.equipment.amulet.itemBase.itemFamily.itemType.name}/${userCurrentCharacter.equipment.amulet.itemBase.itemFamily.name}`,
        `${userCurrentCharacter.equipment.amulet.itemBase.name}.png`,
      ),
    );
  }

  if (userCurrentCharacter.equipment.ringSlotOne) {
    ringSlotOneImage = await loadImage(
      path.join(
        __dirname,
        `../../assets/images/items/${userCurrentCharacter.equipment.ringSlotOne.itemBase.itemFamily.itemType.name}/${userCurrentCharacter.equipment.ringSlotOne.itemBase.itemFamily.name}`,
        `${userCurrentCharacter.equipment.ringSlotOne.itemBase.name}.png`,
      ),
    );
  }

  if (userCurrentCharacter.equipment.ringSlotTwo) {
    ringSlotTwoImage = await loadImage(
      path.join(
        __dirname,
        `../../assets/images/items/${userCurrentCharacter.equipment.ringSlotTwo.itemBase.itemFamily.itemType.name}/${userCurrentCharacter.equipment.ringSlotTwo.itemBase.itemFamily.name}`,
        `${userCurrentCharacter.equipment.ringSlotTwo.itemBase.name}.png`,
      ),
    );
  }
  console.log(userCurrentCharacter.equipment);
  if (userCurrentCharacter.equipment.helm) {
    ctx.drawImage(
      helmImage,
      133, // x position
      3, // y position
      helmImage.width, // width
      helmImage.height, // height
    );
  }

  if (userCurrentCharacter.equipment.armor) {
    ctx.drawImage(
      armorImage,
      136, // x position
      80, // y position
      armorImage.width, // width
      armorImage.height, // height
    );
  }

  if (userCurrentCharacter.equipment.mainHand) {
    ctx.drawImage(
      mainHandImage,
      32, // x position
      63, // y position
      mainHandImage.width, // width
      mainHandImage.height, // height
    );
  }

  if (userCurrentCharacter.equipment.offHand) {
    ctx.drawImage(
      offHandImage,
      251, // x position
      77, // y position
      offHandImage.width, // width
      offHandImage.height, // height
    );
  }

  if (userCurrentCharacter.equipment.boots) {
    ctx.drawImage(
      bootsImage,
      251, // x position
      178, // y position
      bootsImage.width, // width
      bootsImage.height, // height
    );
  }
  if (userCurrentCharacter.equipment.gloves) {
    ctx.drawImage(
      glovesImage,
      21, // x position
      178, // y position
      glovesImage.width, // width
      glovesImage.height, // height
    );
  }
  if (userCurrentCharacter.equipment.belt) {
    ctx.drawImage(
      beltImage,
      135, // x position
      175, // y position
      beltImage.width, // width
      beltImage.height, // height
    );
  }

  if (userCurrentCharacter.equipment.amulet) {
    ctx.drawImage(
      amuletImage,
      207, // x position
      30, // y position
      amuletImage.width, // width
      amuletImage.height, // height
    );
  }

  if (userCurrentCharacter.equipment.ringSlotOne) {
    ctx.drawImage(
      ringSlotOneImage,
      93, // x position
      175, // y position
      ringSlotOneImage.width, // width
      ringSlotOneImage.height, // height
    );
  }

  if (userCurrentCharacter.equipment.ringSlotTwo) {
    ctx.drawImage(
      ringSlotTwoImage,
      207, // x position
      175, // y position
      ringSlotTwoImage.width, // width
      ringSlotTwoImage.height, // height
    );
  }
  console.log('after generate equipment');

  const finalImage = await canvas.toBuffer();
  return finalImage;
};
