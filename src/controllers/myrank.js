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

  let realmPickId = user.currentRealmId;

  if (
    discordChannel.type === ChannelType.DM
    && user.currentRealmId
  ) {
    realmPickId = user.currentRealmId;
  } else {
    const currentRealm = realms.find((realm) => realm.groupId === discordChannel.guild.id);
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

          const nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : currentRankExp;
          const currentExp = userWithUserGroup.UserGroup.exp;

          const canvas = createCanvas(1000, 300);
          const ctx = canvas.getContext('2d');
          const expBarWidth = 600;

          let avatar;
          if (
            message.type
            && message.type === InteractionType.ApplicationCommand
          ) {
            avatar = await loadImage(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`);
          } else {
            avatar = await loadImage(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`);
          }

          // circle for avatar
          ctx.beginPath();
          ctx.arc(120, 120, 110, 0, 2 * Math.PI);
          ctx.lineWidth = 2;
          ctx.fillStyle = "#3F3F3F";

          ctx.strokeStyle = "#164179";
          ctx.fill();
          ctx.closePath();

          // XP Bar
          ctx.lineJoin = 'round';
          ctx.lineWidth = 69;
          ctx.strokeStyle = "#164179";

          // shadow of xp bar
          ctx.strokeRect(323, 239, expBarWidth, 2);

          // empty bar
          ctx.strokeStyle = 'black';
          ctx.strokeRect(325, 240, expBarWidth, 0);

          // filled bar
          const reqExp = nextRankExp - currentRankExp;
          const calculatedCurrentExp = currentExp - currentRankExp;
          let percentage = (calculatedCurrentExp / reqExp) * 100;
          if (percentage === Infinity) {
            percentage = (currentExp / nextRankExp) * 100;
          }

          ctx.strokeStyle = '#348128';
          ctx.strokeRect(
            323,
            240,
            percentage < 100 ? expBarWidth * (calculatedCurrentExp / reqExp) : expBarWidth,
            0,
          );

          // Adding text
          ctx.font = 'bold 40px "HeartWarming"';
          ctx.fillStyle = "#fe5701";
          ctx.textAlign = "center";
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 4;
          ctx.strokeText(user.username, 120, 275, 200);
          ctx.fillText(user.username, 120, 275, 200);

          ctx.strokeText(currentRank ? currentRank.name : 'Unranked', 722, 90, 100);
          ctx.fillText(currentRank ? currentRank.name : 'Unranked', 722, 90, 100);
          ctx.strokeText(`${currentRank ? currentRank.level : 0}`, 900, 90, 80);
          ctx.fillText(`${currentRank ? currentRank.level : 0}`, 900, 90, 80);

          ctx.fillStyle = 'white';
          ctx.font = 'bold 25px "HeartWarming"';
          ctx.strokeText("Chat Activity Score", 450, 40, 300);
          ctx.fillText("Chat Activity Score", 450, 40, 300);
          ctx.strokeText("Rank", 720, 50, 200);
          ctx.fillText("Rank", 720, 50, 200);
          ctx.strokeText("Level", 900, 50, 200);
          ctx.fillText("Level", 900, 50, 200);
          ctx.strokeText("Current exp", 635, 160, 200);
          ctx.fillText("Current exp", 635, 160, 200);
          ctx.strokeText("prev", 345, 160, 200);
          ctx.fillText("prev", 345, 160, 200);
          ctx.strokeText("next", 905, 160, 200);
          ctx.fillText("next", 905, 160, 200);

          ctx.font = 'bold 25px "HeartWarming"';
          ctx.fillStyle = "#fe5701";
          ctx.strokeText(currentRankExp, 345, 190, 200);
          ctx.fillText(currentRankExp, 345, 190, 200);
          ctx.strokeText(nextRankExp, 905, 190, 200);
          ctx.fillText(nextRankExp, 905, 190, 200);
          ctx.strokeText(currentExp, 635, 190, 200);
          ctx.fillText(currentExp, 635, 190, 200);

          // chat scores
          ctx.strokeText(
            monthlyChatActivity ? monthlyChatActivity.count : 0,
            350,
            100,
            200,
          );
          ctx.fillText(
            monthlyChatActivity ? monthlyChatActivity.count : 0,
            350,
            100,
            200,
          );
          ctx.strokeText(
            totalChatActivity ? totalChatActivity.count : 0,
            550,
            100,
            200,
          );
          ctx.fillText(
            totalChatActivity ? totalChatActivity.count : 0,
            550,
            100,
            200,
          );

          ctx.fillStyle = 'white';
          ctx.strokeText('30 day', 350, 70, 200);
          ctx.fillText('30 day', 350, 70, 200);

          ctx.strokeText('Total', 550, 70, 200);
          ctx.fillText('Total', 550, 70, 200);

          ctx.font = 'bold 50px "HeartWarming"';
          ctx.fillStyle = "#fe5701";
          ctx.strokeText(`${percentage.toFixed(0)}%`, 640, 260, 200);
          ctx.fillText(`${percentage.toFixed(0)}%`, 640, 260, 200);
          // remove corners
          ctx.beginPath();
          ctx.arc(120, 120, 110, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.clip();

          // Add the avatar
          ctx.drawImage(avatar, 10, 10, 220, 220);

          const finalImage = await canvas.toBuffer();

          await interaction.editReply({
            files: [
              {
                attachment: finalImage,
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
