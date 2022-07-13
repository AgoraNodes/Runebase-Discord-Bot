import db from "../models";

const reFetchBattle = async (
  battle,
  t,
) => {
  const updatedBattle = await db.battle.findOne({
    where: {
      id: battle.id,
    },
    order: [
      [db.battleLog, 'id', 'DESC'],
      [db.BattleMonster, 'id', 'DESC'],
    ],
    include: [
      {
        model: db.battleLog,
        as: 'battleLogs',
        required: false,
      },
      {
        model: db.BattleMonster,
        as: 'BattleMonsters',
        include: [
          {
            model: db.buff,
            as: 'buffs',
          },
          {
            model: db.debuff,
            as: 'debuffs',
          },
          {
            model: db.monster,
            as: 'monster',
            include: [
              {
                model: db.monsterAttack,
                as: 'monsterAttacks',
                include: [
                  {
                    model: db.damageType,
                    as: 'damageType',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });
  return updatedBattle;
};

export default reFetchBattle;
