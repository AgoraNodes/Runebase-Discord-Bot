import db from '../models';

// Should be keep the user condition on redis? real time buffer on RAM <- Breaking changes
export const replenishEveryonesStamina = async () => {
  const allUserCharacters = await db.UserGroupClass.findAll({
    include: [
      {
        model: db.class,
        as: 'class',
      },
      {
        model: db.stats,
        as: 'stats',
      },
      {
        model: db.condition,
        as: 'condition',
      },
    ],
  });
  // eslint-disable-next-line no-restricted-syntax
  for (const userChar of allUserCharacters) {
    console.log(userChar.condition);
    if (userChar.condition) {
      if ((userChar.class.stamina + userChar.stats.stamina) > userChar.condition.stamina) {
        // eslint-disable-next-line no-await-in-loop
        await userChar.condition.update({
          stamina: userChar.class.stamina + userChar.stats.stamina,
        });
      }
    }
  }
};
