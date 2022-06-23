module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Physical = await queryInterface.rawSelect('damageType', {
      where: {
        name: 'Physical',
      },
    }, ['id']);
    const Undead = await queryInterface.rawSelect('monsterType', {
      where: {
        name: 'Undead',
      },
    }, ['id']);

    await queryInterface.bulkInsert('monster', [
      {
        name: 'Zombie',
        level: 1,
        minHp: 30,
        maxHp: 50,
        exp: 1,
        defense: 5,
        block: 3,
        minDamage: 1,
        maxDamage: 6,
        FR: 0,
        CR: 0,
        PR: 0,
        LR: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('monster', null, {}),
};
