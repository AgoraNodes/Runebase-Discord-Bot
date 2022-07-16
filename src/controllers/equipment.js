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
import db from '../models';
import logger from "../helpers/logger";
import { renderItemImage } from "../render/item";
import { renderStatsImage } from "../render/stats";
import { renderEquipmentImage } from '../render/equipment';
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import { unEquipItem } from '../helpers/equipment/unEquipItem';

const showEquipmentImage = async (
  userCurrentCharacter,
) => {
  const itemImage = await renderItemImage(
    userCurrentCharacter.equipment.helm,
  );
  console.log(showEquipmentImage);
};

export const discordShowEquipment = async (
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

  let userCurrentCharacter = await fetchUserCurrentCharacter(
    userId, // user discord id
    false, // Need inventory?
  );
  if (!userCurrentCharacter) {
    await message.reply({
      content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
      ephemeral: true,
    });
    return;
  }

  const cancelEquipmentId = 'cancelEquipment';
  const backId = 'back';
  const helmId = 'helm';
  const amuletId = 'amulet';
  const mainHandId = 'weaponSlotOne';
  const offHandId = 'weaponSlotTwo';
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
    customId: mainHandId,
  });

  const weaponSlotTwoButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Show Equiped Off Hand',
    emoji: '🛡️',
    customId: offHandId,
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
    label: 'Back to Equipment',
    emoji: '⬅️',
    customId: backId,
  });

  const generateCancelEquipmentButton = async () => new MessageButton({
    style: 'SECONDARY',
    label: `Cancel Equipment`,
    emoji: '❌',
    customId: cancelEquipmentId,
  });

  const generateUnEquipItemButton = async (
    myItem,
  ) => {
    const unEquipItemId = `UnEquip:${myItem.id}`;
    return new MessageButton({
      style: 'SECONDARY',
      label: `UnEquip ${myItem.name}`,
      emoji: '⛏️',
      customId: unEquipItemId,
    });
  };

  await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const generateCurrentEquipmentImage = async (
    userCurrentCharacter,
  ) => {
    const statsImageBuffer = await renderStatsImage(
      userCurrentCharacter,
      false,
    );
    const statsImage = await loadImage(statsImageBuffer);

    const equipmentImageBuffer = await renderEquipmentImage(
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

  const generateCancelEquipmentImage = async () => {
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');

    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.strokeText(`${userCurrentCharacter.UserGroup.user.username} canceled equipment screen`, 250, 60, 500);
    ctx.fillText(`${userCurrentCharacter.UserGroup.user.username} canceled equipment screen`, 250, 60, 500);

    return new MessageAttachment(canvas.toBuffer(), 'cancelEquipment.png');
  };

  let isRowOneActive = (
    userCurrentCharacter.equipment.helm
    || userCurrentCharacter.equipment.amulet
    || userCurrentCharacter.equipment.mainHand
    || userCurrentCharacter.equipment.offHand
    || userCurrentCharacter.equipment.armor
  );
  let isRowTwoActive = (
    userCurrentCharacter.equipment.gloves
    || userCurrentCharacter.equipment.ringSlotOne
    || userCurrentCharacter.equipment.ringSlotTwo
    || userCurrentCharacter.equipment.belt
    || userCurrentCharacter.equipment.boots
  );
  const embedMessage = await discordChannel.send({
    files: [
      await generateCurrentEquipmentImage(userCurrentCharacter),
    ],
    components: isRowOneActive || isRowTwoActive ? [
      ...(
        isRowOneActive
          ? [
            new MessageActionRow({
              components: [
                ...(userCurrentCharacter.equipment.helm
                  ? [helmButton] : []
                ),
                ...(userCurrentCharacter.equipment.amulet
                  ? [amuletutton] : []
                ),
                ...(userCurrentCharacter.equipment.mainHand
                  ? [weaponSlotOneButton] : []
                ),
                ...(userCurrentCharacter.equipment.offHand
                  ? [weaponSlotTwoButton] : []
                ),
                ...(userCurrentCharacter.equipment.armor
                  ? [armorButton] : []
                ),
              ],
            }),
          ]
          : []
      ),
      ...(
        isRowTwoActive
          ? [
            new MessageActionRow({
              components: [
                ...(userCurrentCharacter.equipment.gloves
                  ? [glovesButton] : []
                ),
                ...(userCurrentCharacter.equipment.ringSlotOne
                  ? [ringSlotOneButton] : []
                ),
                ...(userCurrentCharacter.equipment.ringSlotTwo
                  ? [ringSlotTwoButton] : []
                ),
                ...(userCurrentCharacter.equipment.belt
                  ? [beltButton] : []
                ),
                ...(userCurrentCharacter.equipment.boots
                  ? [bootsButton] : []
                ),
              ],
            }),
          ]
          : []
      ),
      new MessageActionRow({
        components: [
          await generateCancelEquipmentButton(),
        ],
      }),
    ] : [
      new MessageActionRow({
        components: [
          await generateCancelEquipmentButton(),
        ],
      }),
    ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.UserGroup.user.user_id,
  });

  const currentIndex = 0;
  collector.on('collect', async (interaction) => {
    await interaction.deferUpdate();
    let equipedItem;
    let cannotUnEquip;
    let cannotUnEquipReason = '';
    if (
      interaction.customId === helmId
      || interaction.customId === amuletId
      || interaction.customId === mainHandId
      || interaction.customId === offHandId
      || interaction.customId === armorId
      || interaction.customId === glovesId
      || interaction.customId === beltId
      || interaction.customId === bootsId
      || interaction.customId === ringSlotOneId
      || interaction.customId === ringSlotTwoId
    ) {
      await queue.add(async () => {
        await db.sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        }, async (t) => {
          userCurrentCharacter = await fetchUserCurrentCharacter(
            userId, // user discord id
            false, // Need inventory?
            t,
          );
          let itemImage;
          let itemToUnEquip;
          if (interaction.customId === helmId) {
            itemImage = await renderItemImage(
              userCurrentCharacter.equipment.helm,
            );
            itemToUnEquip = userCurrentCharacter.equipment.helm;
          }
          if (interaction.customId === amuletId) {
            itemImage = await renderItemImage(
              userCurrentCharacter.equipment.amulet,
            );
            itemToUnEquip = userCurrentCharacter.equipment.amulet;
          }
          if (interaction.customId === mainHandId) {
            itemImage = await renderItemImage(
              userCurrentCharacter.equipment.mainHand,
            );
            itemToUnEquip = userCurrentCharacter.equipment.mainHand;
          }
          if (interaction.customId === offHandId) {
            itemImage = await renderItemImage(
              userCurrentCharacter.equipment.offHand,
            );
            itemToUnEquip = userCurrentCharacter.equipment.offHand;
          }
          if (interaction.customId === armorId) {
            itemImage = await renderItemImage(
              userCurrentCharacter.equipment.armor,
            );
            itemToUnEquip = userCurrentCharacter.equipment.armor;
          }
          if (interaction.customId === glovesId) {
            itemImage = await renderItemImage(
              userCurrentCharacter.equipment.gloves,
            );
            itemToUnEquip = userCurrentCharacter.equipment.gloves;
          }
          if (interaction.customId === beltId) {
            itemImage = await renderItemImage(
              userCurrentCharacter.equipment.belt,
            );
            itemToUnEquip = userCurrentCharacter.equipment.belt;
          }
          if (interaction.customId === bootsId) {
            itemImage = await renderItemImage(
              userCurrentCharacter.equipment.boots,
            );
            itemToUnEquip = userCurrentCharacter.equipment.boots;
          }
          if (interaction.customId === ringSlotOneId) {
            itemImage = await renderItemImage(
              userCurrentCharacter.equipment.ringSlotOne,
            );
            itemToUnEquip = userCurrentCharacter.equipment.ringSlotOne;
          }
          if (interaction.customId === ringSlotTwoId) {
            itemImage = await renderItemImage(
              userCurrentCharacter.equipment.ringSlotTwo,
            );
            itemToUnEquip = userCurrentCharacter.equipment.ringSlotTwo;
          }
          await interaction.editReply({
            files: [
              itemImage,
            ],
            components: [
              new MessageActionRow({
                components: [
                  await generateUnEquipItemButton(itemToUnEquip),
                ],
              }),
              new MessageActionRow({
                components: [
                  backButton,
                ],
              }),
            ],
          });
          const preActivity = await db.activity.create({
            type: 'pickClass_s',
            earnerId: userCurrentCharacter.user.id,
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
              type: 'Equipment',
              error: `${err}`,
            });
          } catch (e) {
            logger.error(`Error Discord: ${e}`);
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
    // Cancel equipment screen
    if (interaction.customId === cancelEquipmentId) {
      await interaction.editReply({
        files: [
          await generateCancelEquipmentImage(),
        ],
        components: [],
      });
      return;
    }

    if (interaction.customId.startsWith('UnEquip:')) {
      console.log('detected unequip click');
      const itemId = Number(interaction.customId.replace("UnEquip:", ""));
      [
        userCurrentCharacter,
        equipedItem,
        cannotUnEquip,
        cannotUnEquipReason,
      ] = await unEquipItem(
        userCurrentCharacter,
        itemId,
        discordChannel,
        io,
        queue,
      );
    }

    isRowOneActive = (
      userCurrentCharacter.equipment.helm
      || userCurrentCharacter.equipment.amulet
      || userCurrentCharacter.equipment.mainHand
      || userCurrentCharacter.equipment.offHand
      || userCurrentCharacter.equipment.armor
    );
    isRowTwoActive = (
      userCurrentCharacter.equipment.gloves
      || userCurrentCharacter.equipment.ringSlotOne
      || userCurrentCharacter.equipment.ringSlotTwo
      || userCurrentCharacter.equipment.belt
      || userCurrentCharacter.equipment.boots
    );

    console.log('before edit reply');
    // Load another character
    await interaction.editReply({
      files: [
        await generateCurrentEquipmentImage(userCurrentCharacter),
      ],
      components: isRowOneActive || isRowTwoActive ? [
        ...(
          isRowOneActive
            ? [
              new MessageActionRow({
                components: [
                  ...(userCurrentCharacter.equipment.helm
                    ? [helmButton] : []
                  ),
                  ...(userCurrentCharacter.equipment.amulet
                    ? [amuletutton] : []
                  ),
                  ...(userCurrentCharacter.equipment.mainHand
                    ? [weaponSlotOneButton] : []
                  ),
                  ...(userCurrentCharacter.equipment.offHand
                    ? [weaponSlotTwoButton] : []
                  ),
                  ...(userCurrentCharacter.equipment.armor
                    ? [armorButton] : []
                  ),
                ],
              }),
            ]
            : []
        ),
        ...(
          isRowTwoActive
            ? [
              new MessageActionRow({
                components: [
                  ...(userCurrentCharacter.equipment.gloves
                    ? [glovesButton] : []
                  ),
                  ...(userCurrentCharacter.equipment.ringSlotOne
                    ? [ringSlotOneButton] : []
                  ),
                  ...(userCurrentCharacter.equipment.ringSlotTwo
                    ? [ringSlotTwoButton] : []
                  ),
                  ...(userCurrentCharacter.equipment.belt
                    ? [beltButton] : []
                  ),
                  ...(userCurrentCharacter.equipment.boots
                    ? [bootsButton] : []
                  ),
                ],
              }),
            ]
            : []
        ),
        new MessageActionRow({
          components: [
            await generateCancelEquipmentButton(),
          ],
        }),
      ] : [
        new MessageActionRow({
          components: [
            await generateCancelEquipmentButton(),
          ],
        }),
      ],
    });
  });
};
