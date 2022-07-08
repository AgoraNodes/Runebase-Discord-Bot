module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Screech',
    }, {
      name: 'Shout',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Shout',
    }, {
      name: 'Screech',
    });
  },
};
