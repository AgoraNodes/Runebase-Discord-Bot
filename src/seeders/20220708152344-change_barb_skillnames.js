module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Cleave',
    }, {
      name: 'Whirlwind',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Resistance',
    }, {
      name: 'Natural Resistance',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Whirlwind',
    }, {
      name: 'Cleave',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Natural Resistance',
    }, {
      name: 'Resistance',
    });
  },
};
