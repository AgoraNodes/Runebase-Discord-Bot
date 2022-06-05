import db from '../../models';
import { getInstance } from '../../services/rclient';

export const validateWithdrawalAddress = async (
  address,
  user,
  t,
) => {
  let failWithdrawalActivity;
  let getAddressInfo;
  let isInvalidAddress = false;
  let isNodeOffline = false;

  try {
    getAddressInfo = await getInstance().validateAddress(address);
    console.log(getAddressInfo);
    if (getAddressInfo && !getAddressInfo.isvalid) {
      isInvalidAddress = true;
    }
    if (getAddressInfo && getAddressInfo.isvalid) {
      isInvalidAddress = false;
    }
  } catch (e) {
    isNodeOffline = true;
  }

  if (!getAddressInfo) {
    isInvalidAddress = true;
  }

  if (isInvalidAddress || isNodeOffline) {
    failWithdrawalActivity = await db.activity.create({
      type: `withdraw_f`,
      spenderId: user.id,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }

  return [
    isInvalidAddress,
    isNodeOffline,
    failWithdrawalActivity,
  ];
};
