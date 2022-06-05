import { config } from "dotenv";
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import db from '../../../models';

config();

const commands = [
  new SlashCommandBuilder().setName('help').setDescription('DM\'s you with a help message'),
  new SlashCommandBuilder().setName('myrank').setDescription('Displays the user\'s rank'),
  new SlashCommandBuilder().setName('ranks').setDescription('Displays all the ranks'),
  new SlashCommandBuilder().setName('balance').setDescription('Display your balance'),
  new SlashCommandBuilder().setName('deposit').setDescription('Displays your deposit address!'),
  new SlashCommandBuilder().setName('withdraw').setDescription('Starts Withdrawal process'),
].map((command) => command.toJSON());

export const deployCommands = async (
  botToken,
  clientId,
) => {
  const setting = await db.setting.findOne();

  const rest = new REST({ version: '9' }).setToken(botToken);

  rest.put(Routes.applicationGuildCommands(clientId, setting.discordHomeServerGuildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
};
