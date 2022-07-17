/* eslint-disable import/prefer-default-export */
import {
  Transaction,
  Op,
} from "sequelize";
import {
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  MessageSelectMenu,
  MessageEmbed,
} from 'discord.js';
import {
  realmChangeSuccessEmbed,
  needToBeInDiscordRealmEmbed,
  levelUpMessage,
  discordErrorMessage,
} from '../embeds';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { fetchDiscordUserIdFromMessageOrInteraction } from "../helpers/client/fetchDiscordUserIdFromMessageOrInteraction";
import { fetchDiscordChannel } from "../helpers/client/fetchDiscordChannel";

export const discordChangeRealm = async (
  discordClient,
  message,
  io,
) => {
  const activity = [];

  const userId = await fetchDiscordUserIdFromMessageOrInteraction(
    message,
  );
  if (!userId) return;

  const discordChannel = await fetchDiscordChannel(
    discordClient,
    message,
  );
  if (!discordChannel) return;

  const user = await db.user.findOne({
    where: {
      user_id: `${userId}`,
    },
  });
  if (!user) return;

  const realms = await db.group.findAll({
    where: {
      activeRealm: true,
    },
  });

  const realmMap = realms.reduce((filtered, realm) => {
    // if (true) {
    const mapped = {
      placeholder: 'pick a skill',
      label: `${realm.groupName}`,
      value: `realm:${realm.id}`,
      default: realm.id === user.currentRealmId,
    };
    filtered.push(mapped);
    // }
    return filtered;
  }, []);
  console.log(realmMap);
  console.log('123');

  const alreadyInRealmEmbed = new MessageEmbed()
    .setTitle('Change Realm')
    .setDescription(`${user.username}, You are already in this realm currently.`);

  const realmNotFoundEmbed = new MessageEmbed()
    .setTitle('Change Realm')
    .setDescription(`${user.username}, We can't find the realm you are trying to join`);

  const embedMessage = await discordChannel.send({
    content: `<@${user.user_id}>, please select your realm`,
    files: [
    ],
    components: [
      // new MessageActionRow({
      //  components: [
      // await generateHealButton(),
      //  ],
      // }),
      new MessageActionRow({
        components: [
          new MessageSelectMenu({
            type: 'SELECT_MENU',
            customId: 'select-realm',
            options: realmMap,
          }),
        ],
      }),
    ],
  });
  const collector = embedMessage.createMessageComponentCollector({});
  collector.on('collect', async (interaction) => {
    if (interaction.user.id !== user.user_id) {
      await interaction.reply({
        content: `<@${interaction.user.id}>, These buttons aren't for you!`,
        ephemeral: true,
      });
      return;
    }
    if (interaction.isSelectMenu()) {
      if (interaction.customId === 'select-realm') {
        await interaction.deferUpdate();
        if (interaction.values[0].startsWith('realm:')) {
          const newSelectedId = Number(interaction.values[0].replace('realm:', ''));
          console.log(newSelectedId);
          await db.sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
          }, async (t) => {
            const myUser = await db.user.findOne({
              where: {
                id: user.id,
              },
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log(myUser);
            if (myUser.currentRealmId === newSelectedId) {
              console.log('You are already in this realm');
              await interaction.editReply({
                content: `<@${user.user_id}>`,
                embeds: [
                  alreadyInRealmEmbed,
                ],
                components: [
                  new MessageActionRow({
                    components: [
                      new MessageSelectMenu({
                        type: 'SELECT_MENU',
                        customId: 'select-realm',
                        options: realmMap,
                      }),
                    ],
                  }),
                ],
              });
              return;
            }
            console.log('after Realm ID check');
            const realm = await db.group.findOne({
              where: {
                id: newSelectedId,
                activeRealm: true,
              },
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log(realm);
            if (!realm) {
              await interaction.editReply({
                content: `<@${user.user_id}>`,
                embeds: [
                  realmNotFoundEmbed,
                ],
                components: [
                  new MessageActionRow({
                    components: [
                      new MessageSelectMenu({
                        type: 'SELECT_MENU',
                        customId: 'select-realm',
                        options: realmMap,
                      }),
                    ],
                  }),
                ],
              });
              return;
            }

            console.log('before discord check');
            const server = discordClient.guilds.cache.get(realm.groupId);
            if (!server.members.cache.get(user.user_id)) {
              await interaction.editReply({
                content: `<@${user.user_id}>, ${realm.inviteLink}`,
                embeds: [
                  await needToBeInDiscordRealmEmbed(
                    realm,
                  ),
                ],
                components: [
                  new MessageActionRow({
                    components: [
                      new MessageSelectMenu({
                        type: 'SELECT_MENU',
                        customId: 'select-realm',
                        options: realmMap,
                      }),
                    ],
                  }),
                ],
              });
              return;
            }
            let UserGroup = await db.UserGroup.findOne({
              where: {
                userId: user.id,
                groupId: newSelectedId,
              },
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            if (!UserGroup) {
              UserGroup = await db.UserGroup.create({
                userId: user.id,
                groupId: newSelectedId,
              }, {
                transaction: t,
                lock: t.LOCK.UPDATE,
              });
            }

            console.log('joining realm');
            console.log(newSelectedId);
            await myUser.update({
              currentRealmId: newSelectedId,
              currentClassId: null,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });

            await interaction.editReply({
              content: `<@${user.user_id}>`,
              embeds: [
                await realmChangeSuccessEmbed(realm),
              ],
              components: [],
            });
          }).catch(async (err) => {
            try {
              await db.error.create({
                type: 'help',
                error: `${err}`,
              });
            } catch (e) {
              logger.error(`Error Discord: ${e}`);
            }
          });
        }
      }
    }
  });
};
