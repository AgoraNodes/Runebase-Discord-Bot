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
    true, // Need inventory?
  );

  if (!userCurrentCharacter) {
    await message.reply({
      content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
      ephemeral: true,
    });
    return;
  }
  const {
    unspedAttributes,
  } = await calculateCharacterStats(userCurrentCharacter);

  const strengthButtonId = 'strength';
  const dexterityButtonId = 'dexterity';
  const vitalityButtonId = 'vitality';
  const energyButtonId = 'energy';
  const cancelStatsPickId = 'cancelStatsPick';

  const strengthButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Strength ➕',
    emoji: '💪',
    customId: strengthButtonId,
  });
  const dexterityButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Dexterity ➕',
    emoji: '🏃‍♂️',
    customId: dexterityButtonId,
  });
  const vitalityButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Vitality ➕',
    emoji: '❤️',
    customId: vitalityButtonId,
  });
  const energyButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Energy ➕',
    emoji: '🧙',
    customId: energyButtonId,
  });
  const cancelStatsPickButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Cancel Stats Selection',
    emoji: '❌',
    customId: cancelStatsPickId,
  });

  const generateCancelClassPicked = async () => {
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');

    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.strokeText(`${userCurrentCharacter.user.username} canceled stats selection`, 250, 60, 500);
    ctx.fillText(`${userCurrentCharacter.user.username} canceled stats selection`, 250, 60, 500);

    return new MessageAttachment(canvas.toBuffer(), 'cancelSelection.png');
  };

  // const calc = (
  //   userCurrentCharacter.stats.strength
  //   + userCurrentCharacter.stats.dexterity
  //   + userCurrentCharacter.stats.vitality
  //   + userCurrentCharacter.stats.energy
  // ) < (userCurrentCharacter.user.ranks[0].id * 5);
  const calc = unspedAttributes > 0;

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
          strengthButton,
          dexterityButton,
        ],
      })] : []),
      ...(calc ? [new MessageActionRow({
        components: [
          vitalityButton,
          energyButton,
        ],
      })] : []),
      new MessageActionRow({
        components: [
          cancelStatsPickButton,
        ],
      }),
    ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
  });

  collector.on('collect', async (interaction) => {
    let updatedUser;
    let cannotSpend;
    if (interaction.customId === strengthButtonId) {
      [
        updatedUser,
        cannotSpend,
      ] = await addStrength(
        userCurrentCharacter.user.id,
        discordChannel,
        io,
        queue,
      );
    }
    if (interaction.customId === dexterityButtonId) {
      [
        updatedUser,
        cannotSpend,
      ] = await addDexterity(
        userCurrentCharacter.user.id,
        discordChannel,
        io,
        queue,
      );
    }
    if (interaction.customId === vitalityButtonId) {
      [
        updatedUser,
        cannotSpend,
      ] = await addVitality(
        userCurrentCharacter.user.id,
        discordChannel,
        io,
        queue,
      );
    }
    if (interaction.customId === energyButtonId) {
      [
        updatedUser,
        cannotSpend,
      ] = await addEnergy(
        userCurrentCharacter.user.id,
        discordChannel,
        io,
        queue,
      );
    }
    if (
      interaction.customId === strengthButtonId
      || interaction.customId === dexterityButtonId
      || interaction.customId === vitalityButtonId
      || interaction.customId === energyButtonId
    ) {
      const newCalc = (
        updatedUser.stats.strength
        + updatedUser.stats.dexterity
        + updatedUser.stats.vitality
        + updatedUser.stats.energy
      ) < (updatedUser.user.ranks[0].id * 5);

      await interaction.update({
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
              strengthButton,
              dexterityButton,
            ],
          })] : []),
          ...(newCalc ? [new MessageActionRow({
            components: [
              vitalityButton,
              energyButton,
            ],
          })] : []),
          new MessageActionRow({
            components: [
              cancelStatsPickButton,
            ],
          }),
        ],
      });
    }
    // Cancel class selection
    if (interaction.customId === cancelStatsPickId) {
      await interaction.update({
        files: [
          await generateCancelClassPicked(),
        ],
        components: [],
      });
    }
  });
};
