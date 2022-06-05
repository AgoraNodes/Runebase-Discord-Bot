/* eslint-disable no-restricted-syntax */
import walletNotifyRunebase from '../helpers/blockchain/runebase/walletNotify';
import { startRunebaseSync } from "../services/syncRunebase";
import { linkedAddressVerified } from '../messages';

// import { incomingDepositMessageHandler } from '../helpers/messageHandlers';

const localhostOnly = (
  req,
  res,
  next,
) => {
  const hostmachine = req.headers.host.split(':')[0];
  if (
    hostmachine !== 'localhost'
    && hostmachine !== '127.0.0.1'
  ) {
    return res.sendStatus(401);
  }
  next();
};

export const notifyRouter = (
  app,
  discordClient,
  io,
  queue,
) => {
  app.post(
    '/api/rpc/blocknotify',
    localhostOnly,
    (req, res) => {
      startRunebaseSync(
        discordClient,
        io,
        queue,
      );
      res.sendStatus(200);
    },
  );

  app.post(
    '/api/rpc/walletnotify',
    localhostOnly,
    async (req, res, next) => {
      if (req.body.ticker === 'TKL') {
        walletNotifyRunebase(req, res, next);
      }
    },
    async (req, res) => {
      if (res.locals.error) {
        console.log(res.locals.error);
      } else if (!res.locals.error
        && res.locals.detail
        && res.locals.detail.length > 0
      ) {
        for await (const detail of res.locals.detail) {
          if (detail.amount) {
            // await incomingDepositMessageHandler(
            //   discordClient,
            //   detail,
            // );
          }
        }
      }
      if (
        res.locals.verifyAddress
        && Object.keys(res.locals.verifyAddress).length > 0
      ) {
        const myClient = await discordClient.users.fetch(res.locals.verifyAddress.discordId, false);
        await myClient.send({
          embeds: [
            linkedAddressVerified(
              res.locals.verifyAddress.discordId,
              res.locals.verifyAddress.linkedAddress,
            ),
          ],
        });
      }
      if (res.locals.activity) {
        try {
          io.to('admin').emit('updateActivity', {
            activity: res.locals.activity,
          });
        } catch (e) {
          console.log(e);
        }
      }
      res.sendStatus(200);
    },
  );
};
