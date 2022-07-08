module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Swordman',
    }, {
      name: 'Sword Mastery',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Axeman',
    }, {
      name: 'Axe Mastery',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Maceman',
    }, {
      name: 'Mace Mastery',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Sword Mastery',
    }, {
      name: 'Swordman',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Axe mastery',
    }, {
      name: 'Axeman',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Mace Mastery',
    }, {
      name: 'Maceman',
    });
  },
};
