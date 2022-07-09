module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'monsterAttack',
      'damageTypeId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'damageType', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ),

  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('monster', 'damageTypeId'),
  ]),
};
