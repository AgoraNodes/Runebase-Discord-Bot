import settings from '../../config/settings';
import { getInstance } from '../../services/rclient';

export const fetchBalance = async (
  req,
  res,
  next,
) => {
  const response = await getInstance().getWalletInfo();

  res.locals.name = 'balance';
  res.locals.result = {
    amount: response.balance,
  };

  next();
};
