/* eslint-disable import/prefer-default-export */
import {
  Transaction,
  Op,
} from "sequelize";
import {
  alreadyVotedTopGG,
} from '../embeds';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { gainExp } from "../helpers/client/experience";

export const discordTopggVote = async (
  discordClient,
  message,
  io,
) => {
  const activity = [];
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const [
      user,
      userActivity,
    ] = await userWalletExist(
      message,
      'topggvote',
      t,
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

    const topggVoteRecord = await db.topggVote.findOne({
      where: {
        userId: user.id,
        createdAt: {
          [Op.gt]: new Date(Date.now() - (12 * 60 * 60 * 1000)),
        },
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (topggVoteRecord) {
      const setting = await db.setting.findOne();
      const findGroupToPost = await db.group.findOne({
        where: {
          groupId: setting.discordHomeServerGuildId,
        },
      });
      const discordChannel = await discordClient.channels.cache.get(findGroupToPost.expRewardChannelId);
      await discordChannel.send({
        content: `<@${user.user_id}>`,
        embeds: [
          alreadyVotedTopGG(
            user.user_id,
          ),
        ],
      });
      return;
    }

    const newTopggRecord = await db.topggVote.create({
      userId: user.id,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    const newExp = await gainExp(
      discordClient,
      message.user,
      16,
      'topggVote',
      t,
    );

    const preActivity = await db.activity.create({
      type: 'topggvote_s',
      earnerId: user.id,
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
    try {
      await db.error.create({
        type: 'topggvote',
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
};
