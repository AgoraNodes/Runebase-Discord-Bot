module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Retaliate',
    }, {
      name: 'Retaliation',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Retaliation',
    }, {
      name: 'Retaliate',
    });
  },
};
