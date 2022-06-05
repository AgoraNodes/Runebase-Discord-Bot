import { Transaction } from "sequelize";
import { getInstance } from '../../services/rclient';
import logger from "../logger";
import db from '../../models';
import {
  invalidAddressMessage,
  reviewMessage,
  warnDirectMessage,
  discordErrorMessage,
  cannotSendMessageUser,
  enterWithdrawalAddress,
  timeOutMessage,
  enterWithdrawalAmount,
  unableToWithdrawToSelfMessage,
} from '../../messages';

export const preWithdraw = async (
  discordClient,
  message,
) => {
  let userId;
  let filteredMessage = [];
  let collectedAddress;
  let collectedAmount;
  if (message.user && message.user.id) {
    userId = message.user.id;
  } else {
    userId = message.author.id;
  }
  const msgFilter = (m) => {
    const filtered = m.author.id === userId;
    return filtered;
  };
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordUser = await discordClient.users.cache.get(message.user.id);
      if (message.guildId) {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            enterWithdrawalAddress(),
          ],
        });
        await discordChannel.awaitMessages({
          filter: msgFilter,
          max: 1,
          time: 60000,
          errors: ['time'],
        }).then(async (collected) => {
          collectedAddress = collected.first().content;
        }).catch(async (collected) => {
          console.log(collected);
          await discordChannel.send({
            embeds: [
              timeOutMessage(),
            ],
          });
        });
      } else {
        await discordUser.send({
          embeds: [
            enterWithdrawalAddress(),
          ],
        });
        console.log('picked user await channel');
        await discordUser.dmChannel.awaitMessages({
          filter: msgFilter,
          max: 1,
          time: 60000,
          errors: ['time'],
        }).then(async (collected) => {
          collectedAddress = collected.first().content;
        }).catch(async (collected) => {
          console.log(collected);
          await discordUser.send({
            embeds: [
              timeOutMessage(),
            ],
          });
        });
      }
    } else {
      if (message.channel.type === 'DM') {
        await message.author.send({
          embeds: [
            enterWithdrawalAddress(),
          ],
        });
        await message.author.dmChannel.awaitMessages({
          filter: msgFilter,
          max: 1,
          time: 60000,
          errors: ['time'],
        }).then(async (collected) => {
          collectedAddress = collected.first().content;
        }).catch(async (collected) => {
          console.log(collected);
          await message.author.send({
            embeds: [
              timeOutMessage(),
            ],
          });
        });
      }
      if (message.channel.type === 'GUILD_TEXT') {
        await message.channel.send({
          embeds: [
            enterWithdrawalAddress(),
          ],
        });
        await message.channel.awaitMessages({
          filter: msgFilter,
          max: 1,
          time: 60000,
          errors: ['time'],
        }).then(async (collected) => {
          collectedAddress = collected.first().content;
        }).catch(async (collected) => {
          console.log(collected);
          await message.channel.send({
            embeds: [
              timeOutMessage(),
            ],
          });
        });
      }
    }
    console.log('before collect message');
    if (!collectedAddress) {
      return [
        false,
        false,
      ];
    }
    let isValidAddress;
    try {
      isValidAddress = await getInstance().validateAddress(collectedAddress);
    } catch (e) {
      console.log(e);
      isValidAddress = false;
    }
    console.log('isValidAddress');
    console.log(isValidAddress);
    if (!isValidAddress || !isValidAddress.isvalid) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordUser = await discordClient.users.cache.get(message.user.id);
        if (message.guildId) {
          const discordChannel = await discordClient.channels.cache.get(message.channelId);
          await discordChannel.send({
            embeds: [
              invalidAddressMessage(userId),
            ],
          });
        } else {
          await discordUser.send({
            embeds: [
              invalidAddressMessage(userId),
            ],
          });
        }
      } else {
        if (message.channel.type === 'DM') {
          await message.author.send({
            embeds: [
              invalidAddressMessage(userId),
            ],
          });
        }
        if (message.channel.type === 'GUILD_TEXT') {
          await message.channel.send({
            embeds: [
              invalidAddressMessage(
                userId,
              ),
            ],
          });
        }
      }
      return [
        false,
        false,
      ];
    }

    ///

    if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordUser = await discordClient.users.cache.get(message.user.id);
      if (message.guildId) {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            enterWithdrawalAmount(),
          ],
        });
        await discordChannel.awaitMessages({
          filter: msgFilter,
          max: 1,
          time: 60000,
          errors: ['time'],
        }).then(async (collected) => {
          collectedAmount = collected.first().content;
        }).catch(async (collected) => {
          console.log(collected);
          await discordChannel.send({
            embeds: [
              timeOutMessage(),
            ],
          });
        });
      } else {
        await discordUser.send({
          embeds: [
            enterWithdrawalAmount(),
          ],
        });
        console.log('picked user await channel');
        await discordUser.dmChannel.awaitMessages({
          filter: msgFilter,
          max: 1,
          time: 60000,
          errors: ['time'],
        }).then(async (collected) => {
          collectedAmount = collected.first().content;
        }).catch(async (collected) => {
          console.log(collected);
          await discordUser.send({
            embeds: [
              timeOutMessage(),
            ],
          });
        });
      }
    } else {
      if (message.channel.type === 'DM') {
        await message.author.send({
          embeds: [
            enterWithdrawalAmount(),
          ],
        });
        await message.author.dmChannel.awaitMessages({
          filter: msgFilter,
          max: 1,
          time: 60000,
          errors: ['time'],
        }).then(async (collected) => {
          collectedAmount = collected.first().content;
        }).catch(async (collected) => {
          console.log(collected);
          await message.author.send({
            embeds: [
              timeOutMessage(),
            ],
          });
        });
      }
      if (message.channel.type === 'GUILD_TEXT') {
        await message.channel.send({
          embeds: [
            enterWithdrawalAmount(),
          ],
        });
        await message.channel.awaitMessages({
          filter: msgFilter,
          max: 1,
          time: 60000,
          errors: ['time'],
        }).then(async (collected) => {
          collectedAmount = collected.first().content;
        }).catch(async (collected) => {
          console.log(collected);
          await message.channel.send({
            embeds: [
              timeOutMessage(),
            ],
          });
        });
      }
    }
    if (!collectedAmount) {
      return [
        false,
        false,
      ];
    }
    //
    filteredMessage = ['!runebase', 'withdraw', collectedAddress, collectedAmount];
    console.log(filteredMessage);
    console.log('filteredMessage');
    console.log('filteredMessage');
    console.log('filteredMessage');
    console.log('filteredMessage');
    console.log('filteredMessage');
    console.log('filteredMessage');
    console.log('filteredMessage');
  }).catch(async (err) => {
    try {
      await db.error.create({
        type: 'withdraw',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    logger.error(`Error Discord Withdraw Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "Withdraw",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      } else {
        await message.channel.send({
          embeds: [
            cannotSendMessageUser(
              "Withdraw",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      }
    } else if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordChannel = await discordClient.channels.cache.get(message.channelId);
      await discordChannel.send({
        embeds: [
          discordErrorMessage(
            "Withdraw",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "Withdraw",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    }
  });
  return [
    true,
    filteredMessage,
  ];
};
