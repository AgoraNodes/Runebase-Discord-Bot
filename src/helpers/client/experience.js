/* eslint-disable no-restricted-syntax */
import { Op } from "sequelize";
import db from "../../models";
import {
  levelUpMessage,
  grantRoleExpMessage,
} from '../../embeds';
import { handleExperienceMessage } from './messageHandlers/expierenceMessageHandler';

export const gainMultiExp = async (
  discordClient,
  users,
  filteredMessage,
  amount,
  t,
) => {
  const userDiscordIdArray = [];
  const usersLeveledUp = [];
  const setting = await db.setting.findOne();
  const discordChannel = await discordClient.channels.cache.get(setting.expRewardChannelId);
  const guild = await discordClient.guilds.cache.get(setting.discordHomeServerGuildId);
  for await (const user of users) {
    const findUser = await db.user.findOne({
      where: {
        user_id: user.user_id,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    const updatedUser = await findUser.update({
      exp: findUser.exp + amount,
    }, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    const currentRank = await db.rank.findOne({
      where: {
        expNeeded: {
          [Op.lte]: updatedUser.exp,
        },
      },
      order: [
        ['id', 'DESC'],
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    const allRanks = await db.rank.findAll({
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (currentRank) {
      const member = await guild.members.cache.get(updatedUser.user_id);
      if (!member.roles.cache.has(currentRank.discordRankRoleId)) {
        await member.roles.add(currentRank.discordRankRoleId);
        usersLeveledUp.push({
          user_id: updatedUser.user_id,
          rank: currentRank,
        });
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const rank of allRanks) {
        if (currentRank.id !== rank.id) {
          if (member.roles.cache.has(rank.discordRankRoleId)) {
            // eslint-disable-next-line no-await-in-loop
            await member.roles.remove(rank.discordRankRoleId);
          }
        }
      }
      const userRankRecord = await db.UserRank.findOne({
        where: {
          userId: updatedUser.id,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!userRankRecord) {
        await db.UserRank.create({
          userId: updatedUser.id,
          rankId: currentRank.id,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      } else if (currentRank.id !== userRankRecord.rankId) {
        await userRankRecord.update({
          rankId: currentRank.id,
        }, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }
    }
    userDiscordIdArray.push(`<@${updatedUser.user_id}>`);
  }
  if (userDiscordIdArray.length > 0) {
    const newStringListUsers = userDiscordIdArray.join(", ");
    const cutStringListUsers = newStringListUsers.match(/.{1,1999}(\s|$)/g);
    for (const element of cutStringListUsers) {
      // eslint-disable-next-line no-await-in-loop
      await discordChannel.send({
        content: element,
      });
    }
    await discordChannel.send({
      embeds: [
        grantRoleExpMessage(
          userDiscordIdArray.length,
          filteredMessage[3],
          amount,
        ),
      ],
    });
  }
  if (usersLeveledUp.length > 0) {
    for await (const userUp of usersLeveledUp) {
      await discordChannel.send({
        embeds: [
          levelUpMessage(
            userUp.user_id,
            userUp.rank,
          ),
        ],
      });
    }
  }
};

export const gainExp = async (
  discordClient,
  userId,
  amount,
  gainExpType,
  t,
  userJoined = false,
) => {
  let UserGroup;
  const setting = await db.setting.findOne({
    transaction: t,
    lock: t.LOCK.UPDATE,
  });
  const user = await db.user.findOne({
    where: {
      user_id: userId,
    },
    transaction: t,
    lock: t.LOCK.UPDATE,
  });
  if (
    gainExpType === 'userJoined'
    || gainExpType === 'topggVote'
    || gainExpType === 'activeTalker'
    || gainExpType === 'rollDice'
  ) {
    UserGroup = await db.UserGroup.findOne({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: db.group,
          as: 'group',
          required: true,
          where: {
            groupId: setting.discordHomeServerGuildId,
          },
        },
        {
          model: db.user,
          as: 'user',
        },
      ],
    });
  } else {
    UserGroup = await db.UserGroup.findOne({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: db.group,
          as: 'group',
          required: true,
          where: {
            id: user.currentRealmId,
          },
        },
        {
          model: db.user,
          as: 'user',
        },
      ],
    });
  }
  console.log(UserGroup);
  const server = discordClient.guilds.cache.get(UserGroup.group.groupId);
  if (!server.members.cache.get(userId)) {
    // TODO: Send a warning message?
    // Record an error in the database
    console.log('user left the discord realm server');
    return;
  }
  const updatedUserGroup = await UserGroup.update({
    exp: UserGroup.exp + amount,
  }, {
    transaction: t,
    lock: t.LOCK.UPDATE,
  });
  const discordChannel = await discordClient.channels.cache.get(UserGroup.group.expRewardChannelId);
  await handleExperienceMessage(
    discordChannel,
    updatedUserGroup,
    amount,
    gainExpType,
    userJoined,
  );

  const currentRank = await db.rank.findOne({
    where: {
      expNeeded: {
        [Op.lte]: updatedUserGroup.exp,
      },
      groupId: updatedUserGroup.groupId,
    },
    order: [
      ['id', 'DESC'],
    ],
    transaction: t,
    lock: t.LOCK.UPDATE,
  });
  const allRanks = await db.rank.findAll({
    where: {
      groupId: updatedUserGroup.groupId,
    },
    transaction: t,
    lock: t.LOCK.UPDATE,
  });

  if (currentRank) {
    const guild = await discordClient.guilds.cache.get(updatedUserGroup.group.groupId);
    const member = await guild.members.cache.get(updatedUserGroup.user.user_id);
    if (!member.roles.cache.has(currentRank.discordRankRoleId)) {
      await member.roles.add(currentRank.discordRankRoleId);
      await discordChannel.send({
        embeds: [
          levelUpMessage(
            updatedUserGroup.user.user_id,
            currentRank,
          ),
        ],
      });
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const rank of allRanks) {
      if (currentRank.id !== rank.id) {
        if (member.roles.cache.has(rank.discordRankRoleId)) {
          // eslint-disable-next-line no-await-in-loop
          await member.roles.remove(rank.discordRankRoleId);
        }
      }
    }
    const userGroupRankRecord = await db.UserGroupRank.findOne({
      where: {
        UserGroupId: updatedUserGroup.id,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!userGroupRankRecord) {
      await db.UserGroupRank.create({
        UserGroupId: updatedUserGroup.id,
        rankId: currentRank.id,
      }, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
    } else if (currentRank.id !== userGroupRankRecord.rankId) {
      await userGroupRankRecord.update({
        rankId: currentRank.id,
      }, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
    }
  }
};
