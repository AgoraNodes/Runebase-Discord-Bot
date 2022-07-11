const calculateUserRetaliation = (
  userCurrentCharacter,
  monsterId,
) => {
  const retaliate = [];

  if (userCurrentCharacter.class.name === 'Barbarian') {
    const barbRetaliation = userCurrentCharacter.UserClassSkills.find((x) => x.skill.name === 'Retaliate');
    const barbRetaliationChance = 5 + ((barbRetaliation.points - 1) * 2);
    // const barbRetaliationChance = 100;

    if (barbRetaliation) {
      const didWeRetaliate = Math.random() < Number(barbRetaliationChance) / 100;
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
