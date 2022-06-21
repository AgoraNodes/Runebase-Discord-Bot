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

    const InnerSight = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Inner Sight',
      },
    }, ['id']);
    const CriticalStrike = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Critical Strike',
      },
    }, ['id']);
    const Dodge = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Dodge',
      },
    }, ['id']);
    const SlowMissiles = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Slow Missiles',
      },
    }, ['id']);
    const Avoid = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Avoid',
      },
    }, ['id']);

    const Penetrate = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Penetrate',
      },
    }, ['id']);
    const Decoy = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Decoy',
      },
    }, ['id']);
    const Evade = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Evade',
      },
    }, ['id']);
    const Valkyrie = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Valkyrie',
      },
    }, ['id']);
    const Pierce = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Pierce',
      },
    }, ['id']);

    const Jab = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Jab',
      },
    }, ['id']);
    const PowerStrike = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Power Strike',
      },
    }, ['id']);
    const PoisonJavelin = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Poison Javelin',
      },
    }, ['id']);
    const Impale = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Impale',
      },
    }, ['id']);
    const LightningBolt = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Lightning Bolt',
      },
    }, ['id']);

    const ChargedStrike = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Charged Strike',
      },
    }, ['id']);
    const PlagueJavelin = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Plague Javelin',
      },
    }, ['id']);
    const Fend = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fend',
      },
    }, ['id']);
    const LightningStrike = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Lightning Strike',
      },
    }, ['id']);
    const LightningFury = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Lightning Fury',
      },
    }, ['id']);

    const TigerStrike = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Tiger Strike',
      },
    }, ['id']);
    const DragonTalon = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Dragon Talon',
      },
    }, ['id']);
    const FistsofFire = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fists of Fire',
      },
    }, ['id']);
    const DragonClaw = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Dragon Claw',
      },
    }, ['id']);
    const CobraStrike = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Cobra Strike',
      },
    }, ['id']);

    const ClawsofThunder = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Claws of Thunder',
      },
    }, ['id']);
    const DragonTail = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Dragon Tail',
      },
    }, ['id']);
    const BladesofIce = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Blades of Ice',
      },
    }, ['id']);
    const DragonFlight = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Dragon Flight',
      },
    }, ['id']);
    const PhoenixStrike = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Phoenix Strike',
      },
    }, ['id']);
    const ClawMastery = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Claw Mastery',
      },
    }, ['id']);
    const PsychicHammer = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Psychic Hammer',
      },
    }, ['id']);
    const BurstofSpeed = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Burst of Speed',
      },
    }, ['id']);
    const WeaponBlock = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Weapon Block',
      },
    }, ['id']);
    const CloakofShadows = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Cloak of Shadows',
      },
    }, ['id']);

    const Fade = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fade',
      },
    }, ['id']);
    const ShadowWarrior = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Shadow Warrior',
      },
    }, ['id']);
    const MindBlast = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Mind Blast',
      },
    }, ['id']);
    const Venom = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Venom',
      },
    }, ['id']);
    const ShadowMaster = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Shadow Master',
      },
    }, ['id']);

    const FireBlast = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fire Blast',
      },
    }, ['id']);
    const ShockWeb = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Shock Web',
      },
    }, ['id']);
    const BladeSentinel = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Blade Sentinel',
      },
    }, ['id']);
    const ChargedBoltSentry = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Charged Bolt Sentry',
      },
    }, ['id']);
    const WakeofFire = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Wake of Fire',
      },
    }, ['id']);

    const BladeFury = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Blade Fury',
      },
    }, ['id']);
    const LightningSentry = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Lightning Sentry',
      },
    }, ['id']);
    const WakeofInferno = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Wake of Inferno',
      },
    }, ['id']);
    const DeathSentry = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Death Sentry',
      },
    }, ['id']);
    const BladeShield = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Blade Shield',
      },
    }, ['id']);

    const Howl = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Howl',
      },
    }, ['id']);
    const FindPotion = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Find Potion',
      },
    }, ['id']);
    const Taunt = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Taunt',
      },
    }, ['id']);
    const Shout = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Shout',
      },
    }, ['id']);
    const FindItem = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Find Item',
      },
    }, ['id']);

    const BattleCry = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Battle Cry',
      },
    }, ['id']);
    const BattleOrders = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Battle Orders',
      },
    }, ['id']);
    const GrimWard = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Grim Ward',
      },
    }, ['id']);
    const WarCry = await queryInterface.rawSelect('skill', {
      where: {
        name: 'War Cry',
      },
    }, ['id']);
    const BattleCommand = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Battle Command',
      },
    }, ['id']);
    const Bash = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Bash',
      },
    }, ['id']);
    const Leap = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Leap',
      },
    }, ['id']);
    const DoubleSwing = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Double Swing',
      },
    }, ['id']);
    const Stun = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Stun',
      },
    }, ['id']);
    const DoubleThrow = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Double Throw',
      },
    }, ['id']);

    const LeapAttack = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Leap Attack',
      },
    }, ['id']);
    const Concentrate = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Concentrate',
      },
    }, ['id']);
    const Frenzy = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Frenzy',
      },
    }, ['id']);
    const Whirlwind = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Whirlwind',
      },
    }, ['id']);
    const Berserk = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Berserk',
      },
    }, ['id']);
    const NaturalResistance = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Natural Resistance',
      },
    }, ['id']);
    const IncreasedSpeed = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Increased Speed',
      },
    }, ['id']);
    const IronSkin = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Iron Skin',
      },
    }, ['id']);
    const IncreasedStamina = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Increased Stamina',
      },
    }, ['id']);

    const Werewolf = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Werewolf',
      },
    }, ['id']);
    const Lycanthropy = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Lycanthropy',
      },
    }, ['id']);
    const Werebear = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Werebear',
      },
    }, ['id']);
    const FeralRage = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Feral Rage',
      },
    }, ['id']);
    const Maul = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Maul',
      },
    }, ['id']);

    const Rabies = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Rabies',
      },
    }, ['id']);
    const FireClaws = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fire Claws',
      },
    }, ['id']);
    const Hunger = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Hunger',
      },
    }, ['id']);
    const ShockWave = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Shock Wave',
      },
    }, ['id']);
    const Fury = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fury',
      },
    }, ['id']);
    const Raven = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Raven',
      },
    }, ['id']);
    const PoisonCreeper = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Poison Creeper',
      },
    }, ['id']);
    const OakSage = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Oak Sage',
      },
    }, ['id']);
    const SummonSpiritWolf = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Summon Spirit Wolf',
      },
    }, ['id']);
    const CarrionVine = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Carrion Vine',
      },
    }, ['id']);

    const HeartofWolverine = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Heart of Wolverine',
      },
    }, ['id']);
    const SummonDireWolf = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Summon Dire Wolf',
      },
    }, ['id']);
    const SolarCreeper = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Solar Creeper',
      },
    }, ['id']);
    const SpiritofBarbs = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Spirit of Barbs',
      },
    }, ['id']);
    const SummonGrizzly = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Summon Grizzly',
      },
    }, ['id']);

    const FireBolt = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fire Bolt',
      },
    }, ['id']);
    const Warmth = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Warmth',
      },
    }, ['id']);
    const Inferno = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Inferno',
      },
    }, ['id']);
    const Blaze = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Blaze',
      },
    }, ['id']);
    const FireBall = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fire Ball',
      },
    }, ['id']);

    const FireWall = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fire Wall',
      },
    }, ['id']);
    const Enchant = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Enchant',
      },
    }, ['id']);
    const Meteor = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Meteor',
      },
    }, ['id']);
    const FireMastery = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fire Mastery',
      },
    }, ['id']);
    const Hydra = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Hydra',
      },
    }, ['id']);

    const ChargedBolt = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Charged Bolt',
      },
    }, ['id']);
    const StaticField = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Static Field',
      },
    }, ['id']);
    const Telekinesis = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Telekinesis',
      },
    }, ['id']);
    const Nova = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Nova',
      },
    }, ['id']);
    const Lightning = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Lightning',
      },
    }, ['id']);

    const ChainLightning = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Chain Lightning',
      },
    }, ['id']);
    const Teleport = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Teleport',
      },
    }, ['id']);
    const ThunderStorm = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Thunder Storm',
      },
    }, ['id']);
    const EnergyShield = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Energy Shield',
      },
    }, ['id']);
    const LightningMastery = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Lightning Mastery',
      },
    }, ['id']);

    const IceBolt = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Ice Bolt',
      },
    }, ['id']);
    const FrozenArmor = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Frozen Armor',
      },
    }, ['id']);
    const FrostNova = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Frost Nova',
      },
    }, ['id']);
    const IceBlast = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Ice Blast',
      },
    }, ['id']);
    const ShiverArmor = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Shiver Armor',
      },
    }, ['id']);

    const GlacialSpike = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Glacial Spike',
      },
    }, ['id']);
    const Blizzard = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Blizzard',
      },
    }, ['id']);
    const ChillingArmor = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Chilling Armor',
      },
    }, ['id']);
    const FrozenOrb = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Frozen Orb',
      },
    }, ['id']);
    const RaiseSkeleton = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Raise Skeleton',
      },
    }, ['id']);
    const SkeletonMastery = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Skeleton Mastery',
      },
    }, ['id']);
    const ClayGolem = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Clay Golem',
      },
    }, ['id']);
    const GolemMastery = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Golem Mastery',
      },
    }, ['id']);
    const RaiseSkeletalMage = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Raise Skeletal Mage',
      },
    }, ['id']);

    const BloodGolem = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Blood Golem',
      },
    }, ['id']);
    const SummonResist = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Summon Resist',
      },
    }, ['id']);
    const IronGolem = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Iron Golem',
      },
    }, ['id']);
    const FireGolem = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fire Golem',
      },
    }, ['id']);
    const Revive = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Revive',
      },
    }, ['id']);
    const Teeth = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Teeth',
      },
    }, ['id']);
    const BoneArmor = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Bone Armor',
      },
    }, ['id']);
    const PoisonDagger = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Poison Dagger',
      },
    }, ['id']);
    const CorpseExplosion = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Corpse Explosion',
      },
    }, ['id']);
    const BoneWall = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Bone Wall',
      },
    }, ['id']);

    const PoisonExplosion = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Poison Explosion',
      },
    }, ['id']);
    const BoneSpear = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Bone Spear',
      },
    }, ['id']);
    const BonePrison = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Bone Prison',
      },
    }, ['id']);
    const PoisonNova = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Poison Nova',
      },
    }, ['id']);
    const BoneSpirit = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Bone Spirit',
      },
    }, ['id']);

    const AmplifyDamage = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Amplify Damage',
      },
    }, ['id']);
    const DimVision = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Dim Vision',
      },
    }, ['id']);
    const Weaken = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Weaken',
      },
    }, ['id']);
    const IronMaiden = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Iron Maiden',
      },
    }, ['id']);
    const Terror = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Terror',
      },
    }, ['id']);

    const Confuse = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Confuse',
      },
    }, ['id']);
    const LifeTap = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Life Tap',
      },
    }, ['id']);
    const Attract = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Attract',
      },
    }, ['id']);
    const Decrepify = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Decrepify',
      },
    }, ['id']);
    const LowerResist = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Lower Resist',
      },
    }, ['id']);
    const Sacrifice = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Sacrifice',
      },
    }, ['id']);
    const Smite = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Smite',
      },
    }, ['id']);
    const HolyBolt = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Holy Bolt',
      },
    }, ['id']);
    const Zeal = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Zeal',
      },
    }, ['id']);
    const Charge = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Charge',
      },
    }, ['id']);

    const Vengeance = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Vengeance',
      },
    }, ['id']);
    const BlessedHammer = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Blessed Hammer',
      },
    }, ['id']);
    const Conversion = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Conversion',
      },
    }, ['id']);
    const HolyShield = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Holy Shield',
      },
    }, ['id']);
    const FistoftheHeavens = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fist of the Heavens',
      },
    }, ['id']);
    const Might = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Might',
      },
    }, ['id']);
    const HolyFire = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Holy Fire',
      },
    }, ['id']);
    const Thorns = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Thorns',
      },
    }, ['id']);
    const BlessedAim = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Blessed Aim',
      },
    }, ['id']);
    const Concentration = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Concentration',
      },
    }, ['id']);

    const HolyFreeze = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Holy Freeze',
      },
    }, ['id']);
    const HolyShock = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Holy Shock',
      },
    }, ['id']);
    const Sanctuary = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Sanctuary',
      },
    }, ['id']);
    const Fanaticism = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Fanaticism',
      },
    }, ['id']);
    const Conviction = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Conviction',
      },
    }, ['id']);
    const Prayer = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Prayer',
      },
    }, ['id']);
    const ResistFire = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Resist Fire',
      },
    }, ['id']);
    const ResistCold = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Resist Cold',
      },
    }, ['id']);
    const ResistLightning = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Resist Lightning',
      },
    }, ['id']);
    const Defiance = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Defiance',
      },
    }, ['id']);

    const Cleansing = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Cleansing',
      },
    }, ['id']);
    const Vigor = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Vigor',
      },
    }, ['id']);
    const Meditation = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Meditation',
      },
    }, ['id']);
    const Redemption = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Redemption',
      },
    }, ['id']);
    const Salvation = await queryInterface.rawSelect('skill', {
      where: {
        name: 'Salvation',
      },
    }, ['id']);

    await queryInterface.bulkInsert('SkillSkill', [
      {
        currentSkillId: Meditation,
        previousSkillId: Cleansing,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Cleansing,
        previousSkillId: Prayer,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Redemption,
        previousSkillId: Vigor,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Vigor,
        previousSkillId: Cleansing,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Vigor,
        previousSkillId: Defiance,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Fanaticism,
        previousSkillId: Concentration,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Concentration,
        previousSkillId: BlessedAim,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BlessedAim,
        previousSkillId: Might,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: HolyShock,
        previousSkillId: HolyFreeze,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: HolyFreeze,
        previousSkillId: HolyFire,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: HolyFire,
        previousSkillId: Might,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Conviction,
        previousSkillId: Sanctuary,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Sanctuary,
        previousSkillId: HolyFreeze,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Sanctuary,
        previousSkillId: Thorns,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FistoftheHeavens,
        previousSkillId: Conversion,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Conversion,
        previousSkillId: Vengeance,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Vengeance,
        previousSkillId: Zeal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Zeal,
        previousSkillId: Sacrifice,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FistoftheHeavens,
        previousSkillId: BlessedHammer,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BlessedHammer,
        previousSkillId: HolyBolt,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: HolyShield,
        previousSkillId: BlessedHammer,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: HolyShield,
        previousSkillId: Charge,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Charge,
        previousSkillId: Smite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Attract,
        previousSkillId: Confuse,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Confuse,
        previousSkillId: DimVision,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: LowerResist,
        previousSkillId: Decrepify,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: LowerResist,
        previousSkillId: LifeTap,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: LifeTap,
        previousSkillId: IronMaiden,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: IronMaiden,
        previousSkillId: AmplifyDamage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Decrepify,
        previousSkillId: Terror,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Terror,
        previousSkillId: Weaken,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Weaken,
        previousSkillId: AmplifyDamage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: PoisonNova,
        previousSkillId: PoisonExplosion,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: PoisonExplosion,
        previousSkillId: PoisonDagger,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: PoisonExplosion,
        previousSkillId: CorpseExplosion,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BoneSpirit,
        previousSkillId: BoneSpear,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BoneSpear,
        previousSkillId: CorpseExplosion,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: CorpseExplosion,
        previousSkillId: Teeth,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BonePrison,
        previousSkillId: BoneSpear,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BonePrison,
        previousSkillId: BoneWall,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BoneWall,
        previousSkillId: BoneArmor,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: SummonResist,
        previousSkillId: GolemMastery,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: GolemMastery,
        previousSkillId: ClayGolem,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FireGolem,
        previousSkillId: IronGolem,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: IronGolem,
        previousSkillId: BloodGolem,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BloodGolem,
        previousSkillId: ClayGolem,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Revive,
        previousSkillId: IronGolem,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Revive,
        previousSkillId: RaiseSkeletalMage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: RaiseSkeletalMage,
        previousSkillId: RaiseSkeleton,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: SkeletonMastery,
        previousSkillId: RaiseSkeleton,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FrozenOrb,
        previousSkillId: Blizzard,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Blizzard,
        previousSkillId: FrostNova,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Blizzard,
        previousSkillId: GlacialSpike,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: GlacialSpike,
        previousSkillId: IceBlast,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: IceBlast,
        previousSkillId: IceBolt,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ChillingArmor,
        previousSkillId: ShiverArmor,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ShiverArmor,
        previousSkillId: IceBlast,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ShiverArmor,
        previousSkillId: FrozenArmor,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ThunderStorm,
        previousSkillId: Nova,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Nova,
        previousSkillId: StaticField,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ThunderStorm,
        previousSkillId: ChainLightning,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ChainLightning,
        previousSkillId: Lightning,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Lightning,
        previousSkillId: ChargedBolt,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: EnergyShield,
        previousSkillId: ChainLightning,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: EnergyShield,
        previousSkillId: Teleport,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Teleport,
        previousSkillId: Telekinesis,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Meteor,
        previousSkillId: FireWall,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FireWall,
        previousSkillId: Blaze,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Blaze,
        previousSkillId: Inferno,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Meteor,
        previousSkillId: FireBall,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FireBall,
        previousSkillId: FireBolt,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Hydra,
        previousSkillId: Enchant,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Enchant,
        previousSkillId: FireBall,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Enchant,
        previousSkillId: Warmth,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: SpiritofBarbs,
        previousSkillId: HeartofWolverine,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: HeartofWolverine,
        previousSkillId: OakSage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: SummonGrizzly,
        previousSkillId: SummonDireWolf,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: SummonDireWolf,
        previousSkillId: OakSage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: SummonDireWolf,
        previousSkillId: SummonSpiritWolf,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: SummonSpiritWolf,
        previousSkillId: Raven,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: SolarCreeper,
        previousSkillId: CarrionVine,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: CarrionVine,
        previousSkillId: PoisonCreeper,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Fury,
        previousSkillId: Rabies,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Rabies,
        previousSkillId: FeralRage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FeralRage,
        previousSkillId: Werewolf,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Lycanthropy,
        previousSkillId: Werewolf,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Hunger,
        previousSkillId: FireClaws,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FireClaws,
        previousSkillId: FeralRage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FireClaws,
        previousSkillId: Maul,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ShockWave,
        previousSkillId: Maul,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Maul,
        previousSkillId: Werebear,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: NaturalResistance,
        previousSkillId: IronSkin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: IncreasedSpeed,
        previousSkillId: IncreasedStamina,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Whirlwind,
        previousSkillId: Concentrate,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Whirlwind,
        previousSkillId: LeapAttack,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: LeapAttack,
        previousSkillId: Leap,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Berserk,
        previousSkillId: Concentrate,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Concentrate,
        previousSkillId: Stun,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Stun,
        previousSkillId: Bash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Frenzy,
        previousSkillId: DoubleThrow,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: DoubleThrow,
        previousSkillId: DoubleSwing,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: DoubleSwing,
        previousSkillId: Bash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: WarCry,
        previousSkillId: BattleCry,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BattleCry,
        previousSkillId: Taunt,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Taunt,
        previousSkillId: Howl,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: WarCry,
        previousSkillId: BattleOrders,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BattleCommand,
        previousSkillId: BattleOrders,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BattleOrders,
        previousSkillId: Shout,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Shout,
        previousSkillId: Howl,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: GrimWard,
        previousSkillId: FindItem,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: FindItem,
        previousSkillId: FindPotion,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: DeathSentry,
        previousSkillId: LightningSentry,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: LightningSentry,
        previousSkillId: ChargedBoltSentry,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ChargedBoltSentry,
        previousSkillId: ShockWeb,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ShockWeb,
        previousSkillId: FireBlast,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: WakeofInferno,
        previousSkillId: WakeofFire,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: WakeofFire,
        previousSkillId: FireBlast,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BladeShield,
        previousSkillId: BladeFury,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BladeFury,
        previousSkillId: WakeofFire,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BladeFury,
        previousSkillId: BladeSentinel,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Venom,
        previousSkillId: Fade,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Fade,
        previousSkillId: BurstofSpeed,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BurstofSpeed,
        previousSkillId: ClawMastery,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ShadowMaster,
        previousSkillId: ShadowWarrior,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ShadowWarrior,
        previousSkillId: WeaponBlock,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ShadowWarrior,
        previousSkillId: CloakofShadows,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: WeaponBlock,
        previousSkillId: ClawMastery,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: MindBlast,
        previousSkillId: CloakofShadows,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: CloakofShadows,
        previousSkillId: PsychicHammer,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: PhoenixStrike,
        previousSkillId: BladesofIce,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: PhoenixStrike,
        previousSkillId: CobraStrike,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: CobraStrike,
        previousSkillId: TigerStrike,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: BladesofIce,
        previousSkillId: ClawsofThunder,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ClawsofThunder,
        previousSkillId: FistsofFire,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: DragonFlight,
        previousSkillId: DragonTail,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: DragonTail,
        previousSkillId: DragonClaw,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: DragonClaw,
        previousSkillId: DragonTalon,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: LightningFury,
        previousSkillId: PlagueJavelin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: LightningStrike,
        previousSkillId: ChargedStrike,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Fend,
        previousSkillId: Impale,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ChargedStrike,
        previousSkillId: LightningBolt,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: ChargedStrike,
        previousSkillId: PowerStrike,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: PlagueJavelin,
        previousSkillId: LightningBolt,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: LightningBolt,
        previousSkillId: PoisonJavelin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: PowerStrike,
        previousSkillId: Jab,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Impale,
        previousSkillId: Jab,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
      {
        currentSkillId: Penetrate,
        previousSkillId: CriticalStrike,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Pierce,
        previousSkillId: Penetrate,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Valkyrie,
        previousSkillId: Evade,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Valkyrie,
        previousSkillId: Decoy,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Decoy,
        previousSkillId: SlowMissiles,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Evade,
        previousSkillId: Avoid,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: Avoid,
        previousSkillId: Dodge,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currentSkillId: SlowMissiles,
        previousSkillId: InnerSight,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('SkillSkill', null, {}),
};
