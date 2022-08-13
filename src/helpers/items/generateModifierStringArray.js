export const generateModifierStringArray = (newItem) => {
  // console.log(newItem);
  // console.log(newItem.itemBase);
  // console.log(newItem.itemBase.itemFamily.itemType);
  const modifierStringArray = [];
  Object.keys(newItem).forEach((key) => {
    if (
      (key === 'strength'
        || key === 'dexterity'
        || key === 'vitality'
        || key === 'energy')
      && newItem[String(key)] !== null
    ) {
      modifierStringArray.push(`+${newItem[String(key)]} to ${key}`);
    }
    if (
      (key === 'eDefense')
      && newItem[String(key)] !== null
    ) {
      modifierStringArray.push(`+${newItem[String(key)]}% Enhanced Defense`);
    }
    if (
      (key === 'eDamage')
      && newItem[String(key)] !== null
    ) {
      modifierStringArray.push(`+${newItem[String(key)]}% Enhanced Damage`);
    }
  });
  modifierStringArray.sort((a, b) => (b.endsWith('Defense')) - (a.endsWith('Defense')));
  modifierStringArray.sort((a, b) => (b.endsWith('Damage')) - (a.endsWith('Damage')));
  return modifierStringArray;
};
