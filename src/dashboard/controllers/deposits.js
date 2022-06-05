// import { parseDomain } from "parse-domain";
import { Op } from 'sequelize';
import db from '../../models';
import { patchRunebaseDeposits } from "../../helpers/blockchain/runebase/patcher";
import settings from '../../config/settings';

export const patchDeposits = async (
  req,
  res,
  next,
) => {
  await patchRunebaseDeposits();
  res.locals.result = 'true';
  next();
};

export const fetchDeposits = async (
  req,
  res,
  next,
) => {
  const transactionOptions = {
    type: 'receive',
  };
  const userOptions = {};

  if (req.body.id !== '') {
    transactionOptions.id = { [Op.like]: `%${Number(req.body.id)}%` };
  }
  if (req.body.txId !== '') {
    transactionOptions.txid = { [Op.like]: `%${req.body.txId}%` };
  }
  if (req.body.from !== '') {
    transactionOptions.to_from = { [Op.like]: `%${req.body.from}%` };
  }
  if (req.body.userId !== '') {
    userOptions.user_id = { [Op.like]: `%${req.body.userId}%` };
  }
  if (req.body.username !== '') {
    userOptions.username = { [Op.like]: `%${req.body.username}%` };
  }

  const options = {
    where: transactionOptions,
    limit: req.body.limit,
    offset: req.body.offset,
    order: [
      ['id', 'DESC'],
    ],
    include: [
      {
        model: db.user,
        as: 'user',
        where: userOptions,
      },
      {
        model: db.address,
        as: 'address',
        include: [
          {
            model: db.wallet,
            as: 'wallet',
          },
        ],
      },
    ],
  };

  res.locals.name = 'deposit';
  res.locals.count = await db.transaction.count(options);
  res.locals.result = await db.transaction.findAll(options);
  next();
};
