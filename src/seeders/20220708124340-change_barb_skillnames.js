module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Polearm Master',
    }, {
      name: 'Polearm Mastery',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Retaliation',
    }, {
      name: 'Increased Stamina',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Critical Kick',
    }, {
      name: 'Increased Speed',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Spearman',
    }, {
      name: 'Spear Mastery',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Polearm Mastery',
    }, {
      name: 'Polearm Master',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Increased Stamina',
    }, {
      name: 'Retaliation',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Increased Speed',
    }, {
      name: 'Critical Kick',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Spear Mastery',
    }, {
      name: 'Spearman',
    });
  },
};
