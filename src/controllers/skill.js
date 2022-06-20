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
  MessageSelectMenu,
} from 'discord.js';

import path from 'path';
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import { renderskillTreeImage } from "../render/skillTree";

export const discordSkills = async (
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

  const userCurrentCharacter = await fetchUserCurrentCharacter(
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

  const generateSkillTreeImage = async (
    userCharacter,
    skillTree,
    skillTreeIndex,
    selectedSkill,
  ) => {
    const skillTreeImageBuffer = await renderskillTreeImage(
      userCharacter,
      skillTree,
      skillTreeIndex,
    );
    const skillTreeImage = await loadImage(skillTreeImageBuffer);
    const canvas = createCanvas(
      skillTreeImage.width,
      skillTreeImage.height,
    );
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      skillTreeImage,
      0,
      0,
      skillTreeImage.width,
      skillTreeImage.height,
    );

    return new MessageAttachment(canvas.toBuffer(), 'skillTree.png');
  };

  const generateClassPicked = async (start) => {
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');

    console.log('picked!');
    ctx.font = 'bold 30px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

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

    return new MessageAttachment(canvas.toBuffer(), 'cancelSelection.png');
  };

  const generateCancelSkill = async () => new MessageButton({
    style: 'SECONDARY',
    label: `Cancel class selection`,
    emoji: '❌',
    customId: cancelPickClassId,
  });

  const skillTreeMap = userCurrentCharacter.class.skillTrees.map((skilltree, index) => {
    console.log(index);
    console.log('index');
    return {
      label: skilltree.name,
      value: `skilltree-${index}`,
      default: index === 0,
    };
  });
  const skillMap = userCurrentCharacter.class.skillTrees[0].skills.map((
    mySkill,
    index,
  ) => ({
    placeholder: 'pick a skill',
    label: `${(mySkill.column + 9).toString(36).toUpperCase()}${mySkill.row}: ${mySkill.name}`,
    value: `skill-${index}`,
  }));

  const embedMessage = await discordChannel.send({
    files: [
      await generateSkillTreeImage(
        userCurrentCharacter,
        userCurrentCharacter.class.skillTrees[0],
        0,
        false,
      ),
    ],
    components:
      [
        new MessageActionRow({
          components: [
            new MessageSelectMenu({
              type: 'SELECT_MENU',
              customId: 'select-skilltree',
              options: skillTreeMap,
            }),
          ],
        }),
        new MessageActionRow({
          components: [
            new MessageSelectMenu({
              type: 'SELECT_MENU',
              customId: 'select-skill',
              options: skillMap,
            }),
          ],
        }),

        new MessageActionRow({
          components: [
            await generateCancelSkill(),
          ],
        }),
      ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
  });

  const currentIndex = 0;
  let skillTreeIndex = 0;
  let skillIndex;
  let selectedSkill;
  collector.on('collect', async (interaction) => {
    if (interaction.isSelectMenu()) {
      if (interaction.customId === 'select-skilltree') {
        await interaction.deferUpdate();
        if (interaction.values[0].startsWith('skilltree-')) {
          console.log(interaction);
          console.log('interaction');
          console.log(interaction.values[0]);
          skillTreeIndex = Number(interaction.values[0].replace('skilltree-', ''));
          console.log(skillTreeIndex);
          console.log('skillTreeIndex');
        }
      }
    }
    if (interaction.isSelectMenu()) {
      if (interaction.customId === 'select-skill') {
        await interaction.deferUpdate();
        if (interaction.values[0].startsWith('skill-')) {
          skillIndex = Number(interaction.values[0].replace('skill-', ''));
          selectedSkill = userCurrentCharacter.class.skillTrees[Number(skillTreeIndex)].skills[Number(skillIndex)];
        }
      }
    }
    if (interaction.customId === pickClassId) {
      await queue.add(async () => {
        await db.sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        }, async (t) => {
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
              type: 'ClassSelection',
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

    const skillTreeMapEdit = userCurrentCharacter.class.skillTrees.map((skilltree, index) => {
      console.log(index);
      console.log('index');
      return {
        label: skilltree.name,
        value: `skilltree-${index}`,
        default: index === skillTreeIndex,
      };
    });
    const skillMapEdit = userCurrentCharacter.class.skillTrees[skillTreeIndex].skills.map((
      mySkill,
      index,
    ) => ({
      placeholder: 'pick a skill',
      label: `${(mySkill.column + 9).toString(36).toUpperCase()}${mySkill.row}: ${mySkill.name}`,
      value: `skill-${index}`,
      default: index === skillIndex,
    }));

    // Load another character
    await interaction.editReply({
      files: [
        await generateSkillTreeImage(
          userCurrentCharacter,
          userCurrentCharacter.class.skillTrees[skillTreeIndex],
          skillTreeIndex,
          selectedSkill,
        ),
      ],
      components: [
        new MessageActionRow({
          components: [
            new MessageSelectMenu({
              type: 'SELECT_MENU',
              customId: 'select-skilltree',
              options: skillTreeMapEdit,
            }),
          ],
        }),
        new MessageActionRow({
          components: [
            new MessageSelectMenu({
              type: 'SELECT_MENU',
              customId: 'select-skill',
              options: skillMapEdit,
            }),
          ],
        }),
        new MessageActionRow({
          components: [
            await generateCancelSkill(),
          ],
        }),
      ],
    });
  });
};
