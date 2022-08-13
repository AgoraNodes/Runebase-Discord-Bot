/* eslint-disable import/prefer-default-export */
// import {
//   Sequelize,
//   Transaction,
//   Op,
// } from "sequelize";
// import db from '../models';
// import logger from "../helpers/logger";
import {
  ActionRowBuilder,
} from 'discord.js';
import { addStrength } from "../helpers/stats/addStrength";
import { addDexterity } from "../helpers/stats/addDexterity";
import { addVitality } from "../helpers/stats/addVitality";
import { addEnergy } from "../helpers/stats/addEnergy";
import { renderStatsImage } from '../render/stats/stats';
import { renderCancelStatsImage } from '../render/stats/cancelStats';
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
import {
  playingOnRealmMessage,
} from '../messages';
import testPlayerReadyness from '../helpers/testPlayerReadyness';
import isUserInRealm from "../helpers/realm/isUserInRealm";
import { addingAttributeEmbed } from '../embeds';

export const discordStats = async (
  discordClient,
  message,
  setting,
  io,
  queue,
  isDefered,
) => {
  let failed;
  let usedDeferReply;
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

  [
    failed,
    usedDeferReply,
  ] = await testPlayerReadyness(
    userCurrentCharacter,
    message,
    isDefered,
  );
  if (failed) return usedDeferReply;

  [
    failed,
    usedDeferReply,
  ] = await isUserInRealm(
    userCurrentCharacter,
    discordClient,
    message,
    isDefered,
  );
  if (failed) return usedDeferReply;

  const {
    unspendAttributes,
  } = await calculateCharacterStats(userCurrentCharacter);

  // const calc = (
  //   userCurrentCharacter.stats.strength
  //   + userCurrentCharacter.stats.dexterity
  //   + userCurrentCharacter.stats.vitality
  //   + userCurrentCharacter.stats.energy
  // ) < (userCurrentCharacter.user.ranks[0].id * 5);
  const calc = unspendAttributes > 0;

  const embedMessage = await discordChannel.send({
    content: playingOnRealmMessage(userCurrentCharacter),
    files: [
      {
        attachment: await renderStatsImage(
          userCurrentCharacter,
          false,
        ),
        name: 'stats.png',
      },
    ],
    components: [
      ...(calc ? [new ActionRowBuilder({
        components: [
          generateAddStrengthButton(),
          generateAddDexterityButton(),
        ],
      })] : []),
      ...(calc ? [new ActionRowBuilder({
        components: [
          generateAddVitalityButton(),
          generateAddEnergyButton(),
        ],
      })] : []),
      new ActionRowBuilder({
        components: [
          generateCancelStatsPickButton(),
        ],
      }),
    ],
  });

  const collector = embedMessage.createMessageComponentCollector({});

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
        await addingAttributeEmbed(userCurrentCharacter),
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
        content: playingOnRealmMessage(userCurrentCharacter),
        embeds: [],
        files: [
          {
            attachment: await renderStatsImage(
              updatedUser,
              false,
            ),
            name: 'stats.png',
          },
        ],
        components: [
          ...(newCalc ? [new ActionRowBuilder({
            components: [
              generateAddStrengthButton(),
              generateAddDexterityButton(),
            ],
          })] : []),
          ...(newCalc ? [new ActionRowBuilder({
            components: [
              generateAddVitalityButton(),
              generateAddEnergyButton(),
            ],
          })] : []),
          new ActionRowBuilder({
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
        content: playingOnRealmMessage(userCurrentCharacter),
        files: [
          {
            attachment: await renderCancelStatsImage(
              userCurrentCharacter,
            ),
            name: 'stats.png',
          },
        ],
        components: [],
        embeds: [],
      });
    }
  });
};
