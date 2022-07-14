module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('classDescription', 'image'),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'classDescription',
      'image',
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    ),
  ]),
};
