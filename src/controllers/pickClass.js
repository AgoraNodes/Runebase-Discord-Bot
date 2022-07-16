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
          console.log('1');
          const selectedClass = await db.class.findOne({
            where: {
              id: CurrentClassSelectionId,
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          console.log('2');
          await findCurrentUser.update({
            currentClassId: CurrentClassSelectionId,
          }, {
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          console.log('3');
          const UserGroup = await db.UserGroup.findOne({
            where: {
              userId: findCurrentUser.id,
              groupId: findCurrentUser.currentRealmId,
            },
          });
          console.log('4');
          let userGroupClass = await db.UserGroupClass.findOne({
            where: {
              UserGroupId: UserGroup.id,
              classId: CurrentClassSelectionId,
            },
          });
          console.log('5');
          if (!userGroupClass) {
            const newStats = await db.stats.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log('5-1');
            const newCondition = await db.condition.create({
              life: selectedClass.life,
              mana: selectedClass.mana,
              stamina: selectedClass.stamina,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log('5-2');
            const newInventory = await db.inventory.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log('5-3');
            const newEquipment = await db.equipment.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log('5-4');
            userGroupClass = await db.UserGroupClass.create({
              userId: 1, // to be removed
              UserGroupId: UserGroup.id,
              classId: CurrentClassSelectionId,
              statsId: newStats.id,
              conditionId: newCondition.id,
              inventoryId: newInventory.id,
              equipmentId: newEquipment.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log('5-5');
          }
          // else {
          //   userClass.update({
          //     classId: CurrentClassSelectionId,
          //   }, {
          //     transaction: t,
          //     lock: t.LOCK.UPDATE,
          //   });
          // }
          console.log('7');
          if (!userGroupClass.conditionId) {
            const newCondition = await db.condition.create({
              life: selectedClass.life,
              mana: selectedClass.mana,
              stamina: selectedClass.stamina,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            userGroupClass.update({
              conditionId: newCondition.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          console.log('8');
          if (!userGroupClass.statsId) {
            const newStats = await db.stats.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            userGroupClass.update({
              statsId: newStats.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          if (!userGroupClass.inventoryId) {
            const inventory = await db.inventory.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            userGroupClass.update({
              inventoryId: inventory.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          if (!userGroupClass.equipmentId) {
            const equipment = await db.equipment.create({
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            userGroupClass.update({
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
          let userAttackSkill = await db.UserGroupClassSkill.findOne({
            where: {
              UserGroupClassId: userGroupClass.id,
              skillId: findAttackSkill.id,
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          if (!userAttackSkill) {
            console.log('before create UserGroupClassSkill');
            userAttackSkill = await db.UserGroupClassSkill.create({
              UserClassId: 2, // to be removed
              UserGroupClassId: userGroupClass.id,
              skillId: findAttackSkill.id,
              points: 1,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log('after create UserGroupClassSkill');
          }
          if (!userGroupClass.selectedMainSkillId) {
            userGroupClass = await userGroupClass.update({
              selectedMainSkillId: userAttackSkill.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          if (!userGroupClass.selectedSecondarySkillId) {
            userGroupClass = await userGroupClass.update({
              selectedSecondarySkillId: userAttackSkill.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }

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
