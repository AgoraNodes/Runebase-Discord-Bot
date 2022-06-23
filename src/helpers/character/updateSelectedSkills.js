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

  const userToUpdate = await db.UserClass.findOne({
    where: {
      classId: user.currentClassId,
      userId: user.id,
    },
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
  });

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

  const userCurrentSelectedSkill = await db.UserClass.findOne({
    where: {
      // classId: { [Op.col]: 'user.currentClassId' },
      classId: user.currentClassId,
      userId: user.id,
    },
    ...(t && [
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      }]
    ),
    include: [
      {
        model: db.UserClassSkill,
        as: 'UserClassSkills',
        include: [
          {
            model: db.skill,
            as: 'skill',
          },
        ],
      },
      {
        model: db.UserClassSkill,
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
        model: db.UserClassSkill,
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
  return userCurrentSelectedSkill;
};
