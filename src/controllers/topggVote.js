/* eslint-disable import/prefer-default-export */
import { Transaction, Op } from "sequelize";
import {
  alreadyVotedTopGG,
  cannotSendMessageUser,
  discordErrorMessage,
} from '../messages';
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
      t,
      'topggvote',
    );
    if (userActivity) {
      console.log('user not found');
      activity.unshift(userActivity);
    }
    if (!user) return;

    console.log(new Date(Date.now() - (12 * 60 * 60 * 1000)));
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
    console.log('after topgg voteRecord');
    console.log(topggVoteRecord);
    if (topggVoteRecord) {
      console.log('record found skip voting');
      const setting = await db.setting.findOne();
      const discordChannel = await discordClient.channels.cache.get(setting.expRewardChannelId);
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
    console.log('after record create');

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
    logger.error(`Error Discord topggvote Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "TopggVote",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      } else {
        await message.channel.send({
          embeds: [
            cannotSendMessageUser(
              "TopggVote",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      }
    } else if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordChannel = await discordClient.channels.cache.get(message.channelId);
      await discordChannel.send({
        embeds: [
          discordErrorMessage(
            "TopggVote",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "TopggVote",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    }
  });

  if (activity.length > 0) {
    io.to('admin').emit('updateActivity', {
      activity,
    });
  }
};
