module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Firestorm = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Firestorm',
      },
    }, ['id']);
    const MoltenBoulder = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Molten Boulder',
      },
    }, ['id']);
    const ArcticBlast = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Arctic Blast',
      },
    }, ['id']);
    const Fissure = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fissure',
      },
    }, ['id']);
    const CycloneArmor = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Cyclone Armor',
      },
    }, ['id']);

    const Twister = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Twister',
      },
    }, ['id']);
    const Volcano = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Volcano',
      },
    }, ['id']);
    const Tornado = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Tornado',
      },
    }, ['id']);
    const Armageddon = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Armageddon',
      },
    }, ['id']);
    const Hurricane = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Hurricane',
      },
    }, ['id']);

    await queryInterface.bulkInsert('SkillSkill', [
      {
        currentSkillId: Armageddon,
        previousSkillId: Hurricane,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Armageddon,
        previousSkillId: Volcano,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Volcano,
        previousSkillId: Fissure,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Fissure,
        previousSkillId: MoltenBoulder,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: MoltenBoulder,
        previousSkillId: Firestorm,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Hurricane,
        previousSkillId: Tornado,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Tornado,
        previousSkillId: Twister,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Twister,
        previousSkillId: CycloneArmor,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: CycloneArmor,
        previousSkillId: ArcticBlast,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('SkillSkill', null, {}),
};
