/* eslint-disable import/prefer-default-export */
import {
  Transaction,
} from "sequelize";
import {
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  MessageSelectMenu,
  MessageEmbed,
} from 'discord.js';
import db from '../models';
import { renderBattleGif } from '../render/battle/battle';
import { renderInitBattleGif } from '../render/battle/initBattle';
import { renderUserDied } from '../render/battle/userDied';
import { renderOutOfStamina } from '../render/battle/outOfStamina';
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchUserCurrentSelectedSkills } from "../helpers/character/selectedSkills";
import { updateUserCurrentSelectedSkills } from '../helpers/character/updateSelectedSkills';
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import { processBattleMove } from '../helpers/battle/processBattleMove';
import { renderBattleComplete } from '../render/battle/battleComplete';
import { gainExp } from '../helpers/client/experience';

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const discordBattle = async (
  discordClient,
  message,
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

  let userCurrentSelectedSkills = await fetchUserCurrentSelectedSkills(
    userId,
  );

  if (!userCurrentCharacter) {
    await message.reply({
      content: 'You have not selected a class yet\n`!runebase pickclass`\n/`pickclass`',
      ephemeral: true,
    });
    return;
  }

  if (userCurrentCharacter.condition.stamina < 10) {
    await discordChannel.send({
      files: [
        await renderOutOfStamina(
          userCurrentCharacter,
        ),
      ],
      components: [],
    });
    return;
  }

  if (userCurrentCharacter.condition.life < 1) {
    await discordChannel.send({
      files: [
        await renderUserDied(
          userCurrentCharacter,
        ),
      ],
      components: [],
    });
    return;
  }
  await userCurrentCharacter.condition.update({
    stamina: userCurrentCharacter.condition.stamina - 10,
  });
  userCurrentCharacter = await fetchUserCurrentCharacter(
    userId, // user discord id
    false, // Need inventory?
  );

  let battle = await db.battle.findOne({
    where: {
      complete: false,
      UserClassId: userCurrentCharacter.id,
    },
    order: [
      [db.battleLog, 'id', 'DESC'],
    ],
    include: [
      {
        model: db.battleLog,
        as: 'battleLogs',
        required: false,
      },
      {
        model: db.monster,
        as: 'monsters',
      },
    ],
  });
  if (!battle) {
    const monster = await db.monster.findOne({
      where: {
        name: 'Zombie',
      },
    });
    const newBattle = await db.battle.create({
      complete: false,
      UserClassId: userCurrentCharacter.id,
    });
    const randomMonsterHp = randomIntFromInterval(monster.minHp, monster.maxHp);
    await db.BattleMonster.create({
      battleId: newBattle.id,
      monsterId: monster.id,
      currentHp: randomMonsterHp,
      maxHp: randomMonsterHp,
    });
    battle = await db.battle.findOne({
      where: {
        id: newBattle.id,
      },
      order: [
        [db.battleLog, 'id', 'DESC'],
      ],
      include: [
        {
          model: db.battleLog,
          as: 'battleLogs',
          required: false,
        },
        {
          model: db.monster,
          as: 'monsters',
        },
      ],
    });
  }
  // console.log(battle.monsters);
  // console.log(battle.monsters[0].BattleMonster);
  // console.log('monsters');

  const mainSkillMap = userCurrentSelectedSkills.UserClassSkills.map((
    mySkill,
    index,
  ) => ({
    placeholder: 'pick a skill',
    label: `Main Skill: ${mySkill.skill.name}`,
    value: `mainSkill:${mySkill.id}`,
    default: mySkill.id === userCurrentSelectedSkills.selectedMainSkillId,
  }));

  const secondarySkillMap = userCurrentSelectedSkills.UserClassSkills.map((
    mySkill,
    index,
  ) => ({
    placeholder: 'pick a skill',
    label: `Secondary Skill: ${mySkill.skill.name}`,
    value: `secondarySkill:${mySkill.id}`,
    default: mySkill.id === userCurrentSelectedSkills.selectedSecondarySkillId,
  }));

  const generateMainSkillButton = async (mySelectedSkill) => {
    const addSkillId = `attackMain:${mySelectedSkill.id}`;
    return new MessageButton({
      style: 'SECONDARY',
      label: `${mySelectedSkill.skill.name}`,
      // emoji: '➕',
      customId: addSkillId,
    });
  };

  const generateSecondarySkillButton = async (mySelectedSkill) => {
    const addSkillId = `attackSecondary:${mySelectedSkill.id}`;
    return new MessageButton({
      style: 'SECONDARY',
      label: `${mySelectedSkill.skill.name}`,
      // emoji: '➕',
      customId: addSkillId,
    });
  };

  const embedMessage = await discordChannel.send({
    files: [
      new MessageAttachment(
        await renderInitBattleGif(
          userCurrentCharacter,
          userCurrentSelectedSkills,
          battle,
          battle,
          userCurrentCharacter,
        ),
        'battle.gif',
      ),
    ],
    components: [
      new MessageActionRow({
        components: [
          await generateMainSkillButton(
            userCurrentSelectedSkills.selectedMainSkill,
          ),
          await generateSecondarySkillButton(
            userCurrentSelectedSkills.selectedSecondarySkill,
          ),
        ],
      }),
      new MessageActionRow({
        components: [
          new MessageSelectMenu({
            type: 'SELECT_MENU',
            customId: 'select-mainSkill',
            options: mainSkillMap,
          }),

        ],
      }),
      new MessageActionRow({
        components: [
          new MessageSelectMenu({
            type: 'SELECT_MENU',
            customId: 'select-secondarySkill',
            options: secondarySkillMap,
          }),
        ],
      }),
    ],
  });

  const loadingEmbed = new MessageEmbed()
    .setTitle('Battle')
    .setDescription(`${userCurrentCharacter.user.username}, Your next move is calculating..`);

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
  });

  collector.on('collect', async (interaction) => {
    await queue.add(async () => {
      await db.sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      }, async (t) => {
        let attackId;
        let monsterInfo;
        let userInfo;
        let previousBattleState = battle;
        previousBattleState = JSON.stringify(previousBattleState);
        previousBattleState = JSON.parse(previousBattleState);
        let previousUserState = userCurrentCharacter;
        previousUserState = JSON.stringify(previousUserState);
        previousUserState = JSON.parse(previousUserState);

        if (interaction.isButton()) {
          await interaction.deferUpdate();
          userCurrentCharacter = await fetchUserCurrentCharacter(
            userId, // user discord id
            false, // Need inventory?
            t,
          );
          await interaction.editReply({
            embeds: [
              loadingEmbed,
            ],
            components: [],
          });
          if (userCurrentCharacter.condition.life < 1) {
            await interaction.editReply({
              files: [
                await renderUserDied(
                  userCurrentCharacter,
                ),
              ],
              components: [],
            });
            return;
          }

          if (interaction.customId.startsWith('mainSkill:')) {
            attackId = Number(interaction.customId.replace("mainSkill:", ""));
          }
          if (interaction.customId.startsWith('secondarySkill:')) {
            attackId = Number(interaction.customId.replace("secondarySkill:", ""));
          }

          if (!battle.complete) {
            [
              userCurrentCharacter,
              battle,
              userInfo,
              monsterInfo,
            ] = await processBattleMove(
              userCurrentCharacter,
              battle,
              attackId,
              io,
              queue,
              t,
            );
            if (battle.complete) {
              console.log('jajaja');
              console.log(battle.monsters[0].exp);
              const newExp = await gainExp(
                discordClient,
                userCurrentCharacter.user.user_id,
                battle.monsters[0].exp,
                'battle',
                t,
              );
            }
          }
          console.log('before render gif');
          if (battle.complete) {
            console.log('complete battle');
            await interaction.editReply({
              embeds: [],
              files: [
                new MessageAttachment(
                  await renderBattleGif(
                    userCurrentCharacter,
                    userCurrentSelectedSkills,
                    battle,
                    previousBattleState,
                    previousUserState,
                    monsterInfo,
                    userInfo,
                  ),
                  'battle.gif',
                ),
              ],
              components: [],
            });
            console.log('after complete battle');
          } else {
            console.log('uncomplete battle');
            await interaction.editReply({
              embeds: [],
              files: [
                new MessageAttachment(
                  await renderBattleGif(
                    userCurrentCharacter,
                    userCurrentSelectedSkills,
                    battle,
                    previousBattleState,
                    previousUserState,
                    monsterInfo,
                    userInfo,
                  ),
                  'battle.gif',
                ),
              ],
              components: [
                new MessageActionRow({
                  components: [
                    await generateMainSkillButton(
                      userCurrentSelectedSkills.selectedMainSkill,
                    ),
                    await generateSecondarySkillButton(
                      userCurrentSelectedSkills.selectedSecondarySkill,
                    ),
                  ],
                }),
                new MessageActionRow({
                  components: [
                    new MessageSelectMenu({
                      type: 'SELECT_MENU',
                      customId: 'select-mainSkill',
                      options: mainSkillMap,
                    }),
                  ],
                }),
                new MessageActionRow({
                  components: [
                    new MessageSelectMenu({
                      type: 'SELECT_MENU',
                      customId: 'select-secondarySkill',
                      options: secondarySkillMap,
                    }),
                  ],
                }),
              ],
            });
          }

          if (userCurrentCharacter.condition.life < 1) {
            setTimeout(async () => {
              await interaction.editReply({
                files: [
                  await renderUserDied(
                    userCurrentCharacter,
                  ),
                ],
                components: [],
              });
            }, 5000);
          }
          if (battle.complete) {
            console.log(battle.monsters[0].exp);
            console.log('nenenen');
            setTimeout(async () => {
              await interaction.editReply({
                files: [
                  await renderBattleComplete(
                    userCurrentCharacter,
                    battle.monsters[0].exp,
                  ),
                ],
                components: [],
              });
            }, 5000);
          }
          return;
        }

        if (interaction.isSelectMenu()) {
          let skillId;
          if (interaction.customId === 'select-mainSkill') {
            await interaction.deferUpdate();
            if (interaction.values[0].startsWith('mainSkill:')) {
              skillId = Number(interaction.values[0].replace('mainSkill:', ''));
              userCurrentSelectedSkills = await updateUserCurrentSelectedSkills(
                userId, // Discord User id
                skillId, // mainSkill
                false, // secondary skill
                t, // t, transaction
              );
            }
          }
          if (interaction.customId === 'select-secondarySkill') {
            await interaction.deferUpdate();
            if (interaction.values[0].startsWith('secondarySkill:')) {
              skillId = Number(interaction.values[0].replace('secondarySkill:', ''));
              userCurrentSelectedSkills = await updateUserCurrentSelectedSkills(
                userId, // Discord User id
                false, // mainSkill
                skillId, // secondary skill
                t, // t, transaction
              );
            }
          }

          await interaction.editReply({
            embeds: [],
            files: [
              new MessageAttachment(
                await renderInitBattleGif(
                  userCurrentCharacter,
                  userCurrentSelectedSkills,
                  battle,
                  previousBattleState,
                  previousUserState,
                  monsterInfo,
                  userInfo,
                ),
                'battle.gif',
              ),
            ],
            components: [
              new MessageActionRow({
                components: [
                  await generateMainSkillButton(
                    userCurrentSelectedSkills.selectedMainSkill,
                  ),
                  await generateSecondarySkillButton(
                    userCurrentSelectedSkills.selectedSecondarySkill,
                  ),
                ],
              }),
              new MessageActionRow({
                components: [
                  new MessageSelectMenu({
                    type: 'SELECT_MENU',
                    customId: 'select-mainSkill',
                    options: mainSkillMap,
                  }),
                ],
              }),
              new MessageActionRow({
                components: [
                  new MessageSelectMenu({
                    type: 'SELECT_MENU',
                    customId: 'select-secondarySkill',
                    options: secondarySkillMap,
                  }),
                ],
              }),
            ],
          });
        }
      });
    }).catch(async (err) => {
      console.log(err);
    });
  });
};
