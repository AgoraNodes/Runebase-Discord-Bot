import { generateSpecificStartItem } from "./utils/generateSpecificStartGear";

export const generateAmazonStartGear = async (
  t,
) => {
  const mainHand = await generateSpecificStartItem(
    'Javelin',
    t,
  );
  const offHand = await generateSpecificStartItem(
    'Buckler',
    t,
  );
  return [
    mainHand,
    offHand,
  ];
};
