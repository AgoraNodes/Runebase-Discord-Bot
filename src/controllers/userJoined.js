/* eslint-disable import/prefer-default-export */
import { Transaction, Op } from "sequelize";
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { gainExp } from "../helpers/client/experience";

export const discordUserJoined = async (
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
      'userJoined',
    );
    if (userActivity) {
      console.log('user not found');
      activity.unshift(userActivity);
    }
    if (!user) return;

    const userJoinedRecord = await db.userJoined.findOne({
      where: {
        userJoinedId: user.id,
        rewarded: false,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (userJoinedRecord) {
      const invitedBy = await db.user.findOne({
        where: {
          id: userJoinedRecord.userInvitedById,
        },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      if (invitedBy) {
        const updatedInvitedBy = await invitedBy.update({
          totalInvitedUsersCount: invitedBy.totalInvitedUsersCount + 1,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        const updatedUserJoinedRecord = await userJoinedRecord.update({
          rewarded: true,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        const newExp = await gainExp(
          discordClient,
          invitedBy.user_id,
          25,
          'userJoined',
          t,
          user.user_id,
        );
      }
      const preActivity = await db.activity.create({
        type: 'userJoined_s',
        earnerId: invitedBy.id,
        spenderId: user.id,
        userJoinedId: userJoinedRecord.id,
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
    }
  }).catch(async (err) => {
    try {
      await db.error.create({
        type: 'userJoined',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    // logger.error(`Error Discord userJoined Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "userJoined",
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
              "userJoined",
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
            "userJoined",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "userJoined",
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
