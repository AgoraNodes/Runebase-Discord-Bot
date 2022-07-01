module.exports = {
  up: async (queryInterface, Sequelize) => {
    const itemFamilyCrossbow = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Crossbow',
      },
    }, ['id']);

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyCrossbow,
    }, {
      name: 'Crossbow',
    });

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyCrossbow,
    }, {
      name: 'Siege Crossbow',
    });

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyCrossbow,
    }, {
      name: 'Gorgon Crossbow',
    });
  },
  down: async (queryInterface, Sequelize) => {
    const itemFamilyLightCrossbow = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Light Crossbow',
      },
    }, ['id']);

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyLightCrossbow,
    }, {
      name: 'Crossbow',
    });

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyLightCrossbow,
    }, {
      name: 'Siege Crossbow',
    });

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyLightCrossbow,
    }, {
      name: 'Gorgon Crossbow',
    });
  },
};
