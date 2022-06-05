import { config } from "dotenv";
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

config();

const commands = [
  new SlashCommandBuilder().setName('help').setDescription('DM\'s you with a help message'),
  new SlashCommandBuilder().setName('deposit').setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
].map((command) => command.toJSON());

export const deployCommands = (
  botToken,
  clientId,
) => {
  const rest = new REST({ version: '9' }).setToken(botToken);

  rest.put(Routes.applicationGuildCommands(clientId, 'guildId'), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
};
