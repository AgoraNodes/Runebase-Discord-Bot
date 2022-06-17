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
import { generateItemImage } from "../helpers/items/generateItemImage";
import { generateStatsImage } from "../helpers/stats/generateStatsImage";
import { generateEquipmentImage } from '../helpers/equipment/generateEquipmentImage';

export const discordShowEquipment = async (
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
  const userCurrentCharacter = await db.UserClass.findOne({
    where: {
      classId: user.currentClassId,
      userId: user.id,
    },
    include: [
      {
        model: db.user,
        as: 'user',
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
        ],
      },
      {
        model: db.stats,
        as: 'stats',
      },
      {
        model: db.condition,
        as: 'condition',
      },
      {
        model: db.equipment,
        as: 'equipment',
        include: [
          {
            model: db.item,
            as: 'helm',
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'armor',
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'amulet',
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'mainHand',
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'offHand',
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'gloves',
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'belt',
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'boots',
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'ringSlotOne',
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
          {
            model: db.item,
            as: 'ringSlotTwo',
            include: [
              {
                model: db.itemBase,
                as: 'itemBase',
                include: [
                  {
                    model: db.itemFamily,
                    as: 'itemFamily',
                    include: [
                      {
                        model: db.itemType,
                        as: 'itemType',
                      },
                    ],
                  },
                ],
              },
              {
                model: db.itemQuality,
                as: 'itemQuality',
              },
            ],
          },
        ],
      },
    ],
  });
  if (!userCurrentCharacter) return;

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

  const pickClassId = 'pickClass';
  const cancelPickClassId = 'cancelClass';

  // Buttons
  const backId = 'back';
  const forwardId = 'forward';

  const helmId = 'helm';
  const amuletId = 'amulet';
  const weaponSlotOneId = 'weaponSlotOne';
  const weaponSlotTwoId = 'weaponSlotTwo';
  const armorId = 'armor';
  const glovesId = 'gloves';
  const beltId = 'belt';
  const bootsId = 'boots';
  const ringSlotOneId = 'ringSlotOne';
  const ringSlotTwoId = 'ringSlotTwo';

  const ringSlotOneButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped RingSlot One',
    emoji: '💍',
    customId: ringSlotOneId,
  });

  const ringSlotTwoButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped RingSlot Two',
    emoji: '💍',
    customId: ringSlotTwoId,
  });

  const bootsButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped Boots',
    emoji: '🥾',
    customId: bootsId,
  });

  const helmButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped Helm',
    emoji: '🪖',
    customId: helmId,
  });
  const amuletutton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped Amulet',
    emoji: '🧿',
    customId: amuletId,
  });
  const weaponSlotOneButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped Main Hand',
    emoji: '🗡️',
    customId: weaponSlotOneId,
  });

  const weaponSlotTwoButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped Off Hand',
    emoji: '🛡️',
    customId: weaponSlotTwoId,
  });

  const armorButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped Armor',
    emoji: '🦺',
    customId: armorId,
  });
  const glovesButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped Gloves',
    emoji: '🧤',
    customId: glovesId,
  });
  const beltButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped Belt',
    emoji: '〰️',
    customId: beltId,
  });

  const backButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Back Inventory',
    emoji: '⬅️',
    customId: backId,
  });
  const forwardButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Forward Inventory',
    emoji: '➡️',
    customId: forwardId,
  });

  await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const generateInventoryImage = async (
    start,
  ) => {
    const statsImageBuffer = await generateStatsImage(
      userCurrentCharacter,
      false,
    );
    const statsImage = await loadImage(statsImageBuffer);

    const equipmentImageBuffer = await generateEquipmentImage(
      userCurrentCharacter,
    );
    const equipmentImage = await loadImage(equipmentImageBuffer);

    const canvas = createCanvas(2420, 1300);
    const ctx = canvas.getContext('2d');

    // Stats image
    ctx.drawImage(
      statsImage,
      0, // x position
      0, // y position
      960, // width
      1300, // height
    );

    // Equipment Image
    ctx.drawImage(
      equipmentImage,
      960,
      0,
      1460,
      1300,
    );

    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    // ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;

    return new MessageAttachment(canvas.toBuffer(), 'inventory.png');
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

  const embedMessage = await discordChannel.send({
    files: [
      await generateInventoryImage(0),
    ],
    components: [
      new MessageActionRow({
        components: [
          helmButton,
          amuletutton,
          weaponSlotOneButton,
          weaponSlotTwoButton,
          armorButton,
        ],
      }),
      new MessageActionRow({
        components: [
          glovesButton,
          ringSlotOneButton,
          ringSlotTwoButton,
          beltButton,
          bootsButton,
        ],
      }),
    ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user: discordUser }) => discordUser.id === user.user_id,
  });

  let currentIndex = 0;
  collector.on('collect', async (interaction) => {
    await interaction.deferUpdate();
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
    await interaction.editReply({
      files: [
        await generateInventoryImage(currentIndex),
      ],
      components: [
        new MessageActionRow({
          components: [
            helmButton,
            amuletutton,
            weaponSlotOneButton,
            weaponSlotTwoButton,
            armorButton,
          ],
        }),
        new MessageActionRow({
          components: [
            glovesButton,
            ringSlotOneButton,
            ringSlotTwoButton,
            beltButton,
            bootsButton,
          ],
        }),
      ],
    });
  });
};
