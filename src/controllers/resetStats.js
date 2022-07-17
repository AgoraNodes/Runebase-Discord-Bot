/* eslint-disable import/prefer-default-export */
import {
  Transaction,
} from "sequelize";
import BigNumber from "bignumber.js";
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

  const totalStatsCost = (
    new BigNumber(
      userCurrentCharacter.stats.strength,
    ).plus(
      userCurrentCharacter.stats.dexterity,
    ).plus(
      userCurrentCharacter.stats.vitality,
    ).plus(
      userCurrentCharacter.stats.energy,
    )
  ).multipliedBy(0.1);

  const embedMessage = await discordChannel.send({
    embeds: [
      await resetStatsConfirmationMessage(
        userCurrentCharacter.UserGroup.user.user_id,
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
            await resetStatsDeclinedMessage(
              userCurrentCharacter.UserGroup.user.user_id,
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
                userId: userCurrentCharacter.UserGroup.user.id,
              },
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            const userCharacterToReset = await fetchUserCurrentCharacter(
              userCurrentCharacter.UserGroup.user.user_id, // user discord id
              false, // Need inventory?
            );

            const totalStatsCostUser = ((((
              new BigNumber(
                userCharacterToReset.stats.strength,
              ).plus(
                userCharacterToReset.stats.dexterity,
              ).plus(
                userCharacterToReset.stats.vitality,
              ).plus(
                userCharacterToReset.stats.energy,
              )
            ).multipliedBy(0.1)
            ).multipliedBy(1e8)
            ).dp(0)
            ).toNumber();

            console.log(totalStatsCostUser);
            console.log('totalCostNumber');
            if (findWallet.available < totalStatsCostUser) {
              await interaction.editReply({
                embeds: [
                  await insufficientBalanceMessage(
                    userCharacterToReset.UserGroup.user.user_id,
                    'Reset Stats',
                  ),
                ],
                components: [
                ],
              });
              return;
            }
            const updatedCharacterStats = await userCharacterToReset.stats.update({
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
            console.log(userCharacterToReset);
            console.log(updatedCharacterStats);
            console.log('updatedCharacterStats');

            await findWallet.update({
              available: findWallet.available - totalStatsCostUser,
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            const maxStamina = userCharacterToReset.UserGroup.user.currentClass.stamina + userCharacterToReset.stats.stamina;
            const maxHp = userCharacterToReset.UserGroup.user.currentClass.life + userCharacterToReset.stats.life;
            const maxMp = userCharacterToReset.UserGroup.user.currentClass.mana + userCharacterToReset.stats.mana;
            if (userCharacterToReset.condition.mana > maxMp) {
              await userCharacterToReset.condition.update({
                mana: maxMp,
              });
            }
            if (userCharacterToReset.condition.life > maxHp) {
              await userCharacterToReset.condition.update({
                life: maxHp,
              });
            }
            if (userCharacterToReset.condition.stamina > maxStamina) {
              await userCharacterToReset.condition.update({
                stamina: maxStamina,
              });
            }

            await interaction.editReply({
              content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
              embeds: [
                resetStatsCompletemessage(
                  userCurrentCharacter.UserGroup.user.user_id,
                ),
              ],
              components: [],
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
