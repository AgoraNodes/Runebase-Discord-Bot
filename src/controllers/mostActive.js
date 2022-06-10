/* eslint-disable import/prefer-default-export */
import { Transaction, Sequelize, Op } from "sequelize";
import {
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas';
import { MessageAttachment } from "discord.js";
import path from 'path';
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";

export const discordMostActive = async (
  discordClient,
  message,
  setting,
  io,
) => {
  const activity = [];
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const [
      user,
      userActivity,
    ] = await userWalletExist(
      message,
      t,
      'mostActive',
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

    const allRanks = await db.rank.findAll(
      {
        lock: t.LOCK.UPDATE,
        transaction: t,
      },
    );

    const olderThenDate = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));
    const topUsers = await db.user.findAll({
      order: [[Sequelize.literal('(SELECT SUM(count) FROM activeTalker where activeTalker.userId = user.id AND activeTalker.createdAt > date_sub(now(), interval 1 month))'), 'DESC']],
      limit: 10,
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    const promises = topUsers.map(async (topUser, index) => {
      let discordUser;
      console.log(index);
      console.log(topUser.activeTalkers);

      discordUser = await discordClient.users.cache.get(topUser.user_id);
      if (!discordUser) {
        discordUser = await discordClient.users.fetch(topUser.user_id);
      }

      const totalChatActivity = await db.activeTalker.findOne({
        attributes: [
          [Sequelize.fn('sum', Sequelize.col('count')), 'count'],
        ],
        raw: true,
        where: {
          userId: topUser.id,
        },
      });
      const monthlyChatActivity = await db.activeTalker.findOne({
        attributes: [[Sequelize.fn('sum', Sequelize.col('count')), 'count']],
        raw: true,
        where: {
          userId: topUser.id,
          createdAt: {
            [Op.gt]: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)),
          },
        },
      });

      const loadedAvatar = await loadImage(`https://cdn.discordapp.com/avatars/${topUser.user_id}/${discordUser.avatar}.png?size=256`);
      const canvas = createCanvas(256, 256);
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(128, 128, 128, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(loadedAvatar, 0, 0, 256, 256);
      const clippedAvatar = canvas.toBuffer();

      // get rank info

      const currentRank = await db.rank.findOne({
        where: {
          expNeeded: {
            [Op.lte]: topUser.exp,
          },
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
            [Op.gt]: topUser.exp,
          },
        },
        order: [
          ['id', 'ASC'],
        ],
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      const nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : currentRankExp;
      const currentExp = topUser.exp;

      return {
        position: index + 1,
        username: topUser.username,
        monthlyChatActivity: monthlyChatActivity && monthlyChatActivity.count ? monthlyChatActivity.count : 0,
        totalChatActivity: totalChatActivity && totalChatActivity.count ? totalChatActivity.count : 0,
        // userId: user.user_id,
        exp: topUser.exp,
        invitedUsers: topUser.totalInvitedUsersCount,
        avatar: await loadImage(clippedAvatar),
        //
        currentRankExp,
        currentExp,
        nextRankExp,
        currentRankName: currentRank ? currentRank.name : 'Unranked',
        currentRankId: currentRank ? currentRank.id : 0,
      };
    });

    const newTopUsers = await Promise.all(promises);

    console.log(newTopUsers);

    const canvasAddedRanksHeight = (newTopUsers.length * 300) + 36.5;
    await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });

    const canvas = createCanvas(1040, canvasAddedRanksHeight);
    const ctx = canvas.getContext('2d');
    const expBarWidth = 600;
    ctx.font = 'bold 20px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    // Headers
    ctx.strokeText('#', 20, 25, 40);
    ctx.fillText('#', 20, 25, 40);
    ctx.strokeText('User', 520, 25, 1000);
    ctx.fillText('User', 520, 25, 1000);

    newTopUsers.forEach(async (element) => {
      /// Position Text
      ctx.font = 'bold 20px "HeartWarming"';
      ctx.fillStyle = "#ccc";
      ctx.textAlign = "center";
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.strokeText(element.position, 20, ((element.position * 300) - 100), 40);
      ctx.fillText(element.position, 20, ((element.position * 300) - 100), 40);

      /// Horizontal lines
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, (element.position * 300) + 35);
      ctx.lineTo(1040, (element.position * 300) + 35);
      ctx.stroke();

      // Circle for avatar
      const addedCirclePositionVertical = element.position > 1 ? (element.position * 300) - 300 : 0;
      ctx.beginPath();
      ctx.arc(
        120 + 40,
        120 + 36.5 + addedCirclePositionVertical,
        110,
        0,
        2 * Math.PI,
      );
      ctx.lineWidth = 2;
      ctx.fillStyle = "#3F3F3F";
      ctx.strokeStyle = "#164179";
      ctx.fill();
      ctx.closePath();

      // XP Bar
      ctx.lineJoin = 'round';
      ctx.lineWidth = 69;
      ctx.strokeStyle = "#164179";

      // shadow of XP BAR
      ctx.strokeRect(
        323 + 40,
        239 + 36.5 + addedCirclePositionVertical,
        expBarWidth,
        2,
      );

      // empty XP BAR
      ctx.strokeStyle = 'black';
      ctx.strokeRect(
        325 + 40,
        240 + 36.5 + addedCirclePositionVertical,
        expBarWidth,
        0,
      );

      // filled XP BAR
      const reqExp = element.nextRankExp - element.currentRankExp;
      const calculatedCurrentExp = element.currentExp - element.currentRankExp;
      let percentage = (calculatedCurrentExp / reqExp) * 100;
      if (percentage === Infinity) {
        percentage = (element.currentExp / element.nextRankExp) * 100;
      }

      ctx.strokeStyle = '#348128';
      ctx.strokeRect(
        323 + 40,
        240 + 36.5 + addedCirclePositionVertical,
        percentage < 100 ? expBarWidth * (calculatedCurrentExp / reqExp) : expBarWidth,
        0,
      );

      /// Username
      ctx.font = 'bold 40px "HeartWarming"';
      ctx.fillStyle = "#fe5701";
      ctx.textAlign = "center";
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
      ctx.strokeText(
        element.username,
        120 + 40,
        275 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        element.username,
        120 + 40,
        275 + 36.5 + addedCirclePositionVertical,
        200,
      );

      ctx.strokeText(
        element.currentRankName,
        722 + 40,
        90 + 36.5 + addedCirclePositionVertical,
        100,
      );
      ctx.fillText(
        element.currentRankName,
        722 + 40,
        90 + 36.5 + addedCirclePositionVertical,
        100,
      );
      ctx.strokeText(
        element.currentRankId,
        900 + 40,
        90 + 36.5 + addedCirclePositionVertical,
        80,
      );
      ctx.fillText(
        element.currentRankId,
        900 + 40,
        90 + 36.5 + addedCirclePositionVertical,
        80,
      );

      ctx.fillStyle = 'white';
      ctx.font = 'bold 25px "HeartWarming"';
      ctx.strokeText(
        "Chat Activity Score",
        450 + 40,
        40 + 36.5 + addedCirclePositionVertical,
        300,
      );
      ctx.fillText(
        "Chat Activity Score",
        450 + 40,
        40 + 36.5 + addedCirclePositionVertical,
        300,
      );
      ctx.strokeText(
        "Rank",
        720 + 40,
        50 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        "Rank",
        720 + 40,
        50 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.strokeText(
        "Level",
        900 + 40,
        50 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        "Level",
        900 + 40,
        50 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.strokeText(
        "Current exp",
        635 + 40,
        160 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        "Current exp",
        635 + 40,
        160 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.strokeText(
        "prev",
        345 + 40,
        160 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        "prev",
        345 + 40,
        160 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.strokeText(
        "next",
        905 + 40,
        160 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        "next",
        905 + 40,
        160 + 36.5 + addedCirclePositionVertical,
        200,
      );

      ctx.font = 'bold 25px "HeartWarming"';
      ctx.fillStyle = "#fe5701";
      ctx.strokeText(
        element.currentRankExp,
        345 + 40,
        190 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        element.currentRankExp,
        345 + 40,
        190 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.strokeText(
        element.nextRankExp,
        905 + 40,
        190 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        element.nextRankExp,
        905 + 40,
        190 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.strokeText(
        element.currentExp,
        635 + 40,
        190 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        element.currentExp,
        635 + 40,
        190 + 36.5 + addedCirclePositionVertical,
        200,
      );

      // chat scores
      ctx.strokeText(
        element.monthlyChatActivity,
        350 + 40,
        100 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        element.monthlyChatActivity,
        350 + 40,
        100 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.strokeText(
        element.totalChatActivity,
        550 + 40,
        100 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        element.totalChatActivity,
        550 + 40,
        100 + 36.5 + addedCirclePositionVertical,
        200,
      );

      ctx.fillStyle = 'white';
      ctx.strokeText(
        '30 day',
        350 + 40,
        70 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        '30 day',
        350 + 40,
        70 + 36.5 + addedCirclePositionVertical,
        200,
      );

      ctx.strokeText(
        'Total',
        550 + 40,
        70 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        'Total',
        550 + 40,
        70 + 36.5 + addedCirclePositionVertical,
        200,
      );

      ctx.font = 'bold 50px "HeartWarming"';
      ctx.fillStyle = "#fe5701";
      ctx.strokeText(
        `${percentage.toFixed(0)}%`,
        640 + 40,
        260 + 36.5 + addedCirclePositionVertical,
        200,
      );
      ctx.fillText(
        `${percentage.toFixed(0)}%`,
        640 + 40,
        260 + 36.5 + addedCirclePositionVertical,
        200,
      );

      // Add avatar
      ctx.drawImage(
        element.avatar,
        10 + 40,
        10 + 36.5 + addedCirclePositionVertical,
        220,
        220,
      );
    });

    // Draw horizontal line
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(0, 1.5);
    ctx.lineTo(1040, 1.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 35);
    ctx.lineTo(1040, 35);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvasAddedRanksHeight - 1.5);
    ctx.lineTo(1040, canvasAddedRanksHeight - 1.5);
    ctx.stroke();

    // draw vertical lines
    ctx.beginPath();
    ctx.moveTo(1.5, 0);
    ctx.lineTo(1.5, canvasAddedRanksHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(40, canvasAddedRanksHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1038.5, 0);
    ctx.lineTo(1038.5, canvasAddedRanksHeight);
    ctx.stroke();

    const attachment = new MessageAttachment(canvas.toBuffer(), 'mostActive.png');

    if (message.type && message.type === 'APPLICATION_COMMAND') {
      if (message.guildId) {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          files: [
            attachment,
          ],
        });
      }
    } else {
      await message.channel.send({
        files: [
          attachment,
        ],
      });
    }

    const preActivity = await db.activity.create({
      type: 'mostActive_s',
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
        type: 'MostActive',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "MostActive",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      } else {
        await message.channel.send({
          embeds: [
            cannotSendMessageUser(
              "MostActive",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      }
    } else if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordChannel = await discordClient.channels.cache.get(message.channelId);
      await discordChannel.send({
        embeds: [
          discordErrorMessage(
            "MostActive",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "MostActive",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    }
  });

  if (activity.length > 0) {
    io.to('admin').emit('updateActivity', {
      activity,
    });
  }
};
