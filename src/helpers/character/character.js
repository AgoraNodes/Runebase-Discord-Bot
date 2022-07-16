import {
  Op,
} from "sequelize";
import db from '../../models';

// ARGUMENTS //
// userId: discord user id,
// needInventory: true || false
export const fetchUserCurrentCharacter = async (
  userId,
  needInventory,
  t = false,
) => {
  const user = await db.user.findOne({
    where: {
      user_id: userId,
    },
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });
  const userCurrentCharacter = await db.UserGroupClass.findOne({
    where: {
      // classId: { [Op.col]: 'user.currentClassId' },
      classId: user.currentClassId,
      // groupId: user.currentRealmId,
    },
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
    include: [
      {
        model: db.UserGroup,
        as: 'UserGroup',
        required: true,
        where: {
          groupId: user.currentRealmId,
        },
        include: [
          {
            model: db.rank,
            as: 'ranks',
          },
          {
            model: db.user,
            as: 'user',
            where: {
              user_id: `${userId}`,
            },
            include: [
              {
                model: db.class,
                as: 'currentClass',
              },
            ],
          },
        ],
      },
      {
        model: db.buff,
        as: 'buffs',
        separate: true,
      },
      {
        model: db.debuff,
        as: 'debuffs',
        separate: true,
      },
      {
        model: db.UserGroupClassSkill,
        as: 'UserGroupClassSkills',
        include: [
          {
            model: db.skill,
            as: 'skill',
          },
        ],
        separate: true,
      },
      {
        model: db.class,
        as: 'class',
        include: [
          {
            model: db.skillTree,
            as: 'skillTrees',
            separate: true,
            include: [
              {
                model: db.skill,
                as: 'skills',
                include: [
                  {
                    model: db.skill,
                    as: 'PreviousSkill',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        model: db.stats,
        as: 'stats',
      },
      {
        model: db.condition,
        as: 'condition',
      },
      {
        model: db.equipment,
        as: 'equipment',
        include: [
          {
            model: db.item,
            as: 'helm',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'amulet',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'mainHand',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'offHand',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'armor',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'gloves',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'boots',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'belt',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'ringSlotOne',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'ringSlotTwo',
            required: false,
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
        ],
      },
      ...(needInventory ? [{
        model: db.inventory,
        as: 'inventory',
        include: [
          {
            model: db.item,
            as: 'items',
            required: false,
            separate: true,
            order: [
              ['updatedAt', 'DESC'],
            ],
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
        ],
      }] : []),
    ],
  });
  // console.log(userCurrentCharacter);
  return userCurrentCharacter;
};
