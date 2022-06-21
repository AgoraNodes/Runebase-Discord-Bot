module.exports = {
  up: async (queryInterface, Sequelize) => {
    const MagicArrowSkills = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Magic Arrow',
      },
    }, ['id']);
    const FireArrowSkills = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fire Arrow',
      },
    }, ['id']);
    const MultipleShotskills = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Multiple Shot',
      },
    }, ['id']);
    const ExplodingArrowSkills = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Exploding Arrow',
      },
    }, ['id']);
    const ColdArrow = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Cold Arrow',
      },
    }, ['id']);

    const IceArrow = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Ice Arrow',
      },
    }, ['id']);
    const GuidedArrow = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Guided Arrow',
      },
    }, ['id']);
    const Strafe = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Strafe',
      },
    }, ['id']);
    const ImmolationArrow = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Immolation Arrow',
      },
    }, ['id']);
    const FreezingArrow = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Freezing Arrow',
      },
    }, ['id']);

    await queryInterface.bulkInsert('SkillSkill', [
      {
        currentSkillId: FreezingArrow,
        previousSkillId: IceArrow,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: IceArrow,
        previousSkillId: ColdArrow,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Strafe,
        previousSkillId: GuidedArrow,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ImmolationArrow,
        previousSkillId: ExplodingArrowSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FreezingArrow,
        previousSkillId: GuidedArrow,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: GuidedArrow,
        previousSkillId: MultipleShotskills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: MultipleShotskills,
        previousSkillId: MagicArrowSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ExplodingArrowSkills,
        previousSkillId: MultipleShotskills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ExplodingArrowSkills,
        previousSkillId: FireArrowSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('SkillSkill', null, {}),
};
