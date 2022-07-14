module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('class', {
      name: 'Warrior',
    }, {
      name: 'Barbarian',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('class', {
      name: 'Barbarian',
    }, {
      name: 'Warrior',
    });
  },
};
