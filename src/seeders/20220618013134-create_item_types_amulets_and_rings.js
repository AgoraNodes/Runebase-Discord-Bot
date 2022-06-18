module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('itemType', [
    // armor type
    {
      name: 'Rings',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Amulets',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemType', null, {}),
};
