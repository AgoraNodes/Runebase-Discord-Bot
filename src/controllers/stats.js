/* eslint-disable import/prefer-default-export */
import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import {
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas';
import {
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  MessageEmbed,
} from 'discord.js';

import path from 'path';
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { addStrength } from "../helpers/stats/addStrength";
import { addDexterity } from "../helpers/stats/addDexterity";
import { addVitality } from "../helpers/stats/addVitality";
import { addEnergy } from "../helpers/stats/addEnergy";
import { renderStatsImage } from '../render/stats';
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import { calculateCharacterStats } from '../helpers/stats/calculateCharacterStats';
import {
  generateAddStrengthButton,
  generateAddDexterityButton,
  generateAddVitalityButton,
  generateAddEnergyButton,
  generateCancelStatsPickButton,
} from '../buttons';

export const discordStats = async (
  discordClient,
  message,
  setting,
  io,
  queue,
) => {
  const activity = [];
  const userId = await fetchDiscordUserIdFromMessageOrInteraction(
    message,
  );

  const discordChannel = await fetchDiscordChannel(
    discordClient,
    message,
  );

  const userCurrentCharacter = await fetchUserCurrentCharacter(
    userId, // user discord id
    false, // Need inventory?
  );

  if (!userCurrentCharacter) {
    await message.reply({
      content: 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`',
      ephemeral: true,
    });
    return;
  }

  const {
    unspendAttributes,
  } = await calculateCharacterStats(userCurrentCharacter);

  const generateCancelClassPicked = async () => {
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');

    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.strokeText(`${userCurrentCharacter.UserGroup.user.username} canceled stats selection`, 250, 60, 500);
    ctx.fillText(`${userCurrentCharacter.UserGroup.user.username} canceled stats selection`, 250, 60, 500);

    return new MessageAttachment(canvas.toBuffer(), 'cancelSelection.png');
  };

  const loadingEmbed = new MessageEmbed()
    .setTitle('Adding Attribute')
    .setDescription(`${userCurrentCharacter.UserGroup.user.username}, Loading..`);

  // const calc = (
  //   userCurrentCharacter.stats.strength
  //   + userCurrentCharacter.stats.dexterity
  //   + userCurrentCharacter.stats.vitality
  //   + userCurrentCharacter.stats.energy
  // ) < (userCurrentCharacter.user.ranks[0].id * 5);
  const calc = unspendAttributes > 0;

  const embedMessage = await discordChannel.send({
    files: [
      new MessageAttachment(
        await renderStatsImage(
          userCurrentCharacter,
          false,
        ),
        'class.png',
      ),
    ],
    components: [
      ...(calc ? [new MessageActionRow({
        components: [
          generateAddStrengthButton(),
          generateAddDexterityButton(),
        ],
      })] : []),
      ...(calc ? [new MessageActionRow({
        components: [
          generateAddVitalityButton(),
          generateAddEnergyButton(),
        ],
      })] : []),
      new MessageActionRow({
        components: [
          generateCancelStatsPickButton(),
        ],
      }),
    ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    // filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
  });

  collector.on('collect', async (interaction) => {
    let updatedUser;
    let cannotSpend;
    if (interaction.user.id !== userCurrentCharacter.UserGroup.user.user_id) {
      await interaction.reply({
        content: `<@${interaction.user.id}>, These buttons aren't for you!`,
        ephemeral: true,
      });
      return;
    }
    await interaction.deferUpdate();
    await interaction.editReply({
      embeds: [
        loadingEmbed,
      ],
      components: [],
    });
    if (interaction.customId === 'strength') {
      [
        updatedUser,
        cannotSpend,
      ] = await addStrength(
        userCurrentCharacter,
        io,
        queue,
      );
    }
    if (interaction.customId === 'dexterity') {
      [
        updatedUser,
        cannotSpend,
      ] = await addDexterity(
        userCurrentCharacter,
        io,
        queue,
      );
    }
    if (interaction.customId === 'vitality') {
      [
        updatedUser,
        cannotSpend,
      ] = await addVitality(
        userCurrentCharacter,
        io,
        queue,
      );
    }
    if (interaction.customId === 'energy') {
      [
        updatedUser,
        cannotSpend,
      ] = await addEnergy(
        userCurrentCharacter,
        io,
        queue,
      );
    }
    if (
      interaction.customId === 'strength'
      || interaction.customId === 'dexterity'
      || interaction.customId === 'vitality'
      || interaction.customId === 'energy'
    ) {
      const newCalc = (
        updatedUser.stats.strength
        + updatedUser.stats.dexterity
        + updatedUser.stats.vitality
        + updatedUser.stats.energy
      ) < (updatedUser.UserGroup.UserGroupRank.rank.level * 5);

      await interaction.editReply({
        embeds: [],
        files: [
          new MessageAttachment(
            await renderStatsImage(
              updatedUser,
              false,
            ),
            'class.png',
          ),
        ],
        components: [
          ...(newCalc ? [new MessageActionRow({
            components: [
              generateAddStrengthButton(),
              generateAddDexterityButton(),
            ],
          })] : []),
          ...(newCalc ? [new MessageActionRow({
            components: [
              generateAddVitalityButton(),
              generateAddEnergyButton(),
            ],
          })] : []),
          new MessageActionRow({
            components: [
              generateCancelStatsPickButton(),
            ],
          }),
        ],
      });
    }
    // Cancel class selection
    if (interaction.customId === 'cancelStatsPick') {
      await interaction.editReply({
        files: [
          await generateCancelClassPicked(),
        ],
        components: [],
        embeds: [],
      });
    }
  });
};
