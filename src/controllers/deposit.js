import { MessageAttachment } from "discord.js";
import { Transaction } from "sequelize";
import QRCode from "qrcode";
import db from '../models';
import {
  warnDirectMessage,
  depositAddressMessage,
  discordErrorMessage,
  cannotSendMessageUser,
} from '../messages';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";

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
      t,
      'deposit',
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

    if (user && user.wallet && !user.wallet.address) {
      await message.author.send("Deposit Address not found");
      return;
    }

    const depositQr = await QRCode.toDataURL(user.wallet.address.address);
    const depositQrFixed = depositQr.replace('data:image/png;base64,', '');

    if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordUser = await discordClient.users.cache.get(message.user.id);
      if (message.guildId) {
        console.log('deposit application command');
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            depositAddressMessage(
              user.user_id,
              user,
            ),
          ],
          files: [
            new MessageAttachment(
              Buffer.from(
                depositQrFixed,
                'base64',
              ),
              'qr.png',
            ),
          ],
          s,
        });
      } else {
        await discordUser.send({
          embeds: [
            depositAddressMessage(
              user.user_id,
              user,
            ),
          ],
          files: [
            new MessageAttachment(
              Buffer.from(
                depositQrFixed,
                'base64',
              ),
              'qr.png',
            ),
          ],
        });
      }
    } else {
      if (message.channel.type === 'DM') {
        await message.author.send({
          embeds: [
            depositAddressMessage(
              user.user_id,
              user,
            ),
          ],
          files: [
            new MessageAttachment(
              Buffer.from(
                depositQrFixed,
                'base64',
              ),
              'qr.png',
            ),
          ],
        });
      }
      if (message.channel.type === 'GUILD_TEXT') {
        await message.channel.send({
          embeds: [
            depositAddressMessage(
              user.user_id,
              user,
            ),
          ],
          files: [
            new MessageAttachment(
              Buffer.from(
                depositQrFixed,
                'base64',
              ),
              'qr.png',
            ),
          ],
        });
      }
    }

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
        type: 'help',
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
