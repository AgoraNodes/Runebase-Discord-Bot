import {
  Transaction,
} from "sequelize";
import {
  ActionRowBuilder,
} from "discord.js";
import {
  rollDiceTooFastMessage,
  rolledDiceMessage,
  discordErrorMessage,
  cannotSendMessageUser,
} from '../embeds';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import { gainExp } from "../helpers/client/experience";
import { fetchDiscordChannel } from "../helpers/client/fetchDiscordChannel";
import { generateRollDiceButton } from '../buttons';
import { renderDiceResultsImage } from "../render/dice/diceResults";

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
      'rollDice',
      t,
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

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
        components: [
          new ActionRowBuilder({
            components: [
              await generateRollDiceButton(),
            ],
          }),
        ],
      });
      return;
    }

    const randomNumberOne = Math.floor(Math.random() * 6) + 1;
    const randomNumberTwo = Math.floor(Math.random() * 6) + 1;
    const totalResult = randomNumberOne + randomNumberTwo;

    const finalImage = await renderDiceResultsImage(
      randomNumberOne,
      randomNumberTwo,
      totalResult,
    );

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
        {
          attachment: finalImage,
          name: 'rollDice.png',
        },
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
      components: [
        new ActionRowBuilder({
          components: [
            await generateRollDiceButton(),
          ],
        }),
      ],
    });

    t.afterCommit(() => {
      console.log('done rollDice request');
    });
  }).catch(async (err) => {
    console.log(err);
    try {
      await db.error.create({
        type: 'rollDice',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    const discordChannel = await fetchDiscordChannel(
      discordClient,
      message,
    );
    if (err.code && err.code === 50007) {
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
      await discordChannel.send({
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
