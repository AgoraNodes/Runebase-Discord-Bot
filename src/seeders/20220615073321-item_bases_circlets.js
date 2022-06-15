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

    const itemFamilyCirclet = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Circlet',
      },
    }, ['id']);
    const itemFamilyCoronet = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Coronet',
      },
    }, ['id']);
    const itemFamilyTiara = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Tiara',
      },
    }, ['id']);
    const itemFamilyDiadem = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Diadem',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Circlet',
        levelReq: 16,
        levelMonster: 24,
        minDefense: 20,
        maxDefense: 30,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: 35,
        sockets: 2,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyCirclet,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Coronet',
        levelReq: 39,
        levelMonster: 52,
        minDefense: 30,
        maxDefense: 40,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: 30,
        sockets: 2,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyCoronet,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tiara',
        levelReq: 52,
        levelMonster: 70,
        minDefense: 40,
        maxDefense: 50,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: 25,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyTiara,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Diadem',
        levelReq: 64,
        levelMonster: 85,
        minDefense: 50,
        maxDefense: 60,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyDiadem,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemBase', null, {}),
};
