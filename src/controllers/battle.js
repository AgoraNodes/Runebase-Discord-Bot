/* eslint-disable no-restricted-syntax */
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
// import { renderInitBattleGif } from '../render/battle/initBattle';
import { renderUserDied } from '../render/battle/userDied';
import { renderOutOfStamina } from '../render/battle/outOfStamina';
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchUserCurrentSelectedSkills } from "../helpers/character/selectedSkills";
import { updateUserCurrentSelectedSkills } from '../helpers/character/updateSelectedSkills';
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';

import { renderBattleComplete } from '../render/battle/battleComplete';
import { randomIntFromInterval } from "../helpers/utils";
import { calculateCharacterStats } from '../helpers/stats/calculateCharacterStats';
import reFetchBattle from '../helpers/fetchBattle';
import { processBattleMove } from '../processors/battle/processBattleMove';
import { gainExp } from '../helpers/client/experience';
import { generateLoot } from '../helpers/items/generateLoot';
import { renderItemImage } from "../render/item";
import {
  generateMainSkillButton,
  generateSecondarySkillButton,
  generateHealButton,
  generateAcceptButton,
  generateDeclineButton,
} from '../buttons';
import {
  confirmationHealMessage,
  insufficientBalanceMessage,
  healCompleteMessage,
} from '../messages';
import skillEmoji from "../config/skillEmoji";

let currentSelectedMonster;

export const discordBattle = async (
  discordClient,
  message,
  isDefered,
  queue,
) => {
  let usedDeferReply = false;
  let allRoundBuffsInfoArray = [];
  let allRoundDebuffsInfoArray = [];
  let allRoundEffectsInfoArray = [];
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

  console.log('battle1');

  if (!userCurrentCharacter) {
    if (!isDefered) {
      await message.reply({
        content: 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`',
        ephemeral: true,
      });
      return;
    }
    await message.editReply({
      content: 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`',
      ephemeral: true,
    });
    usedDeferReply = true;
    return usedDeferReply;
  }
  console.log('battle2');
  if (userCurrentCharacter.condition.stamina < 20) {
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
  console.log('battle3');
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
    stamina: userCurrentCharacter.condition.stamina - 20,
  });

  userCurrentCharacter = await fetchUserCurrentCharacter(
    userId, // user discord id
    false, // Need inventory?
  );
  console.log('3');
  const userWallet = await db.wallet.findOne({
    where: {
      userId: userCurrentCharacter.UserGroup.user.id,
    },
  });

  let battle = await db.battle.findOne({
    where: {
      complete: false,
      UserGroupClassId: userCurrentCharacter.id,
    },
    order: [
      [db.battleLog, 'id', 'DESC'],
      [db.BattleMonster, 'id', 'DESC'],
    ],
    include: [
      {
        model: db.battleLog,
        as: 'battleLogs',
        required: false,
      },
      {
        model: db.BattleMonster,
        as: 'BattleMonsters',
        include: [
          {
            model: db.buff,
            as: 'buffs',
          },
          {
            model: db.debuff,
            as: 'debuffs',
          },
          {
            model: db.monster,
            as: 'monster',
            include: [
              {
                model: db.monsterAttack,
                as: 'monsterAttacks',
                include: [
                  {
                    model: db.damageType,
                    as: 'damageType',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  console.log('battle4');
  if (!battle) {
    const newBattle = await db.battle.create({
      complete: false,
      UserGroupClassId: userCurrentCharacter.id,
    });
    const monster = await db.monster.findOne({
      where: {
        name: 'Zombie',
      },
    });
    const randomAmountOfMobs = randomIntFromInterval(3, 4);
    const mobPromises = [];
    for (let i = 0; i < randomAmountOfMobs; i += 1) {
      const randomMonsterHp = randomIntFromInterval(monster.minHp, monster.maxHp);
      const newMobPromise = db.BattleMonster.create({
        battleId: newBattle.id,
        monsterId: monster.id,
        currentHp: randomMonsterHp,
        maxHp: randomMonsterHp,
      });
      mobPromises.push(newMobPromise);
    }
    await Promise.all(mobPromises);

    battle = await db.battle.findOne({
      where: {
        id: newBattle.id,
      },
      order: [
        [db.battleLog, 'id', 'DESC'],
        [db.BattleMonster, 'id', 'DESC'],
      ],
      include: [
        {
          model: db.battleLog,
          as: 'battleLogs',
          required: false,
        },
        {
          model: db.BattleMonster,
          as: 'BattleMonsters',
          include: [
            {
              model: db.buff,
              as: 'buffs',
            },
            {
              model: db.debuff,
              as: 'debuffs',
            },
            {
              model: db.monster,
              as: 'monster',
              include: [
                {
                  model: db.monsterAttack,
                  as: 'monsterAttacks',
                  include: [
                    {
                      model: db.damageType,
                      as: 'damageType',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  let userCurrentSelectedSkills = await fetchUserCurrentSelectedSkills(
    userId,
  );
  console.log('battle5');
  let mainSkillMap = userCurrentSelectedSkills.UserGroupClassSkills.reduce((filtered, mySkill) => {
    if (!mySkill.skill.passive) {
      const emoji = skillEmoji.find((a) => a.name === mySkill.skill.name);
      const mapped = {
        placeholder: 'pick a skill',
        label: `Main Skill: ${mySkill.skill.name}`,
        value: `mainSkill:${mySkill.id}`,
        default: mySkill.id === userCurrentSelectedSkills.selectedMainSkillId,
        ...(emoji ? {
          emoji: emoji.emoji,
        } : false),
      };
      filtered.push(mapped);
    }
    return filtered;
  }, []);

  let secondarySkillMap = userCurrentSelectedSkills.UserGroupClassSkills.reduce((filtered, mySkill) => {
    if (!mySkill.skill.passive) {
      const emoji = skillEmoji.find((a) => a.name === mySkill.skill.name);
      const mapped = {
        placeholder: 'pick a skill',
        label: `Secondary Skill: ${mySkill.skill.name}`,
        value: `secondarySkill:${mySkill.id}`,
        default: mySkill.id === userCurrentSelectedSkills.selectedSecondarySkillId,
        ...(emoji ? {
          emoji: emoji.emoji,
        } : false),
      };
      filtered.push(mapped);
    }
    return filtered;
  }, []);
  console.log('battle6');
  if (
    !currentSelectedMonster
    || (currentSelectedMonster && currentSelectedMonster.currentHp < 1)
    || battle.id !== currentSelectedMonster.battleId
  ) {
    currentSelectedMonster = battle.BattleMonsters.find((element) => element.currentHp > 0);
  }

  let selectMonsterMap = battle.BattleMonsters.reduce((filtered, battleMonster, index) => {
    if (battleMonster.currentHp > 0) {
      const someNewValue = {
        placeholder: 'Select a mob to attack',
        label: `Select Mob: ${battleMonster.monster.name} #${battleMonster.id} (${battleMonster.currentHp} / ${battleMonster.maxHp})`,
        value: `selectMonster:${battleMonster.id}`,
        default: currentSelectedMonster.id === battleMonster.id,
      };
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);
  console.log('battle7');
  const {
    hp,
    mp,
  } = await calculateCharacterStats(
    userCurrentCharacter,
  );
  let myInitialUserState = JSON.parse(JSON.stringify(userCurrentCharacter));
  myInitialUserState.hp = hp;
  myInitialUserState.mp = mp;

  if (myInitialUserState.buffs.length > 0) {
    for (const userBuff of myInitialUserState.buffs) {
      allRoundBuffsInfoArray.push(userBuff.name);
    }
  }
  if (myInitialUserState.debuffs.lenth > 0) {
    for (const userDebuff of myInitialUserState.debuffs) {
      allRoundDebuffsInfoArray.push(userDebuff.name);
    }
  }
  if (battle.BattleMonsters.length > 0) {
    for (const eachBattleMonster of battle.BattleMonsters) {
      if (eachBattleMonster.buffs.length > 0) {
        for (const monsterBuff of eachBattleMonster.buffs) {
          allRoundBuffsInfoArray.push(monsterBuff.name);
        }
      }
      if (eachBattleMonster.debuffs.length > 0) {
        for (const monsterDebuff of eachBattleMonster.debuffs) {
          allRoundDebuffsInfoArray.push(monsterDebuff.name);
        }
      }
    }
  }

  allRoundBuffsInfoArray = [...new Set(allRoundBuffsInfoArray)];
  allRoundDebuffsInfoArray = [...new Set(allRoundDebuffsInfoArray)];

  console.log('battle9');
  const embedMessage = await discordChannel.send({
    content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
    files: [
      new MessageAttachment(
        await renderBattleGif(
          myInitialUserState,
          userCurrentSelectedSkills,
          battle,
          currentSelectedMonster,
          allRoundBuffsInfoArray,
          allRoundDebuffsInfoArray,
          allRoundEffectsInfoArray,
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
          await generateHealButton(),
        ],
      }),
      ...(selectMonsterMap && selectMonsterMap.length > 0 ? [
        new MessageActionRow({
          components: [
            new MessageSelectMenu({
              type: 'SELECT_MENU',
              customId: 'select-mob',
              options: selectMonsterMap,
            }),
          ],
        }),
      ] : []),
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

  const loadingBattleMoveEmbed = new MessageEmbed()
    .setTitle('Battle')
    .setDescription(`${userCurrentCharacter.UserGroup.user.username}, Your next move is calculating..`);

  const battleCompleteEmbed = async (
    userCurrentCharacter,
    expEarned,
    newLootC,
  ) => {
    let itemString = '';
    for await (const looot of newLootC) {
      itemString += `\n- **${looot.name}** [${looot.itemQuality.name}]`;
    }
    return new MessageEmbed()
      .setTitle(`${userCurrentCharacter.UserGroup.user.username} battle#${battle.id} results`)
      .setDescription(`Exp earned: **${expEarned}**

${newLootC.length > 0 ? `__found ${newLootC.length} ${newLootC.length === 1 ? `item` : `items`}__` : ``}${itemString}`);
  };
  console.log('battle 10');
  const collector = embedMessage.createMessageComponentCollector({});
  let newLoot = [];
  collector.on('collect', async (interaction) => {
    // If someobody clicks loot that isn't hes/hers
    if (interaction.isButton()) {
      if (interaction.customId.startsWith('lootItem:')) {
        if (interaction.user.id !== userCurrentCharacter.UserGroup.user.user_id) {
          await interaction.reply({
            content: `<@${interaction.user.id}>, This loot isn't ment for you!`,
            ephemeral: true,
          });
          return;
        }
      }
    }
    console.log('collector 1');
    if (interaction.user.id !== userCurrentCharacter.UserGroup.user.user_id) {
      await interaction.reply({
        content: `<@${interaction.user.id}>, These buttons aren't for you!`,
        ephemeral: true,
      });
      return;
    }
    console.log('collector 2');
    if (battle.UserGroupClassId !== userCurrentCharacter.id) {
      await interaction.reply({
        content: `<@${interaction.user.id}>, This battle belongs to a different character!`,
        ephemeral: true,
      });
      return;
    }
    if (interaction.isButton() && !interaction.customId.startsWith('lootItem:') && interaction.customId !== 'Heal') {
      if (!currentSelectedMonster) {
        await interaction.reply({
          content: `<@${interaction.user.id}>, You need to select a monster to attack!`,
          ephemeral: true,
        });
        return;
      }
    }
    console.log('collector 3');
    // Heal Handling
    if (interaction.isButton() && interaction.customId === 'Heal') {
      await interaction.deferUpdate();
      console.log(userWallet);
      await interaction.editReply({
        content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
        embeds: [
          await confirmationHealMessage(
            userCurrentCharacter.UserGroup.user.user_id,
            userWallet.available,
          ),
        ],
        components: [
          new MessageActionRow({
            components: [
              await generateAcceptButton(),
              await generateDeclineButton(),
            ],
          }),
        ],
      });
      return;
    }
    console.log('collector 4');
    if (interaction.isButton() && interaction.customId === 'decline') {
      await interaction.deferUpdate();
      await interaction.editReply({
        content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
        embeds: [],
        components: [
          new MessageActionRow({
            components: [
              await generateMainSkillButton(
                userCurrentSelectedSkills.selectedMainSkill,
              ),
              await generateSecondarySkillButton(
                userCurrentSelectedSkills.selectedSecondarySkill,
              ),
              await generateHealButton(),
            ],
          }),
          ...(selectMonsterMap && selectMonsterMap.length > 0 ? [
            new MessageActionRow({
              components: [
                new MessageSelectMenu({
                  type: 'SELECT_MENU',
                  customId: 'select-mob',
                  options: selectMonsterMap,
                }),
              ],
            }),
          ] : []),
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
      return;
    }
    console.log('collector 5');
    battle = await reFetchBattle(
      battle,
    );
    console.log('collector 6');
    if (interaction.isButton() && interaction.customId === 'accept') {
      await interaction.deferUpdate();
      await queue.add(async () => {
        await db.sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        }, async (t) => {
          const findWallet = await db.wallet.findOne({
            where: {
              userId: userCurrentCharacter.UserGroup.user.id,
            },
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
          if (findWallet.available < 10000000) {
            await interaction.editReply({
              content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
              embeds: [
                await insufficientBalanceMessage(
                  userCurrentCharacter.UserGroup.user.user_id,
                  'Heal',
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
                    await generateHealButton(),
                  ],
                }),
                ...(selectMonsterMap && selectMonsterMap.length > 0 ? [
                  new MessageActionRow({
                    components: [
                      new MessageSelectMenu({
                        type: 'SELECT_MENU',
                        customId: 'select-mob',
                        options: selectMonsterMap,
                      }),
                    ],
                  }),
                ] : []),
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
            return;
          }
          await userWallet.update({
            available: findWallet.available - 10000000,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
          const userToUpdate = await db.UserGroupClass.findOne({
            where: {
              UserGroupId: userCurrentCharacter.UserGroup.id,
              classId: userCurrentCharacter.UserGroup.user.currentClassId,
            },
            include: [
              {
                model: db.condition,
                as: 'condition',
              },
              {
                model: db.class,
                as: 'class',
              },
              {
                model: db.stats,
                as: 'stats',
              },
            ],
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
          const {
            hp,
            mp,
          } = await calculateCharacterStats(
            userCurrentCharacter,
          );
          await userCurrentCharacter.condition.update({
            life: hp.max,
            mana: mp.max,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });

          myInitialUserState = JSON.parse(JSON.stringify(userCurrentCharacter));
          myInitialUserState.hp = {
            current: hp.max,
            max: hp.max,
            totalLifeBonus: hp.totalLifeBonus,
          };
          myInitialUserState.mp = {
            current: mp.max,
            max: mp.max,
            totalManaBonus: mp.totalManaBonus,
          };

          userCurrentCharacter = await fetchUserCurrentCharacter(
            userId, // user discord id
            false, // Need inventory?
            t,
          );

          await interaction.editReply({
            files: [
              new MessageAttachment(
                await renderBattleGif(
                  myInitialUserState,
                  userCurrentSelectedSkills,
                  battle,
                  currentSelectedMonster,
                  allRoundBuffsInfoArray,
                  allRoundDebuffsInfoArray,
                  allRoundEffectsInfoArray,
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
                  await generateHealButton(),
                ],
              }),
              ...(selectMonsterMap && selectMonsterMap.length > 0 ? [
                new MessageActionRow({
                  components: [
                    new MessageSelectMenu({
                      type: 'SELECT_MENU',
                      customId: 'select-mob',
                      options: selectMonsterMap,
                    }),
                  ],
                }),
              ] : []),
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
            embeds: [],
            content: `<@${userCurrentCharacter.UserGroup.user.user_id}>, you are now healed!`,
          });
        }).catch(async (err) => {
          console.log(err);
          try {
            await db.error.create({
              type: 'Heal',
              error: `${err}`,
            });
          } catch (e) {
            console.log(e);
          }
        });
      });
      return;
    }
    console.log('collector 7');
    // End Heal handling
    if (interaction.isSelectMenu()) {
      if (interaction.customId === 'select-mob') {
        await interaction.deferUpdate();
        if (interaction.values[0].startsWith('selectMonster:')) {
          const newSelectedId = Number(interaction.values[0].replace('selectMonster:', ''));

          selectMonsterMap = battle.BattleMonsters.reduce((filtered, battleMonster, index) => {
            if (battleMonster.currentHp > 0) {
              const someNewValue = {
                placeholder: 'Select a mob to attack',
                label: `Select Mob: ${battleMonster.monster.name} #${battleMonster.id} (${battleMonster.currentHp} / ${battleMonster.maxHp})`,
                value: `selectMonster:${battleMonster.id}`,
                default: newSelectedId === battleMonster.id,
              };
              filtered.push(someNewValue);
            }
            return filtered;
          }, []);
          currentSelectedMonster = battle.BattleMonsters.find((element) => element.id === newSelectedId);
        }
      }
    }
    console.log('collector 8');
    await queue.add(async () => {
      await db.sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      }, async (t) => {
        let attackUsed;
        let initialUserState;
        let stageZeroInfoArray;
        let stageOneInfoArray;
        let stageTwoInfoArray;
        let stageThreeInfoArray;
        let stageFourInfoArray;
        let stageFiveInfoArray;
        let stageSixInfoArray;
        let stageSevenInfoArray;

        let sumExp = 0;

        let previousBattleState = JSON.parse(JSON.stringify(battle));
        // const previousUserState = JSON.parse(JSON.stringify(userCurrentCharacter));

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
              content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
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
            content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
            embeds: [
              loadingBattleMoveEmbed,
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

          if (interaction.customId.startsWith('attackMain:')) {
            attackUsed = 'main';
          }
          if (interaction.customId.startsWith('attackSecondary:')) {
            attackUsed = 'secondary';
          }

          if (!battle.complete) {
            [
              userCurrentCharacter,
              initialUserState,
              battle,
              allRoundBuffsInfoArray,
              allRoundDebuffsInfoArray,
              allRoundEffectsInfoArray,
              stageZeroInfoArray,
              stageOneInfoArray,
              stageTwoInfoArray,
              stageThreeInfoArray,
              stageFourInfoArray,
              stageFiveInfoArray,
              stageSixInfoArray,
              stageSevenInfoArray,
              sumExp,
            ] = await processBattleMove(
              userCurrentCharacter,
              battle,
              currentSelectedMonster,
              attackUsed,
              t,
            );

            console.log(`Is Battle Complete: ${battle.complete ? 'Yes' : 'No'}`);

            if (battle.complete) {
              console.log('battle is complete 1');
              currentSelectedMonster = null;
              const newExp = await gainExp(
                discordClient,
                userCurrentCharacter.UserGroup.user.user_id,
                sumExp,
                'battle',
                t,
              );
              const highestLevelMob = Math.max(...battle.BattleMonsters.map((o) => o.monster.level));
              const foundLoot = await generateLoot(highestLevelMob);
              if (foundLoot) {
                newLoot.push(foundLoot);
              }

              const foundLootTwo = await generateLoot(highestLevelMob);
              if (foundLootTwo) {
                newLoot.push(foundLootTwo);
              }
            }
          }
          if (battle.complete) {
            console.log(initialUserState);
            console.log('before final renderbattleGif complete');
            await interaction.editReply({
              content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
              embeds: [],
              files: [
                new MessageAttachment(
                  await renderBattleGif(
                    initialUserState,
                    userCurrentSelectedSkills,
                    previousBattleState,
                    currentSelectedMonster,
                    allRoundBuffsInfoArray,
                    allRoundDebuffsInfoArray,
                    allRoundEffectsInfoArray,
                    stageZeroInfoArray,
                    stageOneInfoArray,
                    stageTwoInfoArray,
                    stageThreeInfoArray,
                    stageFourInfoArray,
                    stageFiveInfoArray,
                    stageSixInfoArray,
                    stageSevenInfoArray,
                  ),
                  'battle.gif',
                ),
              ],
              components: [],
            });
          } else {
            const checkCurrentSelected = battle.BattleMonsters.find((element) => element && element.id === currentSelectedMonster.id);
            currentSelectedMonster = checkCurrentSelected.currentHp > 0 ? checkCurrentSelected : battle.BattleMonsters.find((element) => element.currentHp > 0);
            selectMonsterMap = battle.BattleMonsters.reduce((filtered, battleMonster, index) => {
              if (battleMonster.currentHp > 0) {
                const someNewValue = {
                  placeholder: 'Select a mob to attack',
                  label: `Select Mob: ${battleMonster.monster.name} #${battleMonster.id} (${battleMonster.currentHp} / ${battleMonster.maxHp})`,
                  value: `selectMonster:${battleMonster.id}`,
                  default: currentSelectedMonster.id === battleMonster.id,
                };
                filtered.push(someNewValue);
              }
              return filtered;
            }, []);

            await interaction.editReply({
              content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
              embeds: [],
              files: [
                new MessageAttachment(
                  await renderBattleGif(
                    initialUserState,
                    userCurrentSelectedSkills,
                    previousBattleState,
                    currentSelectedMonster,
                    allRoundBuffsInfoArray,
                    allRoundDebuffsInfoArray,
                    allRoundEffectsInfoArray,
                    stageZeroInfoArray,
                    stageOneInfoArray,
                    stageTwoInfoArray,
                    stageThreeInfoArray,
                    stageFourInfoArray,
                    stageFiveInfoArray,
                    stageSixInfoArray,
                    stageSevenInfoArray,
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
                    await generateHealButton(),
                  ],
                }),
                ...(selectMonsterMap && selectMonsterMap.length > 0 ? [
                  new MessageActionRow({
                    components: [
                      new MessageSelectMenu({
                        type: 'SELECT_MENU',
                        customId: 'select-mob',
                        options: selectMonsterMap,
                      }),
                    ],
                  }),
                ] : []),
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
          previousBattleState = JSON.parse(JSON.stringify(previousBattleState));

          if (userCurrentCharacter.condition.life < 1) {
            setTimeout(async () => {
              await interaction.editReply({
                content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
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
                content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
                embeds: [
                  await battleCompleteEmbed(
                    userCurrentCharacter,
                    sumExp,
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

        console.log('selecting 1');
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
            console.log('selecting new main skill');
          }
          console.log('selecting 2');
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
          console.log('selecting 3');
          mainSkillMap = userCurrentSelectedSkills.UserGroupClassSkills.reduce((filtered, mySkill) => {
            if (!mySkill.skill.passive) {
              const emoji = skillEmoji.find((a) => a.name === mySkill.skill.name);
              const mapped = {
                placeholder: 'pick a skill',
                label: `Main Skill: ${mySkill.skill.name}`,
                value: `mainSkill:${mySkill.id}`,
                default: mySkill.id === userCurrentSelectedSkills.selectedMainSkillId,
                ...(emoji ? {
                  emoji: emoji.emoji,
                } : false),
              };
              filtered.push(mapped);
            }
            return filtered;
          }, []);
          console.log('selecting 4');
          secondarySkillMap = userCurrentSelectedSkills.UserGroupClassSkills.reduce((filtered, mySkill) => {
            if (!mySkill.skill.passive) {
              const emoji = skillEmoji.find((a) => a.name === mySkill.skill.name);
              const mapped = {
                placeholder: 'pick a skill',
                label: `Secondary Skill: ${mySkill.skill.name}`,
                value: `secondarySkill:${mySkill.id}`,
                default: mySkill.id === userCurrentSelectedSkills.selectedSecondarySkillId,
                ...(emoji ? {
                  emoji: emoji.emoji,
                } : false),
              };
              filtered.push(mapped);
            }
            return filtered;
          }, []);

          const {
            hp,
            mp,
          } = await calculateCharacterStats(
            userCurrentCharacter,
          );
          myInitialUserState = JSON.parse(JSON.stringify(userCurrentCharacter));
          myInitialUserState.hp = hp;
          myInitialUserState.mp = mp;
          console.log('selecting 5');
          await interaction.editReply({
            content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
            embeds: [],
            files: [
              new MessageAttachment(
                await renderBattleGif(
                  myInitialUserState,
                  userCurrentSelectedSkills,
                  battle,
                  currentSelectedMonster,
                  allRoundBuffsInfoArray,
                  allRoundDebuffsInfoArray,
                  allRoundEffectsInfoArray,
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
                  await generateHealButton(),
                ],
              }),
              ...(selectMonsterMap && selectMonsterMap.length > 0 ? [
                new MessageActionRow({
                  components: [
                    new MessageSelectMenu({
                      type: 'SELECT_MENU',
                      customId: 'select-mob',
                      options: selectMonsterMap,
                    }),
                  ],
                }),
              ] : []),
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
      console.log('catch error');
      console.log(err);
    });
  });
};
