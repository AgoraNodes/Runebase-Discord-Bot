import {
  Transaction,
  Op,
} from "sequelize";
import {
  MessageActionRow,
  MessageButton,
  MessageAttachment,
} from "discord.js";
import {
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas';
import path from 'path';
import {
  rollDiceTooFastMessage,
  rolledDiceMessage,
  discordErrorMessage,
  cannotSendMessageUser,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { gainExp } from "../helpers/client/experience";

export const discordRollDice = async (
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
      'rollDice',
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('roll')
        .setLabel('Roll Dice')
        .setStyle('PRIMARY'),
    );

    const rollDiceRecord = await db.rollDice.findOne({
      where: {
        userId: user.id,
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
      order: [
        ['id', 'DESC'],
      ],
    });

    const dateFuture = rollDiceRecord && rollDiceRecord.createdAt.getTime() + (3 * 60 * 60 * 1000); // (3 * 60 * 60 * 1000)
    const dateNow = new Date().getTime();
    const distance = dateFuture && dateFuture - dateNow;

    if (distance
      && distance > 0
    ) {
      const activityTpre = await db.activity.create({
        type: 'rollDice_t',
        earnerId: user.id,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      const activityT = await db.activity.findOne({
        where: {
          id: activityTpre.id,
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
      activity.push(activityT);
      await message.channel.send({
        embeds: [
          rollDiceTooFastMessage(
            user.user_id,
            distance,
          ),
        ],
        components: [row],
      });
      return;
    }

    const randomNumberOne = Math.floor(Math.random() * 6) + 1;
    const randomNumberTwo = Math.floor(Math.random() * 6) + 1;
    const totalResult = randomNumberOne + randomNumberTwo;
    const firstDiceImage = await loadImage(path.join(__dirname, '../assets/images/dice', `dice-${randomNumberOne}.svg`));
    const secondDiceImage = await loadImage(path.join(__dirname, '../assets/images/dice', `dice-${randomNumberTwo}.svg`));
    const canvas = createCanvas(300 + 300, 680);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(firstDiceImage, 100, 480, 200, 200);
    ctx.drawImage(secondDiceImage, 300, 480, 200, 200);
    // Content text & lines
    ctx.fillStyle = "rgba(16, 12, 131, 0.3)";

    if (totalResult === 2) {
      ctx.fillRect(0, 35, 600, 40);
    }
    if (totalResult === 12) {
      ctx.fillRect(0, 75, 600, 40);
    }
    if (totalResult === 11) {
      ctx.fillRect(0, 115, 600, 40);
    }
    if (totalResult === 10) {
      ctx.fillRect(0, 155, 600, 40);
    }
    if (totalResult === 9) {
      ctx.fillRect(0, 195, 600, 40);
    }
    if (totalResult === 8) {
      ctx.fillRect(0, 235, 600, 40);
    }
    if (totalResult === 7) {
      ctx.fillRect(0, 275, 600, 40);
    }
    if (totalResult === 6) {
      ctx.fillRect(0, 315, 600, 40);
    }
    if (totalResult === 5) {
      ctx.fillRect(0, 355, 600, 40);
    }
    if (totalResult === 4) {
      ctx.fillRect(0, 395, 600, 40);
    }
    if (totalResult === 3) {
      ctx.fillRect(0, 435, 600, 40);
    }

    ctx.font = 'bold 20px "HeartWarming"';
    ctx.fillStyle = "#ccc";
    ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText('Result', 100, 25, 200);
    ctx.fillText('Result', 100, 25, 200);
    ctx.strokeText('RUNES', 300, 25, 200);
    ctx.fillText('RUNES', 300, 25, 200);
    ctx.strokeText('Exp', 500, 25, 200);
    ctx.fillText('Exp', 500, 25, 200);

    // Draw horizontal line
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;

    // 1 + 1
    ctx.beginPath();
    ctx.moveTo(0, (1 * 40) + 35);
    ctx.lineTo(600, (1 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(2, 100, (1 * 40) + 25, 200);
    ctx.fillText(2, 100, (1 * 40) + 25, 200);

    ctx.strokeText(0.5, 300, (1 * 40) + 25, 200);
    ctx.fillText(0.5, 300, (1 * 40) + 25, 200);

    ctx.strokeText(20, 500, (1 * 40) + 25, 200);
    ctx.fillText(20, 500, (1 * 40) + 25, 200);

    // 12
    ctx.beginPath();
    ctx.moveTo(0, (2 * 40) + 35);
    ctx.lineTo(600, (2 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(12, 100, (2 * 40) + 25, 200);
    ctx.fillText(12, 100, (2 * 40) + 25, 200);

    ctx.strokeText(0.24, 300, (2 * 40) + 25, 200);
    ctx.fillText(0.24, 300, (2 * 40) + 25, 200);

    ctx.strokeText(6, 500, (2 * 40) + 25, 200);
    ctx.fillText(6, 500, (2 * 40) + 25, 200);

    // 11
    ctx.beginPath();
    ctx.moveTo(0, (3 * 40) + 35);
    ctx.lineTo(600, (3 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(11, 100, (3 * 40) + 25, 200);
    ctx.fillText(11, 100, (3 * 40) + 25, 200);

    ctx.strokeText(0.22, 300, (3 * 40) + 25, 200);
    ctx.fillText(0.22, 300, (3 * 40) + 25, 200);

    ctx.strokeText(6, 500, (3 * 40) + 25, 200);
    ctx.fillText(6, 500, (3 * 40) + 25, 200);

    // 10
    ctx.beginPath();
    ctx.moveTo(0, (4 * 40) + 35);
    ctx.lineTo(600, (4 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(10, 100, (4 * 40) + 25, 200);
    ctx.fillText(10, 100, (4 * 40) + 25, 200);

    ctx.strokeText(0.2, 300, (4 * 40) + 25, 200);
    ctx.fillText(0.2, 300, (4 * 40) + 25, 200);

    ctx.strokeText(5, 500, (4 * 40) + 25, 200);
    ctx.fillText(5, 500, (4 * 40) + 25, 200);

    // 9
    ctx.beginPath();
    ctx.moveTo(0, (5 * 40) + 35);
    ctx.lineTo(600, (5 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(9, 100, (5 * 40) + 25, 200);
    ctx.fillText(9, 100, (5 * 40) + 25, 200);

    ctx.strokeText(0.18, 300, (5 * 40) + 25, 200);
    ctx.fillText(0.18, 300, (5 * 40) + 25, 200);

    ctx.strokeText(5, 500, (5 * 40) + 25, 200);
    ctx.fillText(5, 500, (5 * 40) + 25, 200);

    // 8
    ctx.beginPath();
    ctx.moveTo(0, (6 * 40) + 35);
    ctx.lineTo(600, (6 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(8, 100, (6 * 40) + 25, 200);
    ctx.fillText(8, 100, (6 * 40) + 25, 200);

    ctx.strokeText(0.16, 300, (6 * 40) + 25, 200);
    ctx.fillText(0.16, 300, (6 * 40) + 25, 200);

    ctx.strokeText(4, 500, (6 * 40) + 25, 200);
    ctx.fillText(4, 500, (6 * 40) + 25, 200);

    // 7
    ctx.beginPath();
    ctx.moveTo(0, (7 * 40) + 35);
    ctx.lineTo(600, (7 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(7, 100, (7 * 40) + 25, 200);
    ctx.fillText(7, 100, (7 * 40) + 25, 200);

    ctx.strokeText(0.14, 300, (7 * 40) + 25, 200);
    ctx.fillText(0.14, 300, (7 * 40) + 25, 200);

    ctx.strokeText(4, 500, (7 * 40) + 25, 200);
    ctx.fillText(4, 500, (7 * 40) + 25, 200);

    // 6
    ctx.beginPath();
    ctx.moveTo(0, (8 * 40) + 35);
    ctx.lineTo(600, (8 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(6, 100, (8 * 40) + 25, 200);
    ctx.fillText(6, 100, (8 * 40) + 25, 200);

    ctx.strokeText(0.12, 300, (8 * 40) + 25, 200);
    ctx.fillText(0.12, 300, (8 * 40) + 25, 200);

    ctx.strokeText(3, 500, (8 * 40) + 25, 200);
    ctx.fillText(3, 500, (8 * 40) + 25, 200);

    // 5
    ctx.beginPath();
    ctx.moveTo(0, (9 * 40) + 35);
    ctx.lineTo(600, (9 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(5, 100, (9 * 40) + 25, 200);
    ctx.fillText(5, 100, (9 * 40) + 25, 200);

    ctx.strokeText(0.1, 300, (9 * 40) + 25, 200);
    ctx.fillText(0.1, 300, (9 * 40) + 25, 200);

    ctx.strokeText(3, 500, (9 * 40) + 25, 200);
    ctx.fillText(3, 500, (9 * 40) + 25, 200);

    // 4
    ctx.beginPath();
    ctx.moveTo(0, (10 * 40) + 35);
    ctx.lineTo(600, (10 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(4, 100, (10 * 40) + 25, 200);
    ctx.fillText(4, 100, (10 * 40) + 25, 200);

    ctx.strokeText(0.08, 300, (10 * 40) + 25, 200);
    ctx.fillText(0.08, 300, (10 * 40) + 25, 200);

    ctx.strokeText(2, 500, (10 * 40) + 25, 200);
    ctx.fillText(2, 500, (10 * 40) + 25, 200);

    // 3
    ctx.beginPath();
    ctx.moveTo(0, (11 * 40) + 35);
    ctx.lineTo(600, (11 * 40) + 35);
    ctx.stroke();

    ctx.strokeText(3, 100, (11 * 40) + 25, 200);
    ctx.fillText(3, 100, (11 * 40) + 25, 200);

    ctx.strokeText(0.06, 300, (11 * 40) + 25, 200);
    ctx.fillText(0.06, 300, (11 * 40) + 25, 200);

    ctx.strokeText(2, 500, (11 * 40) + 25, 200);
    ctx.fillText(2, 500, (11 * 40) + 25, 200);

    // draw horizonal lines
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
    ctx.moveTo(0, 480 - 1.5);
    ctx.lineTo(600, 480 - 1.5);
    ctx.stroke();

    // draw vertical lines
    ctx.beginPath();
    ctx.moveTo(1.5, 0);
    ctx.lineTo(1.5, 480);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 480);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 480);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(598.5, 0);
    ctx.lineTo(598.5, 480);
    ctx.stroke();

    const attachment = new MessageAttachment(canvas.toBuffer(), 'rollDice.png');

    let expRewarded = 0;
    let rewardAmount = 0;
    if (
      randomNumberOne === 1
      && randomNumberTwo === 1
    ) {
      rewardAmount = 50000000;
      expRewarded = 20;
    } else if (
      randomNumberOne >= 1
      && randomNumberTwo >= 1
      && randomNumberOne <= 6
      && randomNumberTwo <= 6
    ) {
      rewardAmount = 2000000 * (randomNumberOne + randomNumberTwo);
      expRewarded = Number((0.5 * (randomNumberOne + randomNumberTwo)).toFixed(0));
    }
    const createNewDiceRecord = await db.rollDice.create({
      userId: user.id,
      diceOne: randomNumberOne,
      diceTwo: randomNumberTwo,
      payout: rewardAmount,
      expRewarded: Number(expRewarded),
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    const updateWallet = await user.wallet.update({
      available: Number(user.wallet.available) + rewardAmount,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    const createActivity = await db.activity.create({
      type: 'rollDice_s',
      earnerId: user.id,
      earner_balance: user.wallet.available + user.wallet.locked,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    const findActivity = await db.activity.findOne({
      where: {
        id: createActivity.id,
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
    activity.unshift(findActivity);
    const newExp = await gainExp(
      discordClient,
      user.user_id,
      expRewarded,
      'rollDice',
      t,
    );

    const discordChannel = await discordClient.channels.cache.get(setting.roleDiceChannelId);
    await discordChannel.send({
      files: [
        attachment,
      ],
      embeds: [
        rolledDiceMessage(
          user.user_id,
          expRewarded,
          randomNumberOne,
          randomNumberTwo,
          rewardAmount,
        ),
      ],
      components: [row],
    });

    t.afterCommit(() => {
      console.log('done rollDice request');
    });
  }).catch(async (err) => {
    try {
      await db.error.create({
        type: 'rollDice',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    // logger.error(`Error Discord Balance Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "RollDice",
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
              "RollDice",
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
            "RollDice",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "RollDice",
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
