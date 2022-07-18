import {
  InteractionType,
  ChannelType,
} from 'discord.js';
import {
  minimumMessage,
} from '../../../embeds';

export const handleMinimumMessage = async (
  discordClient,
  message,
  setting,
  capType,
) => {
  if (message.type && message.type === InteractionType.ApplicationCommand) {
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
    if (message.channel.type === ChannelType.DM) {
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
    if (message.channel.type === ChannelType.GuildText) {
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
