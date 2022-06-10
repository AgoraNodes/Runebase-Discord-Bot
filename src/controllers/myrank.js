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
import { MessageAttachment } from "discord.js";
import path from 'path';
import {
  cannotSendMessageUser,
  discordErrorMessage,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";

export const discordMyRank = async (
  discordClient,
  message,
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
      'myrank',
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

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

    const currentRank = await db.rank.findOne({
      where: {
        expNeeded: {
          [Op.lte]: user.exp,
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
          [Op.gt]: user.exp,
        },
      },
      order: [
        ['id', 'ASC'],
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    const nextRankExp = nextRank && nextRank.expNeeded ? nextRank.expNeeded : currentRankExp;
    const currentExp = user.exp;
    await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
    const canvas = createCanvas(1000, 300);
    const ctx = canvas.getContext('2d');
    const expBarWidth = 600;

    // const background = await loadImage(path.join(__dirname, '../assets/images/', 'myrank_background_two.png'));

    let avatar;
    if (message.type && message.type === 'APPLICATION_COMMAND') {
      avatar = await loadImage(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`);
    } else {
      avatar = await loadImage(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`);
    }
    // background
    // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

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
    ctx.strokeText(`${currentRank ? currentRank.id : 0}`, 900, 90, 80);
    ctx.fillText(`${currentRank ? currentRank.id : 0}`, 900, 90, 80);

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

    const attachment = new MessageAttachment(canvas.toBuffer(), 'rank.png');

    console.log('before send');

    if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordUser = await discordClient.users.cache.get(message.user.id);
      if (message.guildId) {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          files: [
            attachment,
          ],
        });
      } else {
        await discordUser.send({
          files: [
            attachment,
          ],
        });
      }
    } else {
      if (message.channel.type === 'DM') {
        await message.author.send({
          files: [
            attachment,
          ],
        });
      }
      if (message.channel.type === 'GUILD_TEXT') {
        await message.channel.send({
          files: [
            attachment,
          ],
        });
      }
    }

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
    try {
      await db.error.create({
        type: 'MyRank',
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
              "MyRank",
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
              "MyRank",
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
            "MyRank",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "MyRank",
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
