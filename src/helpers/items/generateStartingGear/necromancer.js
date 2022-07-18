import { generateSpecificStartItem } from "./utils/generateSpecificStartGear";

export const generateNecromancerStartGear = async (
  t,
) => {
  const mainHand = await generateSpecificStartItem(
    'Wand',
    t,
  );
  const offHand = null;
  return [
    mainHand,
    offHand,
  ];
};
