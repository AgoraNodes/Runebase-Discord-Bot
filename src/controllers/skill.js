/* eslint-disable import/prefer-default-export */
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
  MessageEmbed,
} from 'discord.js';

import path from 'path';
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import { addSkillPoint } from '../helpers/skills/addSkillPoint';

import { renderSkillTreeImage } from "../render/skills/skillTree";
import { renderSkillDescriptionImage } from '../render/skills/skillDescription';
import { renderCancelSkillPick } from '../render/skills/cancelSkillPick';

export const discordSkills = async (
  discordClient,
  message,
  setting,
  io,
  queue,
) => {
  // const activity = [];

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

  const cancelSkillPickId = 'cancelSkillPick';

  await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

  const generateSkillTreeImage = async (
    userCharacter,
    skillTree,
    skillTreeIndex,
    selectedSkill,
    failReason,
  ) => {
    const skillTreeImageBuffer = await renderSkillTreeImage(
      userCharacter,
      skillTree,
      skillTreeIndex,
      selectedSkill,
    );
    const skillTreeImage = await loadImage(skillTreeImageBuffer);

    const skillDescriptionImageBuffer = await renderSkillDescriptionImage(
      userCharacter,
      skillTree,
      skillTreeIndex,
      selectedSkill,
    );
    const skillDescriptionImage = await loadImage(skillDescriptionImageBuffer);

    const failReasonHeight = failReason ? 25 : 0;

    const canvas = createCanvas(
      skillTreeImage.width + skillDescriptionImage.width,
      skillTreeImage.height + failReasonHeight,
    );
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      skillTreeImage,
      0,
      0,
      skillTreeImage.width,
      skillTreeImage.height,
    );

    if (selectedSkill) {
      ctx.drawImage(
        skillDescriptionImage,
        skillTreeImage.width,
        0,
        skillDescriptionImage.width,
        skillDescriptionImage.height,
      );
    }

    if (failReason) {
      ctx.font = 'bold 15px "HeartWarming"';
      ctx.fillStyle = "red";
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.textAlign = "center";
      ctx.strokeText(
        failReason,
        skillTreeImage.width / 2,
        skillTreeImage.height + 15,
        skillTreeImage.width,
      );
      ctx.fillText(
        failReason,
        skillTreeImage.width / 2,
        skillTreeImage.height + 15,
        skillTreeImage.width,
      );
    }

    return new MessageAttachment(canvas.toBuffer(), 'skillTree.png');
  };

  const generateCancelSkill = async () => new MessageButton({
    style: 'SECONDARY',
    label: `Cancel skill selection`,
    emoji: '❌',
    customId: cancelSkillPickId,
  });

  const generateAddSkillButton = async (mySelectedSkill) => {
    const addSkillId = `addSkill:${mySelectedSkill.id}`;
    return new MessageButton({
      style: 'SECONDARY',
      label: `Add Skillpoint to ${mySelectedSkill.name}`,
      emoji: '➕',
      customId: addSkillId,
    });
  };

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
        0, // skillTreeIndex
        false, // selected skill
        false, // add skill failReason String
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

  const loadingSkillAddEmbed = new MessageEmbed()
    .setTitle('Adding Skill Point')
    .setDescription(`${userCurrentCharacter.user.username}, Loading..`);

  const loadingSkillSelectEmbed = new MessageEmbed()
    .setTitle('Selecting Skill')
    .setDescription(`${userCurrentCharacter.user.username}, Loading..`);

  const collector = embedMessage.createMessageComponentCollector({
    // filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
  });

  let skillTreeIndex = 0;
  let skillIndex;
  let selectedSkill;
  collector.on('collect', async (interaction) => {
    let failAddSkillReason;
    if (interaction.user.id !== userCurrentCharacter.user.user_id) {
      await interaction.reply({
        content: `<@${interaction.user.id}>, These buttons aren't for you!`,
        ephemeral: true,
      });
      return;
    }
    await interaction.deferUpdate();
    if (interaction.isButton()) {
      if (interaction.customId.startsWith('addSkill:')) {
        await interaction.editReply({
          embeds: [
            loadingSkillAddEmbed,
          ],
        });
        const skillToAddId = Number(interaction.customId.replace("addSkill:", ""));
        [
          userCurrentCharacter,
          failAddSkillReason,
        ] = await addSkillPoint(
          userCurrentCharacter,
          skillToAddId,
          io,
          queue,
        );
      }
      if (interaction.customId === cancelSkillPickId) {
        await interaction.editReply({
          files: [
            await renderCancelSkillPick(userCurrentCharacter),
          ],
          components: [],
        });
        return;
      }
    }
    if (interaction.isSelectMenu()) {
      // await interaction.editReply({
      //   embeds: [
      //     loadingSkillSelectEmbed,
      //   ],
      // });
      if (interaction.customId === 'select-skilltree') {
        if (interaction.values[0].startsWith('skilltree-')) {
          skillTreeIndex = Number(interaction.values[0].replace('skilltree-', ''));
          selectedSkill = false;
          skillIndex = false;
        }
      }
      if (interaction.customId === 'select-skill') {
        if (interaction.values[0].startsWith('skill-')) {
          skillIndex = Number(interaction.values[0].replace('skill-', ''));
          selectedSkill = userCurrentCharacter.class.skillTrees[Number(skillTreeIndex)].skills[Number(skillIndex)];
        }
      }
    }

    const skillTreeMapEdit = userCurrentCharacter.class.skillTrees.map((
      skilltree,
      index,
    ) => ({
      label: skilltree.name,
      value: `skilltree-${index}`,
      default: index === skillTreeIndex,
    }));

    const skillMapEdit = userCurrentCharacter.class.skillTrees[skillTreeIndex].skills.map((
      mySkill,
      index,
    ) => ({
      placeholder: 'pick a skill',
      label: `${(mySkill.column + 9).toString(36).toUpperCase()}${mySkill.row}: ${mySkill.name}`,
      value: `skill-${index}`,
      default: index === skillIndex,
    }));

    await interaction.editReply({
      embeds: [],
      files: [
        await generateSkillTreeImage(
          userCurrentCharacter,
          userCurrentCharacter.class.skillTrees[skillTreeIndex],
          skillTreeIndex,
          selectedSkill,
          failAddSkillReason,
        ),
      ],
      components: [
        ...(selectedSkill
          ? [
            new MessageActionRow({
              components: [
                await generateAddSkillButton(
                  selectedSkill,
                ),
              ],
            }),
          ]
          : []
        ),
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
