/* eslint-disable import/prefer-default-export */
import {
  Transaction,
} from "sequelize";
import {
  MessageActionRow,
  MessageButton,
  MessageAttachment,
} from 'discord.js';
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import { renderPickClassImage } from '../render/pickClass/pickClass';
import { renderClassPicked } from '../render/pickClass/classPicked';
import { renderCancelClassPicked } from '../render/pickClass/cancelClassPick';
import {
  generateBackButton,
  generateForwardButton,
  generateCancelPickClassButton,
  generatePickClassButton,
} from '../buttons';

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

  const classes = await db.class.findAll({
    include: [
      {
        model: db.classDescription,
        as: 'classDescription',
      },
    ],
  });

  const discordChannel = await fetchDiscordChannel(
    discordClient,
    message,
  );

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
            await generatePickClassButton(
              0,
              classes,
            ),
            await generateCancelPickClassButton(),
          ],
        }),
        new MessageActionRow({ components: [generateForwardButton()] }),
      ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user: discordUser }) => discordUser.id === user.user_id,
  });

  let currentIndex = 0;
  collector.on('collect', async (interaction) => {
    if (interaction.customId.startsWith('pickClass:')) {
      const CurrentClassSelectionId = Number(interaction.customId.replace("pickClass:", ""));
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
          await renderClassPicked(
            currentIndex,
            classes,
            user,
          ),
        ],
        components: [],
      });
      return;
    }
    // Cancel class selection
    if (interaction.customId === 'cancelClass') {
      await interaction.update({
        files: [
          await renderCancelClassPicked(
            user,
          ),
        ],
        components: [],
      });
      return;
    }
    // Increase/decrease index
    interaction.customId === 'back' ? (currentIndex -= 1) : (currentIndex += 1);

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
            await generatePickClassButton(
              currentIndex,
              classes,
            ),
            await generateCancelPickClassButton(),
          ],
        }),
        new MessageActionRow({
          components: [
            // back button if it isn't the start
            ...(currentIndex ? [generateBackButton()] : []),
            // forward button if it isn't the end
            ...(currentIndex + 1 < classes.length ? [generateForwardButton()] : []),
          ],
        }),
      ],
    });
  });
};
