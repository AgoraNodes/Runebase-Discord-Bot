module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('class', {
      name: 'Wizard',
    }, {
      name: 'Sorceress',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('class', {
      name: 'Sorceress',
    }, {
      name: 'Wizard',
    });
  },
};
