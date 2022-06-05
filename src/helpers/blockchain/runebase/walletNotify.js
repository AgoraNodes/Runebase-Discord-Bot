/* eslint-disable no-restricted-syntax */
import { Transaction } from "sequelize";
import { getInstance } from '../../../services/rclient';

import db from '../../../models';

import logger from "../../logger";

/**
 * Notify New Transaction From Tokel Node
 */
const walletNotifyTokel = async (
  req,
  res,
  next,
) => {
  res.locals.activity = [];
  const txId = req.body.payload;
  const transaction = await getInstance().getTransaction(txId);
  const rawTransaction = await getInstance().getRawTransaction(txId);

  const userValidationAddress = rawTransaction.vin[0].address;
  const userValidateLinkedAddressTransactionHash = rawTransaction.vin[0].txid;
  const userPubkey = rawTransaction.vin[0].scriptSig.hex.slice(-66);
  console.log(userValidationAddress);
  console.log(userPubkey);
  console.log(rawTransaction);

  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    //
    res.locals.verifyAddress = {};
    const addressToVerify = await db.linkedAddress.findOne({
      where: {
        address: userValidationAddress,
        enabled: true,
        verified: false,
      },
      include: [
        {
          model: db.user,
          as: 'user',
          include: [
            {
              model: db.wallet,
              as: 'wallet',
              include: [
                {
                  model: db.address,
                  as: 'address',
                  required: true,
                  where: {
                    address: transaction.details[0].address,
                  },
                },
              ],
            },
          ],
        },
      ],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (addressToVerify) {
      const addressVerified = await addressToVerify.update({
        verified: true,
        pubKey: userPubkey,
      }, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      const insertLinkedAddressTransactionHash = await db.linkedAddressTransactionHash.create({
        hash: userValidateLinkedAddressTransactionHash,
        linkedAddressId: addressVerified.id,
      }, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      res.locals.verifyAddress = {
        userId: addressToVerify.userId,
        discordId: addressToVerify.user.user_id,
        linkedAddress: addressVerified.address,
      };
    }
    //
    let i = 0;
    res.locals.detail = [];
    if (transaction.details && transaction.details.length > 0) {
      for await (const detail of transaction.details) {
        if (detail.category === 'receive') {
          const address = await db.address.findOne({
            where: {
              address: detail.address,
            },
            include: [
              {
                model: db.wallet,
                as: 'wallet',
                include: [
                  {
                    model: db.user,
                    as: 'user',
                  },
                ],
              },
            ],
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
          console.log(address);
          if (address) {
            res.locals.detail[parseInt(i, 10)] = {};
            res.locals.detail[parseInt(i, 10)].userId = address.wallet.user.id;
            const newTransaction = await db.transaction.findOrCreate({
              where: {
                txid: transaction.txid,
                type: detail.category,
                userId: address.wallet.userId,
                walletId: address.wallet.id,
              },
              defaults: {
                txid: txId,
                addressId: address.id,
                phase: 'confirming',
                type: detail.category,
                amount: detail.amount * 1e8,
                userId: address.wallet.userId,
                walletId: address.wallet.id,
              },
              transaction: t,
              lock: t.LOCK.UPDATE,
            });

            if (newTransaction[1]) {
              res.locals.detail[parseInt(i, 10)].transaction = await db.transaction.findOne({
                where: {
                  id: newTransaction[0].id,
                },
                include: [
                  {
                    model: db.wallet,
                    as: 'wallet',
                  },
                ],
                transaction: t,
                lock: t.LOCK.UPDATE,
              });
              const activity = await db.activity.findOrCreate({
                where: {
                  transactionId: newTransaction[0].id,
                },
                defaults: {
                  earnerId: address.wallet.userId,
                  type: 'depositAccepted',
                  amount: detail.amount * 1e8,
                  transactionId: newTransaction[0].id,
                },
                transaction: t,
                lock: t.LOCK.UPDATE,
              });
              res.locals.activity.unshift(activity[0]);
            }
            i += 1;
          }
        }
      }
    }

    t.afterCommit(() => {
      next();
      console.log('commited');
    });
  });
};

export default walletNotifyTokel;
