import { generateSpecificStartItem } from "./utils/generateSpecificStartGear";

export const generateWizardStartGear = async (
  t,
) => {
  const mainHand = await generateSpecificStartItem(
    'Short Staff',
    t,
  );
  const offHand = null;
  return [
    mainHand,
    offHand,
  ];
};
