import { config } from "dotenv";
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import db from '../../models';

config();

const commands = [
  new SlashCommandBuilder().setName('help').setDescription('DM\'s you with a help message'),
  new SlashCommandBuilder().setName('pickclass').setDescription('Select a new class'),
  new SlashCommandBuilder().setName('stats').setDescription('Select stats (attributes) for your class'),
  new SlashCommandBuilder().setName('skills').setDescription('Skill Management'),
  new SlashCommandBuilder().setName('resetstats').setDescription('Reset your Attributes/Stats'),
  new SlashCommandBuilder().setName('resetskills').setDescription('Reset your skills'),
  new SlashCommandBuilder().setName('inventory').setDescription('Inventory Management'),
  new SlashCommandBuilder().setName('equipment').setDescription('Equipment Management'),
  new SlashCommandBuilder().setName('battle').setDescription('Battle a monster'),
  new SlashCommandBuilder().setName('heal').setDescription('Heal yourself'),
  new SlashCommandBuilder().setName('myrank').setDescription('Displays the user\'s rank'),
  new SlashCommandBuilder().setName('ranks').setDescription('Displays all the ranks'),
  new SlashCommandBuilder().setName('leaderboard').setDescription('Displays the top ten leaderboard'),
  new SlashCommandBuilder().setName('mostactive').setDescription('Displays the top ten most active users (chatting)'),
  new SlashCommandBuilder().setName('balance').setDescription('Display your balance'),
  new SlashCommandBuilder().setName('deposit').setDescription('Displays your deposit address!'),
  new SlashCommandBuilder().setName('withdraw').setDescription('Starts Withdrawal process'),
  new SlashCommandBuilder().setName('roll').setDescription('Roll the dice'),
  new SlashCommandBuilder().setName('price').setDescription('Displays Runebase price'),
].map((command) => command.toJSON());

export const deployCommands = async (
  botToken,
  clientId,
) => {
  const setting = await db.setting.findOne();

  const rest = new REST({ version: '9' }).setToken(botToken);

  rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
};
