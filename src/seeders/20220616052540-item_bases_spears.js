module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get all the itemDifficultyId's
    const itemDifficultyNormal = await queryInterface.rawSelect('itemDifficulty', {
      where: {
        name: 'Normal',
      },
    }, ['id']);
    const itemDifficultyExceptional = await queryInterface.rawSelect('itemDifficulty', {
      where: {
        name: 'Exceptional',
      },
    }, ['id']);
    const itemDifficultyElite = await queryInterface.rawSelect('itemDifficulty', {
      where: {
        name: 'Elite',
      },
    }, ['id']);

    // Dagger
    const itemFamilySpear = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Spear',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Spear',
        levelReq: null,
        levelMonster: 5,
        minDefense: null,
        maxDefense: null,
        minDamage: 3,
        maxDamage: 15,
        strengthReq: null,
        dexterityReq: 20,
        durability: 30,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilySpear,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Spear',
        levelReq: 21,
        levelMonster: 33,
        minDefense: null,
        maxDefense: null,
        minDamage: 10,
        maxDamage: 37,
        strengthReq: 25,
        dexterityReq: 25,
        durability: 30,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilySpear,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hyperion Spear',
        levelReq: 43,
        levelMonster: 58,
        minDefense: null,
        maxDefense: null,
        minDamage: 35,
        maxDamage: 119,
        strengthReq: 155,
        dexterityReq: 120,
        durability: 30,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilySpear,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const itemFamilyTrident = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Trident',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Trident',
        levelReq: null,
        levelMonster: 9,
        minDefense: null,
        maxDefense: null,
        minDamage: 9,
        maxDamage: 15,
        strengthReq: 38,
        dexterityReq: 24,
        durability: 35,
        sockets: 4,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyTrident,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fuscina',
        levelReq: 24,
        levelMonster: 36,
        minDefense: null,
        maxDefense: null,
        minDamage: 19,
        maxDamage: 37,
        strengthReq: 77,
        dexterityReq: 25,
        durability: 35,
        sockets: 4,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyTrident,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Stygian Pike',
        levelReq: 49,
        levelMonster: 66,
        minDefense: null,
        maxDefense: null,
        minDamage: 29,
        maxDamage: 144,
        strengthReq: 168,
        dexterityReq: 97,
        durability: 35,
        sockets: 4,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyTrident,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const itemFamilyBrandistock = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Brandistock',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Brandistock',
        levelReq: null,
        levelMonster: 16,
        minDefense: null,
        maxDefense: null,
        minDamage: 7,
        maxDamage: 17,
        strengthReq: 40,
        dexterityReq: 50,
        durability: 28,
        sockets: 5,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyBrandistock,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Fork',
        levelReq: 25,
        levelMonster: 41,
        minDefense: null,
        maxDefense: null,
        minDamage: 16,
        maxDamage: 40,
        strengthReq: 80,
        dexterityReq: 95,
        durability: 28,
        sockets: 5,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyBrandistock,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mancatcher',
        levelReq: 55,
        levelMonster: 74,
        minDefense: null,
        maxDefense: null,
        minDamage: 42,
        maxDamage: 92,
        strengthReq: 132,
        dexterityReq: 134,
        durability: 28,
        sockets: 5,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyBrandistock,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const itemFamilySpetum = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Spetum',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Spetum',
        levelReq: null,
        levelMonster: 20,
        minDefense: null,
        maxDefense: null,
        minDamage: 15,
        maxDamage: 23,
        strengthReq: 54,
        dexterityReq: 35,
        durability: 28,
        sockets: 6,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilySpetum,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yari',
        levelReq: 25,
        levelMonster: 44,
        minDefense: null,
        maxDefense: null,
        minDamage: 29,
        maxDamage: 59,
        strengthReq: 101,
        dexterityReq: null,
        durability: 28,
        sockets: 6,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilySpetum,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ghost Spear',
        levelReq: 66,
        levelMonster: 85,
        minDefense: null,
        maxDefense: null,
        minDamage: 33,
        maxDamage: 178,
        strengthReq: 165,
        dexterityReq: 106,
        durability: 25,
        sockets: 6,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilySpetum,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const itemFamilyWarPike = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Pike',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Pike',
        levelReq: null,
        levelMonster: 24,
        minDefense: null,
        maxDefense: null,
        minDamage: 14,
        maxDamage: 63,
        strengthReq: 60,
        dexterityReq: 45,
        durability: 25,
        sockets: 6,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyWarPike,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lance',
        levelReq: 25,
        levelMonster: 47,
        minDefense: null,
        maxDefense: null,
        minDamage: 27,
        maxDamage: 114,
        strengthReq: 110,
        dexterityReq: 88,
        durability: 25,
        sockets: 6,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyWarPike,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'War Pike',
        levelReq: 66,
        levelMonster: 85,
        minDefense: null,
        maxDefense: null,
        minDamage: 33,
        maxDamage: 178,
        strengthReq: 165,
        dexterityReq: 106,
        durability: 25,
        sockets: 6,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyWarPike,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemBase', null, {}),
};