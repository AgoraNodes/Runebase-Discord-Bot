/* eslint-disable import/prefer-default-export */
import {
  ActionRowBuilder,
  SelectMenuBuilder,
  // MessageEmbed,
} from 'discord.js';
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import { addSkillPoint } from '../helpers/skills/addSkillPoint';

import { renderSkillScreen } from "../render/skills";
import { renderCancelSkillPick } from '../render/skills/cancelSkillPick';
import {
  generateCancelSkillButton,
  generateAddSkillButton,
} from '../buttons';
import skills from '../render/skills/skillInfo';
import {
  skillInfoMessage,
  loadingSkillAddEmbed,
  loadingSkillSelectEmbed,
} from '../embeds';
import skillEmoji from "../config/skillEmoji";
import {
  playingOnRealmMessage,
} from '../messages';
import testPlayerReadyness from '../helpers/testPlayerReadyness';

export const discordSkills = async (
  discordClient,
  message,
  setting,
  io,
  queue,
  isDefered,
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

  const [
    failed,
    usedDeferReply,
  ] = await testPlayerReadyness(
    userCurrentCharacter,
    message,
    isDefered,
  );
  if (failed) return usedDeferReply;

  const skillTreeMap = userCurrentCharacter.class.skillTrees.map((skilltree, index) => {
    console.log(index);
    return {
      label: skilltree.name,
      value: `skilltree-${index}`,
      default: index === 0,
    };
  });

  const skillMap = userCurrentCharacter.class.skillTrees[0].skills.map((
    mySkill,
    index,
  ) => {
    const emoji = skillEmoji.find((a) => a.name === mySkill.name);
    return {
      placeholder: 'pick a skill',
      label: `${(mySkill.column + 9).toString(36).toUpperCase()}${mySkill.row}: ${mySkill.name}`,
      value: `skill-${index}`,
      ...(emoji ? {
        emoji: emoji.emoji,
      } : false),
    };
  });

  const embedMessage = await discordChannel.send({
    content: playingOnRealmMessage(userCurrentCharacter),
    files: [
      {
        attachment: await renderSkillScreen(
          userCurrentCharacter,
          userCurrentCharacter.class.skillTrees[0],
          0, // skillTreeIndex
          false, // selected skill
          false, // Skill Info Json
          false, // add skill failReason String
        ),
        name: 'skillScreen.png',
      },
    ],
    components:
      [
        new ActionRowBuilder({
          components: [
            new SelectMenuBuilder({
              customId: 'select-skilltree',
              options: skillTreeMap,
            }),
          ],
        }),
        new ActionRowBuilder({
          components: [
            new SelectMenuBuilder({
              customId: 'select-skill',
              options: skillMap,
            }),
          ],
        }),

        new ActionRowBuilder({
          components: [
            await generateCancelSkillButton(),
          ],
        }),
      ],
  });

  const collector = embedMessage.createMessageComponentCollector({});

  let skillTreeIndex = 0;
  let skillIndex;
  let selectedSkill;
  collector.on('collect', async (interaction) => {
    let failAddSkillReason;
    if (interaction.user.id !== userCurrentCharacter.UserGroup.user.user_id) {
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
          content: playingOnRealmMessage(userCurrentCharacter),
          embeds: [
            await loadingSkillAddEmbed(
              userCurrentCharacter.UserGroup.user.username,
            ),
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
      if (interaction.customId === 'cancelSkillPick') {
        await interaction.editReply({
          content: playingOnRealmMessage(userCurrentCharacter),
          embeds: [],
          files: [
            {
              attachment: await renderCancelSkillPick(userCurrentCharacter),
              name: 'cancelSkillScreen.png',
            },
          ],
          components: [],
        });
        return;
      }
    }
    if (interaction.isSelectMenu()) {
      await interaction.editReply({
        content: playingOnRealmMessage(userCurrentCharacter),
        embeds: [
          await loadingSkillSelectEmbed(
            userCurrentCharacter.UserGroup.user.username,
          ),
        ],
      });
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
    console.log(skills);
    console.log('skills');
    const jsonSkillInfo = skills.find((x) => x.name === selectedSkill.name);

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
    ) => {
      const emoji = skillEmoji.find((a) => a.name === mySkill.name);
      return {
        placeholder: 'pick a skill',
        label: `${(mySkill.column + 9).toString(36).toUpperCase()}${mySkill.row}: ${mySkill.name}`,
        value: `skill-${index}`,
        default: index === skillIndex,
        ...(emoji ? {
          emoji: emoji.emoji,
        } : false),
      };
    });

    await interaction.editReply({
      content: playingOnRealmMessage(userCurrentCharacter),
      embeds: [
        ...(jsonSkillInfo
          ? [
            skillInfoMessage(
              jsonSkillInfo && jsonSkillInfo.name,
              jsonSkillInfo && jsonSkillInfo.description,
            ),
          ]
          : []
        ),
      ],
      files: [
        {
          attachment: await renderSkillScreen(
            userCurrentCharacter,
            userCurrentCharacter.class.skillTrees[skillTreeIndex],
            skillTreeIndex,
            selectedSkill,
            jsonSkillInfo,
            failAddSkillReason,
          ),
          name: 'skillScreen.png',
        },
      ],
      components: [
        ...(selectedSkill
          ? [
            new ActionRowBuilder({
              components: [
                await generateAddSkillButton(
                  selectedSkill,
                ),
              ],
            }),
          ]
          : []
        ),
        new ActionRowBuilder({
          components: [
            new SelectMenuBuilder({
              customId: 'select-skilltree',
              options: skillTreeMapEdit,
            }),
          ],
        }),
        new ActionRowBuilder({
          components: [
            new SelectMenuBuilder({
              customId: 'select-skill',
              options: skillMapEdit,
            }),
          ],
        }),
        new ActionRowBuilder({
          components: [
            await generateCancelSkillButton(),
          ],
        }),
      ],
    });
  });
};
