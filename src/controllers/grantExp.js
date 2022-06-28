/* eslint-disable import/prefer-default-export */
import { Transaction } from "sequelize";
import {
  MessageEmbed,
} from 'discord.js';
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { gainMultiExp } from "../helpers/client/experience";
import { mapMembers } from "../helpers/client/mapMembers";

export const discordGrantExp = async (
  discordClient,
  message,
  filteredMessage,
  setting,
  queue,
  io,
) => {
  const activity = [];
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const roleRequiredEmbed = new MessageEmbed()
      .setTitle('Grant Exp')
      .setDescription(`Role is required!`);

    const notEnoughUsersEmbed = new MessageEmbed()
      .setTitle('Grant Exp')
      .setDescription(`Not Enough users found!`);

    const invalidAmountEmbed = new MessageEmbed()
      .setTitle('Grant Exp')
      .setDescription(`Invalid amount!`);

    const greaterThenZeroEmbed = new MessageEmbed()
      .setTitle('Grant Exp')
      .setDescription(`Amount must be greater then 0!`);

    const lessThenTwentyEmbed = new MessageEmbed()
      .setTitle('Grant Exp')
      .setDescription(`Amount must less then 20!`);

    const members = await discordClient.guilds.cache.get(setting.discordHomeServerGuildId).members.fetch({ withPresences: true });

    const onlineMembers = members.filter((member) => member);

    if (!filteredMessage[2]) {
      await message.reply({
        embeds: [
          roleRequiredEmbed,
        ],
      });
      return;
    }

    if (Number(filteredMessage[2]) % 1 !== 0) {
      await message.reply({
        embeds: [
          invalidAmountEmbed,
        ],
      });
      return;
    }
    console.log(Number(filteredMessage[2]));
    if (Number(filteredMessage[2]) < 1) {
      await message.reply({
        embeds: [
          greaterThenZeroEmbed,
        ],
      });
      return;
    }

    if (Number(filteredMessage[2]) > 20) {
      await message.reply({
        embeds: [
          lessThenTwentyEmbed,
        ],
      });
      return;
    }

    if (!filteredMessage[3]) {
      console.log('role required');
      await message.reply({
        embeds: [
          roleRequiredEmbed,
        ],
      });
      return;
    }

    const withoutBots = await mapMembers(
      message,
      t,
      filteredMessage[3],
      onlineMembers,
    );

    if (withoutBots.length < 1) {
      await message.reply({
        embeds: [
          notEnoughUsersEmbed,
        ],
      });
      return;
    }

    console.log(withoutBots);
    console.log('withoutBots');

    const newExp = await gainMultiExp(
      discordClient,
      withoutBots,
      filteredMessage,
      Number(filteredMessage[2]),
      t,
    );
    console.log('after exp test');
  }).catch(async (err) => {
    try {
      await db.error.create({
        type: 'grantExp',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    logger.error(`Error Discord Help Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "grantExp",
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
              "grantExp",
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
            "grantExp",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "grantExp",
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
