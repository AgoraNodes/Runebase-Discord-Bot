module.exports = {
  up: async (queryInterface, Sequelize) => {
    const itemTypeRings = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Rings',
      },
    }, ['id']);
    const itemTypeAmulets = await queryInterface.rawSelect('itemType', {
      where: {
        name: 'Amulets',
      },
    }, ['id']);

    queryInterface.bulkInsert('itemFamily', [
      // Helms
      {
        name: 'Rings',
        itemTypeId: itemTypeRings,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Amulets',
        itemTypeId: itemTypeAmulets,
        twoHanded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemFamily', null, {}),
};
