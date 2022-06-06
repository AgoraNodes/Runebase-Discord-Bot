import { config } from "dotenv";
import { getInstance } from "./rclient";

config();

export const processWithdrawal = async (transaction) => {
  let response;
  let responseStatus;
  const amount = ((transaction.amount - Number(transaction.feeAmount)) / 1e8);

  // Add New Currency here (default fallback is Runebase)
  try {
    response = await getInstance().sendToAddress(transaction.to_from, (amount.toFixed(8)).toString());
  } catch (e) {
    console.log(e);
    responseStatus = e.reponse.status;
  }

  return [
    response,
    responseStatus,
  ];
};
