import { config } from "dotenv";
import { updateDiscordChannel } from '../controllers/channel';
import { updateDiscordGroup } from '../controllers/group';
import { discordHelp } from '../controllers/help';

import { discordAccount } from '../controllers/account';

import { createUpdateDiscordUser, updateDiscordLastSeen } from '../controllers/user';
import { preWithdraw } from '../helpers/withdraw/preWithdraw';
import { discordMyRank } from '../controllers/myrank';
import { discordRanks } from '../controllers/ranks';
import { discordDeposit } from '../controllers/deposit';
import { discordPrice } from '../controllers/price';
import { discordBalance } from '../controllers/balance';
import { discordWithdraw } from '../controllers/withdraw';
import { discordExpTest } from '../controllers/expTest';
import { myRateLimiter } from '../helpers/rateLimit';
import { discordFeatureSettings } from '../controllers/featureSetting';
import { isMaintenanceOrDisabled } from '../helpers/isMaintenanceOrDisabled';
import settings from '../config/settings';

import {
  discordUserBannedMessage,
  discordServerBannedMessage,
  discordChannelBannedMessage,
} from '../messages';

config();

export const discordRouter = (
  discordClient,
  queue,
  io,
) => {
  discordClient.user.setPresence({
    activities: [{
      name: `${settings.bot.command}`,
      type: "PLAYING",
    }],
  });

  discordClient.on('voiceStateUpdate', async (oldMember, newMember) => {
    await queue.add(async () => {
      const groupTask = await updateDiscordGroup(discordClient, newMember);
      const channelTask = await updateDiscordChannel(newMember, groupTask);
    });
  });

  discordClient.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    let groupTask;
    let groupTaskId;
    let channelTask;
    let channelTaskId;
    let lastSeenDiscordTask;
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
  });

  discordClient.on("messageCreate", async (message) => {
    let groupTask;
    let groupTaskId;
    let channelTask;
    let channelTaskId;
    let lastSeenDiscordTask;
    let disallow;
    if (!message.author.bot) {
      const walletExists = await createUpdateDiscordUser(
        discordClient,
        message.author,
        queue,
      );
      await queue.add(async () => {
        groupTask = await updateDiscordGroup(discordClient, message);
        channelTask = await updateDiscordChannel(message, groupTask);
        console.log('before last seen');
        lastSeenDiscordTask = await updateDiscordLastSeen(
          message,
          message.author,
        );
      });
      groupTaskId = groupTask && groupTask.id;
      channelTaskId = channelTask && channelTask.id;
    }
    console.log('after last seen');
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

    const messageReplaceBreaksWithSpaces = message.content.replace(/\n/g, " ");
    const preFilteredMessageDiscord = messageReplaceBreaksWithSpaces.split(' ');
    const filteredMessageDiscord = preFilteredMessageDiscord.filter((el) => el !== '');

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

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'myrank') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Myrank',
      );
      if (limited) return;
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

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'account') {
      const limited = await myRateLimiter(
        discordClient,
        message,
        'Account',
      );
      if (limited) return;
      await queue.add(async () => {
        const task = await discordAccount(
          message,
          io,
        );
      });
    }

    if (filteredMessageDiscord[1] && filteredMessageDiscord[1].toLowerCase() === 'exptest') {
      await queue.add(async () => {
        const task = await discordExpTest(
          discordClient,
          message,
          io,
        );
      });
    }
  });
  console.log(`Logged in as ${discordClient.user.tag}!`);
};
