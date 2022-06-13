module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('itemDifficulty', [
    {
      name: 'Normal',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Exceptional',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Elite',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemDifficulty', null, {}),
};
