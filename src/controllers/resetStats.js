/* eslint-disable import/prefer-default-export */
import {
  Transaction,
} from "sequelize";
import {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from 'discord.js';
import db from '../models';
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import {
  resetStatsCompletemessage,
  insufficientBalanceMessage,
  resetStatsDeclinedMessage,
  resetStatsConfirmationMessage,
} from '../messages';
import {
  generateAcceptButton,
  generateDeclineButton,
} from '../buttons';

export const discordResetStats = async (
  discordClient,
  message,
  io,
  queue,
) => {
  const activity = [];
  const userId = await fetchDiscordUserIdFromMessageOrInteraction(
    message,
  );

  const discordChannel = await fetchDiscordChannel(
    discordClient,
    message,
  );

  const userCurrentCharacter = await fetchUserCurrentCharacter(
    userId, // user discord id
    false, // Need inventory?
  );

  const userWallet = await db.wallet.findOne({
    where: {
      userId: userCurrentCharacter.user.id,
    },
  });

  const totalStatsCost = (userCurrentCharacter.stats.strength
    + userCurrentCharacter.stats.dexterity
    + userCurrentCharacter.stats.vitality
    + userCurrentCharacter.stats.energy) * 0.1;

  const embedMessage = await discordChannel.send({
    embeds: [
      await resetStatsConfirmationMessage(
        userCurrentCharacter.user.user_id,
        userWallet.available,
        totalStatsCost,
      ),
    ],
    components: [
      new MessageActionRow({
        components: [
          await generateAcceptButton(),
          await generateDeclineButton(),
        ],
      }),
    ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    // filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
  });

  collector.on('collect', async (interaction) => {
    if (interaction.isButton()) {
      if (interaction.user.id !== userCurrentCharacter.user.user_id) {
        await interaction.reply({
          content: `<@${interaction.user.id}>, These buttons aren't for you!`,
          ephemeral: true,
        });
        return;
      }
      await interaction.deferUpdate();

      if (interaction.customId === 'decline') {
        await interaction.editReply({
          embeds: [
            await resetStatsDeclinedMessage(
              userCurrentCharacter.user.user_id,
              'Reset Stats',
            ),
          ],
          components: [
          ],
        });
        return;
      }
      if (interaction.customId === 'accept') {
        await queue.add(async () => {
          await db.sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
          }, async (t) => {
            const findWallet = await db.wallet.findOne({
              where: {
                userId: userCurrentCharacter.user.id,
              },
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            const userCharacterToReset = await fetchUserCurrentCharacter(
              userCurrentCharacter.user.user_id, // user discord id
              false, // Need inventory?
            );
            const totalStatsCostUser = ((userCharacterToReset.stats.strength
              + userCharacterToReset.stats.dexterity
              + userCharacterToReset.stats.vitality
              + userCharacterToReset.stats.energy) * 0.1) * 1e8;
            if (findWallet.available < totalStatsCostUser) {
              await interaction.editReply({
                embeds: [
                  await insufficientBalanceMessage(
                    userCharacterToReset.user.user_id,
                    'Reset Stats',
                  ),
                ],
                components: [
                ],
              });
              return;
            }
            await userCharacterToReset.stats.update({
              strength: 0,
              dexterity: 0,
              vitality: 0,
              energy: 0,
              life: 0,
              mana: 0,
              stamina: 0,
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            await findWallet.update({
              available: findWallet.available - totalStatsCostUser,
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t,
            });

            await interaction.editReply({
              content: `<@${userCurrentCharacter.user.user_id}>`,
              embeds: [
                resetStatsCompletemessage(
                  userCurrentCharacter.user.user_id,
                ),
              ],
              components: [
              ],
            });
          }).catch(async (err) => {
            console.log(err);
            try {
              await db.error.create({
                type: 'ClassSelection',
                error: `${err}`,
              });
            } catch (e) {
              console.log(e);
              // logger.error(`Error Discord: ${e}`);
            }
          });
          if (activity.length > 0) {
            io.to('admin').emit('updateActivity', {
              activity,
            });
          }
        });
      }
    }
  });
};
