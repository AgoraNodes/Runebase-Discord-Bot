const selectAttack = (
  userState,
  attackUsed,
  attackOne,
  attackTwo,
  regularAttack,
) => {
  let useAttack;
  if (attackUsed === 'main') {
    if (userState.condition.mana >= attackOne.cost) {
      useAttack = attackOne;
    } else {
      useAttack = regularAttack;
    }
  }
  if (attackUsed === 'secondary') {
    if (userState.condition.mana >= attackTwo.cost) {
      useAttack = attackTwo;
    } else {
      useAttack = regularAttack;
    }
  }
  return useAttack;
};
export default selectAttack;
