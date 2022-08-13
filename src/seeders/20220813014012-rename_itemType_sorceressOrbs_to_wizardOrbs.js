module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('itemType', {
      name: 'Wizard Orbs',
    }, {
      name: 'Sorceress Orbs',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('itemType', {
      name: 'Sorceress Orbs',
    }, {
      name: 'Wizard Orbs',
    });
  },
};
