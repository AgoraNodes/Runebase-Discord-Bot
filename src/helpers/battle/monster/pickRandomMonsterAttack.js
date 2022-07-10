const pickRandomMonsterAttack = (
  remainingMonster,
) => {
  let pickedMonsterAttack = remainingMonster.monster.monsterAttacks.find((x) => x.defaultAttack === true);
  const nonDefaultMonsterAttacks = remainingMonster.monster.monsterAttacks.filter((filterAttack) => filterAttack.defaultAttack === false);
  console.log(nonDefaultMonsterAttacks);
  // Pick a non-default monster attack based on % chance
  let roll = Math.random();
  for (let i = 0, len = nonDefaultMonsterAttacks.length; i < len; ++i) {
    const { chance } = nonDefaultMonsterAttacks[i];
    console.log(chance);
    if (roll < (chance / 100)) {
      pickedMonsterAttack = nonDefaultMonsterAttacks[i];
      break;
    }
    roll -= chance;
  }
  return [
    pickedMonsterAttack,
  ];
};
export default pickRandomMonsterAttack;
