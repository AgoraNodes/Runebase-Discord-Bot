module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Physical = await queryInterface.rawSelect('damageType', {
      where: {
        name: 'Physical',
      },
    }, ['id']);
    const Monster = await queryInterface.rawSelect('monster', {
      where: {
        name: 'Zombie',
      },
    }, ['id']);

    await queryInterface.bulkInsert('monsterAttack', [
      {
        name: 'Attack',
        minDmg: 2,
        maxDmg: 3,
        minAr: 12,
        maxAr: 30,
        damageTypeId: Physical,
        ranged: false,
        defaultAttack: true,
        chance: 100,
        monsterId: Monster,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bite',
        minDmg: 4,
        maxDmg: 8,
        minAr: 30,
        maxAr: 50,
        damageTypeId: Physical,
        ranged: false,
        defaultAttack: false,
        chance: 30,
        monsterId: Monster,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('monsterAttack', null, {}),
};
