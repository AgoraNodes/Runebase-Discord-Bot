module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Parry',
    }, {
      name: 'Leap',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Wound',
    }, {
      name: 'Concentrate',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Leap',
    }, {
      name: 'Parry',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Concentrate',
    }, {
      name: 'Wound',
    });
  },
};
