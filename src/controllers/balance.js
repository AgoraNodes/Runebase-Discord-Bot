import { Transaction } from "sequelize";
import {
  warnDirectMessage,
  balanceMessage,
  discordErrorMessage,
  cannotSendMessageUser,
} from '../embeds';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";

export const discordBalance = async (
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
      'balance',
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

    const priceInfo = await db.currency.findOne({
      where: {
        iso: 'USD',
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordUser = await discordClient.users.cache.get(message.user.id);
      if (message.guildId) {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            balanceMessage(
              user.user_id,
              user,
              priceInfo,
            ),
          ],
        });
      } else {
        await discordUser.send({
          embeds: [
            balanceMessage(
              user.user_id,
              user,
              priceInfo,
            ),
          ],
        });
      }
    } else {
      if (message.channel.type === 'DM') {
        await message.author.send({
          embeds: [
            balanceMessage(
              user.user_id,
              user,
              priceInfo,
            ),
          ],
        });
      }
      if (message.channel.type === 'GUILD_TEXT') {
        await message.channel.send({
          embeds: [
            balanceMessage(
              user.user_id,
              user,
              priceInfo,
            ),
          ],
        });
      }
    }

    const createActivity = await db.activity.create({
      type: 'balance_s',
      earnerId: user.id,
      earner_balance: user.wallet.available + user.wallet.locked,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    const findActivity = await db.activity.findOne({
      where: {
        id: createActivity.id,
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
    activity.unshift(findActivity);

    t.afterCommit(() => {
      console.log('done balance request');
    });
  }).catch(async (err) => {
    try {
      await db.error.create({
        type: 'balance',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    logger.error(`Error Discord Balance Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "Balance",
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
              "Balance",
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
            "Balance",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "Balance",
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
