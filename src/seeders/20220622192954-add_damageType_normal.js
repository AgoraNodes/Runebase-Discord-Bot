module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('damageType', [
      {
        name: 'Physical',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('damageType', null, {}),
};
