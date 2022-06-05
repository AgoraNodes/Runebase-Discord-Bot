/* eslint-disable no-restricted-syntax */
import { Transaction } from "sequelize";
import db from '../../../models';

import { getInstance } from "../../../services/rclient";
import { linkedAddressVerified } from "../../../messages";

export async function patchRunebaseDeposits(
  discordClient,
) {
  const transactions = await getInstance().listTransactions(1000);

  for await (const trans of transactions) {
    if (trans.category === 'receive') {
      if (trans.address) {
        const address = await db.address.findOne({
          where: {
            address: trans.address,
          },
          include: [
            {
              model: db.wallet,
              as: 'wallet',
            },
          ],
        });
        let verifyAddress = {};
        if (address) {
          const rawTransaction = await getInstance().getRawTransaction(trans.txid);
          const userValidationAddress = rawTransaction.vin[0].address;
          const userValidateLinkedAddressTransactionHash = rawTransaction.vin[0].txid;
          const userPubkey = rawTransaction.vin[0].scriptSig.hex.slice(-66);

          await db.sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
          }, async (t) => {
            /// /
            const addressToVerify = await db.linkedAddress.findOne({
              where: {
                address: userValidationAddress,
                enabled: true,
                verified: false,
              },
              include: [
                {
                  model: db.linkedAddressTransactionHash,
                  as: 'linkedAddressTransactionHashes',
                },
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
                            address: trans.address,
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
              const linkedAddressHashExists = addressToVerify.linkedAddressTransactionHashes.find((o) => o.hash === userValidateLinkedAddressTransactionHash);
              if (!linkedAddressHashExists) {
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
                verifyAddress = {
                  userId: addressToVerify.userId,
                  discordId: addressToVerify.user.user_id,
                  linkedAddress: addressVerified.address,
                };
              }
            }
            ///
            const newTrans = await db.transaction.findOrCreate({
              where: {
                txid: trans.txid,
                type: trans.category,
                userId: address.wallet.userId,
              },
              defaults: {
                txid: trans.txid,
                addressId: address.id,
                phase: 'confirming',
                type: trans.category,
                amount: trans.amount * 1e8,
                userId: address.wallet.userId,
              },
              transaction: t,
              lock: t.LOCK.UPDATE,
            });

            t.afterCommit(async () => {
              console.log('commited');
              if (
                verifyAddress
                && Object.keys(verifyAddress).length > 0
              ) {
                const myClient = await discordClient.users.fetch(verifyAddress.discordId, false);
                await myClient.send({
                  embeds: [
                    linkedAddressVerified(
                      verifyAddress.discordId,
                      verifyAddress.linkedAddress,
                    ),
                  ],
                }).catch((error) => {
                  console.log(error);
                });
              }
            });
          });
        }
      }
    }
  }
}
