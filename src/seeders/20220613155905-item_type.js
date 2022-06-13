module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('itemType', [
    // armor type
    {
      name: 'Helms',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Armors',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Shields',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Gloves',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Boots',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Belts',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Circlets',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // weapon types
    {
      name: 'Axes',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Bows',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Crossbows',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Daggers',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Javelins',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Maces',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Polearms',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Scepters',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Spears',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Staves',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Swords',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Throwing',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Wands',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Class specific Armors
    {
      name: 'Barbarian Helms',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Druid Pelts',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Paladin Shields',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Necromancer Shrunken Heads',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Amazon Weapons',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Assassin Katars',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sorceress Orbs',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemType', null, {}),
};
