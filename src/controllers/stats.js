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

function printAtWordWrap(context, text, x, y, lineHeight, fitWidth) {
  fitWidth = fitWidth || 0;

  if (fitWidth <= 0) {
    context.fillText(text, x, y);
    return;
  }
  let words = text.split(' ');
  let currentLine = 0;
  let idx = 1;
  while (words.length > 0 && idx <= words.length) {
    const str = words.slice(0, idx).join(' ');
    const w = context.measureText(str).width;
    if (w > fitWidth) {
      if (idx == 1) {
        idx = 2;
      }
      context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
      currentLine++;
      words = words.splice(idx - 1);
      idx = 1;
    } else { idx++; }
  }
  if (idx > 0) { context.fillText(words.join(' '), x, y + (lineHeight * currentLine)); }
}

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
        attributes: [
          'name',
        ],
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
        ],
      },
    ],
  });

  if (!user) return;

  console.log(user);
  console.log(user.ranks[0]);
  console.log(user.UserClass);
  console.log(user.UserClass.stats);

  const activity = [];
  let CurrentClassSelectionId;
  const classes = await db.class.findAll({
    include: [
      {
        model: db.classDescription,
        as: 'classDescription',
      },
    ],
  });

  let discordChannel;

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

  await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const generateStatsImage = async (
    currentClass,
    currentUser,
  ) => {
    const canvas = createCanvas(960, 1400);
    const ctx = canvas.getContext('2d');
    const BackgroundImageStats = await loadImage(path.join(__dirname, '../assets/images', `stats_background.png`));
    ctx.drawImage(BackgroundImageStats, 0, 0, 960, 1300);

    ctx.stroke();
    ctx.closePath();

    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    // ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;

    ctx.textAlign = "center";
    ctx.font = 'bold 35px "HeartWarming"';
    // ctx.strokeText(currentClass.name, 250, 880, 500);
    // ctx.fillText(currentClass.name, 250, 880, 500);

    // username
    ctx.strokeText(currentUser.username, 290, 70, 540);
    ctx.fillText(currentUser.username, 290, 70, 540);

    // character classname
    ctx.strokeText(currentClass.name, 760, 70, 240);
    ctx.fillText(currentClass.name, 760, 70, 240);

    // level
    ctx.strokeText('Level', 100, 135, 240);
    ctx.fillText('level', 100, 135, 240);
    ctx.strokeText(user.ranks[0].id, 100, 175, 240);
    ctx.fillText(user.ranks[0].id, 100, 175, 240);

    // Experience
    ctx.strokeText('Experience', 375, 135, 240);
    ctx.fillText('Experience', 375, 135, 240);
    ctx.strokeText(user.exp, 375, 175, 240);
    ctx.fillText(user.exp, 375, 175, 240);

    // Next level
    ctx.strokeText('Next level', 760, 135, 240);
    ctx.fillText('Next level', 760, 135, 240);
    ctx.strokeText(user.exp, 760, 175, 240); // Change this to next level exp
    ctx.fillText(user.exp, 760, 175, 240);

    ctx.font = 'bold 30px "HeartWarming"';

    // Strength
    ctx.strokeText(`Strength`, 125, 290, 200);
    ctx.fillText(`Strength`, 125, 290, 200);
    ctx.strokeText(`0`, 288, 290, 200);
    ctx.fillText(`0`, 288, 290, 200);

    // Dexterity
    ctx.strokeText(`Dexterity`, 125, 475, 200);
    ctx.fillText(`Dexterity`, 125, 475, 200);
    ctx.strokeText(`0`, 288, 475, 200);
    ctx.fillText(`0`, 288, 475, 200);

    // Vitality
    ctx.strokeText(`Vitality`, 125, 735, 200);
    ctx.fillText(`Vitality`, 125, 735, 200);
    ctx.strokeText(`0`, 288, 735, 200);
    ctx.fillText(`0`, 288, 735, 200);

    // Energy
    ctx.strokeText(`Energy`, 125, 920, 200);
    ctx.fillText(`Energy`, 125, 920, 200);
    ctx.strokeText(`0`, 288, 920, 200);
    ctx.fillText(`0`, 288, 920, 200);

    // attack 1
    ctx.strokeText(`Attack Damage`, 635, 290, 200);
    ctx.fillText(`Attack Damage`, 635, 290, 200);
    ctx.strokeText(`1-10`, 855, 290, 200);
    ctx.fillText(`1-10`, 855, 290, 200);

    // attack 2
    ctx.strokeText(`Attack Damage`, 635, 360, 200);
    ctx.fillText(`Attack Damage`, 635, 360, 200);
    ctx.strokeText(`1-10`, 855, 360, 200);
    ctx.fillText(`1-10`, 855, 360, 200);

    // attack rating 1
    ctx.strokeText(`Attack Rating`, 645, 475, 200);
    ctx.fillText(`Attack Rating`, 645, 475, 200);
    ctx.strokeText(`0`, 875, 475, 200);
    ctx.fillText(`0`, 875, 475, 200);

    // attack rating 2
    ctx.strokeText(`Attack Rating`, 645, 545, 200);
    ctx.fillText(`Attack Rating`, 645, 545, 200);
    ctx.strokeText(`0`, 875, 545, 200);
    ctx.fillText(`0`, 875, 545, 200);

    // Defense
    ctx.strokeText(`Defense`, 645, 620, 200);
    ctx.fillText(`Defense`, 645, 620, 200);
    ctx.strokeText(`0`, 875, 620, 200);
    ctx.fillText(`0`, 875, 620, 200);

    // Stamina
    ctx.strokeText(`Stamina`, 585, 735, 200);
    ctx.fillText(`Stamina`, 585, 735, 200);
    ctx.strokeText(`0`, 755, 735, 200);
    ctx.fillText(`0`, 755, 735, 200);
    ctx.strokeText(`0`, 875, 735, 200);
    ctx.fillText(`0`, 875, 735, 200);

    // Life
    ctx.strokeText(`Life`, 585, 805, 200);
    ctx.fillText(`Life`, 585, 805, 200);
    ctx.strokeText(`0`, 755, 805, 200);
    ctx.fillText(`0`, 755, 805, 200);
    ctx.strokeText(`0`, 875, 805, 200);
    ctx.fillText(`0`, 875, 805, 200);

    // Mana
    ctx.strokeText(`Mana`, 585, 920, 200);
    ctx.fillText(`Mana`, 585, 920, 200);
    ctx.strokeText(`0`, 755, 920, 200);
    ctx.fillText(`0`, 755, 920, 200);
    ctx.strokeText(`0`, 875, 920, 200);
    ctx.fillText(`0`, 875, 920, 200);

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

    // bottom stats message
    ctx.fillStyle = "#fe5701";
    ctx.font = 'bold 70px "HeartWarming"';
    ctx.strokeText(`${user.username}'s ${currentClass.name} stats`, 480, 1380, 960);
    ctx.fillText(`${user.username}'s ${currentClass.name} stats`, 480, 1380, 960);

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
        user.currentClass,
        user,
      ),
    ],
    components: [
      calc ? new MessageActionRow({
        components: [
          strengthButton,
          dexterityButton,
          vitalityButton,
          energyButton,
        ],
      }) : [],
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

  const currentIndex = 0;
  collector.on('collect', async (interaction) => {
    if (
      interaction.customId === strengthButtonId
      || interaction.customId === dexterityButtonId
      || interaction.customId === vitalityButtonId
      || interaction.customId === energyButtonId
    ) {
      await queue.add(async () => {
        await db.sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        }, async (t) => {
          const stats = await db.stats.findOne({
            where: {
              userId: user.id,
            },
          });
          if (!stats) {
            await db.stats.create({
              userId: user.id,
            });
          } else {
            await stats.update({
              strength: 0,
              dexterity: 0,
              vitality: 0,
              energy: 0,
              life: 0,
              mana: 0,
              stamina: 0,
            });
          }
          const userClass = await db.UserClass.findOne({
            where: {
              userId: user.id,
            },
          });
          if (!userClass) {
            await db.UserClass.create({
              userId: user.id,
              classId: CurrentClassSelectionId,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          } else {
            userClass.update({
              classId: CurrentClassSelectionId,
            });
          }

          const preActivity = await db.activity.create({
            type: 'pickClass_s',
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
              type: 'ClassSelection',
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
                    "ClassSelection",
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
                    "ClassSelection",
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
                  "ClassSelection",
                ),
              ],
            }).catch((e) => {
              console.log(e);
            });
          } else {
            await message.channel.send({
              embeds: [
                discordErrorMessage(
                  "ClassSelection",
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
      });
      return;
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
