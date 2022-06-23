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
import { renderPickClassImage } from '../render/pickClass';
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

  const generateClassPicked = async (start) => {
    const current = classes.slice(start, start + 1);
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');

    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.strokeText(`${user.username} picked ${current[0].name}!`, 250, 40, 500);
    ctx.fillText(`${user.username} picked ${current[0].name}!`, 250, 40, 500);

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
      await renderPickClassImage(
        0,
        classes,
        user,
      ),
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
          const findCurrentUser = await db.user.findOne({
            where: {
              id: user.id,
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          const selectedClass = await db.class.findOne({
            where: {
              id: CurrentClassSelectionId,
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          await findCurrentUser.update({
            currentClassId: CurrentClassSelectionId,
          }, {
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          let userClass = await db.UserClass.findOne({
            where: {
              userId: findCurrentUser.id,
              classId: CurrentClassSelectionId,
            },
          });
          if (!userClass) {
            const newStats = await db.stats.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            const newCondition = await db.condition.create({
              life: selectedClass.life,
              mana: selectedClass.mana,
              stamina: selectedClass.stamina,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            const newInventory = await db.inventory.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            const newEquipment = await db.equipment.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            userClass = await db.UserClass.create({
              userId: user.id,
              classId: CurrentClassSelectionId,
              statsId: newStats.id,
              conditionId: newCondition.id,
              inventoryId: newInventory.id,
              equipmentId: newEquipment.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          } else {
            userClass.update({
              classId: CurrentClassSelectionId,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          if (!userClass.conditionId) {
            const newCondition = await db.condition.create({
              life: selectedClass.life,
              mana: selectedClass.mana,
              stamina: selectedClass.stamina,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            userClass.update({
              conditionId: newCondition.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          if (!userClass.statsId) {
            const newStats = await db.stats.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            userClass.update({
              statsId: newStats.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          if (!userClass.inventoryId) {
            const inventory = await db.inventory.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            userClass.update({
              inventoryId: inventory.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          if (!userClass.equipmentId) {
            const equipment = await db.equipment.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            userClass.update({
              equipmentId: equipment.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          const findAttackSkill = await db.skill.findOne({
            where: {
              name: 'Attack',
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          let userAttackSkill = await db.UserClassSkill.findOne({
            where: {
              UserClassId: userClass.id,
              skillId: findAttackSkill.id,
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          if (!userAttackSkill) {
            userAttackSkill = await db.UserClassSkill.create({
              UserClassId: userClass.id,
              skillId: findAttackSkill.id,
              points: 1,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          if (!userClass.selectedMainSkillId) {
            userClass = await userClass.update({
              selectedMainSkillId: userAttackSkill.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          if (!userClass.selectedSecondarySkillId) {
            userClass = await userClass.update({
              selectedSecondarySkillId: userAttackSkill.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
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
        await renderPickClassImage(
          currentIndex,
          classes,
          user,
        ),
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
