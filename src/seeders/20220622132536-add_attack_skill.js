module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('skill', [
      {
        name: 'Attack',
        level: 0,
        row: 0,
        column: 0,
        skillTreeId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('skill', null, {}),
};
