/* eslint-disable import/prefer-default-export */
import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import {
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas';
import {
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  MessageSelectMenu,
  MessageEmbed,
} from 'discord.js';
import db from '../models';
import { renderBattleGif } from '../render/battle/battle';
import { renderInitBattleGif } from '../render/battle/initBattle';
import { renderUserDied } from '../render/battle/userDied';
import { renderOutOfStamina } from '../render/battle/outOfStamina';
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchUserCurrentSelectedSkills } from "../helpers/character/selectedSkills";
import { updateUserCurrentSelectedSkills } from '../helpers/character/updateSelectedSkills';
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import { processBattleMove } from '../helpers/battle/processBattleMove';
import { renderBattleComplete } from '../render/battle/battleComplete';

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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

  const userCurrentSelectedSkills = await fetchUserCurrentSelectedSkills(
    userId,
  );

  const generateAcceptHealButton = async (mySelectedSkill) => new MessageButton({
    style: 'SECONDARY',
    label: `Accept`,
    // emoji: '➕',
    customId: 'accept',
  });

  const generateDeclineHealButton = async (mySelectedSkill) => new MessageButton({
    style: 'SECONDARY',
    label: `Decline`,
    // emoji: '➕',
    customId: 'decline',
  });
  const confirmationEmbed = new MessageEmbed()
    .setTitle('Heal')
    .setDescription('Healing costs 0.1 RUNES, Are you sure you want to heal?');
  const declineHealEmbed = new MessageEmbed()
    .setTitle('Heal')
    .setDescription(`${userCurrentCharacter.user.username} declined heal`);
  const notEnoughBalance = new MessageEmbed()
    .setTitle('Heal')
    .setDescription(`${userCurrentCharacter.user.username}, insufficient balance`);
  const healCompleteEmebed = new MessageEmbed()
    .setTitle('Heal')
    .setDescription(`💋 Freyja has kissed <@${userCurrentCharacter.user.user_id}>. 💋
<@${userCurrentCharacter.user.user_id}> is now Healed!`);

  const embedMessage = await discordChannel.send({
    embeds: [
      confirmationEmbed,
    ],
    components: [
      new MessageActionRow({
        components: [
          await generateAcceptHealButton(),
          await generateDeclineHealButton(),
        ],
      }),
    ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.user.user_id,
  });

  collector.on('collect', async (interaction) => {
    if (interaction.isButton()) {
      await interaction.deferUpdate();

      if (interaction.customId === 'decline') {
        await interaction.editReply({
          embeds: [
            declineHealEmbed,
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
            if (findWallet.available < 10000000) {
              await interaction.editReply({
                embeds: [
                  notEnoughBalance,
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
            const userToUpdate = await db.UserClass.findOne({
              where: {
                userId: userCurrentCharacter.user.id,
                classId: userCurrentCharacter.user.currentClassId,
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
            await userToUpdate.condition.update({
              life: userToUpdate.class.life + userToUpdate.stats.life,
              mana: userToUpdate.class.mana + userToUpdate.stats.mana,
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            await interaction.editReply({
              content: `<@${userCurrentCharacter.user.user_id}>`,
              embeds: [
                healCompleteEmebed,
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
