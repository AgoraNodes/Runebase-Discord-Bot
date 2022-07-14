import calculatePassivesWarrior from './warrior';

const calculatePassives = async (
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
  let newKick = kick;
  let newFR = FR;
  let newPR = PR;
  let newLR = LR;
  let newCR = CR;
  if (currentCharacter.class.name === 'Warrior') {
    [
      newDefense, // Defense
      newRegularAttack,
      newKick,
      newFR, // Fire resistance
      newPR, // Poison Resistance
      newLR, // Lightning Resitance
      newCR, // Cold Resistance
    ] = await calculatePassivesWarrior(
      currentCharacter,
      newDefense,
      newRegularAttack,
      newKick,
      newFR, // Fire resistance
      newPR, // Poison Resistance
      newLR, // Lightning Resitance
      newCR, // Cold Resistance
    );
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

export default calculatePassives;
