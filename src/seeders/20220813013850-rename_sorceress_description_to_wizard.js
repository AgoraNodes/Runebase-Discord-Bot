module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('classDescription', {
      name: 'Wizard',
    }, {
      name: 'Sorceress',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('classDescription', {
      name: 'Sorceress',
    }, {
      name: 'Wizard',
    });
  },
};
