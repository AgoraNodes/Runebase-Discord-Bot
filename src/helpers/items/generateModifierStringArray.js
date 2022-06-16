export const generateModifierStringArray = (newItem) => {
  console.log(newItem);
  console.log(newItem.itemBase);
  console.log(newItem.itemBase.itemFamily.itemType);
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
    if (
      (key === 'eDefense')
      && newItem[key] !== null
    ) {
      modifierStringArray.push(`+${newItem[key]}% Enhanced Defense`);
    }
    if (
      (key === 'eDamage')
      && newItem[key] !== null
    ) {
      modifierStringArray.push(`+${newItem[key]}% Enhanced Damage`);
    }
  });
  modifierStringArray.sort((a, b) => (b.endsWith('Defense')) - (a.endsWith('Defense')));
  modifierStringArray.sort((a, b) => (b.endsWith('Damage')) - (a.endsWith('Damage')));
  return modifierStringArray;
};
