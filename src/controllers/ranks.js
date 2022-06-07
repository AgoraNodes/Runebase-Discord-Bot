/* eslint-disable import/prefer-default-export */
import { Transaction } from "sequelize";
import {
  createCanvas,
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

export const discordRanks = async (
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
      'ranks',
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
    const canvasAddedRanksHeight = (allRanks.length * 40) + 36.5;
    await registerFont(path.join(__dirname, '../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
    const canvas = createCanvas(600, canvasAddedRanksHeight);
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 20px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    // Headers
    ctx.strokeText('Level', 100, 25, 200);
    ctx.fillText('Level', 100, 25, 200);
    ctx.strokeText('Rank', 300, 25, 200);
    ctx.fillText('Rank', 300, 25, 200);
    ctx.strokeText('Exp needed', 500, 25, 200);
    ctx.fillText('Exp needed', 500, 25, 200);

    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;

    allRanks.forEach((element) => {
      ctx.beginPath();
      ctx.moveTo(0, (element.id * 40) + 35);
      ctx.lineTo(600, (element.id * 40) + 35);
      ctx.stroke();

      ctx.strokeText(element.id, 100, (element.id * 40) + 25, 200);
      ctx.fillText(element.id, 100, (element.id * 40) + 25, 200);

      ctx.strokeText(element.name, 300, (element.id * 40) + 25, 200);
      ctx.fillText(element.name, 300, (element.id * 40) + 25, 200);

      ctx.strokeText(element.expNeeded, 500, (element.id * 40) + 25, 200);
      ctx.fillText(element.expNeeded, 500, (element.id * 40) + 25, 200);
    });

    // Draw horizontal line
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(0, 1.5);
    ctx.lineTo(600, 1.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 35);
    ctx.lineTo(600, 35);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvasAddedRanksHeight - 1.5);
    ctx.lineTo(600, canvasAddedRanksHeight - 1.5);
    ctx.stroke();

    // draw vertical lines
    ctx.beginPath();
    ctx.moveTo(1.5, 0);
    ctx.lineTo(1.5, canvasAddedRanksHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, canvasAddedRanksHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, canvasAddedRanksHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(598.5, 0);
    ctx.lineTo(598.5, canvasAddedRanksHeight);
    ctx.stroke();

    const attachment = new MessageAttachment(canvas.toBuffer(), 'ranks.png');

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
      type: 'ranks_s',
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
        type: 'ranks',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    logger.error(`Error Discord Ranks Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "Ranks",
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
              "Ranks",
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
            "Ranks",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "Ranks",
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
