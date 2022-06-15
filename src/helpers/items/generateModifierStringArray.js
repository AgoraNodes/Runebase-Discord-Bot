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
      (key === 'ed')
      && newItem[key] !== null
    ) {
      if (
        newItem.itemBase.itemFamily.itemType.name === 'Armors'
        || newItem.itemBase.itemFamily.itemType.name === 'Helms'
        || newItem.itemBase.itemFamily.itemType.name === 'Boots'
        || newItem.itemBase.itemFamily.itemType.name === 'Gloves'
        || newItem.itemBase.itemFamily.itemType.name === 'Shields'
        || newItem.itemBase.itemFamily.itemType.name === 'Belts'
        || newItem.itemBase.itemFamily.itemType.name === 'Barbarian Helms'
        || newItem.itemBase.itemFamily.itemType.name === 'Druid Pelts'
        || newItem.itemBase.itemFamily.itemType.name === 'Paladin Shields'
        || newItem.itemBase.itemFamily.itemType.name === 'Necromancer Shrunken Heads'
      ) {
        modifierStringArray.push(`+${newItem[key]}% Enhanced Defense`);
      } else {
        modifierStringArray.push(`+${newItem[key]}% Enhanced Damage`);
      }
    }
  });
  modifierStringArray.sort((a, b) => (b.endsWith('Defense')) - (a.endsWith('Defense')));
  modifierStringArray.sort((a, b) => (b.endsWith('Damage')) - (a.endsWith('Damage')));
  return modifierStringArray;
};
