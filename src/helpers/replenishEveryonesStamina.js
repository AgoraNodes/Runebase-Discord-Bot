import db from '../models';

export const replenishEveryonesStamina = async () => {
  const allUserCharacters = await db.UserClass.findAll({
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
    if ((userChar.class.stamina + userChar.stats.stamina) > userChar.condition.stamina) {
      // eslint-disable-next-line no-await-in-loop
      await userChar.condition.update({
        stamina: userChar.class.stamina + userChar.stats.stamina,
      });
    }
  }
};
