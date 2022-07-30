/* eslint-disable import/prefer-default-export */
import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import {
  createCanvas,
  loadImage,
} from 'canvas';
import {
  ActionRowBuilder,
  SelectMenuBuilder,
  InteractionType,
  ChannelType,
} from 'discord.js';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { fetchDiscordChannel } from "../helpers/client/fetchDiscordChannel";
import {
  generateConfirmButton,
  generateCancelButton,
} from '../buttons';
import {
  cancelMyRankEmbed,
} from '../embeds';
import { renderMyRankImage } from "../render/myRank/myRank";

export const discordMyRank = async (
  discordClient,
  message,
  io,
) => {
  const activity = [];
  const [
    user,
    userActivity,
  ] = await userWalletExist(
    message,
    'myrank',
    false,
  );
  if (userActivity) {
    activity.unshift(userActivity);
  }
  if (!user) return;

  const discordChannel = await fetchDiscordChannel(
    discordClient,
    message,
  );

  const realms = await db.group.findAll({
    where: {
      activeRealm: true,
    },
  });

  let realmPickId;

  if (
    message.channel.type === ChannelType.DM
    && user.currentRealmId
  ) {
    realmPickId = user.currentRealmId;
  } else {
    const currentGuildId = discordChannel.guild && discordChannel.guild.id;
    const currentRealm = realms.find((realm) => realm.groupId === currentGuildId);
    if (currentRealm) {
      realmPickId = currentRealm.id;
    } else {
      const setting = await db.setting.findOne();
      const defaultRealm = realms.find((realm) => realm.groupId === setting.discordHomeServerGuildId);
      realmPickId = defaultRealm.id;
    }
  }

  const realmMap = realms.reduce((filtered, realm) => {
    const mapped = {
      placeholder: 'pick a skill',
      label: `${realm.groupName}`,
      value: `realm:${realm.id}`,
      default: realm.id === realmPickId,
    };
    filtered.push(mapped);
    return filtered;
  }, []);

  const embedMessage = await discordChannel.send({
    content: `<@${user.user_id}>, please select the realm you want to see your rank of`,
    files: [
    ],
    components: [
      new ActionRowBuilder({
        components: [
          new SelectMenuBuilder({
            customId: 'select-realm',
            options: realmMap,
          }),
        ],
      }),
      new ActionRowBuilder({
        components: [
          await generateConfirmButton(),
          await generateCancelButton(),
        ],
      }),
    ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    time: 86400000,
  });
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
          realmPickId = Number(interaction.values[0].replace('realm:', ''));
        }
      }
    }

    if (interaction.isButton()) {
      await interaction.deferReply();
      if (interaction.customId === 'confirm') {
        await db.sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        }, async (t) => {
          const totalChatActivity = await db.activeTalker.findOne({
            attributes: [[Sequelize.fn('sum', Sequelize.col('count')), 'count']],
            raw: true,
            where: {
              userId: user.id,
            },
          });
          const monthlyChatActivity = await db.activeTalker.findOne({
            attributes: [[Sequelize.fn('sum', Sequelize.col('count')), 'count']],
            raw: true,
            where: {
              userId: user.id,
              createdAt: {
                [Op.gt]: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)),
              },
            },
          });

          const findGroupToPost = await db.group.findOne({
            where: {
              id: realmPickId,
            },
          });

          const userWithUserGroup = await db.user.findOne({
            include: [
              {
                model: db.UserGroup,
                as: 'UserGroup',
                required: true,
                where: {
                  groupId: findGroupToPost.id,
                },
              },
            ],
            order: [
              ['exp', 'DESC'],
            ],
            limit: 10,
            lock: t.LOCK.UPDATE,
            transaction: t,
          });

          const currentRank = await db.rank.findOne({
            where: {
              expNeeded: {
                [Op.lte]: userWithUserGroup.UserGroup.exp,
              },
              groupId: findGroupToPost.id,
            },
            order: [
              ['id', 'DESC'],
            ],
            transaction: t,
            lock: t.LOCK.UPDATE,
          });

          let currentRankExp;
          if (currentRank) {
            currentRankExp = currentRank.expNeeded;
          } else {
            currentRankExp = 0;
          }
          const nextRank = await db.rank.findOne({
            where: {
              expNeeded: {
                [Op.gt]: user.exp,
              },
              groupId: findGroupToPost.id,
            },
            order: [
              ['id', 'ASC'],
            ],
            transaction: t,
            lock: t.LOCK.UPDATE,
          });

          await interaction.editReply({
            files: [
              {
                attachment: await renderMyRankImage(
                  message,
                  user,
                  userWithUserGroup,
                  currentRank,
                  monthlyChatActivity,
                  totalChatActivity,
                  currentRankExp,
                  nextRank,
                ),
                name: 'myRank.png',
              },
            ],
          });

          const preActivity = await db.activity.create({
            type: 'myrank_s',
            earnerId: user.id,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });

          const finalActivity = await db.activity.findOne({
            where: {
              id: preActivity.id,
            },
            include: [
              {
                model: db.user,
                as: 'earner',
              },
            ],
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
          activity.unshift(finalActivity);
        }).catch(async (err) => {
          console.log(err);
          try {
            await db.error.create({
              type: 'myRank',
              error: `${err}`,
            });
          } catch (e) {
            logger.error(`Error Discord: ${e}`);
          }
        });
        collector.stop();
      }
      if (interaction.customId === 'cancel') {
        await interaction.editReply({
          embeds: [
            cancelMyRankEmbed(user.user_id),
          ],
        });
        collector.stop();
      }
    }
  });

  collector.on('end', async (collected) => {
    await embedMessage.edit({
      content: '\u200b',
      embeds: [],
      components: [],
    }).catch((e) => {
      console.log('failed deleting message');
    });
  });

  if (activity.length > 0) {
    io.to('admin').emit('updateActivity', {
      activity,
    });
  }
};
