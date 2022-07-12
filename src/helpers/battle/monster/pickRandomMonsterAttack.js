const pickRandomMonsterAttack = (
  remainingMonster,
) => {
  // console.log(remainingMonster.monster.monsterAttacks);
  let pickedMonsterAttack = remainingMonster.monster.monsterAttacks.find((x) => x.defaultAttack === true);
  const nonDefaultMonsterAttacks = remainingMonster.monster.monsterAttacks.filter((filterAttack) => filterAttack.defaultAttack === false);
  // console.log(nonDefaultMonsterAttacks);
  // Pick a non-default monster attack based on % chance
  let roll = Math.random();
  for (let i = 0, len = nonDefaultMonsterAttacks.length; i < len; i += 1) {
    const { chance } = nonDefaultMonsterAttacks[parseInt(i, 10)];
    // log(chance);
    if (roll < (chance / 100)) {
      pickedMonsterAttack = nonDefaultMonsterAttacks[parseInt(i, 10)];
      break;
    }
    roll -= chance;
  }
  return [
    pickedMonsterAttack,
  ];
};
export default pickRandomMonsterAttack;
