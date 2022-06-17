export const calcStrengthDexforReq = async (
  userCurrentCharacter,
) => {
  let strengthTotal = 0;
  let dexterityTotal = 0;

  strengthTotal += userCurrentCharacter.user.currentClass.strength;
  dexterityTotal += userCurrentCharacter.user.currentClass.dexterity;
  strengthTotal += userCurrentCharacter.stats.strength;
  dexterityTotal += userCurrentCharacter.stats.dexterity;

  if (userCurrentCharacter.equipment.helm) {
    if (userCurrentCharacter.equipment.helm.strength) {
      strengthTotal += userCurrentCharacter.equipment.helm.strength;
    }
    if (userCurrentCharacter.equipment.helm.dexterity) {
      dexterityTotal += userCurrentCharacter.equipment.helm.dexterity;
    }
  }
  if (userCurrentCharacter.equipment.amulet) {
    if (userCurrentCharacter.equipment.amulet.strength) {
      strengthTotal += userCurrentCharacter.equipment.amulet.strength;
    }
    if (userCurrentCharacter.equipment.amulet.dexterity) {
      dexterityTotal += userCurrentCharacter.equipment.amulet.dexterity;
    }
  }
  if (userCurrentCharacter.equipment.mainHand) {
    if (userCurrentCharacter.equipment.mainHand.strength) {
      strengthTotal += userCurrentCharacter.equipment.mainHand.strength;
    }
    if (userCurrentCharacter.equipment.mainHand.dexterity) {
      dexterityTotal += userCurrentCharacter.equipment.mainHand.dexterity;
    }
  }
  if (userCurrentCharacter.equipment.offHand) {
    if (userCurrentCharacter.equipment.offHand.strength) {
      strengthTotal += userCurrentCharacter.equipment.offHand.strength;
    }
    if (userCurrentCharacter.equipment.offHand.dexterity) {
      dexterityTotal += userCurrentCharacter.equipment.offHand.dexterity;
    }
  }
  if (userCurrentCharacter.equipment.armor) {
    if (userCurrentCharacter.equipment.armor.strength) {
      strengthTotal += userCurrentCharacter.equipment.armor.strength;
    }
    if (userCurrentCharacter.equipment.armor.dexterity) {
      dexterityTotal += userCurrentCharacter.equipment.armor.dexterity;
    }
  }
  if (userCurrentCharacter.equipment.gloves) {
    if (userCurrentCharacter.equipment.gloves.strength) {
      strengthTotal += userCurrentCharacter.equipment.gloves.strength;
    }
    if (userCurrentCharacter.equipment.gloves.dexterity) {
      dexterityTotal += userCurrentCharacter.equipment.gloves.dexterity;
    }
  }
  if (userCurrentCharacter.equipment.boots) {
    if (userCurrentCharacter.equipment.boots.strength) {
      strengthTotal += userCurrentCharacter.equipment.boots.strength;
    }
    if (userCurrentCharacter.equipment.boots.dexterity) {
      dexterityTotal += userCurrentCharacter.equipment.boots.dexterity;
    }
  }
  if (userCurrentCharacter.equipment.belt) {
    if (userCurrentCharacter.equipment.belt.strength) {
      strengthTotal += userCurrentCharacter.equipment.belt.strength;
    }
    if (userCurrentCharacter.equipment.belt.dexterity) {
      dexterityTotal += userCurrentCharacter.equipment.belt.dexterity;
    }
  }
  if (userCurrentCharacter.equipment.ringSlotOne) {
    if (userCurrentCharacter.equipment.ringSlotOne.strength) {
      strengthTotal += userCurrentCharacter.equipment.ringSlotOne.strength;
    }
    if (userCurrentCharacter.equipment.ringSlotOne.dexterity) {
      dexterityTotal += userCurrentCharacter.equipment.ringSlotOne.dexterity;
    }
  }
  if (userCurrentCharacter.equipment.ringSlotTwo) {
    if (userCurrentCharacter.equipment.ringSlotTwo.strength) {
      strengthTotal += userCurrentCharacter.equipment.ringSlotTwo.strength;
    }
    if (userCurrentCharacter.equipment.ringSlotTwo.dexterity) {
      dexterityTotal += userCurrentCharacter.equipment.ringSlotTwo.dexterity;
    }
  }

  console.log(`total strength: ${strengthTotal}`);
  console.log(`total dexterity: ${dexterityTotal}`);
  return [
    strengthTotal,
    dexterityTotal,
  ];
};
