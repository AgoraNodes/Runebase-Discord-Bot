import { calcStrengthDexforReq } from "../../equipment/calcStrengthDexforReq";
import canStillWearItem from "./canStillWearItem";

const calculateItemStats = async (
  currentCharacter,
  userCurrentRank,
  strength,
  dexterity,
  vitality,
  energy,
  defense,
  block,
) => {
  let newStrength = strength;
  let newDexterity = dexterity;
  let newVitality = vitality;
  let newEnergy = energy;
  let newDefense = defense;
  let newBlock = block;

  const [
    strengthTotalWithItems,
    dexterityTotalWithItems,
  ] = await calcStrengthDexforReq(
    currentCharacter,
  );

  let canWearHelm = false;
  let canWearMainHand = false;
  let canWearOffHand = false;
  let canWearArmor = false;
  let canWearGloves = false;
  let canWearBelt = false;
  let canWearBoots = false;

  // Boots
  if (currentCharacter.equipment.boots) {
    canWearBoots = canStillWearItem(
      currentCharacter.equipment.boots,
      strengthTotalWithItems,
      dexterityTotalWithItems,
    );
    console.log(canWearBoots);
    console.log('canWearBoots');
    if (canWearBoots) {
      if (currentCharacter.equipment.boots.strength) {
        newStrength += currentCharacter.equipment.boots.strength;
      }
      if (currentCharacter.equipment.boots.dexterity) {
        newDexterity += currentCharacter.equipment.boots.dexterity;
      }
      if (currentCharacter.equipment.boots.vitality) {
        newVitality += currentCharacter.equipment.boots.vitality;
      }
      if (currentCharacter.equipment.boots.energy) {
        newEnergy += currentCharacter.equipment.boots.energy;
      }
      if (currentCharacter.equipment.boots.defense) {
        const addedEDefense = 1 + (currentCharacter.equipment.boots.eDefense ? currentCharacter.equipment.boots.eDefense / 100 : 0);
        const realDefenseValue = Math.round((currentCharacter.equipment.boots.defense * (addedEDefense)));
        newDefense += realDefenseValue;
      }
    }
  }

  // Belt
  if (currentCharacter.equipment.belt) {
    canWearBelt = canStillWearItem(
      currentCharacter.equipment.belt,
      strengthTotalWithItems,
      dexterityTotalWithItems,
    );
    console.log(canWearBelt);
    console.log('canWearBelt');
    if (canWearBelt) {
      if (currentCharacter.equipment.belt.strength) {
        newStrength += currentCharacter.equipment.belt.strength;
      }
      if (currentCharacter.equipment.belt.dexterity) {
        newDexterity += currentCharacter.equipment.belt.dexterity;
      }
      if (currentCharacter.equipment.belt.vitality) {
        newVitality += currentCharacter.equipment.belt.vitality;
      }
      if (currentCharacter.equipment.belt.energy) {
        newEnergy += currentCharacter.equipment.belt.energy;
      }
      if (currentCharacter.equipment.belt.defense) {
        const addedEDefense = 1 + (currentCharacter.equipment.belt.eDefense ? currentCharacter.equipment.belt.eDefense / 100 : 0);
        const realDefenseValue = Math.round((currentCharacter.equipment.belt.defense * (addedEDefense)));
        newDefense += realDefenseValue;
      }
    }
  }

  // Gloves
  if (currentCharacter.equipment.gloves) {
    canWearGloves = canStillWearItem(
      currentCharacter.equipment.gloves,
      strengthTotalWithItems,
      dexterityTotalWithItems,
    );
    console.log(canWearGloves);
    console.log('canWearGloves');
    if (canWearGloves) {
      if (currentCharacter.equipment.gloves.strength) {
        newStrength += currentCharacter.equipment.gloves.strength;
      }
      if (currentCharacter.equipment.gloves.dexterity) {
        newDexterity += currentCharacter.equipment.gloves.dexterity;
      }
      if (currentCharacter.equipment.gloves.vitality) {
        newVitality += currentCharacter.equipment.gloves.vitality;
      }
      if (currentCharacter.equipment.gloves.energy) {
        newEnergy += currentCharacter.equipment.gloves.energy;
      }
      if (currentCharacter.equipment.gloves.defense) {
        const addedEDefense = 1 + (currentCharacter.equipment.gloves.eDefense ? currentCharacter.equipment.gloves.eDefense / 100 : 0);
        const realDefenseValue = Math.round((currentCharacter.equipment.gloves.defense * (addedEDefense)));
        newDefense += realDefenseValue;
      }
    }
  }

  // Armor
  if (currentCharacter.equipment.armor) {
    canWearArmor = canStillWearItem(
      currentCharacter.equipment.armor,
      strengthTotalWithItems,
      dexterityTotalWithItems,
    );
    console.log(canWearArmor);
    console.log('canWearArmor');
    if (canWearArmor) {
      if (currentCharacter.equipment.armor.strength) {
        newStrength += currentCharacter.equipment.armor.strength;
      }
      if (currentCharacter.equipment.armor.dexterity) {
        newDexterity += currentCharacter.equipment.armor.dexterity;
      }
      if (currentCharacter.equipment.armor.vitality) {
        newVitality += currentCharacter.equipment.armor.vitality;
      }
      if (currentCharacter.equipment.armor.energy) {
        newEnergy += currentCharacter.equipment.armor.energy;
      }
      if (currentCharacter.equipment.armor.defense) {
        const addedEDefense = 1 + (currentCharacter.equipment.armor.eDefense ? currentCharacter.equipment.armor.eDefense / 100 : 0);
        const realDefenseValue = Math.round((currentCharacter.equipment.armor.defense * (addedEDefense)));
        newDefense += realDefenseValue;
      }
    }
  }

  // Main Hand
  if (currentCharacter.equipment.mainHand) {
    canWearMainHand = canStillWearItem(
      currentCharacter.equipment.mainHand,
      strengthTotalWithItems,
      dexterityTotalWithItems,
    );
    console.log(canWearMainHand);
    console.log('canWearMainHand');
    if (canWearMainHand) {
      if (currentCharacter.equipment.mainHand.strength) {
        newStrength += currentCharacter.equipment.mainHand.strength;
      }
      if (currentCharacter.equipment.mainHand.dexterity) {
        newDexterity += currentCharacter.equipment.mainHand.dexterity;
      }
      if (currentCharacter.equipment.mainHand.vitality) {
        newVitality += currentCharacter.equipment.mainHand.vitality;
      }
      if (currentCharacter.equipment.mainHand.energy) {
        newEnergy += currentCharacter.equipment.mainHand.energy;
      }
    }
  }

  // Helm
  if (currentCharacter.equipment.helm) {
    canWearHelm = canStillWearItem(
      currentCharacter.equipment.helm,
      strengthTotalWithItems,
      dexterityTotalWithItems,
    );
    console.log(canWearHelm);
    console.log('canWearHelm');
    if (canWearHelm) {
      if (currentCharacter.equipment.helm.strength) {
        newStrength += currentCharacter.equipment.helm.strength;
      }
      if (currentCharacter.equipment.helm.dexterity) {
        newDexterity += currentCharacter.equipment.helm.dexterity;
      }
      if (currentCharacter.equipment.helm.vitality) {
        newVitality += currentCharacter.equipment.helm.vitality;
      }
      if (currentCharacter.equipment.helm.energy) {
        newEnergy += currentCharacter.equipment.helm.energy;
      }
      if (currentCharacter.equipment.helm.defense) {
        const addedEDefense = 1 + (currentCharacter.equipment.helm.eDefense ? currentCharacter.equipment.helm.eDefense / 100 : 0);
        const realDefenseValue = Math.round((currentCharacter.equipment.helm.defense * (addedEDefense)));
        newDefense += realDefenseValue;
      }
    }
  }

  // OffHand
  if (currentCharacter.equipment.offHand) {
    canWearOffHand = canStillWearItem(
      currentCharacter.equipment.offHand,
      strengthTotalWithItems,
      dexterityTotalWithItems,
    );
    console.log(canWearOffHand);
    console.log('canWearOffHand');
    if (canWearOffHand) {
      if (currentCharacter.equipment.offHand.strength) {
        newStrength += currentCharacter.equipment.offHand.strength;
      }
      if (currentCharacter.equipment.offHand.dexterity) {
        newDexterity += currentCharacter.equipment.offHand.dexterity;
      }
      if (currentCharacter.equipment.offHand.vitality) {
        newVitality += currentCharacter.equipment.offHand.vitality;
      }
      if (currentCharacter.equipment.offHand.energy) {
        newEnergy += currentCharacter.equipment.offHand.energy;
      }
      if (currentCharacter.equipment.offHand.defense) {
        const addedEDefense = 1 + (currentCharacter.equipment.offHand.eDefense ? currentCharacter.equipment.offHand.eDefense / 100 : 0);
        const realDefenseValue = Math.round((currentCharacter.equipment.offHand.defense * (addedEDefense)));
        newDefense += realDefenseValue;
      }
      if (
        currentCharacter.equipment.offHand
        && currentCharacter.equipment.offHand.itemBase.itemFamily.itemType.name === 'Shields'
      ) {
        const shieldBlock = currentCharacter.equipment.offHand.itemBase.block;
        const blocking = (shieldBlock * (dexterity - 15)) / (userCurrentRank.level * 2);
        newBlock = blocking > 50 ? 50 : blocking;
      }
    }
  }

  // Helm
  if (currentCharacter.equipment.amulet) {
    if (currentCharacter.equipment.amulet.strength) {
      newStrength += currentCharacter.equipment.amulet.strength;
    }
    if (currentCharacter.equipment.amulet.dexterity) {
      newDexterity += currentCharacter.equipment.amulet.dexterity;
    }
    if (currentCharacter.equipment.amulet.vitality) {
      newVitality += currentCharacter.equipment.amulet.vitality;
    }
    if (currentCharacter.equipment.amulet.energy) {
      newEnergy += currentCharacter.equipment.amulet.energy;
    }
    if (currentCharacter.equipment.amulet.defense) {
      const addedEDefense = 1 + (currentCharacter.equipment.amulet.eDefense ? currentCharacter.equipment.amulet.eDefense / 100 : 0);
      const realDefenseValue = Math.round((currentCharacter.equipment.amulet.defense * (addedEDefense)));
      newDefense += realDefenseValue;
    }
  }

  // RingSlotOne
  if (currentCharacter.equipment.ringSlotOne) {
    if (currentCharacter.equipment.ringSlotOne.strength) {
      newStrength += currentCharacter.equipment.ringSlotOne.strength;
    }
    if (currentCharacter.equipment.ringSlotOne.dexterity) {
      newDexterity += currentCharacter.equipment.ringSlotOne.dexterity;
    }
    if (currentCharacter.equipment.ringSlotOne.vitality) {
      newVitality += currentCharacter.equipment.ringSlotOne.vitality;
    }
    if (currentCharacter.equipment.ringSlotOne.energy) {
      newEnergy += currentCharacter.equipment.ringSlotOne.energy;
    }
    if (currentCharacter.equipment.ringSlotOne.defense) {
      const addedEDefense = 1 + (currentCharacter.equipment.ringSlotOne.eDefense ? currentCharacter.equipment.ringSlotOne.eDefense / 100 : 0);
      const realDefenseValue = Math.round((currentCharacter.equipment.ringSlotOne.defense * (addedEDefense)));
      newDefense += realDefenseValue;
    }
  }

  // RingSlotTwo
  if (currentCharacter.equipment.RingSlotTwo) {
    if (currentCharacter.equipment.RingSlotTwo.strength) {
      newStrength += currentCharacter.equipment.RingSlotTwo.strength;
    }
    if (currentCharacter.equipment.RingSlotTwo.dexterity) {
      newDexterity += currentCharacter.equipment.RingSlotTwo.dexterity;
    }
    if (currentCharacter.equipment.RingSlotTwo.vitality) {
      newVitality += currentCharacter.equipment.RingSlotTwo.vitality;
    }
    if (currentCharacter.equipment.RingSlotTwo.energy) {
      newEnergy += currentCharacter.equipment.RingSlotTwo.energy;
    }
    if (currentCharacter.equipment.RingSlotTwo.defense) {
      const addedEDefense = 1 + (currentCharacter.equipment.RingSlotTwo.eDefense ? currentCharacter.equipment.RingSlotTwo.eDefense / 100 : 0);
      const realDefenseValue = Math.round((currentCharacter.equipment.RingSlotTwo.defense * (addedEDefense)));
      newDefense += realDefenseValue;
    }
  }
  console.log('end calc item stats');
  return [
    newStrength,
    newDexterity,
    newVitality,
    newEnergy,
    newDefense,
    newBlock,
    canWearHelm,
    canWearMainHand,
    canWearOffHand,
    canWearArmor,
    canWearGloves,
    canWearBelt,
    canWearBoots,
  ];
};

export default calculateItemStats;

// Maybe loop over everything instead of doing every equipment slot 1 by 1?
// How to handle canWearItem to pass to equipment render screen?
//
// Object.keys(currentCharacter.equipment).forEach((key) => {
//   if (
//     (key === 'helm'
//       || key === 'belt'
//       || key === 'boots'
//       || key === 'gloves'
//       || key === 'armor'
//       || key === 'offHand'
//       || key === 'amulet'
//       || key === 'ringSlotTwo'
//       || key === 'ringSlotOne'
//     )
//     && currentCharacter.equipment[key]
//     && currentCharacter.equipment[key].defense
//   ) {
//     const realDefenseValue = Math.round((currentCharacter.equipment[key].defense * (1 + (currentCharacter.equipment[key].eDefense ? currentCharacter.equipment[key].eDefense / 100 : 0))));
//     defense += realDefenseValue;
//   }
// });
