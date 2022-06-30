module.exports = {
  up: async (queryInterface, Sequelize) => {
    const itemFamilyClaws = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Claws',
      },
    }, ['id']);

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyClaws,
    }, {
      name: 'Claws',
    });

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyClaws,
    }, {
      name: 'Greater Claws',
    });

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyClaws,
    }, {
      name: 'Feral Claws',
    });
  },
  down: async (queryInterface, Sequelize) => {
    const itemFamilyCestus = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Cestus',
      },
    }, ['id']);

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyCestus,
    }, {
      name: 'Claws',
    });

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyCestus,
    }, {
      name: 'Greater Claws',
    });

    queryInterface.bulkUpdate('itemBase', {
      itemFamilyId: itemFamilyCestus,
    }, {
      name: 'Feral Claws',
    });
  },
};
