/* eslint-disable import/prefer-default-export */
import { Transaction } from "sequelize";
import {
  ChannelType,
  InteractionType,
} from 'discord.js';
import db from '../models';
import {
  invalidAddressMessage,
  reviewMessage,
  warnDirectMessage,
  discordErrorMessage,
  cannotSendMessageUser,
  unableToWithdrawToSelfMessage,
} from '../embeds';
import logger from "../helpers/logger";
import { validateAmount } from "../helpers/client/validateAmount";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { validateWithdrawalAddress } from '../helpers/blockchain/validateWithdrawalAddress';
import { disallowWithdrawToSelf } from '../helpers/withdraw/disallowWithdrawToSelf';
import { createOrUseExternalWithdrawAddress } from '../helpers/withdraw/createOrUseExternalWithdrawAddress';

export const discordWithdraw = async (
  discordClient,
  message,
  filteredMessage,
  setting,
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
      'withdraw',
      t,
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

    const [
      validAmount,
      activityValiateAmount,
      amount,
    ] = await validateAmount(
      discordClient,
      message,
      t,
      filteredMessage[3],
      user,
      setting,
      'withdraw',
    );
    if (!validAmount) {
      activity.unshift(activityValiateAmount);
      return;
    }

    const [
      isInvalidAddress,
      isNodeOffline,
      failWithdrawalActivity,
    ] = await validateWithdrawalAddress(
      filteredMessage[2],
      user,
      t,
    );

    if (isNodeOffline) {
      await message.author.send('Runebase node offline');
    }

    if (isInvalidAddress) {
      await message.author.send({
        embeds: [
          invalidAddressMessage(
            message,
          ),
        ],
      });
    }

    if (isInvalidAddress || isNodeOffline) {
      if (message.channel.type !== ChannelType.DM) {
        await message.channel.send({
          embeds: [
            warnDirectMessage(
              user.user_id,
              'Withdraw',
            ),
          ],
        });
      }
    }

    if (failWithdrawalActivity) {
      activity.unshift(failWithdrawalActivity);
      return;
    }

    const isMyAddressActivity = await disallowWithdrawToSelf(
      filteredMessage[2],
      user,
      t,
    );

    if (isMyAddressActivity) {
      await message.author.send({
        embeds: [
          unableToWithdrawToSelfMessage(
            message,
          ),
        ],
      });
      if (message.channel && message.channel.type !== ChannelType.DM) {
        await message.channel.send({
          embeds: [
            warnDirectMessage(
              user.user_id,
              'Withdraw',
            ),
          ],
        });
      }
      activity.unshift(isMyAddressActivity);
      return;
    }

    const addressExternal = await createOrUseExternalWithdrawAddress(
      filteredMessage[2],
      user,
      t,
    );

    const wallet = await user.wallet.update({
      available: user.wallet.available - amount,
      locked: user.wallet.locked + amount,
    }, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    const fee = ((amount / 100) * (setting.fee / 1e2)).toFixed(0);
    const transaction = await db.transaction.create({
      addressId: wallet.address.id,
      addressExternalId: addressExternal.id,
      phase: 'review',
      type: 'send',
      to_from: filteredMessage[2],
      amount,
      feeAmount: Number(fee),
      userId: user.id,
    }, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    const activityCreate = await db.activity.create(
      {
        spenderId: user.id,
        type: 'withdrawRequested',
        amount,
        transactionId: transaction.id,
      },
      {
        transaction: t,
        lock: t.LOCK.UPDATE,
      },
    );
    activity.unshift(activityCreate);

    if (message.type && message.type === InteractionType.ApplicationCommand) {
      const discordUser = await discordClient.users.cache.get(message.user.id);
      if (message.guildId) {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            reviewMessage(
              message.user.id,
              transaction,
            ),
          ],
        });
      } else {
        await discordUser.send({
          embeds: [
            reviewMessage(
              message.user.id,
              transaction,
            ),
          ],
        });
      }
    } else {
      if (message.channel.type === ChannelType.DM) {
        await message.author.send({
          embeds: [
            reviewMessage(
              message.author.id,
              transaction,
            ),
          ],
        });
      }
      if (message.channel && message.channel.type === ChannelType.GuildText) {
        await message.channel.send({
          embeds: [
            reviewMessage(
              message.author.id,
              transaction,
            ),
          ],
        });
      }
    }

    t.afterCommit(() => {
      console.log('done');
    });
  }).catch(async (err) => {
    try {
      await db.error.create({
        type: 'withdraw',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    logger.error(`Error Discord Withdraw Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "Withdraw",
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
              "Withdraw",
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
            "Withdraw",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "Withdraw",
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
