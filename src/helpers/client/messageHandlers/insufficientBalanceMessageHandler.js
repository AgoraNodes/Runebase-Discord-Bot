import {
  insufficientBalanceMessage,
} from '../../../embeds';

export const handleInsufficientBalanceMessage = async (
  discordClient,
  message,
  capType,
) => {
  if (message.type && message.type === 'APPLICATION_COMMAND') {
    const discordUser = await discordClient.users.cache.get(message.user.id);
    if (message.guildId) {
      const discordChannel = await discordClient.channels.cache.get(message.channelId);
      await discordChannel.send({
        embeds: [
          insufficientBalanceMessage(
            message.user.id,
            capType,
          ),
        ],
      });
    } else {
      await discordUser.send({
        embeds: [
          insufficientBalanceMessage(
            message.user.id,
            capType,
          ),
        ],
      });
    }
  } else {
    if (message.channel.type === 'DM') {
      await message.author.send({
        embeds: [
          insufficientBalanceMessage(
            message.author.id,
            capType,
          ),
        ],
      });
    }
    if (message.channel.type === 'GUILD_TEXT') {
      await message.channel.send({
        embeds: [
          insufficientBalanceMessage(
            message.author.id,
            capType,
          ),
        ],
      });
    }
  }
};
