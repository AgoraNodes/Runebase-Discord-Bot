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
import { generateLoot } from '../helpers/items/generateLoot';
import { renderItemImage } from "../render/item";

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

  const generateLootImagesArray = async (theLoot) => {
    const lootArray = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const looot of theLoot) {
      lootArray.push(
        new MessageAttachment(
          await renderItemImage(looot),
          `${looot.id}.png`,
        ),
      );
    }
    return lootArray;
  };

  const generateLootItemButtonArray = async (theLoot) => {
    const lootButtonArray = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const looot of theLoot) {
      console.log(looot);
      const addLootId = `lootItem:${looot.id}`;
      lootButtonArray.push(
        new MessageButton({
          style: 'SECONDARY',
          label: `Loot ${looot.name}`,
          emoji: '🤏',
          customId: addLootId,
        }),
      );
    }
    return lootButtonArray;
  };

  const loadingEmbed = new MessageEmbed()
    .setTitle('Battle')
    .setDescription(`${userCurrentCharacter.user.username}, Your next move is calculating..`);

  const battleCompleteEmbed = async (
    userCurrentCharacter,
    expEarned,
    newLootC,
  ) => {
    let itemString = '';
    // eslint-disable-next-line no-restricted-syntax
    for await (const looot of newLootC) {
      itemString += `\n- **${looot.name}** [${looot.itemQuality.name}]`;
    }
    return new MessageEmbed()
      .setTitle(`${userCurrentCharacter.user.username} battle#${battle.id} results`)
      .setDescription(`Exp earned: **${expEarned}**

${newLootC.length > 0 ? `__found ${newLootC.length} ${newLootC.length === 1 ? `item` : `items`}__` : ``}${itemString}`);
  };

  const collector = embedMessage.createMessageComponentCollector({
    // filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
  });
  let newLoot = [];
  collector.on('collect', async (interaction) => {
    // If someobody clicks loot that isn't hes/hers
    if (interaction.isButton()) {
      if (interaction.customId.startsWith('lootItem:')) {
        if (interaction.user.id !== userCurrentCharacter.user.user_id) {
          await interaction.reply({
            content: `<@${interaction.user.id}>, This loot isn't ment for you!`,
            ephemeral: true,
          });
          return;
        }
      }
    }
    if (interaction.user.id !== userCurrentCharacter.user.user_id) {
      await interaction.reply({
        content: `<@${interaction.user.id}>, These buttons aren't for you!`,
        ephemeral: true,
      });
      return;
    }
    await queue.add(async () => {
      await db.sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      }, async (t) => {
        let attackUsed;
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
          if (interaction.customId.startsWith('lootItem:')) {
            const itemId = Number(interaction.customId.replace("lootItem:", ""));
            const findItemToLoot = newLoot.find((x) => x.id === itemId);
            if (!findItemToLoot) {
              await interaction.reply({
                content: `<@${interaction.user.id}>, We didn't find this item for you to loot!`,
                ephemeral: true,
              });
              return;
            }
            const findItemInDB = await db.item.findOne({
              where: {
                id: findItemToLoot.id,
              },
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log(findItemInDB);
            console.log('findItemInDB');
            if (findItemInDB.inventoryId) {
              await interaction.followUp({
                content: `<@${interaction.user.id}>, Item was already looted!`,
                ephemeral: true,
              });
              return;
            }
            await findItemInDB.update({
              inventoryId: userCurrentCharacter.inventoryId,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            newLoot = newLoot.filter((data) => data.id !== itemId);
            await interaction.editReply({
              files: [
                await renderBattleComplete(
                  userCurrentCharacter,
                  battle,
                ),
                ...(newLoot.length > 0 ? await generateLootImagesArray(newLoot) : []),
              ],
              components: [
                ...(newLoot.length > 0
                  ? [
                    new MessageActionRow({
                      components: await generateLootItemButtonArray(newLoot),
                    }),
                  ]
                  : []
                ),
              ],
            });
            return;
          }
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
              embeds: [],
              files: [
                await renderUserDied(
                  userCurrentCharacter,
                ),
              ],
              components: [],
            });
            return;
          }

          // console.log(interaction.customId);
          // console.log('interaction.customId');

          if (interaction.customId.startsWith('attackMain:')) {
            attackUsed = 'main';
          }
          if (interaction.customId.startsWith('attackSecondary:')) {
            attackUsed = 'secondary';
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
              attackUsed,
              io,
              queue,
              t,
            );
            if (battle.complete) {
              const newExp = await gainExp(
                discordClient,
                userCurrentCharacter.user.user_id,
                battle.monsters[0].exp,
                'battle',
                t,
              );
              const foundLoot = await generateLoot(battle.monsters[0].level);
              if (foundLoot) {
                newLoot.push(foundLoot);
              }

              const foundLootTwo = await generateLoot(battle.monsters[0].level);
              if (foundLootTwo) {
                newLoot.push(foundLootTwo);
              }
            }
          }
          if (battle.complete) {
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
          } else {
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
                embeds: [],
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
            setTimeout(async () => {
              await interaction.editReply({
                embeds: [
                  await battleCompleteEmbed(
                    userCurrentCharacter,
                    battle.monsters[0].exp,
                    newLoot,
                  ),
                ],
                files: [
                  await renderBattleComplete(
                    userCurrentCharacter,
                    battle,
                  ),
                  ...(newLoot.length > 0 ? await generateLootImagesArray(newLoot) : []),
                ],
                components: [
                  ...(newLoot.length > 0
                    ? [
                      new MessageActionRow({
                        components: await generateLootItemButtonArray(newLoot),
                      }),
                    ]
                    : []
                  ),
                ],
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
