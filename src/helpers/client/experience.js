/* eslint-disable no-restricted-syntax */
import { Op } from "sequelize";
import db from "../../models";
import {
  levelUpMessage,
  grantRoleExpMessage,
} from '../../messages';
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
        embeds: [
          grantRoleExpMessage(
            userDiscordIdArray.length,
            filteredMessage[3],
            amount,
          ),
        ],
      });
    }
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
  const user = await db.user.findOne({
    where: {
      user_id: userId,
    },
    transaction: t,
    lock: t.LOCK.UPDATE,
  });
  const updatedUser = await user.update({
    exp: user.exp + amount,
  }, {
    transaction: t,
    lock: t.LOCK.UPDATE,
  });
  const setting = await db.setting.findOne();
  const discordChannel = await discordClient.channels.cache.get(setting.expRewardChannelId);
  await handleExperienceMessage(
    discordChannel,
    updatedUser,
    amount,
    gainExpType,
    userJoined,
  );

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
    const guild = await discordClient.guilds.cache.get(setting.discordHomeServerGuildId);
    const member = await guild.members.cache.get(updatedUser.user_id);
    if (!member.roles.cache.has(currentRank.discordRankRoleId)) {
      await member.roles.add(currentRank.discordRankRoleId);
      await discordChannel.send({
        embeds: [
          levelUpMessage(
            updatedUser.user_id,
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
};
