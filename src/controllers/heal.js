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
  generateAcceptButton,
  generateDeclineButton,
} from '../buttons';
import {
  confirmationHealMessage,
  insufficientBalanceMessage,
  declineHealMessage,
  healCompleteMessage,
} from '../messages';
import { calculateCharacterStats } from '../helpers/stats/calculateCharacterStats';

export const discordHeal = async (
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

  if (!userCurrentCharacter) {
    await message.reply({
      content: 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`',
      ephemeral: true,
    });
    return;
  }

  const userWallet = await db.wallet.findOne({
    where: {
      userId: userCurrentCharacter.UserGroup.user.id,
    },
  });

  const embedMessage = await discordChannel.send({
    embeds: [
      await confirmationHealMessage(
        userCurrentCharacter.UserGroup.user.user_id,
        userWallet.available,
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
      if (interaction.user.id !== userCurrentCharacter.UserGroup.user.user_id) {
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
            await declineHealMessage(
              userCurrentCharacter.UserGroup.user.user_id,
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
                userId: userCurrentCharacter.UserGroup.user.id,
              },
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            if (findWallet.available < 10000000) {
              await interaction.editReply({
                embeds: [
                  await insufficientBalanceMessage(
                    userCurrentCharacter.UserGroup.user.user_id,
                    'Heal',
                  ),
                ],
                components: [
                ],
              });
              return;
            }
            await findWallet.update({
              available: findWallet.available - 10000000,
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            console.log('fetch usergroupclass');
            const userToUpdate = await db.UserGroupClass.findOne({
              where: {
                UserGroupId: userCurrentCharacter.UserGroup.id,
                classId: userCurrentCharacter.UserGroup.user.currentClassId,
              },
              include: [
                {
                  model: db.condition,
                  as: 'condition',
                },
                {
                  model: db.class,
                  as: 'class',
                },
                {
                  model: db.stats,
                  as: 'stats',
                },
              ],
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            const {
              hp,
              mp,
            } = await calculateCharacterStats(
              userCurrentCharacter,
            );
            console.log('before condition update');
            await userToUpdate.condition.update({
              life: hp.max,
              mana: mp.max,
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            await interaction.editReply({
              content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
              embeds: [
                await healCompleteMessage(
                  userCurrentCharacter.UserGroup.user.user_id,
                ),
              ],
              components: [
              ],
            });
          }).catch(async (err) => {
            console.log(err);
            try {
              await db.error.create({
                type: 'Heal',
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
