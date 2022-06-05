import * as RateLimiterFlexible from "rate-limiter-flexible";
import { discordLimitSpamMessage } from "../messages";

const errorConsumer = new RateLimiterFlexible.default.RateLimiterMemory({
  points: 2,
  duration: 15,
});

const rateLimiterHalving = new RateLimiterFlexible.default.RateLimiterMemory({
  points: 2,
  duration: 30,
});

const rateLimiterMining = new RateLimiterFlexible.default.RateLimiterMemory({
  points: 2,
  duration: 30,
});

const rateLimiterHelp = new RateLimiterFlexible.default.RateLimiterMemory({
  points: 2,
  duration: 30,
});

const rateLimiterLink = new RateLimiterFlexible.default.RateLimiterMemory({
  points: 2,
  duration: 30,
});

const rateLimiterUnlink = new RateLimiterFlexible.default.RateLimiterMemory({
  points: 2,
  duration: 30,
});

const rateLimiterAccount = new RateLimiterFlexible.default.RateLimiterMemory({
  points: 2,
  duration: 30,
});

export const myRateLimiter = async (
  client,
  message,
  title,
) => {
  let userId;
  let discordChannelId;
  try {
    if (message.user) {
      userId = message.user.id;
    } else if (message.author) {
      userId = message.author.id;
    }
    if (message.channelId) {
      discordChannelId = message.channelId;
    }

    if (!userId) return true;
    try {
      if (title.toLowerCase() === 'help') {
        await rateLimiterHelp.consume(userId, 1);
        console.log('return false');
        return false;
      }
      if (title.toLowerCase() === 'account') {
        await rateLimiterAccount.consume(userId, 1);
        return false;
      }
      if (title.toLowerCase() === 'link') {
        await rateLimiterLink.consume(userId, 1);
        return false;
      }
      if (title.toLowerCase() === 'unlink') {
        await rateLimiterUnlink.consume(userId, 1);
        return false;
      }

      throw new Error("no Rate limiter could be reached");
    } catch (err) {
      console.log(err);
      try {
        const notError = await errorConsumer.consume(userId, 1);
        if (notError.remainingPoints > 0) {
          const discordChannel = await client.channels.fetch(discordChannelId).catch((e) => {
            console.log(e);
          });
          if (discordChannel) {
            await discordChannel.send({
              embeds: [
                discordLimitSpamMessage(
                  userId,
                  title,
                ),
              ],
            }).catch((e) => {
              console.log(e);
            });
          }
        }
        return true;
      } catch (e) {
        console.log(e);
        return true;
      }
    }
  } catch (lastErrorCatch) {
    console.log(lastErrorCatch);
    return true;
  }
};
