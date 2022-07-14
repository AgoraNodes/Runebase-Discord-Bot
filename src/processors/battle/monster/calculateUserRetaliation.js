const calculateUserRetaliation = (
  userCurrentCharacter,
  monsterId,
) => {
  const retaliate = [];

  if (userCurrentCharacter.class.name === 'Warrior') {
    const warriorRetaliation = userCurrentCharacter.UserClassSkills.find((x) => x.skill.name === 'Retaliate');

    if (warriorRetaliation) {
      const warriorRetaliationChance = 5 + ((warriorRetaliation.points - 1) * 2);
      // const warriorRetaliationChance = 100;
      const didWeRetaliate = Math.random() < Number(warriorRetaliationChance) / 100;
      if (didWeRetaliate) {
        retaliate.push({
          monsterId,
          attack: 'Kick',
        });
      }
    }
  }

  return retaliate;
};

export default calculateUserRetaliation;
