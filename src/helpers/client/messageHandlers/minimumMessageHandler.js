import {
  minimumMessage,
} from '../../../messages';

export const handleMinimumMessage = async (
  discordClient,
  message,
  setting,
  capType,
) => {
  if (message.type && message.type === 'APPLICATION_COMMAND') {
    const discordUser = await discordClient.users.cache.get(message.user.id);
    if (message.guildId) {
      const discordChannel = await discordClient.channels.cache.get(message.channelId);
      await discordChannel.send({
        embeds: [
          minimumMessage(
            message.user.id,
            setting,
            capType,
          ),
        ],
      });
    } else {
      console.log('before min amount send');
      await discordUser.send({
        embeds: [
          minimumMessage(
            message.user.id,
            setting,
            capType,
          ),
        ],
      });
      console.log('after min amount send');
    }
  } else {
    if (message.channel.type === 'DM') {
      await message.author.send({
        embeds: [
          minimumMessage(
            message.author.id,
            setting,
            capType,
          ),
        ],
      });
    }
    if (message.channel.type === 'GUILD_TEXT') {
      await message.channel.send({
        embeds: [
          minimumMessage(
            message.author.id,
            setting,
            capType,
          ),
        ],
      });
    }
  }
};
