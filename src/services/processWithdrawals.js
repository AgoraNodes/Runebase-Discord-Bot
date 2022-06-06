import { Transaction } from "sequelize";
import { config } from "dotenv";
import db from '../models';
import {
  discordWithdrawalAcceptedMessage,
  // discordUserWithdrawalRejectMessage,
} from "../messages";
import { processWithdrawal } from "./processWithdrawal";

config();

export const processWithdrawals = async (
  discordClient,
) => {
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    let updatedTrans;
    const transaction = await db.transaction.findOne({
      where: {
        phase: 'review',
      },
      include: [
        {
          model: db.address,
          as: 'address',
          include: [
            {
              model: db.wallet,
              as: 'wallet',
              include: [{
                model: db.user,
                as: 'user',
              }],
            },
          ],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!transaction) {
      console.log('No withdrawal to process');
      return;
    }
    if (transaction) {
      const [
        response,
        responseStatus,
      ] = await processWithdrawal(transaction);

      if (responseStatus && responseStatus === 500) {
        updatedTrans = await transaction.update(
          {
            // txid: response,
            phase: 'failed',
            type: 'send',
          },
          {
            transaction: t,
            lock: t.LOCK.UPDATE,
          },
        );
        const activityF = await db.activity.create(
          {
            spenderId: transaction.address.wallet.userId,
            type: 'withdraw_f',
            transactionId: transaction.id,
          },
          {
            transaction: t,
            lock: t.LOCK.UPDATE,
          },
        );
        return;
      }

      if (response) {
        updatedTrans = await transaction.update(
          {
            txid: response,
            phase: 'confirming',
            type: 'send',
          },
          {
            transaction: t,
            lock: t.LOCK.UPDATE,
          },
        );
        const activity = await db.activity.create(
          {
            spenderId: transaction.address.wallet.userId,
            type: 'withdrawAccepted',
            transactionId: transaction.id,
          },
          {
            transaction: t,
            lock: t.LOCK.UPDATE,
          },
        );
      }
    }

    t.afterCommit(async () => {
      try {
        if (transaction) {
          console.log('after process withdrawal');
          console.log(transaction.address.wallet.user.user_id);
          const myClient = await discordClient.users.fetch(transaction.address.wallet.user.user_id, false);
          await myClient.send({ embeds: [discordWithdrawalAcceptedMessage(updatedTrans)] });
        }
      } catch (e) {
        console.log(e);
      }
    });
  }).catch(async (err) => {
    console.log(err);
    try {
      await db.error.create({
        type: 'processWithdrawals',
        error: `${err}`,
      });
    } catch (error) {
      console.log(error);
    }
  });
};
