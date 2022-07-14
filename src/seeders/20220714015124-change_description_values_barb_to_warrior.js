module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('classDescription', {
      name: 'Warrior',
    }, {
      name: 'Barbarian',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('classDescription', {
      name: 'Barbarian',
    }, {
      name: 'Warrior',
    });
  },
};
