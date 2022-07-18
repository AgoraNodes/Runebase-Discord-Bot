import { generateSpecificStartItem } from "./utils/generateSpecificStartGear";

export const generateAssassinStartGear = async (
  t,
) => {
  const mainHand = await generateSpecificStartItem(
    'Katar',
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
