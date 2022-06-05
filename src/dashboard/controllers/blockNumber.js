import db from '../../models';
import settings from '../../config/settings';
import { getInstance } from '../../services/rclient';

export const fetchBlockNumber = async (
  req,
  res,
  next,
) => {
  let response;

  response = await getInstance().getBlockCount();

  const dbBlockNumber = await db.block.findOne({
    order: [['id', 'DESC']],
  });

  res.locals.name = 'blockNumber';
  res.locals.result = {
    blockNumberNode: response,
    blockNumberDb: dbBlockNumber.id,
  };
  next();
};
