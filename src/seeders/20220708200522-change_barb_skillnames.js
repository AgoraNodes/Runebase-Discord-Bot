module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Strategic Strike',
    }, {
      name: 'Leap Attack',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Concentrated Strike',
    }, {
      name: 'Berserk',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Critical Throw',
    }, {
      name: 'Frenzy',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Throwing Master',
    }, {
      name: 'Throwing Mastery',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Leap Attack',
    }, {
      name: 'Strategic Strike',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Berserk',
    }, {
      name: 'Concentrated Strike',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Frenzy',
    }, {
      name: 'Critical Throw',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Throwing Mastery',
    }, {
      name: 'Throwing Master',
    });
  },
};
