import db from "../../models";
import {
  gainExpMessage,
  levelUpMessage,
} from '../../messages';

const { Op } = require("sequelize");

export const gainExp = async (
  discordClient,
  userId,
  amount,
  t,
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
  await discordChannel.send({
    content: `<@${updatedUser.user_id}>`,
    embeds: [
      gainExpMessage(
        updatedUser.user_id,
        amount,
      ),
    ],
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

  const guild = discordClient.guilds.cache.get(setting.discordHomeServerGuildId);
  const member = guild.members.cache.get(updatedUser.user_id);

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
};
