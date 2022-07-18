module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Dagger
    const barbarian = await queryInterface.rawSelect('class', {
      where: {
        name: 'Barbarian',
      },
    }, ['id']);
    const assassin = await queryInterface.rawSelect('class', {
      where: {
        name: 'Assassin',
      },
    }, ['id']);
    const druid = await queryInterface.rawSelect('class', {
      where: {
        name: 'Druid',
      },
    }, ['id']);
    const amazon = await queryInterface.rawSelect('class', {
      where: {
        name: 'Amazon',
      },
    }, ['id']);
    const necromancer = await queryInterface.rawSelect('class', {
      where: {
        name: 'Necromancer',
      },
    }, ['id']);
    const paladin = await queryInterface.rawSelect('class', {
      where: {
        name: 'Paladin',
      },
    }, ['id']);
    const sorceress = await queryInterface.rawSelect('class', {
      where: {
        name: 'Sorceress',
      },
    }, ['id']);
    await queryInterface.bulkInsert('skillTree', [
      {
        name: 'Warcries',
        classId: barbarian,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Combat Skills',
        classId: barbarian,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Combat Masteries',
        classId: barbarian,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bow and Crossbow Skills',
        classId: amazon,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Passive and Magic Skills',
        classId: amazon,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Javelin and Spear Skills',
        classId: amazon,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Martial Arts',
        classId: assassin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Shadow Disciplines',
        classId: assassin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Traps',
        classId: assassin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Elemental Skills',
        classId: druid,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Shape Shifting Skills',
        classId: druid,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Summoning Skills',
        classId: druid,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Summoning Spells',
        classId: necromancer,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Poison and Bone Spells',
        classId: necromancer,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Curses',
        classId: necromancer,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Combat Skills',
        classId: paladin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Defensive Auras',
        classId: paladin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Offensive Auras',
        classId: paladin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fire Spells',
        classId: sorceress,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lightning Spells',
        classId: sorceress,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cold Spells',
        classId: sorceress,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('skillTree', null, {}),
};
