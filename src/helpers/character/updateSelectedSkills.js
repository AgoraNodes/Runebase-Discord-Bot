import db from '../../models';

// ARGUMENTS //
// userId: discord user id,
// needInventory: true || false
export const updateUserCurrentSelectedSkills = async (
  userId,
  mainSkillId = false,
  secondSkillId = false,
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
  console.log('1');
  const userToUpdate = await db.UserGroupClass.findOne({
    where: {
      classId: user.currentClassId,
    },
    include: [
      {
        model: db.UserGroup,
        as: 'UserGroup',
        required: true,
        where: {
          groupId: user.currentRealmId,
          userId: user.id,
        },
      },
    ],
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });
  console.log('2');
  if (secondSkillId) {
    await userToUpdate.update({
      selectedSecondarySkillId: secondSkillId,
    }, {
      ...(t && [
        {
          lock: t.LOCK.UPDATE,
          transaction: t,
        }]
      ),
    });
  }

  if (mainSkillId) {
    await userToUpdate.update({
      selectedMainSkillId: mainSkillId,
    }, {
      ...(t && [
        {
          lock: t.LOCK.UPDATE,
          transaction: t,
        }]
      ),
    });
  }
  console.log('3');
  const userCurrentSelectedSkill = await db.UserGroupClass.findOne({
    where: {
      classId: user.currentClassId,
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
          userId: user.id,
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
  console.log('done');
  return userCurrentSelectedSkill;
};
