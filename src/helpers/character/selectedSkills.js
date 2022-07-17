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

  console.log(user.currentRealmId);
  console.log('current realm id');
  console.log(user.currentClassId);
  console.log('current class id');
  let userCurrentSelectedSkill;
  if (
    user.currentRealmId
    && user.currentClassId
  ) {
    userCurrentSelectedSkill = await db.UserGroupClass.findOne({
      where: {
        classId: user.currentClassId,
        '$UserGroup.groupId$': user.currentRealmId,
        '$UserGroup.userId$': user.id,
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
          // where: {
          //   groupId: user.currentRealmId,
          //   userId: user.id,
          // },
          include: [
            {
              model: db.group,
              as: 'group',
            },
            {
              model: db.user,
              as: 'user',
            },
          ],
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
  }

  console.log(userCurrentSelectedSkill);
  console.log(userCurrentSelectedSkill.UserGroup);
  return userCurrentSelectedSkill;
};
