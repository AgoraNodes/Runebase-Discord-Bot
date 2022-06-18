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
  MessageEmbed,
} from 'discord.js';

import path from 'path';
import db from '../models';
import { generateItemImage } from "../helpers/items/generateItemImage";
import { generateStatsImage } from "../helpers/stats/generateStatsImage";
import { generateEquipmentImage } from '../helpers/equipment/generateEquipmentImage';
import { destroyItem } from '../helpers/items/destroyItem';
import { equipItem } from '../helpers/equipment/equipItem';
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';

export const discordShowInventory = async (
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
    true, // Need inventory?
  );
  if (!userCurrentCharacter) {
    await message.reply({
      content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
      ephemeral: true,
    });
    return;
  }

  const exitInventoryId = 'exitInventory';
  const backId = 'back';
  const forwardId = 'forward';

  const backButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Back',
    emoji: '⬅️',
    customId: backId,
  });

  const forwardButton = new MessageButton({
    style: 'SECONDARY',
    label: 'Next',
    emoji: '➡️',
    customId: forwardId,
  });

  const generateExitInventoryButton = async () => new MessageButton({
    style: 'SECONDARY',
    label: `Exit Inventory`,
    emoji: '❌',
    customId: exitInventoryId,
  });

  await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const generateConfirmDestroyItemImage = async (
    currentUserCharacter,
    start,
  ) => {
    const current = currentUserCharacter.inventory.items.slice(start, start + 1);

    const inventoryItemOneBuffer = await generateItemImage(current[0]);
    const inventoryItemOne = await loadImage(inventoryItemOneBuffer);
    const canvas = createCanvas(inventoryItemOne.width, (inventoryItemOne.height + 40));
    const ctx = canvas.getContext('2d');

    // Inventory item one image
    ctx.drawImage(
      inventoryItemOne,
      0,
      0,
      inventoryItemOne.width,
      inventoryItemOne.height,
    );

    ctx.font = 'bold 15px "HeartWarming"';
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;

    ctx.strokeText(
      `Are you sure you want to destroy`,
      canvas.width / 2,
      inventoryItemOne.height,
      inventoryItemOne.width,
    );
    ctx.fillText(
      `Are you sure you want to destroy`,
      canvas.width / 2,
      inventoryItemOne.height,
      inventoryItemOne.width,
    );
    ctx.font = 'bold 15px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;

    ctx.strokeText(
      `${current[0].name}`,
      canvas.width / 2,
      inventoryItemOne.height + 20,
      inventoryItemOne.width,
    );
    ctx.fillText(
      `${current[0].name}`,
      canvas.width / 2,
      inventoryItemOne.height + 20,
      inventoryItemOne.width,
    );

    return new MessageAttachment(canvas.toBuffer(), 'destroy.png');
  };

  const generateInventoryImage = async (
    currentUserCharacter,
    itemDestroyed,
    itemEquiped,
    cannotEquip,
    cannotEquipReason,
    start,
  ) => {
    const current = currentUserCharacter.inventory.items.slice(start, start + 1);

    // console.log(current);
    // console.log(current[0]);
    // console.log('after current select');

    const extraDestroyedHeight = itemDestroyed ? 20 : 0;
    const extraEquipedHeight = itemEquiped && !cannotEquip ? 20 : 0;
    const extraCannotEquipedHeight = cannotEquip ? 60 : 0;

    const inventoryItemOneBuffer = await generateItemImage(current[0]);
    const inventoryItemOne = await loadImage(inventoryItemOneBuffer);
    const canvas = createCanvas(
      inventoryItemOne.width,
      inventoryItemOne.height + 20 + extraDestroyedHeight + extraCannotEquipedHeight + extraEquipedHeight,
    );
    const ctx = canvas.getContext('2d');

    // Inventory item one image
    ctx.drawImage(
      inventoryItemOne,
      0,
      0,
      inventoryItemOne.width,
      inventoryItemOne.height,
    );

    ctx.font = 'bold 10px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;

    ctx.strokeText(
      `Showing items ${start + 1} out of ${currentUserCharacter.inventory.items.length}`,
      canvas.width / 2,
      inventoryItemOne.height,
      inventoryItemOne.width,
    );
    ctx.fillText(
      `Showing items ${start + 1} out of ${currentUserCharacter.inventory.items.length}`,
      canvas.width / 2,
      inventoryItemOne.height,
      inventoryItemOne.width,
    );

    if (itemDestroyed) {
      ctx.strokeText(
        `destroyed ${itemDestroyed.name}`,
        canvas.width / 2,
        inventoryItemOne.height + 20,
        inventoryItemOne.width,
      );
      ctx.fillText(
        `destroyed ${itemDestroyed.name}`,
        canvas.width / 2,
        inventoryItemOne.height + 20,
        inventoryItemOne.width,
      );
    }

    if (cannotEquip) {
      ctx.font = 'bold 15px "HeartWarming"';
      ctx.fillStyle = "red";
      ctx.lineWidth = 3;
      ctx.strokeText(
        `Unable to Equip`,
        canvas.width / 2,
        inventoryItemOne.height + 30,
        inventoryItemOne.width,
      );
      ctx.fillText(
        `Unable to Equip`,
        canvas.width / 2,
        inventoryItemOne.height + 30,
        inventoryItemOne.width,
      );
      ctx.strokeText(
        `${cannotEquipReason}`,
        canvas.width / 2,
        inventoryItemOne.height + 50,
        inventoryItemOne.width,
      );
      ctx.fillText(
        `${cannotEquipReason}`,
        canvas.width / 2,
        inventoryItemOne.height + 50,
        inventoryItemOne.width,
      );
    }
    if (itemEquiped && !cannotEquip) {
      ctx.strokeText(
        `equiped ${itemEquiped.name}`,
        canvas.width / 2,
        inventoryItemOne.height + 20,
        inventoryItemOne.width,
      );
      ctx.fillText(
        `equiped ${itemEquiped.name}`,
        canvas.width / 2,
        inventoryItemOne.height + 20,
        inventoryItemOne.width,
      );
    }

    return new MessageAttachment(canvas.toBuffer(), 'inventory.png');
  };

  const generateClassPicked = async (start) => {
    const current = userCurrentCharacter.inventory.items.slice(start, start + 1);
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.strokeText(`${userCurrentCharacter.user.username} picked ${current[0].name}!`, 250, 40, 500);
    ctx.fillText(`${userCurrentCharacter.user.username} picked ${current[0].name}!`, 250, 40, 500);
    return new MessageAttachment(canvas.toBuffer(), 'picked.png');
  };

  const generateExitInventoryImage = async (start) => {
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.strokeText(`${userCurrentCharacter.user.username} canceled class selection`, 250, 60, 500);
    ctx.fillText(`${userCurrentCharacter.user.username} canceled class selection`, 250, 60, 500);
    return new MessageAttachment(canvas.toBuffer(), 'cancelSelection.png');
  };

  const generateEmptyInventoryImage = async (start) => {
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.strokeText(`${userCurrentCharacter.user.username} Your inventory is empty`, 250, 60, 500);
    ctx.fillText(`${userCurrentCharacter.user.username} Your inventory is empty`, 250, 60, 500);
    return new MessageAttachment(canvas.toBuffer(), 'emptyInventory.png');
  };

  const generateEquipmentCompareButton = async (
    start,
  ) => {
    const current = userCurrentCharacter.inventory.items.slice(start, start + 1);
    const equipItemId = `Compare:${current[0].id}`;
    return new MessageButton({
      style: 'SECONDARY',
      label: `Compare ${current[0].name}`,
      emoji: '👀',
      customId: equipItemId,
    });
  };

  const generateEquipItemButton = async (start) => {
    const current = userCurrentCharacter.inventory.items.slice(start, start + 1);
    const equipItemId = `Equip:${current[0].id}`;
    return new MessageButton({
      style: 'SECONDARY',
      label: `Equip ${current[0].name}`,
      emoji: '⛏️',
      customId: equipItemId,
    });
  };

  const generateDestroyYesButton = async (start) => {
    const current = userCurrentCharacter.inventory.items.slice(start, start + 1);
    const destroyYesButtonId = `ConfirmDestroy:${current[0].id}`;
    return new MessageButton({
      style: 'SECONDARY',
      label: `Yes, destroy ${current[0].name}`,
      emoji: '🚮',
      customId: destroyYesButtonId,
    });
  };
  const generateDestroyNoButton = async (start) => {
    const destroyNoButtonId = `cancelDestroy`;
    return new MessageButton({
      style: 'SECONDARY',
      label: `No, go back`,
      emoji: '⬅️',
      customId: destroyNoButtonId,
    });
  };

  const generateDestroyItemButton = async (start) => {
    const current = userCurrentCharacter.inventory.items.slice(start, start + 1);
    const destroyItemId = `Destroy:${current[0].id}`;
    return new MessageButton({
      style: 'SECONDARY',
      label: `Destroy ${current[0].name}`,
      emoji: '❌',
      customId: destroyItemId,
    });
  };

  const canFitOnOnePage = userCurrentCharacter.inventory.items.length <= 1;
  const embedMessage = await discordChannel.send({
    files: [
      ...(
        userCurrentCharacter.inventory.items.length > 0 ? [
          await generateInventoryImage(
            userCurrentCharacter,
            false,
            false,
            false,
            false,
            0,
          ),
        ] : [
          await generateEmptyInventoryImage(),
        ]
      ),
    ],
    components: [
      ...(
        userCurrentCharacter.inventory.items.length > 0 && [
          new MessageActionRow({
            components: [
              await generateEquipmentCompareButton(0),
            ],
          }),
          new MessageActionRow({
            components: [
              await generateEquipItemButton(0),
              await generateDestroyItemButton(0),
            ],
          }),
        ]
      ),
      ...(
        !canFitOnOnePage ? [
          new MessageActionRow({
            components: [
              forwardButton,
            ],
          }),
        ] : []
      ),
      ...(
        userCurrentCharacter.inventory.items.length > 0 && [
          new MessageActionRow({
            components: [
              await generateExitInventoryButton(),
            ],
          }),
        ]
      ),
    ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
  });

  let currentIndex = 0;
  collector.on('collect', async (interaction) => {
    await interaction.deferUpdate();
    let destroyedItem = false;
    let equipedItem = false;
    let cannotEquip = false;
    let cannotEquipReason = '';
    if (interaction.customId.startsWith('Compare:')) {
      let updatedUserCharacter;
      await queue.add(async () => {
        await db.sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        }, async (t) => {
          console.log('item compare');
        }).catch(async (err) => {
          console.log(err);
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

    if (interaction.customId.startsWith('Equip:')) {
      const itemId = Number(interaction.customId.replace("Equip:", ""));
      [
        userCurrentCharacter,
        equipedItem,
        cannotEquip,
        cannotEquipReason,
      ] = await equipItem(
        userCurrentCharacter,
        itemId,
        discordChannel,
        io,
        queue,
      );
      if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
        currentIndex -= 1;
      }
    }
    if (interaction.customId.startsWith('Destroy:')) {
      await interaction.editReply({
        files: [
          ...(
            userCurrentCharacter.inventory.items.length > 0 ? [
              await generateConfirmDestroyItemImage(
                userCurrentCharacter,
                currentIndex,
              ),
            ] : [
              await generateEmptyInventoryImage(),
            ]
          ),
        ],
        components: [
          new MessageActionRow({
            components: [
              await generateDestroyYesButton(currentIndex),
            ],
          }),
          new MessageActionRow({
            components: [
              await generateDestroyNoButton(),
            ],
          }),
        ],
      });
      return;
    }
    if (interaction.customId.startsWith('ConfirmDestroy:')) {
      const itemId = Number(interaction.customId.replace("ConfirmDestroy:", ""));
      [
        userCurrentCharacter,
        destroyedItem,
      ] = await destroyItem(
        userCurrentCharacter,
        itemId,
        discordChannel,
        io,
        queue,
      );
      if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
        currentIndex -= 1;
      }
    }
    // Cancel class selection
    if (interaction.customId === exitInventoryId) {
      await interaction.update({
        files: [
          await generateExitInventoryImage(),
        ],
        components: [],
      });
      return;
    }
    if (
      interaction.customId === backId
      || interaction.customId === forwardId
    ) {
      interaction.customId === backId ? (currentIndex -= 1) : (currentIndex += 1);
    }

    await interaction.editReply({
      files: [
        ...(
          userCurrentCharacter.inventory.items.length > 0 ? [
            await generateInventoryImage(
              userCurrentCharacter,
              destroyedItem,
              equipedItem,
              cannotEquip,
              cannotEquipReason,
              currentIndex,
            ),
          ] : [
            await generateEmptyInventoryImage(),
          ]
        ),
      ],
      components: [
        new MessageActionRow({
          components: [
            await generateEquipmentCompareButton(
              currentIndex,
            ),
          ],
        }),
        new MessageActionRow({
          components: [
            await generateEquipItemButton(currentIndex),
            await generateDestroyItemButton(currentIndex),
          ],
        }),
        new MessageActionRow({
          components: [
            ...(currentIndex ? [backButton] : []),
            ...(currentIndex + 1 < userCurrentCharacter.inventory.items.length ? [forwardButton] : []),
          ],
        }),
        new MessageActionRow({
          components: [
            await generateExitInventoryButton(),
          ],
        }),
      ],
    });
  });
};
