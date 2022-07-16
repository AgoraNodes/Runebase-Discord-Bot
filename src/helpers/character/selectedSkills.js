import db from '../../models';

// ARGUMENTS //
// userId: discord user id,
// needInventory: true || false
export const fetchUserCurrentSelectedSkills = async (
  userId,
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
  const userCurrentSelectedSkill = await db.UserGroupClass.findOne({
    where: {
      // classId: { [Op.col]: 'user.currentClassId' },
      classId: user.currentClassId,
      // userId: user.id,
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
      },
      {
        model: db.UserGroupClassSkill,
        as: 'selectedMainSkill',
        include: [
          {
            model: db.skill,
            as: 'skill',
            include: [
              {
                model: db.skillTree,
                as: 'skillTree',
                include: [
                  {
                    model: db.class,
                    as: 'class',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        model: db.UserGroupClassSkill,
        as: 'selectedSecondarySkill',
        include: [
          {
            model: db.skill,
            as: 'skill',
            include: [
              {
                model: db.skillTree,
                as: 'skillTree',
                include: [
                  {
                    model: db.class,
                    as: 'class',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  console.log(userCurrentSelectedSkill);
  return userCurrentSelectedSkill;
};
