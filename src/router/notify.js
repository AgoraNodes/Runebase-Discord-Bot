/* eslint-disable no-restricted-syntax */
import walletNotifyRunebase from '../helpers/blockchain/runebase/walletNotify';
import { startRunebaseSync } from "../services/syncRunebase";
import {
  discordIncomingDepositMessage,
} from '../messages';

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
      if (req.body.ticker === 'RUNES') {
        walletNotifyRunebase(req, res, next);
      }
    },
    async (req, res) => {
      console.log('FOUND DEPOSIT 1');
      console.log('FOUND DEPOSIT 1');
      console.log('FOUND DEPOSIT 1');
      console.log('FOUND DEPOSIT 1');
      console.log('FOUND DEPOSIT 1');
      console.log('FOUND DEPOSIT 1');
      console.log('FOUND DEPOSIT 1');
      console.log('FOUND DEPOSIT 1');
      console.log('FOUND DEPOSIT 1');
      console.log('FOUND DEPOSIT 1');

      if (res.locals.error) {
        console.log(res.locals.error);
      } else if (!res.locals.error
        && res.locals.detail
        && res.locals.detail.length > 0
      ) {
        for await (const detail of res.locals.detail) {
          console.log('555555555555555555');
          if (detail.amount) {
            console.log('FOUND DEPOSIT 2');
            console.log('FOUND DEPOSIT 2');
            console.log('FOUND DEPOSIT 2');
            console.log('FOUND DEPOSIT 2');
            console.log('FOUND DEPOSIT 2');
            console.log('FOUND DEPOSIT 2');
            console.log('FOUND DEPOSIT 2');
            console.log('FOUND DEPOSIT 2');
            console.log('FOUND DEPOSIT 2');

            try {
              const myClient = await discordClient.users.fetch(detail.userId, false);
              await myClient.send({
                embeds: [
                  discordIncomingDepositMessage(detail),
                ],
              });
            } catch (e) {
              console.log(e);
            }
          }
        }
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
