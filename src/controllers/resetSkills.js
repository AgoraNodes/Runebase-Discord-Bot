/* eslint-disable import/prefer-default-export */
import {
  Transaction,
  Op,
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
  skillConfirmationMessage,
  insufficientBalanceMessage,
  declineResetSkillsMessage,
  resetSkillCompleteMessage,
} from '../messages';

export const discordResetSkills = async (
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

  const userSkills = await db.UserGroupClassSkill.findAll({
    where: {
      UserGroupClassId: userCurrentCharacter.id,
    },
    include: [
      {
        model: db.skill,
        as: 'skill',
        where: {
          name: {
            [Op.not]: 'Attack',
          },
        },
      },
    ],
  });

  const sumSkillPoints = userSkills.reduce((accumulator, object) => accumulator + object.points, 0);
  const totalSkillsCost = sumSkillPoints * 1;

  const embedMessage = await discordChannel.send({
    embeds: [
      await skillConfirmationMessage(
        userId,
        userWallet.available,
        totalSkillsCost,
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
            await declineResetSkillsMessage(
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
            const userSkills = await db.UserGroupClassSkill.findAll({
              where: {
                UserGroupClassId: userCurrentCharacter.id,
              },
              include: [
                {
                  model: db.skill,
                  as: 'skill',
                  where: {
                    name: {
                      [Op.not]: 'Attack',
                    },
                  },
                },
              ],
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            console.log(userSkills);
            const attackSkill = await db.UserGroupClassSkill.findOne({
              where: {
                UserGroupClassId: userCurrentCharacter.id,
              },
              include: [
                {
                  model: db.skill,
                  as: 'skill',
                  where: {
                    name: 'Attack',
                  },
                },
              ],
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            await userCurrentCharacter.update({
              selectedMainSkillId: attackSkill.id,
              selectedSecondarySkillId: attackSkill.id,
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            const sumResetSkillPoints = userSkills.reduce((accumulator, object) => accumulator + object.points, 0);
            const resetCost = (sumResetSkillPoints * 1) * 1e8;
            if (userSkills.length > 0) {
              if (findWallet.available < resetCost) {
                await interaction.editReply({
                  embeds: [
                    await insufficientBalanceMessage(
                      userCurrentCharacter.UserGroup.user.user_id,
                      'Reset Skills',
                    ),
                  ],
                  components: [
                  ],
                });
                return;
              }
              await findWallet.update({
                available: findWallet.available - resetCost,
              }, {
                lock: t.LOCK.UPDATE,
                transaction: t,
              });
              // eslint-disable-next-line no-restricted-syntax
              for (const userSkill of userSkills) {
                // eslint-disable-next-line no-await-in-loop
                await userSkill.destroy({
                  lock: t.LOCK.UPDATE,
                  transaction: t,
                });
              }
            }

            await interaction.editReply({
              content: `<@${userCurrentCharacter.UserGroup.user.user_id}>`,
              embeds: [
                await resetSkillCompleteMessage(
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
