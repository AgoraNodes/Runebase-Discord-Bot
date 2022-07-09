module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Critical Hit',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Critical Kick',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Critical Throw',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Healing Hit',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Parry',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Relieve',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Resistance',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Retaliate',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Though Skin',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Axeman',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Maceman',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Polearm Master',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Spearman',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Swordsman',
    });
    queryInterface.bulkUpdate('skill', {
      passive: true,
    }, {
      name: 'Throwing Master',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Critical Hit',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Critical Kick',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Critical Throw',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Healing Hit',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Parry',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Relieve',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Resistance',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Retaliate',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Though Skin',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Axeman',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Maceman',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Polearm Master',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Spearman',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Swordsman',
    });
    queryInterface.bulkUpdate('skill', {
      passive: false,
    }, {
      name: 'Throwing Master',
    });
  },
};
