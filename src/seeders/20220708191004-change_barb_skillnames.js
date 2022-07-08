module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Strategic Shout',
    }, {
      name: 'Taunt',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Taunt',
    }, {
      name: 'Strategic Shout',
    });
  },
};
