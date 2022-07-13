const calculatePassivesBarb = async (
  currentCharacter,
  defense,
  regularAttack,
  kick,
  FR,
  PR,
  LR,
  CR,
) => {
  let newDefense = defense;
  let newRegularAttack = regularAttack;
  let newFR = FR;
  let newPR = PR;
  let newLR = LR;
  let newCR = CR;
  let newKick = kick;

  const thoughSkin = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Though Skin');
  const resistance = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Resistance');
  const swordsman = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Swordsman');
  const axeman = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Axeman');
  const maceman = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Maceman');
  const polearmMaster = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Polearm Master');
  const throwingMaster = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Throwing Master');
  const spearman = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Spearman');
  const parry = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Parry');
  const criticalHit = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Critical Hit');
  const criticalKick = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Critical Kick');
  const healingHit = currentCharacter.UserClassSkills.find((x) => x.skill.name === 'Healing Hit');

  if (thoughSkin) {
    const addedPercentageDefense = 30 + ((thoughSkin.points - 1) * 10);
    const amountDefenseAdded = (addedPercentageDefense / 100) * newDefense;
    newDefense = Math.round(newDefense + amountDefenseAdded);
  }

  if (resistance) {
    newFR += (resistance.points * 2);
    newPR += (resistance.points * 2);
    newLR += (resistance.points * 2);
    newCR += (resistance.points * 2);
  }

  if (
    swordsman
    && currentCharacter.equipment.mainHand
    && currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Swords'
  ) {
    const newMinAttack = newRegularAttack.min + ((newRegularAttack.min / 100) * (28 + ((swordsman.points - 1) * 5)));
    const newMaxAttack = newRegularAttack.max + ((newRegularAttack.max / 100) * (28 + ((swordsman.points - 1) * 5)));
    const newAr = newRegularAttack.ar + ((newRegularAttack.ar / 100) * (40 + ((swordsman.points - 1) * 8)));
    const newCrit = newRegularAttack.crit + 5 + ((swordsman.points - 1) * 4);
    newRegularAttack = {
      name: 'Attack',
      min: Math.round(newMinAttack),
      max: Math.round(newMaxAttack),
      minThrow: newRegularAttack.minThrow,
      maxThrow: newRegularAttack.maxThrow,
      ar: Math.round(newAr),
      crit: newCrit,
      stun: newRegularAttack.stun,
      parry: newRegularAttack.parry,
      lifeSteal: newRegularAttack.lifeSteal,
      manaSteal: newRegularAttack.manaSteal,
      cost: newRegularAttack.cost,
    };
  }

  if (
    axeman
    && currentCharacter.equipment.mainHand
    && currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Axes'
  ) {
    const newMinAttack = newRegularAttack.min + ((newRegularAttack.min / 100) * (28 + ((axeman.points - 1) * 5)));
    const newMaxAttack = newRegularAttack.max + ((newRegularAttack.max / 100) * (28 + ((axeman.points - 1) * 5)));
    const newAr = newRegularAttack.ar + ((newRegularAttack.ar / 100) * (40 + ((axeman.points - 1) * 8)));
    const newCrit = newRegularAttack.crit + 5 + ((axeman.points - 1) * 4);
    newRegularAttack = {
      name: 'Attack',
      min: Math.round(newMinAttack),
      max: Math.round(newMaxAttack),
      minThrow: newRegularAttack.minThrow,
      maxThrow: newRegularAttack.maxThrow,
      ar: Math.round(newAr),
      crit: newCrit,
      stun: newRegularAttack.stun,
      parry: newRegularAttack.parry,
      lifeSteal: newRegularAttack.lifeSteal,
      manaSteal: newRegularAttack.manaSteal,
      cost: newRegularAttack.cost,
    };
  }

  if (
    maceman
    && currentCharacter.equipment.mainHand
    && (
      currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Maces'
      || currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Scepters'
      || currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Staves'
      || currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Wands'
    )
  ) {
    const newMinAttack = newRegularAttack.min + ((newRegularAttack.min / 100) * (28 + ((maceman.points - 1) * 5)));
    const newMaxAttack = newRegularAttack.max + ((newRegularAttack.max / 100) * (28 + ((maceman.points - 1) * 5)));
    const newAr = newRegularAttack.ar + ((newRegularAttack.ar / 100) * (40 + ((maceman.points - 1) * 8)));
    const newCrit = newRegularAttack.crit + 5 + ((maceman.points - 1) * 4);
    newRegularAttack = {
      name: 'Attack',
      min: Math.round(newMinAttack),
      max: Math.round(newMaxAttack),
      minThrow: newRegularAttack.minThrow,
      maxThrow: newRegularAttack.maxThrow,
      ar: Math.round(newAr),
      crit: newCrit,
      stun: newRegularAttack.stun,
      parry: newRegularAttack.parry,
      lifeSteal: newRegularAttack.lifeSteal,
      manaSteal: newRegularAttack.manaSteal,
      cost: newRegularAttack.cost,
    };
  }

  if (
    spearman
    && currentCharacter.equipment.mainHand
    && currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Spears'
  ) {
    const newMinAttack = newRegularAttack.min + ((newRegularAttack.min / 100) * (28 + ((spearman.points - 1) * 5)));
    const newMaxAttack = newRegularAttack.max + ((newRegularAttack.max / 100) * (28 + ((spearman.points - 1) * 5)));
    const newAr = newRegularAttack.ar + ((newRegularAttack.ar / 100) * (40 + ((spearman.points - 1) * 8)));
    const newCrit = newRegularAttack.crit + 5 + ((spearman.points - 1) * 4);
    newRegularAttack = {
      name: 'Attack',
      min: Math.round(newMinAttack),
      max: Math.round(newMaxAttack),
      minThrow: newRegularAttack.minThrow,
      maxThrow: newRegularAttack.maxThrow,
      ar: Math.round(newAr),
      crit: newCrit,
      stun: newRegularAttack.stun,
      parry: newRegularAttack.parry,
      lifeSteal: newRegularAttack.lifeSteal,
      manaSteal: newRegularAttack.manaSteal,
      cost: newRegularAttack.cost,
    };
  }

  if (
    polearmMaster
    && currentCharacter.equipment.mainHand
    && currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Polearms'
  ) {
    const newMinAttack = newRegularAttack.min + ((newRegularAttack.min / 100) * (28 + ((polearmMaster.points - 1) * 5)));
    const newMaxAttack = newRegularAttack.max + ((newRegularAttack.max / 100) * (28 + ((polearmMaster.points - 1) * 5)));
    const newAr = newRegularAttack.ar + ((newRegularAttack.ar / 100) * (40 + ((polearmMaster.points - 1) * 8)));
    const newCrit = newRegularAttack.crit + 5 + ((polearmMaster.points - 1) * 4);
    newRegularAttack = {
      name: 'Attack',
      min: Math.round(newMinAttack),
      max: Math.round(newMaxAttack),
      minThrow: newRegularAttack.minThrow,
      maxThrow: newRegularAttack.maxThrow,
      ar: Math.round(newAr),
      crit: newCrit,
      stun: newRegularAttack.stun,
      parry: newRegularAttack.parry,
      lifeSteal: newRegularAttack.lifeSteal,
      manaSteal: newRegularAttack.manaSteal,
      cost: newRegularAttack.cost,
    };
  }

  if (
    throwingMaster
    && currentCharacter.equipment.mainHand
    && (
      currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Javelins'
      || currentCharacter.equipment.mainHand.itemBase.itemFamily.itemType.name === 'Throwing'
    )
  ) {
    const newMinAttack = newRegularAttack.min + ((newRegularAttack.min / 100) * (28 + ((throwingMaster.points - 1) * 5)));
    const newMaxAttack = newRegularAttack.max + ((newRegularAttack.max / 100) * (28 + ((throwingMaster.points - 1) * 5)));
    const newMinThrow = newRegularAttack.minThrow + ((newRegularAttack.minThrow / 100) * (28 + ((throwingMaster.points - 1) * 5)));
    const newMaxThrow = newRegularAttack.maxThrow + ((newRegularAttack.maxThrow / 100) * (28 + ((throwingMaster.points - 1) * 5)));
    const newAr = newRegularAttack.ar + ((newRegularAttack.ar / 100) * (40 + ((throwingMaster.points - 1) * 8)));
    const newCrit = newRegularAttack.crit + 5 + ((throwingMaster.points - 1) * 4);
    newRegularAttack = {
      name: 'Attack',
      min: Math.round(newMinAttack),
      max: Math.round(newMaxAttack),
      minThrow: Math.round(newMinThrow),
      maxThrow: Math.round(newMaxThrow),
      ar: Math.round(newAr),
      crit: newCrit,
      stun: newRegularAttack.stun,
      parry: newRegularAttack.parry,
      lifeSteal: newRegularAttack.lifeSteal,
      manaSteal: newRegularAttack.manaSteal,
      cost: newRegularAttack.cost,
    };
  }

  if (parry) {
    newRegularAttack = {
      name: 'Attack',
      min: newRegularAttack.min,
      max: newRegularAttack.max,
      minThrow: newRegularAttack.minThrow,
      maxThrow: newRegularAttack.maxThrow,
      ar: newRegularAttack.ar,
      crit: newRegularAttack.crit,
      stun: newRegularAttack.stun,
      parry: newRegularAttack.parry + 5 + (parry.points - 1),
      lifeSteal: newRegularAttack.lifeSteal,
      manaSteal: newRegularAttack.manaSteal,
      cost: newRegularAttack.cost,
    };
  }

  if (criticalKick) {
    const addCrit = newRegularAttack.crit + 5 + (criticalKick.points);
    newKick = {
      name: 'Kick',
      attackType: newKick.attackType,
      min: newKick.min,
      max: newKick.max,
      ar: newKick.ar,
      crit: newKick.crit + addCrit,
      lifeSteal: newKick.lifeSteal,
      manaSteal: newKick.manaSteal,
      cost: 0,
    };
  }

  if (criticalHit) {
    const newCrit = newRegularAttack.crit + 5 + (criticalHit.points);
    newRegularAttack = {
      name: 'Attack',
      min: newRegularAttack.min,
      max: newRegularAttack.max,
      minThrow: newRegularAttack.minThrow,
      maxThrow: newRegularAttack.maxThrow,
      ar: newRegularAttack.ar,
      crit: newCrit,
      stun: newRegularAttack.stun,
      parry: newRegularAttack.parry,
      lifeSteal: newRegularAttack.lifeSteal,
      manaSteal: newRegularAttack.manaSteal,
      cost: newRegularAttack.cost,
    };
  }

  if (healingHit) {
    const newLifeSteal = newRegularAttack.lifeSteal + 1 + ((healingHit.points - 1) * 0.5);
    newRegularAttack = {
      name: 'Attack',
      min: newRegularAttack.min,
      max: newRegularAttack.max,
      minThrow: newRegularAttack.minThrow,
      maxThrow: newRegularAttack.maxThrow,
      ar: newRegularAttack.ar,
      crit: newRegularAttack.crit,
      stun: newRegularAttack.stun,
      parry: newRegularAttack.parry,
      lifeSteal: Math.round(newLifeSteal),
      // lifeSteal: Math.round(50), // temp testing
      manaSteal: newRegularAttack.manaSteal,
      cost: newRegularAttack.cost,
    };
    const newKickLifeSteal = newRegularAttack.lifeSteal + 1 + ((healingHit.points - 1) * 0.5);
    newKick = {
      name: 'Kick',
      attackType: newKick.attackType,
      min: newKick.min,
      max: newKick.max,
      ar: newKick.ar,
      crit: newKick.crit,
      lifeSteal: Math.round(50), // temp testing
      // lifeSteal: Math.round(newKickLifeSteal),
      manaSteal: newKick.manaSteal,
      cost: 0,
    };
  }

  return [
    newDefense, // Defense
    newRegularAttack, // Regular Attack
    newKick, // Kick
    newFR, // Fire resistance
    newPR, // Poison Resistance
    newLR, // Lightning Resitance
    newCR, // Cold Resistance
  ];
};

export default calculatePassivesBarb;
