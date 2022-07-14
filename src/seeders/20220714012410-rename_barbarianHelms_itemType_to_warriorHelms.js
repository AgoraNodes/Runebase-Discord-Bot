module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('itemType', {
      name: 'Warrior Helms',
    }, {
      name: 'Barbarian Helms',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('itemType', {
      name: 'Barbarian Helms',
    }, {
      name: 'Warrior Helms',
    });
  },
};
