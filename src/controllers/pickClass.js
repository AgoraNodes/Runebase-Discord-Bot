/* eslint-disable import/prefer-default-export */
import {
  Transaction,
} from "sequelize";
import {
  ActionRowBuilder,
} from 'discord.js';
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../embeds';
import db from '../models';
import logger from "../helpers/logger";
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import { renderPickClassImage } from '../render/pickClass/pickClass';
import { renderClassPicked } from '../render/pickClass/classPicked';
import { renderCancelClassPicked } from '../render/pickClass/cancelClassPick';
import { generateStartGear } from "../helpers/items/generateStartingGear";
import {
  generateBackButton,
  generateForwardButton,
  generateCancelPickClassButton,
  generatePickClassButton,
} from '../buttons';
import {
  notSelectedRealmYetMessage,
  playingOnRealmMessage,
} from "../messages";

export const discordPickClass = async (
  discordClient,
  message,
  setting,
  io,
  queue,
  isDefered,
) => {
  let usedDeferReply = false;
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
        model: db.UserGroup,
        as: 'UserGroup',
        include: [
          {
            model: db.user,
            as: 'user',
          },
          {
            model: db.group,
            as: 'group',
          },
        ],
      },
    ],
  });

  if (!user) return;
  if (!user.currentRealmId) {
    if (!isDefered) {
      await message.reply({
        content: notSelectedRealmYetMessage(),
        ephemeral: true,
      });
      return usedDeferReply;
    }
    await message.editReply({
      content: notSelectedRealmYetMessage(),
      ephemeral: true,
    });
    usedDeferReply = true;
    return usedDeferReply;
  }

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
    content: playingOnRealmMessage(user),
    files: [
      {
        attachment: await renderPickClassImage(
          0,
          classes,
          user,
        ),
        name: 'pickClass.png',
      },
    ],
    components: canFitOnOnePage
      ? []
      : [
        new ActionRowBuilder({
          components: [
            await generatePickClassButton(
              0,
              classes,
            ),
            await generateCancelPickClassButton(),
          ],
        }),
        new ActionRowBuilder({
          components: [
            generateForwardButton(),
          ],
        }),
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
          // Find User Who is trying To Switch Class
          const findCurrentUser = await db.user.findOne({
            where: {
              id: user.id,
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          console.log('1');
          // Find the Class The User is trying to pick
          const selectedClass = await db.class.findOne({
            where: {
              id: CurrentClassSelectionId,
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          console.log('2');
          // Update What Class The user Currently has Selected
          await findCurrentUser.update({
            currentClassId: CurrentClassSelectionId,
          }, {
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          console.log('3');
          // Find the UserGroup Record (Realm related, user's experience is stored in this record)
          const UserGroup = await db.UserGroup.findOne({
            where: {
              userId: findCurrentUser.id,
              groupId: findCurrentUser.currentRealmId,
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          console.log('4');
          // Find The userGroupClass (Does User already have class record for the realm he is trying to join?)
          let userGroupClass = await db.UserGroupClass.findOne({
            where: {
              UserGroupId: UserGroup.id,
              classId: CurrentClassSelectionId,
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          console.log('5');
          // If the user has no class record for this realm yet
          if (!userGroupClass) {
            // Create a UserGroupClass Record
            userGroupClass = await db.UserGroupClass.create({
              UserGroupId: UserGroup.id,
              classId: CurrentClassSelectionId,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log('5-5');
          }

          // If User has no Condition Record Yet;
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
          // If User Has No Stats Record Yet;
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

          // If User Has No Inventory Record Yet;
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

          // If User Has No Equipment Record Yet;
          if (!userGroupClass.equipmentId) {
            const [
              mainHand,
              offHand,
            ] = await generateStartGear(
              selectedClass.name,
            );
            const equipment = await db.equipment.create({
              mainHandId: mainHand ? mainHand.id : null,
              offHandId: offHand ? offHand.id : null,
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

          // Find The User Default Attack Skill
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

          // If User has No Default Attack Skill Yet
          if (!userAttackSkill) {
            console.log('before create UserGroupClassSkill');
            userAttackSkill = await db.UserGroupClassSkill.create({
              UserGroupClassId: userGroupClass.id,
              skillId: findAttackSkill.id,
              points: 1,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log('after create UserGroupClassSkill');
          }

          // If User Has No Main Attack Skill Yet
          if (!userGroupClass.selectedMainSkillId) {
            userGroupClass = await userGroupClass.update({
              selectedMainSkillId: userAttackSkill.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }

          // If User has No Secondary Attack Skill Yet
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
              {
                attachment: await renderClassPicked(
                  currentIndex,
                  classes,
                  user,
                ),
                name: 'classPicked.png',
              },
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
          {
            attachment: await renderCancelClassPicked(
              user,
            ),
            name: 'cancelPickClass.png',
          },
        ],
        components: [],
      });
      return;
    }
    // Increase/decrease index

    if (interaction.customId === 'back') {
      currentIndex -= 1;
    } else {
      currentIndex += 1;
    }

    // Load another character
    await interaction.update({
      files: [
        {
          attachment: await renderPickClassImage(
            currentIndex,
            classes,
            user,
          ),
          name: 'pickClass.png',
        },
      ],
      components: [
        new ActionRowBuilder({
          components: [
            await generatePickClassButton(
              currentIndex,
              classes,
            ),
            await generateCancelPickClassButton(),
          ],
        }),
        new ActionRowBuilder({
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
