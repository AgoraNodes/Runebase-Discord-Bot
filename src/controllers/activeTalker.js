import { Transaction, Op } from "sequelize";
import {
  discordErrorMessage,
  cannotSendMessageUser,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";
import settings from '../config/settings';
import { gainExp } from "../helpers/client/experience";

export const discordActiveTalker = async (
  discordClient,
  message,
  filteredMessage,
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
      'activeTalker',
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

    let activeTalkerRecord = await db.activeTalker.findOne({
      where: {
        userId: user.id,
        createdAt: {
          [Op.gt]: new Date(Date.now() - (24 * 60 * 60 * 1000)),
        },
      },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    if (!activeTalkerRecord) {
      activeTalkerRecord = await db.activeTalker.create({
        userId: user.id,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    }

    let validWordCount = 0;
    if (
      filteredMessage.length > 0
      && filteredMessage[0]
      && filteredMessage[0] !== settings.bot.command
    ) {
      const lastSentenceArray = activeTalkerRecord.lastSentence ? activeTalkerRecord.lastSentence.split(' ') : [''];
      filteredMessage.forEach((word) => {
        if (word.length >= 4) {
          const findWord = lastSentenceArray.includes(word);
          console.log(word);
          console.log(findWord);
          if (!findWord) {
            validWordCount += 1;
          }
        }
      });
    }
    console.log(validWordCount);
    if (validWordCount >= 4) {
      console.log(filteredMessage.join(' '));
      const updatedActiveTalkerRecord = await activeTalkerRecord.update({
        count: activeTalkerRecord.count + 1,
        lastSentence: filteredMessage.join(' '),
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      if (
        updatedActiveTalkerRecord.rewarded === false
        && updatedActiveTalkerRecord.count >= 4
      ) {
        await updatedActiveTalkerRecord.update({
          rewarded: true,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        ///
        const createActivity = await db.activity.create({
          type: 'activeTalker_s',
          earnerId: user.id,
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
          12,
          'activeTalker',
          t,
        );
      }
    }

    t.afterCommit(() => {
      console.log('done activeTalker request');
    });
  }).catch(async (err) => {
    console.log(err);
    try {
      await db.error.create({
        type: 'activeTalker',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    // logger.error(`Error Discord ActiveTalker Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "ActiveTalker",
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
              "ActiveTalker",
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
            "ActiveTalker",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "ActiveTalker",
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
