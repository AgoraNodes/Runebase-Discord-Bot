module.exports = {
  up: async (queryInterface, Sequelize) => {
    const itemTypeHelms = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Helms',
      },
    }, ['id']);

    queryInterface.bulkInsert('itemFamilies', [
      // armor type
      {
        name: 'Caps',
        itemTypeId: itemTypeHelms[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemFamily', null, {}),
};
