module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Swordsman',
    }, {
      name: 'Swordman',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Swordsman',
    }, {
      name: 'Swordsman',
    });
  },
};
