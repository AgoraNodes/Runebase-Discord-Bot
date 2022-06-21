import {
  Transaction,
  Sequelize,
  Op,
} from "sequelize";
import db from '../../models';
import logger from "../logger";
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../../messages';

export const addSkillPoint = async (
  userCurrentCharacter,
  skillToAddId,
  io,
  queue,
) => {
  const activity = [];
  let failAddSkillReason;
  await queue.add(async () => {
    await db.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    }, async (t) => {
      const findUserRank = await db.UserRank.findOne({
        where: {
          userId: userCurrentCharacter.user.id,
        },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      const sumOfSkills = await db.UserClassSkill.findAll({
        attributes: [
          'userClassId',
          [Sequelize.fn('sum', Sequelize.col('points')), 'totalSpendPoints'],
        ],
        where: {
          userClassId: userCurrentCharacter.id,
        },
        group: ['userClassId'],
        raw: true,
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      if (!findUserRank) {
        failAddSkillReason = 'Unable to add skills, user has no rank!';
        return;
      }
      if (findUserRank.id >= sumOfSkills && sumOfSkills.length !== 0) {
        failAddSkillReason = 'User already spend all of the skillpoints!';
        return;
      }
      const findSkillToAdd = await db.skill.findOne({
        where: {
          id: skillToAddId,
        },
        include: [
          {
            model: db.skill,
            as: 'PreviousSkill',
          },
        ],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      if (findUserRank.rankId < findSkillToAdd.level) {
        failAddSkillReason = 'Unable to add, user has insuffiecent level!';
        return;
      }

      const findUserSkillToAdd = await db.UserClassSkill.findOne({
        where: {
          userClassId: userCurrentCharacter.id,
          skillId: skillToAddId,
        },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      if (findUserSkillToAdd && findUserSkillToAdd.points >= 20) {
        failAddSkillReason = 'skill already maxed out!';
        return;
      }

      const findAllUserSkills = await db.UserClassSkill.findAll({
        where: {
          userClassId: userCurrentCharacter.id,
        },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      let userHasPreviousSkills = true;
      // check if user has the previous skills
      if (findSkillToAdd.PreviousSkill.length === 1) {
        const userHasSkillOne = findAllUserSkills.find((o) => o.skillId === findSkillToAdd.PreviousSkill[0].id);
        if (!userHasSkillOne) {
          userHasPreviousSkills = false;
        }
      }

      if (findSkillToAdd.PreviousSkill.length === 2) {
        const userHasSkillOne = findAllUserSkills.find((o) => o.skillId === findSkillToAdd.PreviousSkill[0].id);
        const userHasSkillTwo = findAllUserSkills.find((o) => o.skillId === findSkillToAdd.PreviousSkill[1].id);
        if (!userHasSkillOne || !userHasSkillTwo) {
          userHasPreviousSkills = false;
        }
      }
      if (!userHasPreviousSkills) {
        failAddSkillReason = 'user doesnt have the prerequisite skills!';
        return;
      }
      if (!findUserSkillToAdd) {
        await db.UserClassSkill.create({
          UserClassId: userCurrentCharacter.id,
          skillId: skillToAddId,
          points: 1,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
      } else {
        await findUserSkillToAdd.update({
          points: findUserSkillToAdd.points + 1,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
      }

      const preActivity = await db.activity.create({
        type: 'destroyItem_s',
        earnerId: userCurrentCharacter.user.id,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const finalActivity = await db.activity.findOne({
        where: {
          id: preActivity.id,
        },
        include: [
          {
            model: db.user,
            as: 'earner',
          },
        ],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      activity.unshift(finalActivity);
    }).catch(async (err) => {
      console.log(err);
      try {
        await db.error.create({
          type: 'addSkillPoint',
          error: `${err}`,
        });
      } catch (e) {
        logger.error(`Error Discord: ${e}`);
      }
    });
    if (activity.length > 0) {
      io.to('admin').emit('updateActivity', {
        activity,
      });
    }
  });

  const myUpdatedUser = await db.UserClass.findOne({
    where: {
      classId: userCurrentCharacter.user.currentClassId,
    },
    include: [
      {
        model: db.UserClassSkill,
        as: 'UserClassSkills',
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
        model: db.user,
        as: 'user',
        where: {
          id: `${userCurrentCharacter.user.id}`,
        },
        include: [
          {
            model: db.class,
            as: 'currentClass',
          },
          {
            model: db.rank,
            as: 'ranks',
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
      },
      {
        model: db.inventory,
        as: 'inventory',
        include: [
          {
            model: db.item,
            as: 'items',
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
    ],
  });

  return [
    myUpdatedUser,
    failAddSkillReason,
  ];
};
