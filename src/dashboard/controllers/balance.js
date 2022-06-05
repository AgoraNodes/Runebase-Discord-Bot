import settings from '../../config/settings';
import { getInstance } from '../../services/rclient';

export const fetchBalance = async (
  req,
  res,
  next,
) => {
  let response;
  res.locals.name = 'balance';

  response = await getInstance().getWalletInfo();
  res.locals.result = {
    amount: response.balance,
  };

  next();
};
