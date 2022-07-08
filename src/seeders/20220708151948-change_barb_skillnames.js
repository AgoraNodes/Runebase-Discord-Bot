module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Though Skin',
    }, {
      name: 'Iron Skin',
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('skill', {
      name: 'Iron Skin',
    }, {
      name: 'Though Skin',
    });
  },
};
