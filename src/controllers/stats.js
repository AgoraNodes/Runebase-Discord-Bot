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
import { userWalletExist } from "../helpers/client/userWalletExist";
import { addStrength } from "../helpers/stats/addStrength";
import { addDexterity } from "../helpers/stats/addDexterity";
import { addVitality } from "../helpers/stats/addVitality";
import { addEnergy } from "../helpers/stats/addEnergy";

export const discordStats = async (
  discordClient,
  message,
  setting,
  io,
  queue,
) => {
  let userId;
  if (message.user && message.user.id) {
    userId = message.user.id;
  } else if (message.author) {
    userId = message.author.id;
  } else {
    userId = message.user;
  }
  const user = await db.user.findOne({
    where: {
      user_id: `${userId}`,
    },
    include: [
      {
        model: db.class,
        as: 'currentClass',
      },
      {
        model: db.rank,
        as: 'ranks',
      },
      {
        model: db.UserClass,
        as: 'UserClass',
        where: {
          classId: {
            [Op.col]: 'user.currentClassId',
          },
        },
        include: [
          {
            model: db.stats,
            as: 'stats',
          },
          {
            model: db.condition,
            as: 'condition',
          },
        ],
      },
    ],
  });

  if (!user) return;
  if (!user.UserClass) {
    console.log('user has not selected a class yet'); // Add notice message here to warn user to select a class
    return;
  }

  const nextRank = await db.rank.findOne({
    where: {
      expNeeded: {
        [Op.gt]: user.exp,
      },
    },
    order: [
      ['id', 'ASC'],
    ],
  });

  const nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : user.ranks[0].expNeeded;

  console.log(user);
  console.log(user.ranks[0]);
  console.log(user.UserClass);
  console.log(user.UserClass.stats);

  const activity = [];
  let CurrentClassSelectionId;
  let discordChannel;
  const strengthButtonId = 'strength';
  const dexterityButtonId = 'dexterity';
  const vitalityButtonId = 'vitality';
  const energyButtonId = 'energy';
  const cancelStatsPickId = 'cancelStatsPick';

  if (message.type && message.type === 'APPLICATION_COMMAND') {
    if (message.guildId) {
      discordChannel = await discordClient.channels.cache.get(message.channelId);
    } else {
      discordChannel = await discordClient.users.cache.get(message.user.id);
    }
  } else {
    if (message.channel.type === 'DM') {
      discordChannel = await discordClient.channels.cache.get(message.channelId);
    }
    if (message.channel.type === 'GUILD_TEXT') {
      discordChannel = await discordClient.channels.cache.get(message.channelId);
    }
  }

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

  await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const generateStatsImage = async (
    currentUser,
    nextRankExp,
    cannotSpendWarning,
  ) => {
    const countedSpendAttributes = currentUser.UserClass.stats.strength
      + currentUser.UserClass.stats.dexterity
      + currentUser.UserClass.stats.vitality
      + currentUser.UserClass.stats.energy;
    const canSpendAttributes = countedSpendAttributes < (currentUser.ranks[0].id * 5);
    const AttributesToSpend = (currentUser.ranks[0].id * 5) - countedSpendAttributes;

    const canvas = createCanvas(960, 1400);
    const ctx = canvas.getContext('2d');
    const BackgroundImageStats = await loadImage(path.join(__dirname, '../assets/images', `stats_background.png`));
    const unspendAttributesBoxImage = await loadImage(path.join(__dirname, '../assets/images', `unspendAttributesBox.png`));
    ctx.drawImage(BackgroundImageStats, 0, 0, 960, 1300);

    if (canSpendAttributes) {
      ctx.drawImage(unspendAttributesBoxImage, 10, 1070, 495, 82);

      ctx.fillStyle = "red";
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.textAlign = "center";
      ctx.font = 'bold 25px "HeartWarming"';
      ctx.strokeText('Stats Points', 155, 1105, 540);
      ctx.fillText('Stats Points', 155, 1105, 540);
      ctx.strokeText('Remaining', 155, 1130, 540);
      ctx.fillText('Remaining', 155, 1130, 540);

      ctx.fillStyle = "#ccc";
      ctx.font = 'bold 45px "HeartWarming"';
      ctx.strokeText(AttributesToSpend, 410, 1125, 540);
      ctx.fillText(AttributesToSpend, 410, 1125, 540);
    }

    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.font = 'bold 35px "HeartWarming"';

    // username
    ctx.strokeText(currentUser.username, 290, 70, 540);
    ctx.fillText(currentUser.username, 290, 70, 540);

    // character classname
    ctx.strokeText(currentUser.currentClass.name, 760, 70, 240);
    ctx.fillText(currentUser.currentClass.name, 760, 70, 240);

    // level
    ctx.strokeText('Level', 100, 135, 240);
    ctx.fillText('level', 100, 135, 240);
    ctx.strokeText(currentUser.ranks[0].id, 100, 175, 240);
    ctx.fillText(currentUser.ranks[0].id, 100, 175, 240);

    // Experience
    ctx.strokeText('Experience', 375, 135, 240);
    ctx.fillText('Experience', 375, 135, 240);
    ctx.strokeText(currentUser.exp, 375, 175, 240);
    ctx.fillText(currentUser.exp, 375, 175, 240);

    // Next level
    ctx.strokeText('Next level', 760, 135, 240);
    ctx.fillText('Next level', 760, 135, 240);
    ctx.strokeText(nextRankExp, 760, 175, 240); // Change this to next level exp
    ctx.fillText(nextRankExp, 760, 175, 240);

    ctx.font = 'bold 30px "HeartWarming"';

    // Strength
    const strengthPoints = currentUser.currentClass.strength + currentUser.UserClass.stats.strength;
    ctx.strokeText(`Strength`, 125, 290, 200);
    ctx.fillText(`Strength`, 125, 290, 200);
    ctx.strokeText(strengthPoints, 288, 290, 200);
    ctx.fillText(strengthPoints, 288, 290, 200);

    // Dexterity
    const dexterityPoints = currentUser.currentClass.dexterity + currentUser.UserClass.stats.dexterity;
    ctx.strokeText(`Dexterity`, 125, 475, 200);
    ctx.fillText(`Dexterity`, 125, 475, 200);
    ctx.strokeText(dexterityPoints, 288, 475, 200);
    ctx.fillText(dexterityPoints, 288, 475, 200);

    // Vitality
    const vitalityPoints = currentUser.currentClass.vitality + currentUser.UserClass.stats.vitality;
    ctx.strokeText(`Vitality`, 125, 735, 200);
    ctx.fillText(`Vitality`, 125, 735, 200);
    ctx.strokeText(vitalityPoints, 288, 735, 200);
    ctx.fillText(vitalityPoints, 288, 735, 200);

    // Energy
    const energyPoints = currentUser.currentClass.energy + currentUser.UserClass.stats.energy;
    ctx.strokeText(`Energy`, 125, 920, 200);
    ctx.fillText(`Energy`, 125, 920, 200);
    ctx.strokeText(energyPoints, 288, 920, 200);
    ctx.fillText(energyPoints, 288, 920, 200);

    // attack 1
    ctx.strokeText(`Attack Damage`, 635, 290, 200);
    ctx.fillText(`Attack Damage`, 635, 290, 200);
    ctx.strokeText(`1-2`, 855, 290, 200);
    ctx.fillText(`1-2`, 855, 290, 200);

    // attack 2
    ctx.strokeText(`Attack Damage`, 635, 360, 200);
    ctx.fillText(`Attack Damage`, 635, 360, 200);
    ctx.strokeText(`1-2`, 855, 360, 200);
    ctx.fillText(`1-2`, 855, 360, 200);

    // attack rating 1
    const attackRatingOne = currentUser.currentClass.attackRating + (currentUser.UserClass.stats.dexterity * 5);
    ctx.strokeText(`Attack Rating`, 645, 475, 200);
    ctx.fillText(`Attack Rating`, 645, 475, 200);
    ctx.strokeText(attackRatingOne, 875, 475, 200);
    ctx.fillText(attackRatingOne, 875, 475, 200);

    // attack rating 2
    const attackRatingTwo = currentUser.currentClass.attackRating + (currentUser.UserClass.stats.dexterity * 5);
    console.log(currentUser.UserClass.stats.dexterity * 5);
    console.log(attackRatingTwo);
    console.log('attackRating2');
    ctx.strokeText(`Attack Rating`, 645, 545, 200);
    ctx.fillText(`Attack Rating`, 645, 545, 200);
    ctx.strokeText(attackRatingTwo, 875, 545, 200);
    ctx.fillText(attackRatingTwo, 875, 545, 200);

    // Defense
    const { defense } = currentUser.currentClass;
    ctx.strokeText(`Defense`, 645, 620, 200);
    ctx.fillText(`Defense`, 645, 620, 200);
    ctx.strokeText(defense, 875, 620, 200);
    ctx.fillText(defense, 875, 620, 200);

    // Stamina
    const staminaPoints = currentUser.currentClass.stamina + currentUser.UserClass.stats.stamina;
    const currentStaminaPoints = currentUser.UserClass.condition.stamina;
    ctx.strokeText(`Stamina`, 585, 735, 200);
    ctx.fillText(`Stamina`, 585, 735, 200);
    ctx.strokeText(currentStaminaPoints, 755, 735, 200);
    ctx.fillText(currentStaminaPoints, 755, 735, 200);
    ctx.strokeText(staminaPoints, 875, 735, 200);
    ctx.fillText(staminaPoints, 875, 735, 200);

    // Life
    const lifePoints = currentUser.currentClass.life + currentUser.UserClass.stats.life;
    const currentLifePoints = currentUser.UserClass.condition.life;
    ctx.strokeText(`Life`, 585, 805, 200);
    ctx.fillText(`Life`, 585, 805, 200);
    ctx.strokeText(currentLifePoints, 755, 805, 200);
    ctx.fillText(currentLifePoints, 755, 805, 200);
    ctx.strokeText(lifePoints, 875, 805, 200);
    ctx.fillText(lifePoints, 875, 805, 200);

    // Mana
    const manaPoints = currentUser.currentClass.mana + currentUser.UserClass.stats.mana;
    const currentManaPoints = currentUser.UserClass.condition.mana;
    ctx.strokeText(`Mana`, 585, 920, 200);
    ctx.fillText(`Mana`, 585, 920, 200);
    ctx.strokeText(currentManaPoints, 755, 920, 200);
    ctx.fillText(currentManaPoints, 755, 920, 200);
    ctx.strokeText(manaPoints, 875, 920, 200);
    ctx.fillText(manaPoints, 875, 920, 200);

    // Fire resistance
    ctx.strokeText(`Fire resistance`, 665, 1038, 240);
    ctx.fillText(`Fire resistance`, 665, 1038, 240);
    ctx.strokeText(`0`, 875, 1038, 240);
    ctx.fillText(`0`, 875, 1038, 240);

    // Cold resistance
    ctx.strokeText(`Cold resistance`, 665, 1110, 240);
    ctx.fillText(`Cold resistance`, 665, 1110, 240);
    ctx.strokeText(`0`, 875, 1110, 240);
    ctx.fillText(`0`, 875, 1110, 240);

    // Lightning resistance
    ctx.strokeText(`Lightning resistance`, 665, 1182, 240);
    ctx.fillText(`Lightning resistance`, 665, 1182, 240);
    ctx.strokeText(`0`, 875, 1182, 240);
    ctx.fillText(`0`, 875, 1182, 240);

    // Poision resistance
    ctx.strokeText(`Poision resistance`, 665, 1254, 240);
    ctx.fillText(`Poision resistance`, 665, 1254, 240);
    ctx.strokeText(`0`, 875, 1254, 240);
    ctx.fillText(`0`, 875, 1254, 240);

    if (cannotSpendWarning) {
      ctx.fillStyle = "red";
      ctx.font = 'bold 35px "HeartWarming"';
      ctx.strokeText('Warning', 245, 1190, 540);
      ctx.fillText('Warning', 245, 1190, 540);
      ctx.strokeText('Unable to spend stats', 245, 1230, 540);
      ctx.fillText('Unable to spend stats', 245, 1230, 540);
    }
    // bottom stats message
    ctx.fillStyle = "#fe5701";
    ctx.font = 'bold 70px "HeartWarming"';
    ctx.strokeText(`${currentUser.username}'s ${currentUser.currentClass.name} stats`, 480, 1380, 960);
    ctx.fillText(`${currentUser.username}'s ${currentUser.currentClass.name} stats`, 480, 1380, 960);

    return new MessageAttachment(canvas.toBuffer(), 'class.png');
  };

  const generateCancelClassPicked = async () => {
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');

    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.strokeText(`${user.username} canceled stats selection`, 250, 60, 500);
    ctx.fillText(`${user.username} canceled stats selection`, 250, 60, 500);

    return new MessageAttachment(canvas.toBuffer(), 'cancelSelection.png');
  };

  const calc = (
    user.UserClass.stats.strength
    + user.UserClass.stats.dexterity
    + user.UserClass.stats.vitality
    + user.UserClass.stats.energy
  ) < (user.ranks[0].id * 5);

  const embedMessage = await discordChannel.send({
    files: [
      await generateStatsImage(
        user,
        nextRankExp,
        false,
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
    filter: ({ user: discordUser }) => discordUser.id === user.user_id,
  });

  collector.on('collect', async (interaction) => {
    let updatedUser;
    let cannotSpend;
    if (interaction.customId === strengthButtonId) {
      [
        updatedUser,
        cannotSpend,
      ] = await addStrength(
        user.id,
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
        user.id,
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
        user.id,
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
        user.id,
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
        updatedUser.UserClass.stats.strength
        + updatedUser.UserClass.stats.dexterity
        + updatedUser.UserClass.stats.vitality
        + updatedUser.UserClass.stats.energy
      ) < (updatedUser.ranks[0].id * 5);

      await interaction.update({
        files: [
          await generateStatsImage(
            updatedUser,
            nextRankExp,
            cannotSpend,
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
