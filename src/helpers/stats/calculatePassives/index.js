import calculatePassivesBarb from './barb';

const calculatePassives = async (
  currentCharacter,
  defense,
  regularAttack,
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
  if (currentCharacter.class.name === 'Barbarian') {
    [
      newDefense, // Defense
      newRegularAttack,
      newFR, // Fire resistance
      newPR, // Poison Resistance
      newLR, // Lightning Resitance
      newCR, // Cold Resistance
    ] = await calculatePassivesBarb(
      currentCharacter,
      newDefense,
      newRegularAttack,
      newFR, // Fire resistance
      newPR, // Poison Resistance
      newLR, // Lightning Resitance
      newCR, // Cold Resistance
    );
  }
  return [
    newDefense, // Defense
    newRegularAttack, // Regular Attack
    newFR, // Fire resistance
    newPR, // Poison Resistance
    newLR, // Lightning Resitance
    newCR, // Cold Resistance
  ];
};

export default calculatePassives;
