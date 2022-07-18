import { generateSpecificStartItem } from "./utils/generateSpecificStartGear";

export const generateWarriorStartGear = async (
  t,
) => {
  const mainHand = await generateSpecificStartItem(
    'Short Sword',
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
