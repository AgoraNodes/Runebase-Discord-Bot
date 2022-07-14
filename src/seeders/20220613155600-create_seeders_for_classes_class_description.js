module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BarbarianDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Barbarian',
      },
    }, ['id']);

    const WarriorDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Warrior',
      },
    }, ['id']);

    if (!BarbarianDescription && !WarriorDescription) {
      await queryInterface.bulkInsert('classDescription', [
        {
          name: 'Barbarian',
          description: 'Barbarian Description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const Barbarian = await queryInterface.rawSelect('class', {
      where: {
        name: 'Barbarian',
      },
    }, ['id']);

    const Warrior = await queryInterface.rawSelect('class', {
      where: {
        name: 'Warrior',
      },
    }, ['id']);

    const newWarriorDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Warrior',
      },
    }, ['id']);

    if (!Barbarian && !Warrior) {
      await queryInterface.bulkInsert('class', [
        {
          name: 'Barbarian',
          strength: 30,
          dexterity: 20,
          vitality: 25,
          energy: 10,
          life: 55,
          mana: 10,
          stamina: 92,
          attackRating: 50,
          defense: 50,
          classDescriptionId: newWarriorDescription,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const AmazonDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Amazon',
      },
    }, ['id']);

    if (!AmazonDescription) {
      await queryInterface.bulkInsert('classDescription', [
        {
          name: 'Amazon',
          description: 'Amazon Description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const NecromancerDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Necromancer',
      },
    }, ['id']);

    if (!NecromancerDescription) {
      await queryInterface.bulkInsert('classDescription', [
        {
          name: 'Necromancer',
          description: 'Necromancer Description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const PaladinDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Paladin',
      },
    }, ['id']);

    if (!PaladinDescription) {
      await queryInterface.bulkInsert('classDescription', [
        {
          name: 'Paladin',
          description: 'Paladin Description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const AssasinDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Assasin',
      },
    }, ['id']);

    if (!AssasinDescription) {
      await queryInterface.bulkInsert('classDescription', [
        {
          name: 'Assasin',
          description: 'Assasin Description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const SorceressDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Sorceress',
      },
    }, ['id']);

    if (!SorceressDescription) {
      await queryInterface.bulkInsert('classDescription', [
        {
          name: 'Sorceress',
          description: 'Sorceress Description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const DruidDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Druid',
      },
    }, ['id']);

    if (!DruidDescription) {
      await queryInterface.bulkInsert('classDescription', [
        {
          name: 'Druid',
          description: 'Druid Description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const NewAmazonDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Amazon',
      },
    }, ['id']);
    const Amazon = await queryInterface.rawSelect('class', {
      where: {
        name: 'Amazon',
      },
    }, ['id']);
    if (!Amazon) {
      await queryInterface.bulkInsert('class', [
        {
          name: 'Amazon',
          strength: 20,
          dexterity: 25,
          vitality: 20,
          energy: 15,
          life: 50,
          mana: 15,
          stamina: 84,
          attackRating: 50,
          defense: 50,
          classDescriptionId: NewAmazonDescription,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    const NewDruidDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Druid',
      },
    }, ['id']);
    const Druid = await queryInterface.rawSelect('class', {
      where: {
        name: 'Druid',
      },
    }, ['id']);
    if (!Druid) {
      await queryInterface.bulkInsert('class', [
        {
          name: 'Druid',
          strength: 15,
          dexterity: 20,
          vitality: 25,
          energy: 20,
          life: 55,
          mana: 20,
          stamina: 84,
          attackRating: 50,
          defense: 50,
          classDescriptionId: NewDruidDescription,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    const NewSorceressDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Sorceress',
      },
    }, ['id']);
    const Sorceress = await queryInterface.rawSelect('class', {
      where: {
        name: 'Sorceress',
      },
    }, ['id']);
    if (!Sorceress) {
      await queryInterface.bulkInsert('class', [
        {
          name: 'Sorceress',
          strength: 10,
          dexterity: 5,
          vitality: 10,
          energy: 35,
          life: 40,
          mana: 35,
          stamina: 74,
          attackRating: 50,
          defense: 50,
          classDescriptionId: NewSorceressDescription,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    const NewAssasinDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Assasin',
      },
    }, ['id']);
    const Assasin = await queryInterface.rawSelect('class', {
      where: {
        name: 'Assasin',
      },
    }, ['id']);
    if (!Assasin) {
      await queryInterface.bulkInsert('class', [
        {
          name: 'Assasin',
          strength: 20,
          dexterity: 20,
          vitality: 20,
          energy: 25,
          life: 50,
          mana: 25,
          stamina: 95,
          attackRating: 50,
          defense: 50,
          classDescriptionId: NewAssasinDescription,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    const NewPaladinDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Paladin',
      },
    }, ['id']);
    const Paladin = await queryInterface.rawSelect('class', {
      where: {
        name: 'Paladin',
      },
    }, ['id']);
    if (!Paladin) {
      await queryInterface.bulkInsert('class', [
        {
          name: 'Paladin',
          strength: 25,
          dexterity: 20,
          vitality: 25,
          energy: 15,
          life: 55,
          mana: 15,
          stamina: 89,
          attackRating: 50,
          defense: 50,
          classDescriptionId: NewPaladinDescription,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    const NewNecromancerDescription = await queryInterface.rawSelect('classDescription', {
      where: {
        name: 'Necromancer',
      },
    }, ['id']);
    const Necromancer = await queryInterface.rawSelect('class', {
      where: {
        name: 'Necromancer',
      },
    }, ['id']);
    if (!Necromancer) {
      await queryInterface.bulkInsert('class', [
        {
          name: 'Necromancer',
          strength: 15,
          dexterity: 25,
          vitality: 15,
          energy: 25,
          life: 45,
          mana: 25,
          stamina: 79,
          attackRating: 50,
          defense: 50,
          classDescriptionId: NewNecromancerDescription,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('class', null, {});
    queryInterface.bulkDelete('classDescription', null, {});
  },
};
