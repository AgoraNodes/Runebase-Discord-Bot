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

export const discordPickClass = async (
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
  });

  if (!user) return;

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

  const backId = 'back';
  const forwardId = 'forward';
  const pickClassId = 'pickClass';
  const cancelPickClassId = 'cancelClass';
  const backButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Back',
    emoji: '⬅️',
    customId: backId,
  });
  const forwardButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Forward',
    emoji: '➡️',
    customId: forwardId,
  });

  await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const generateClassImage = async (start) => {
    const current = classes.slice(start, start + 1);
    const canvas = createCanvas(1400, 1050);
    const ctx = canvas.getContext('2d');

    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    // ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    const newClassImage = await loadImage(path.join(__dirname, '../assets/images/classes', `${current[0].classDescription.image}.png`));
    ctx.drawImage(newClassImage, 0, 0, 500, 800);
    printAtWordWrap(
      ctx,
      current[0].classDescription.description,
      500,
      100,
      35,
      500,
    );

    ctx.textAlign = "center";
    ctx.font = 'bold 50px "HeartWarming"';
    ctx.strokeText(current[0].name, 250, 880, 500);
    ctx.fillText(current[0].name, 250, 880, 500);

    // print default stats

    ctx.strokeText("Base Stats", 1200, 50, 200);
    ctx.fillText("Base stats", 1200, 50, 200);

    ctx.font = 'bold 35px "HeartWarming"';

    // Strength
    ctx.strokeText(`Strength: ${current[0].strength}`, 1200, 150, 200);
    ctx.fillText(`Strength: ${current[0].strength}`, 1200, 150, 200);

    // Dexterity
    ctx.strokeText(`Dexterity: ${current[0].dexterity}`, 1200, 250, 200);
    ctx.fillText(`Dexterity: ${current[0].dexterity}`, 1200, 250, 200);

    // Vitality
    ctx.strokeText(`Vitality: ${current[0].vitality}`, 1200, 350, 200);
    ctx.fillText(`Vitality: ${current[0].vitality}`, 1200, 350, 200);

    // Energy
    ctx.strokeText(`Energy: ${current[0].energy}`, 1200, 450, 200);
    ctx.fillText(`Energy: ${current[0].energy}`, 1200, 450, 200);

    // Life
    ctx.strokeText(`Life: ${current[0].life}`, 1200, 550, 200);
    ctx.fillText(`Life: ${current[0].life}`, 1200, 550, 200);

    // Mana
    ctx.strokeText(`Mana: ${current[0].mana}`, 1200, 650, 200);
    ctx.fillText(`Mana: ${current[0].mana}`, 1200, 650, 200);

    // Stamina
    ctx.strokeText(`Stamina: ${current[0].stamina}`, 1200, 750, 200);
    ctx.fillText(`Stamina: ${current[0].stamina}`, 1200, 750, 200);

    // Picking a class
    ctx.fillStyle = "#fe5701";
    ctx.font = 'bold 70px "HeartWarming"';
    ctx.strokeText(`${user.username} is picking a class`, 700, 1000, 1400);
    ctx.fillText(`${user.username} is picking a class`, 700, 1000, 1400);

    return new MessageAttachment(canvas.toBuffer(), 'class.png');
  };

  const generateClassPicked = async (start) => {
    const current = classes.slice(start, start + 1);
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');

    console.log(current);
    console.log(current.classDescription);
    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.strokeText(`${user.username} picked ${current[0].name}!`, 250, 40, 500);
    ctx.fillText(`${user.username} picked ${current[0].name}!`, 250, 40, 500);

    ctx.strokeText(`${user.username}'s stats have been reset`, 250, 80, 500);
    ctx.fillText(`${user.username}'s stats have been reset`, 250, 80, 500);

    return new MessageAttachment(canvas.toBuffer(), 'picked.png');
  };

  const generateCancelClassPicked = async (start) => {
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');

    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.strokeText(`${user.username} canceled class selection`, 250, 60, 500);
    ctx.fillText(`${user.username} canceled class selection`, 250, 60, 500);

    return new MessageAttachment(canvas.toBuffer(), 'cancelSelection.png');
  };

  const generatePickClassButton = async (start) => {
    const current = classes.slice(start, start + 1);
    CurrentClassSelectionId = current[0].id;
    console.log(current);
    return new MessageButton({
      style: 'SECONDARY',
      label: `Pick ${current[0].name}`,
      emoji: '⛏️',
      customId: pickClassId,
    });
  };

  const generateCancelPickClassButton = async () => new MessageButton({
    style: 'SECONDARY',
    label: `Cancel class selection`,
    emoji: '❌',
    customId: cancelPickClassId,
  });

  const canFitOnOnePage = classes.length <= 1;
  const embedMessage = await discordChannel.send({
    files: [
      await generateClassImage(0),
    ],
    components: canFitOnOnePage
      ? []
      : [
        new MessageActionRow({
          components: [
            await generatePickClassButton(0),
            await generateCancelPickClassButton(),
          ],
        }),
        new MessageActionRow({ components: [forwardButton] }),
      ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user: discordUser }) => discordUser.id === user.user_id,
  });

  let currentIndex = 0;
  collector.on('collect', async (interaction) => {
    if (interaction.customId === pickClassId) {
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

      await interaction.update({
        files: [
          await generateClassPicked(currentIndex),
        ],
        components: [],
      });
      return;
    }
    // Cancel class selection
    if (interaction.customId === cancelPickClassId) {
      await interaction.update({
        files: [
          await generateCancelClassPicked(),
        ],
        components: [],
      });
      return;
    }
    // Increase/decrease index
    interaction.customId === backId ? (currentIndex -= 1) : (currentIndex += 1);

    // Load another character
    await interaction.update({
      files: [
        await generateClassImage(currentIndex),
      ],
      components: [
        new MessageActionRow({
          components: [
            await generatePickClassButton(currentIndex),
            await generateCancelPickClassButton(),
          ],
        }),
        new MessageActionRow({
          components: [
            // back button if it isn't the start
            ...(currentIndex ? [backButton] : []),
            // forward button if it isn't the end
            ...(currentIndex + 1 < classes.length ? [forwardButton] : []),
          ],
        }),
      ],
    });
  });
};
