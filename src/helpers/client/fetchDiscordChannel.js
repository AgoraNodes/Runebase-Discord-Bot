import {
  InteractionType,
  ChannelType,
} from "discord.js";

export const fetchDiscordChannel = async (
  discordClient,
  message,
) => {
  let discordChannel;
  if (message.type && message.type === InteractionType.ApplicationCommand) {
    if (message.guildId) {
      discordChannel = await discordClient.channels.cache.get(message.channelId);
    } else {
      discordChannel = await discordClient.users.cache.get(message.user.id);
    }
  } else {
    if (message.channel.type === ChannelType.DM) {
      discordChannel = await discordClient.channels.cache.get(message.channelId);
    }
    if (message.channel.type === ChannelType.GuildText) {
      discordChannel = await discordClient.channels.cache.get(message.channelId);
    }
  }
  return discordChannel;
};
