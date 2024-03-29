import { config } from "dotenv";
import { InteractionType } from 'discord.js';
import { updateDiscordChannel } from '../controllers/channel';
import { updateDiscordGroup } from '../controllers/group';
import { discordFeatureSettings } from '../controllers/featureSetting';
import { createUpdateDiscordUser, updateDiscordLastSeen } from '../controllers/user';
import { discordHelp } from '../controllers/help';
import { discordMyRank } from '../controllers/myrank';
import { discordRanks } from '../controllers/ranks';
import { discordDeposit } from '../controllers/deposit';
import { discordPrice } from '../controllers/price';
import { discordBalance } from '../controllers/balance';
import { discordWithdraw } from '../controllers/withdraw';
import { discordUserJoined } from '../controllers/userJoined';
import { discordActiveTalker } from '../controllers/activeTalker';
import { discordRollDice } from '../controllers/rollDice';
import { discordLeaderboard } from '../controllers/leaderboard';
import { discordMostActive } from "../controllers/mostActive";
import { discordPickClass } from '../controllers/pickClass';
import { discordStats } from '../controllers/stats';
import { discordShowCaseMagicItem } from '../controllers/showCaseMagicItem';
import { discordShowInventory } from '../controllers/inventory';
import { discordShowEquipment } from '../controllers/equipment';
import { discordBattle } from '../controllers/battle';
import { discordHeal } from '../controllers/heal';
import { discordGrantExp } from '../controllers/grantExp';
import { discordStartDagger } from '../controllers/generateStartDagger';
import { discordResetStats } from '../controllers/resetStats';
import { discordResetSkills } from '../controllers/resetSkills';
import { discordSkills } from '../controllers/skill';
import { findOrCreateUserGroupRecord } from "../controllers/userGroup";
import { discordAccount } from '../controllers/account';
import { discordChangeRealm } from "../controllers/changeRealm";

import { myRateLimiter } from '../helpers/rateLimit';
import { preWithdraw } from '../helpers/withdraw/preWithdraw';
import { isMaintenanceOrDisabled } from '../helpers/isMaintenanceOrDisabled';
import onUserJoinRealm from '../helpers/realm/onUserJoinRealm';
import settings from '../config/settings';

import {
  discordUserBannedMessage,
  discordServerBannedMessage,
  discordChannelBannedMessage,
} from '../embeds';
import db from "../models";

config();

export const discordRouter = async (
  discordClient,
  queue,
  io,
) => {
  const userInvites = {};

  discordClient.on('ready', async () => {
    const setting = await db.setting.findOne();
    discordClient.guilds.cache.each((guild) => {
      if (guild.id === setting.discordHomeServerGuildId) {
        guild.invites.fetch().then((guildInvites) => {
          guildInvites.each((guildInvite) => {
            userInvites[guildInvite.code] = guildInvite.uses;
          });
        });
      }
    });
  });

  discordClient.on('inviteCreate', (invite) => {
    userInvites[invite.code] = invite.uses;
  });

  discordClient.on("inviteDelete", (invite) => {
    delete userInvites[invite.code];
  });

  discordClient.on('guildMemberAdd', async (member) => {
    const setting = await db.setting.findOne();
    const newUser = await createUpdateDiscordUser(
      discordClient,
      member.user,
      queue,
    );
    if (member.guild.id === setting.discordHomeServerGuildId) {
      member.guild.invites.fetch().then((guildInvites) => { // get all guild invites
        guildInvites.each(async (invite) => { // basically a for loop over the invites
          if (
            invite.uses !== userInvites[invite.code]
          ) {
            userInvites[invite.code] = invite.uses;
            await queue.add(async () => {
              const findUserJoinedRecord = await db.userJoined.findOne({
                where: {
                  userJoinedId: newUser.id,
                },
              });
              if (!findUserJoinedRecord) {
                const inviter = await db.user.findOne({
                  where: {
                    user_id: String(invite.inviterId),
                  },
                });
                if (inviter) {
                  await db.userJoined.create({
                    userJoinedId: newUser.id,
                    userInvitedById: inviter.id,
                  });
                }
              }
            });
          }
        });
      });
    }
    // Test for Level and give user a rank if needed
    onUserJoinRealm(
      discordClient,
      member,
    );
  });

  discordClient.on('guildMemberUpdate', async (
    oldMember,
    newMember,
  ) => {
    const setting = await db.setting.findOne();
    const newHas = newMember.roles.cache.has(setting.joinedRoleId);
    if (newHas) {
      // Role has been added
      await queue.add(async () => {
        const task = await discordUserJoined(
          discordClient,
          newMember,
          io,
        );
      });
    }
  });

  discordClient.on('voiceStateUpdate', async (oldMember, newMember) => {
    await queue.add(async () => {
      const groupTask = await updateDiscordGroup(discordClient, newMember);
      const channelTask = await updateDiscordChannel(newMember, groupTask);
    });
  });

  discordClient.on('interactionCreate', async (interaction) => {
    if (
      interaction.type !== InteractionType.ApplicationCommand
      && !interaction.isButton()
    ) return;
    let groupTask;
    let groupTaskId;
    let channelTask;
    let channelTaskId;
    let lastSeenDiscordTask;
    let usedDeferReply;
    if (!interaction.user.bot) {
      const maintenance = await isMaintenanceOrDisabled(
        interaction,
        'discord',
      );
      if (maintenance.maintenance || !maintenance.enabled) return;
      const walletExists = await createUpdateDiscordUser(
        discordClient,
        interaction.user,
        queue,
      );
      await queue.add(async () => {
        groupTask = await updateDiscordGroup(discordClient, interaction);
        channelTask = await updateDiscordChannel(interaction, groupTask);
        lastSeenDiscordTask = await updateDiscordLastSeen(
          interaction,
          interaction.user,
        );
        groupTaskId = groupTask && groupTask.id;
        channelTaskId = channelTask && channelTask.id;
      });
      if (interaction.type === InteractionType.ApplicationCommand) {
        const { commandName } = interaction;
        if (commandName === 'help') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Help',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }

          await queue.add(async () => {
            console.log(interaction);
            const task = await discordHelp(
              discordClient,
              interaction,
              io,
            );
          });
          await interaction.editReply('\u200b').catch((e) => {
            console.log(e);
          });
        }

        if (commandName === 'battle') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });

          await queue.add(async () => {
            usedDeferReply = await discordBattle(
              discordClient,
              interaction,
              true, // Is Defered by command?
              queue,
            );
          });
          if (!usedDeferReply) {
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'heal') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });

          await queue.add(async () => {
            usedDeferReply = await discordHeal(
              discordClient,
              interaction,
              io,
              queue,
              true, // Is Defered by command?
            );
          });
          if (!usedDeferReply) {
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'resetstats') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'ResetStats',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }

          usedDeferReply = await discordResetStats(
            discordClient,
            interaction,
            io,
            queue,
            true, // Is Defered by command?
          );
          if (!usedDeferReply) {
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'resetskills') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'ResetSkills',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }

          usedDeferReply = await discordResetSkills(
            discordClient,
            interaction,
            io,
            queue,
            true, // Is Defered by command?
          );
          if (!usedDeferReply) {
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'changerealm') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'ChangeRealm',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }

          usedDeferReply = await discordChangeRealm(
            discordClient,
            interaction,
            io,
            true, // Is Defered by command?
          );
          if (!usedDeferReply) {
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'myrank') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Myrank',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }

          await queue.add(async () => {
            const task = await discordMyRank(
              discordClient,
              interaction,
              io,
            );
          });
          await interaction.editReply('\u200b').catch((e) => {
            console.log(e);
          });
        }
        if (commandName === 'ranks') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Ranks',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          await queue.add(async () => {
            const task = await discordRanks(
              discordClient,
              interaction,
              io,
            );
          });
          await interaction.editReply('\u200b').catch((e) => {
            console.log(e);
          });
        }
        if (commandName === 'deposit') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Deposit',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          await queue.add(async () => {
            const task = await discordDeposit(
              discordClient,
              interaction,
              io,
            );
          });
          await interaction.editReply('\u200b').catch((e) => {
            console.log(e);
          });
        }
        if (commandName === 'price') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Price',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          await queue.add(async () => {
            const task = await discordPrice(
              discordClient,
              interaction,
              io,
            );
          });
          await interaction.editReply('\u200b').catch((e) => {
            console.log(e);
          });
        }
        if (commandName === 'balance') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Balance',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          await queue.add(async () => {
            const task = await discordBalance(
              discordClient,
              interaction,
              io,
            );
          });
          await interaction.editReply('\u200b').catch((e) => {
            console.log(e);
          });
        }

        if (commandName === 'leaderboard') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Leaderboard',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          const setting = await db.setting.findOne();
          await queue.add(async () => {
            const task = await discordLeaderboard(
              discordClient,
              interaction,
              setting,
              io,
            );
          });
          await interaction.editReply('\u200b').catch((e) => {
            console.log(e);
          });
        }

        if (commandName === 'pickclass') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'PickClass',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          const setting = await db.setting.findOne();

          usedDeferReply = await discordPickClass(
            discordClient,
            interaction,
            setting,
            io,
            queue,
            true, // Is Defered by command?
          );
          if (!usedDeferReply) {
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'mostactive') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'MostActive',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          const setting = await db.setting.findOne();
          await queue.add(async () => {
            const task = await discordMostActive(
              discordClient,
              interaction,
              setting,
              io,
            );
          });
          await interaction.editReply('\u200b').catch((e) => {
            console.log(e);
          });
        }

        if (commandName === 'stats') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Stats',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          const setting = await db.setting.findOne();
          await queue.add(async () => {
            usedDeferReply = await discordStats(
              discordClient,
              interaction,
              setting,
              io,
              queue,
              true, // Is Defered by command?
            );
          });
          if (!usedDeferReply) {
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'inventory') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Inventory',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          const setting = await db.setting.findOne();
          await queue.add(async () => {
            usedDeferReply = await discordShowInventory(
              discordClient,
              interaction,
              setting,
              io,
              queue,
              true, // Is Defered by command?
            );
          });
          if (!usedDeferReply) {
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'skills') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Skills',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          const setting = await db.setting.findOne();
          await queue.add(async () => {
            usedDeferReply = await discordSkills(
              discordClient,
              interaction,
              setting,
              io,
              queue,
              true, // Is Defered by command?
            );
          });
          if (!usedDeferReply) {
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'equipment') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Equipment',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          const setting = await db.setting.findOne();
          await queue.add(async () => {
            usedDeferReply = await discordShowEquipment(
              discordClient,
              interaction,
              setting,
              io,
              queue,
              true, // Is Defered by command?
            );
          });
          if (!usedDeferReply) {
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'roll') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const setting = await db.setting.findOne();
          if (setting.roleDiceChannelId !== interaction.channelId) {
            await interaction.editReply(`please use <#${setting.roleDiceChannelId}> for rolling dice`).catch((e) => {
              console.log(e);
            });
          }
          if (setting.roleDiceChannelId === interaction.channelId) {
            const limited = await myRateLimiter(
              discordClient,
              interaction,
              'RollDice',
            );
            if (limited) {
              await interaction.editReply('rate limited').catch((e) => {
                console.log(e);
              });
              return;
            }
            await queue.add(async () => {
              const task = await discordRollDice(
                discordClient,
                interaction,
                setting,
                io,
              );
            });
            await interaction.editReply('\u200b').catch((e) => {
              console.log(e);
            });
          }
        }

        if (commandName === 'withdraw') {
          await interaction.deferReply().catch((e) => {
            console.log(e);
          });
          const limited = await myRateLimiter(
            discordClient,
            interaction,
            'Withdraw',
          );
          if (limited) {
            await interaction.editReply('rate limited').catch((e) => {
              console.log(e);
            });
            return;
          }
          const setting = await discordFeatureSettings(
            interaction,
            'withdraw',
            groupTaskId,
            channelTaskId,
          );
          if (!setting) return;
          const [
            success,
            filteredMessage,
          ] = await preWithdraw(
            discordClient,
            interaction,
          );
          if (success) {
            await queue.add(async () => {
              const task = await discordWithdraw(
                discordClient,
                interaction,
                filteredMessage,
                setting,
                io,
              );
            });
          }
          await interaction.editReply('\u200b').catch((e) => {
            console.log(e);
          });
        }
      }
      if (interaction.isButton()) {
        if (interaction.customId === 'roll') {
          const setting = await db.setting.findOne();
          if (setting.roleDiceChannelId !== interaction.channelId) {
            const discordChannel = await discordClient.channels.cache.get(setting.roleDiceChannelId);
            await discordChannel.send(`please use <#${setting.roleDiceChannelId}> for rolling dice`);
            await interaction.editReply().catch((e) => {
              console.log(e);
            });
          }
          if (setting.roleDiceChannelId === interaction.channelId) {
            const limited = await myRateLimiter(
              discordClient,
              interaction,
              'RollDice',
            );
            if (limited) return;

            await queue.add(async () => {
              const task = await discordRollDice(
                discordClient,
                interaction,
                setting,
                io,
              );
            });
          }

          await interaction.deferUpdate().catch((e) => {
            console.log(e);
          });
        }
      }
    }
  });

  discordClient.on("messageCreate", async (message) => {
    let groupTask;
    let groupTaskId;
    let channelTask;
    let channelTaskId;
    let lastSeenDiscordTask;
    // let disallow;
    if (!message.author.bot) {
      const user = await createUpdateDiscordUser(
        discordClient,
        message.author,
        queue,
      );

      await queue.add(async () => {
        groupTask = await updateDiscordGroup(discordClient, message);
        channelTask = await updateDiscordChannel(message, groupTask);
        lastSeenDiscordTask = await updateDiscordLastSeen(
          message,
          message.author,
        );
      });
      groupTaskId = groupTask && groupTask.id;
      channelTaskId = channelTask && channelTask.id;
      console.log(user);
      console.log(user.id);
      console.log(groupTaskId);
      await findOrCreateUserGroupRecord(
        user.id,
        groupTaskId,
      );
    }

    const messageReplaceBreaksWithSpaces = message.content.replace(/\n/g, " ");
    const preFilteredMessageDiscord = messageReplaceBreaksWithSpaces.split(' ');
    const filteredMessageDiscord = preFilteredMessageDiscord.filter((el) => el !== '');
    console.log('1-1');
    if (!message.author.bot) {
      const setting = await db.setting.findOne();
      await queue.add(async () => {
        if (message.guildId === setting.discordHomeServerGuildId) {
          const task = await discordActiveTalker(
            discordClient,
            message,
            filteredMessageDiscord,
            io,
          );
        }
      });
    }
    console.log('1-2');
    console.log('message');
    console.log(message);
    if (!message.content.startsWith(settings.bot.command) || message.author.bot) return;
    const maintenance = await isMaintenanceOrDisabled(message, 'discord');
    if (maintenance.maintenance || !maintenance.enabled) return;
    if (groupTask && groupTask.banned) {
      await message.channel.send({
        embeds: [
          discordServerBannedMessage(
            groupTask,
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
      return;
    }
    console.log('1-3');
    if (channelTask && channelTask.banned) {
      await message.channel.send({
        embeds: [
          discordChannelBannedMessage(
            channelTask,
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
      return;
    }
    console.log('1-4');
    if (lastSeenDiscordTask && lastSeenDiscordTask.banned) {
      await message.channel.send({
        embeds: [
          discordUserBannedMessage(
            lastSeenDiscordTask,
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
      return;
    }
    console.log('1-5');
    if (filteredMessageDiscord[1] === undefined) {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Help',
      );
      if (limited) return;
      await queue.add(async () => {
        const task = await discordHelp(
          discordClient,
          message,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'help') {
      console.log('used help');
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Help',
      );
      if (limited) return;
      await queue.add(async () => {
        const task = await discordHelp(
          discordClient,
          message,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'changerealm') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'ChangeRealm',
      );
      if (limited) return;
      await queue.add(async () => {
        const task = await discordChangeRealm(
          discordClient,
          message,
          io,
          false, // Is Defered by command?
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'myrank') {
      console.log('myRank found');
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Myrank',
      );
      if (limited) return;
      console.log('before executing myRank');
      await queue.add(async () => {
        const task = await discordMyRank(
          discordClient,
          message,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'ranks') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Ranks',
      );
      if (limited) return;
      await queue.add(async () => {
        const task = await discordRanks(
          discordClient,
          message,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'deposit') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Deposit',
      );
      if (limited) return;
      await queue.add(async () => {
        const task = await discordDeposit(
          discordClient,
          message,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'price') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Price',
      );
      if (limited) return;
      await queue.add(async () => {
        const task = await discordPrice(
          discordClient,
          message,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'balance') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Balance',
      );
      if (limited) return;
      await queue.add(async () => {
        const task = await discordBalance(
          discordClient,
          message,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'roll') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'RollDice',
      );
      if (limited) return;
      const setting = await db.setting.findOne();
      if (message.channelId !== setting.roleDiceChannelId) {
        await message.reply(`please use <#${setting.roleDiceChannelId}> for rolling dice`).catch((e) => {
          console.log(e);
        });
      }
      if (message.channelId === setting.roleDiceChannelId) {
        await queue.add(async () => {
          const task = await discordRollDice(
            discordClient,
            message,
            setting,
            io,
          );
        });
      }
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'leaderboard') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Leaderboard',
      );
      if (limited) return;
      const setting = await db.setting.findOne();
      await queue.add(async () => {
        const task = await discordLeaderboard(
          discordClient,
          message,
          setting,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'mostactive') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'MostActive',
      );
      if (limited) return;
      const setting = await db.setting.findOne();
      await queue.add(async () => {
        const task = await discordMostActive(
          discordClient,
          message,
          setting,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'pickclass') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'PickClass',
      );
      if (limited) return;
      const setting = await db.setting.findOne();
      const task = await discordPickClass(
        discordClient,
        message,
        setting,
        io,
        queue,
        false, // Is Defered by command?
      );
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'skills') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Skills',
      );
      if (limited) return;
      const setting = await db.setting.findOne();
      const task = await discordSkills(
        discordClient,
        message,
        setting,
        io,
        queue,
        false, // Is Defered by command?
      );
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'inventory') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Inventory',
      );
      if (limited) return;
      const setting = await db.setting.findOne();
      const task = await discordShowInventory(
        discordClient,
        message,
        setting,
        io,
        queue,
        false, // Is Defered by command?
      );
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'equipment') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Equipment',
      );
      if (limited) return;
      const setting = await db.setting.findOne();
      const task = await discordShowEquipment(
        discordClient,
        message,
        setting,
        io,
        queue,
        false, // Is Defered by command?
      );
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'stats') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Stats',
      );
      if (limited) return;
      const setting = await db.setting.findOne();
      const task = await discordStats(
        discordClient,
        message,
        setting,
        io,
        queue,
      );
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'withdraw') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Withdraw',
      );
      if (limited) return;
      const setting = await discordFeatureSettings(
        message,
        'withdraw',
        groupTaskId,
        channelTaskId,
      );
      const [
        success,
        filteredMessage,
      ] = await preWithdraw(
        discordClient,
        message,
      );
      if (success) {
        await queue.add(async () => {
          const task = await discordWithdraw(
            discordClient,
            message,
            filteredMessage,
            setting,
            io,
          );
        });
      }
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'generatemagicitem') {
      console.log(message);
      if (message && message.author && message.author.id === '217379915803131906') {
        await queue.add(async () => {
          const task = await discordShowCaseMagicItem(
            discordClient,
            message,
            Number(filteredMessageDiscord[2]),
            queue,
            io,
          );
        });
      }
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'generatestartdagger') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'GenerateStartDagger',
      );
      if (limited) return;
      await queue.add(async () => {
        const task = await discordStartDagger(
          discordClient,
          message,
          queue,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'battle') {
      await queue.add(async () => {
        await discordBattle(
          discordClient,
          message,
          false, // Is Defered by command?
          queue,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'heal') {
      await queue.add(async () => {
        const task = await discordHeal(
          discordClient,
          message,
          io,
          queue,
          false, // Is Defered by command?
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'resetstats') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'ResetStats',
      );
      if (limited) return;

      await discordResetStats(
        discordClient,
        message,
        io,
        queue,
        false, // Is Defered by command?
      );
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'resetskills') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'ResetSkills',
      );
      if (limited) return;

      await discordResetSkills(
        discordClient,
        message,
        io,
        queue,
        false, // Is Defered by command?
      );
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'grantexp') {
      console.log(message);
      if (message && message.author && message.author.id === '217379915803131906') {
        const setting = await db.setting.findOne();
        await queue.add(async () => {
          const task = await discordGrantExp(
            discordClient,
            message,
            filteredMessageDiscord,
            setting,
            queue,
            io,
          );
        });
      }
    }

    // if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'account') {
    //   const limited = await myRateLimiter(
    //     discordClient,
    //     message,
    //     'Account',
    //   );
    //   if (limited) return;
    //   await queue.add(async () => {
    //     const task = await discordAccount(
    //       message,
    //       io,
    //     );
    //   });
    // }

    // if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'exptest') {
    //  await queue.add(async () => {
    //    const task = await discordExpTest(
    //      discordClient,
    //      message,
    //      io,
    //    );
    //  });
    // }
  });
};
