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

    const itemTypeCirclets = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Circlets',
      },
    }, ['id']);
    const itemTypeBarbHelms = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Barbarian Helms',
      },
    }, ['id']);
    const itemTypeDruidPelts = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Druid Pelts',
      },
    }, ['id']);
    const itemTypePalaShields = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Paladin Shields',
      },
    }, ['id']);
    const itemTypeNecroHeads = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Necromancer Shrunken Heads',
      },
    }, ['id']);
    const itemTypeAmaWeapons = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Amazon Weapons',
      },
    }, ['id']);
    const itemTypeAssaKatars = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Assassin Katars',
      },
    }, ['id']);
    const itemTypeSorcOrbs = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Sorceress Orbs',
      },
    }, ['id']);

    queryInterface.bulkInsert('itemFamily', [
      // Helms
      {
        name: 'Cap',
        itemTypeId: itemTypeHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Skull Cap',
        itemTypeId: itemTypeHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Helm',
        itemTypeId: itemTypeHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Full Helm',
        itemTypeId: itemTypeHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Great Helm',
        itemTypeId: itemTypeHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mask',
        itemTypeId: itemTypeHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crown',
        itemTypeId: itemTypeHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Helm',
        itemTypeId: itemTypeHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Armors
      {
        name: 'Quilted Armor',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Leather Armor',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hard Leather Armor',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Studded Leather',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ring Mail',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scale Mail',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Breast Plate',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chain Mail',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Splint Mail',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Light Plate',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Field Plate',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Plate Mail',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gothic Plate',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Full Plate Mail',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ancient Armor',
        itemTypeId: itemTypeArmors,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Shields
      {
        name: 'Buckler',
        itemTypeId: itemTypeShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Small Shield',
        itemTypeId: itemTypeShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Large Shield',
        itemTypeId: itemTypeShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kite Shield',
        itemTypeId: itemTypeShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Spiked Shield',
        itemTypeId: itemTypeShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tower Shield',
        itemTypeId: itemTypeShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Shield',
        itemTypeId: itemTypeShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gothic Shield',
        itemTypeId: itemTypeShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Gloves
      {
        name: 'Leather Gloves',
        itemTypeId: itemTypeGloves,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heavy Gloves',
        itemTypeId: itemTypeGloves,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chain Gloves',
        itemTypeId: itemTypeGloves,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Light Gauntlets',
        itemTypeId: itemTypeGloves,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gauntlets',
        itemTypeId: itemTypeGloves,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Boots
      {
        name: 'Boots',
        itemTypeId: itemTypeBoots,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heavy Boots',
        itemTypeId: itemTypeBoots,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chain Boots',
        itemTypeId: itemTypeBoots,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Light Plated Boots',
        itemTypeId: itemTypeBoots,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Greaves',
        itemTypeId: itemTypeBoots,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Belts
      {
        name: 'Sash',
        itemTypeId: itemTypeBelts,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Light Belt',
        itemTypeId: itemTypeBelts,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Belt',
        itemTypeId: itemTypeBelts,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heavy Belt',
        itemTypeId: itemTypeBelts,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Plated Belt',
        itemTypeId: itemTypeBelts,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Axes
      {
        name: 'Hand Axe',
        itemTypeId: itemTypeAxes,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Axe',
        itemTypeId: itemTypeAxes,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Double Axe',
        itemTypeId: itemTypeAxes,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Military Pick',
        itemTypeId: itemTypeAxes,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Axe',
        itemTypeId: itemTypeAxes,
        twoHanded: false,
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
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dirk',
        itemTypeId: itemTypeDaggers,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kris',
        itemTypeId: itemTypeDaggers,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Blade',
        itemTypeId: itemTypeDaggers,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Javelins
      {
        name: 'Javelin',
        itemTypeId: itemTypeJavelins,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pilum',
        itemTypeId: itemTypeJavelins,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Short Spear',
        itemTypeId: itemTypeJavelins,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Glaive',
        itemTypeId: itemTypeJavelins,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Throwing Spear',
        itemTypeId: itemTypeJavelins,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Maces
      {
        name: 'Club',
        itemTypeId: itemTypeMaces,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Spiked Club',
        itemTypeId: itemTypeMaces,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mace',
        itemTypeId: itemTypeMaces,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Morning Star',
        itemTypeId: itemTypeMaces,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Flail',
        itemTypeId: itemTypeMaces,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Hammer',
        itemTypeId: itemTypeMaces,
        twoHanded: false,
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
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Grand Scepter',
        itemTypeId: itemTypeScepters,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Scepter',
        itemTypeId: itemTypeScepters,
        twoHanded: false,
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
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scimitar',
        itemTypeId: itemTypeSwords,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sabre',
        itemTypeId: itemTypeSwords,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Falchion',
        itemTypeId: itemTypeSwords,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crystal Sword',
        itemTypeId: itemTypeSwords,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Broad Sword',
        itemTypeId: itemTypeSwords,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Long Sword',
        itemTypeId: itemTypeSwords,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Sword',
        itemTypeId: itemTypeSwords,
        twoHanded: false,
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
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Balanced Knife',
        itemTypeId: itemTypeThrowing,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Throwing Axe',
        itemTypeId: itemTypeThrowing,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Balanced Axe',
        itemTypeId: itemTypeThrowing,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Wands
      {
        name: 'Wand',
        itemTypeId: itemTypeWands,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yew Wand',
        itemTypeId: itemTypeWands,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Wand',
        itemTypeId: itemTypeWands,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Grim Wand',
        itemTypeId: itemTypeWands,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Circlets
      {
        name: 'Circlet',
        itemTypeId: itemTypeCirclets,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Coronet',
        itemTypeId: itemTypeCirclets,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tiara',
        itemTypeId: itemTypeCirclets,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Diadem',
        itemTypeId: itemTypeCirclets,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Barb Helms
      {
        name: 'Jawbone Cap',
        itemTypeId: itemTypeBarbHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fanged Helm',
        itemTypeId: itemTypeBarbHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Horned Helm',
        itemTypeId: itemTypeBarbHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Assault Helmet',
        itemTypeId: itemTypeBarbHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Avenger Guard',
        itemTypeId: itemTypeBarbHelms,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Druid Pels
      {
        name: 'Wolf Head',
        itemTypeId: itemTypeDruidPelts,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hawk Helm',
        itemTypeId: itemTypeDruidPelts,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Antlers',
        itemTypeId: itemTypeDruidPelts,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Falcon Mask',
        itemTypeId: itemTypeDruidPelts,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Spirit Mask',
        itemTypeId: itemTypeDruidPelts,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Pladin SHields
      {
        name: 'Targe',
        itemTypeId: itemTypePalaShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rondache',
        itemTypeId: itemTypePalaShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heraldic Shield',
        itemTypeId: itemTypePalaShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aerin Shield',
        itemTypeId: itemTypePalaShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crown Shield',
        itemTypeId: itemTypePalaShields,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Necro Heads
      {
        name: 'Preserved Head',
        itemTypeId: itemTypeNecroHeads,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Zombie Head',
        itemTypeId: itemTypeNecroHeads,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Unraveller Head',
        itemTypeId: itemTypeNecroHeads,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gargoyle Head',
        itemTypeId: itemTypeNecroHeads,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Demon Head',
        itemTypeId: itemTypeNecroHeads,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Amazon Weapons
      {
        name: 'Stag Bow',
        itemTypeId: itemTypeAmaWeapons,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Reflex Bow',
        itemTypeId: itemTypeAmaWeapons,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Maiden Spear',
        itemTypeId: itemTypeAmaWeapons,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Maiden Pike',
        itemTypeId: itemTypeAmaWeapons,
        twoHanded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Maiden Javelin',
        itemTypeId: itemTypeAmaWeapons,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Assassin Katars
      {
        name: 'Katar',
        itemTypeId: itemTypeAssaKatars,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Wrist Blade',
        itemTypeId: itemTypeAssaKatars,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hatchet Hands',
        itemTypeId: itemTypeAssaKatars,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cestus',
        itemTypeId: itemTypeAssaKatars,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Claws',
        itemTypeId: itemTypeAssaKatars,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Blade Talons',
        itemTypeId: itemTypeAssaKatars,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scissors Katar',
        itemTypeId: itemTypeAssaKatars,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Sorc Orbs
      {
        name: 'Eagle Orb',
        itemTypeId: itemTypeSorcOrbs,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sacred Globe',
        itemTypeId: itemTypeSorcOrbs,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Smoked Sphere',
        itemTypeId: itemTypeSorcOrbs,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Clasped Orb',
        itemTypeId: itemTypeSorcOrbs,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jared's Stone",
        itemTypeId: itemTypeSorcOrbs,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemFamily', null, {}),
};
