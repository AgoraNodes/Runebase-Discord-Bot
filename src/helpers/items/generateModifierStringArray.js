export const generateModifierStringArray = (newItem) => {
  console.log(newItem);
  const modifierStringArray = [];
  Object.keys(newItem).forEach((key) => {
    if (
      (key === 'strength'
        || key === 'dexterity'
        || key === 'vitality'
        || key === 'energy')
      && newItem[key] !== null
    ) {
      modifierStringArray.push(`+${newItem[key]} to ${key}`);
    }
  });
  return modifierStringArray;
};
