module.exports = {
  up: async (queryInterface, Sequelize) => {
    const discordHomeServerGuildId = await queryInterface.rawSelect('setting', {
    }, ['discordHomeServerGuildId']);
    if (discordHomeServerGuildId) {
      const groupId = await queryInterface.rawSelect('group', {
        where: {
          groupId: discordHomeServerGuildId,
        },
      }, ['id']);
      if (groupId) {
        await queryInterface.bulkUpdate('rank', {
          groupId,
        });
      }
    }
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate('rank', {
      groupId: null,
    }, {});
  },
};
