module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('monsterType', [
      {
        name: 'Undead',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('monsterType', null, {}),
};
