import { generateSpecificStartItem } from "./utils/generateSpecificStartGear";

export const generateDruidStartGear = async (
  t,
) => {
  const mainHand = await generateSpecificStartItem(
    'Club',
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
