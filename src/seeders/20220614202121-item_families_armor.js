module.exports = {
  up: async (queryInterface, Sequelize) => {
    const itemTypeHelms = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Helms',
      },
    }, ['id']);
    const itemTypeArmors = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Armors',
      },
    }, ['id']);
    const itemTypeShields = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Shields',
      },
    }, ['id']);
    const itemTypeGloves = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Gloves',
      },
    }, ['id']);
    const itemTypeBoots = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Boots',
      },
    }, ['id']);
    const itemTypeBelts = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Belts',
      },
    }, ['id']);
    const itemTypeAxes = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Axes',
      },
    }, ['id']);
    const itemTypeBows = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Bows',
      },
    }, ['id']);
    const itemTypeCrossbows = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Crossbows',
      },
    }, ['id']);
    const itemTypeDaggers = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Daggers',
      },
    }, ['id']);
    const itemTypeJavelins = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Javelins',
      },
    }, ['id']);
    const itemTypeMaces = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Maces',
      },
    }, ['id']);
    const itemTypePolearms = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Polearms',
      },
    }, ['id']);
    const itemTypeScepters = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Scepters',
      },
    }, ['id']);

    const itemTypeSpears = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Spears',
      },
    }, ['id']);
    const itemTypeStaves = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Staves',
      },
    }, ['id']);
    const itemTypeSwords = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Swords',
      },
    }, ['id']);
    const itemTypeThrowing = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Throwing',
      },
    }, ['id']);
    const itemTypeWands = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Wands',
      },
    }, ['id']);

    queryInterface.bulkInsert('itemFamily', [
      // Helms
      {
        name: 'Cap',
        itemTypeId: itemTypeHelms,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Skull Cap',
        itemTypeId: itemTypeHelms,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Helm',
        itemTypeId: itemTypeHelms,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Full Helm',
        itemTypeId: itemTypeHelms,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Great Helm',
        itemTypeId: itemTypeHelms,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mask',
        itemTypeId: itemTypeHelms,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crown',
        itemTypeId: itemTypeHelms,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Helm',
        itemTypeId: itemTypeHelms,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Armors
      {
        name: 'Quilted Armor',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Leather Armor',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hard Leather Armor',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Studded Leather',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ring Mail',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scale Mail',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Breast Plate',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chain Mail',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Splint Mail',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Light Plate',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Field Plate',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Plate Mail',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gothic Plate',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Full Plate Mail',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ancient Armor',
        itemTypeId: itemTypeArmors,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Shields
      {
        name: 'Buckler',
        itemTypeId: itemTypeShields,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Small Shield',
        itemTypeId: itemTypeShields,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Large Shield',
        itemTypeId: itemTypeShields,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kite Shield',
        itemTypeId: itemTypeShields,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Spiked Shield',
        itemTypeId: itemTypeShields,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tower Shield',
        itemTypeId: itemTypeShields,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Shield',
        itemTypeId: itemTypeShields,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gothic Shield',
        itemTypeId: itemTypeShields,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Gloves
      {
        name: 'Leather Gloves',
        itemTypeId: itemTypeGloves,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heavy Gloves',
        itemTypeId: itemTypeGloves,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chain Gloves',
        itemTypeId: itemTypeGloves,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Light Gauntlets',
        itemTypeId: itemTypeGloves,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gauntlets',
        itemTypeId: itemTypeGloves,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Boots
      {
        name: 'Boots',
        itemTypeId: itemTypeBoots,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heavy Boots',
        itemTypeId: itemTypeBoots,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chain Boots',
        itemTypeId: itemTypeBoots,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Light Plated Boots',
        itemTypeId: itemTypeBoots,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Greaves',
        itemTypeId: itemTypeBoots,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Belts
      {
        name: 'Sash',
        itemTypeId: itemTypeBelts,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Light Belt',
        itemTypeId: itemTypeBelts,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Belt',
        itemTypeId: itemTypeBelts,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heavy Belt',
        itemTypeId: itemTypeBelts,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Plated Belt',
        itemTypeId: itemTypeBelts,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Axes
      {
        name: 'Hand Axe',
        itemTypeId: itemTypeAxes,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Axe',
        itemTypeId: itemTypeAxes,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Double Axe',
        itemTypeId: itemTypeAxes,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Military Pick',
        itemTypeId: itemTypeAxes,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Axe',
        itemTypeId: itemTypeAxes,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 2h axes
      {
        name: 'Large Axe',
        itemTypeId: itemTypeAxes,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Broad Axe',
        itemTypeId: itemTypeAxes,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Battle Axe',
        itemTypeId: itemTypeAxes,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Great Axe',
        itemTypeId: itemTypeAxes,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Giant Axe',
        itemTypeId: itemTypeAxes,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bows
      {
        name: 'Short Bow',
        itemTypeId: itemTypeBows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hunter's Bow",
        itemTypeId: itemTypeBows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Long Bow',
        itemTypeId: itemTypeBows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Composite Bow',
        itemTypeId: itemTypeBows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Short Battle Bow',
        itemTypeId: itemTypeBows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Long Battle Bow',
        itemTypeId: itemTypeBows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Short War Bow',
        itemTypeId: itemTypeBows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Long War Bow',
        itemTypeId: itemTypeBows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // CrossBows
      {
        name: 'Light Crossbow',
        itemTypeId: itemTypeCrossbows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crossbow',
        itemTypeId: itemTypeCrossbows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heavy Crossbow',
        itemTypeId: itemTypeCrossbows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Repeating Crossbow',
        itemTypeId: itemTypeCrossbows,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Daggers
      {
        name: 'Dagger',
        itemTypeId: itemTypeDaggers,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dirk',
        itemTypeId: itemTypeDaggers,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kris',
        itemTypeId: itemTypeDaggers,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Blade',
        itemTypeId: itemTypeDaggers,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Javelins
      {
        name: 'Javelin',
        itemTypeId: itemTypeJavelins,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pilum',
        itemTypeId: itemTypeJavelins,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Short Spear',
        itemTypeId: itemTypeJavelins,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Glaive',
        itemTypeId: itemTypeJavelins,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Throwing Spear',
        itemTypeId: itemTypeJavelins,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Maces
      {
        name: 'Club',
        itemTypeId: itemTypeMaces,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Spiked Club',
        itemTypeId: itemTypeMaces,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mace',
        itemTypeId: itemTypeMaces,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Morning Star',
        itemTypeId: itemTypeMaces,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Flail',
        itemTypeId: itemTypeMaces,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Hammer',
        itemTypeId: itemTypeMaces,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 2h
      {
        name: 'Maul',
        itemTypeId: itemTypeMaces,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Great Maul',
        itemTypeId: itemTypeMaces,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Polearms
      {
        name: 'Bardiche',
        itemTypeId: itemTypePolearms,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Voulge',
        itemTypeId: itemTypePolearms,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scythe',
        itemTypeId: itemTypePolearms,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Poleaxe',
        itemTypeId: itemTypePolearms,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Halberd',
        itemTypeId: itemTypePolearms,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Scythe',
        itemTypeId: itemTypePolearms,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Scepters
      {
        name: 'Scepter',
        itemTypeId: itemTypeScepters,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Grand Scepter',
        itemTypeId: itemTypeScepters,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Scepter',
        itemTypeId: itemTypeScepters,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Spears
      {
        name: 'Spear',
        itemTypeId: itemTypeSpears,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Trident',
        itemTypeId: itemTypeSpears,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Brandistock',
        itemTypeId: itemTypeSpears,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Spetum',
        itemTypeId: itemTypeSpears,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pike',
        itemTypeId: itemTypeSpears,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Staves
      {
        name: 'Short Staff',
        itemTypeId: itemTypeStaves,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Long Staff',
        itemTypeId: itemTypeStaves,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gnarled Staff',
        itemTypeId: itemTypeStaves,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Battle Staff',
        itemTypeId: itemTypeStaves,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Staff',
        itemTypeId: itemTypeStaves,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Swords
      {
        name: 'Short Sword',
        itemTypeId: itemTypeSwords,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scimitar',
        itemTypeId: itemTypeSwords,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sabre',
        itemTypeId: itemTypeSwords,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Falchion',
        itemTypeId: itemTypeSwords,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crystal Sword',
        itemTypeId: itemTypeSwords,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Broad Sword',
        itemTypeId: itemTypeSwords,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Long Sword',
        itemTypeId: itemTypeSwords,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Sword',
        itemTypeId: itemTypeSwords,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 2h
      {
        name: 'Two-handed Sword',
        itemTypeId: itemTypeSwords,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Claymore',
        itemTypeId: itemTypeSwords,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Giant Sword',
        itemTypeId: itemTypeSwords,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bastard Sword',
        itemTypeId: itemTypeSwords,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Flamberge',
        itemTypeId: itemTypeSwords,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Great Sword',
        itemTypeId: itemTypeSwords,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Throwing
      {
        name: 'Throwing Knife',
        itemTypeId: itemTypeThrowing,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Balanced Knife',
        itemTypeId: itemTypeThrowing,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Throwing Axe',
        itemTypeId: itemTypeThrowing,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Balanced Axe',
        itemTypeId: itemTypeThrowing,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Wands
      {
        name: 'Wand',
        itemTypeId: itemTypeWands,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yew Wand',
        itemTypeId: itemTypeWands,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Wand',
        itemTypeId: itemTypeWands,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Grim Wand',
        itemTypeId: itemTypeWands,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemFamily', null, {}),
};
