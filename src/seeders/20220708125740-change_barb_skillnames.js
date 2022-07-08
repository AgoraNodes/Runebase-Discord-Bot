module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Relieve',
    }, {
      name: 'Find Potion',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Critical Hit',
    }, {
      name: 'Find Item',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Healing Hit',
    }, {
      name: 'Grim Ward',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Find Potion',
    }, {
      name: 'Relieve',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Find Item',
    }, {
      name: 'Critical Hit',
    });
    queryInterface.bulkUpdate('skill', {
      name: 'Healing Hit',
    }, {
      name: 'Critical Kick',
    });
  },
};
