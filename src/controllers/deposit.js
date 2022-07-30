import { MessageAttachment } from "discord.js";
import { Transaction } from "sequelize";
import QRCode from "qrcode";
import db from '../models';
import {
  warnDirectMessage,
  depositAddressMessage,
  discordErrorMessage,
  cannotSendMessageUser,
} from '../embeds';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { fetchDiscordChannel } from "../helpers/client/fetchDiscordChannel";

export const discordDeposit = async (
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
      'deposit',
      t,
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

    if (user && user.wallet && !user.wallet.address) {
      await message.author.send("Deposit Address not found");
      return;
    }

    const discordChannel = await fetchDiscordChannel(
      discordClient,
      message,
    );
    if (!discordChannel) return;

    const depositQr = await QRCode.toDataURL(user.wallet.address.address);
    const depositQrFixed = depositQr.replace('data:image/png;base64,', '');

    await discordChannel.send({
      embeds: [
        await depositAddressMessage(
          user.user_id,
          user,
        ),
      ],
      files: [
        {
          attachment: Buffer.from(
            depositQrFixed,
            'base64',
          ),
          name: 'qr.png',
        },
      ],
    });

    const preActivity = await db.activity.create({
      type: 'deposit_s',
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

    t.afterCommit(() => {
      // console.log(`Success Deposit Address Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator}`);
    });
  }).catch(async (err) => {
    try {
      await db.error.create({
        type: 'deposit',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    logger.error(`Error Discord Deposit Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "Deposit",
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
              "Deposit",
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
            "Deposit",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "Deposit",
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
