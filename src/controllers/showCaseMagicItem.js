/* eslint-disable import/prefer-default-export */
import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";

import { MessageAttachment } from "discord.js";

import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { generateRandomMagicItem } from "../helpers/items/generateRandomMagicItem";
import { generateModifierStringArray } from "../helpers/items/generateModifierStringArray";
import { generateItemImage } from "../helpers/items/generateItemImage";

export const discordShowCaseMagicItem = async (
  discordClient,
  message,
  io,
) => {
  const activity = [];
  const newItem = await generateRandomMagicItem();

  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const [
      user,
      userActivity,
    ] = await userWalletExist(
      message,
      t,
      'myrank',
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;
    const itemImage = await generateItemImage(newItem);

    const attachment = new MessageAttachment(itemImage, 'item.png');

    console.log('before send');

    if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordUser = await discordClient.users.cache.get(message.user.id);
      if (message.guildId) {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          files: [
            attachment,
          ],
        });
      } else {
        await discordUser.send({
          files: [
            attachment,
          ],
        });
      }
    } else {
      if (message.channel.type === 'DM') {
        await message.author.send({
          files: [
            attachment,
          ],
        });
      }
      if (message.channel.type === 'GUILD_TEXT') {
        await message.channel.send({
          files: [
            attachment,
          ],
        });
      }
    }

    const preActivity = await db.activity.create({
      type: 'myrank_s',
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
    console.log(err);
    try {
      await db.error.create({
        type: 'MyRank',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "MyRank",
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
              "MyRank",
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
            "MyRank",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "MyRank",
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
