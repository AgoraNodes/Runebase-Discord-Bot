const wizard = [
  // Cold Spells
  {
    name: "Ice Bolt",
    description: "One of the first spells a novice of the frigid elements learns is the power to summon crystals of pure freezing energy. When hurled at her enemies, these bolts subject their targets to freezing pain and impaired movement.",
    initial: {
      minDamage: 3, // Starting min damage
      maxDamage: 5, // Starting max damage
      cost: 3,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Ice Blast",
    description: "The freezing damage of this spell can leave the opponent frozen",
    initial: {
      minDamage: 8, // Starting min damage
      maxDamage: 12, // Starting max damage
      "Freeze %": 10,
      cost: 3,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      "Freeze %": 2,
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Glacial Spike",
    description: "More powerful than an Ice Blast, this is the offensive spell of choice for a higher-level Sorceress seeking a quick deathblow.",
    initial: {
      minDamage: 17, // Starting min damage
      maxDamage: 26, // Starting max damage
      "Freeze %": 10,
      cost: 10,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      "Freeze %": 2,
      cost: 1, // mana cost added each level
    },
  },
  {
    name: "Frost Nova",
    description: "Like the Lightning Nova, this spell is effective against large groups of swarming melee attackers. Although less damaging than its electrical kin, the immobilizing effects of the cold can convey other advantages.",
    initial: {
      minDamage: 2, // Starting min damage
      maxDamage: 4, // Starting max damage
      "Freeze %": 10,
      cost: 9,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      "Freeze %": 2,
      cost: 1, // mana cost added each level
    },
  },
  {
    name: "Blizzard",
    description: "Summons an ice storm to rain cold death onto your enemies.",
    initial: {
      minDamage: 51, // Starting min damage
      maxDamage: 86, // Starting max damage
      rounds: 2,
      "Freeze %": 10,
      cost: 23,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      rounds: 0.5,
      "Freeze %": 2,
      cost: 1, // mana cost added each level
    },
  },
  {
    name: "Frozen Orb",
    description: "A pulsating orb that shreds an area with ice bolts.",
    initial: {
      minDamage: 40, // Starting min damage
      maxDamage: 45, // Starting max damage
      "Freeze %": 10,
      cost: 25,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      "Freeze %": 2,
      cost: 1, // mana cost added each level
    },
  },
  {
    name: "Frozen Armor",
    description: "This defensive spell is a useful tool for protecting the novice from the dangers of combat.",
    initial: {
      "armorBonus %": 30,
      "iceBolt %": 10,
      rounds: 3,
      cost: 7,
    },
    next: {
      "armorBonus %": 5,
      "iceBolt %": 3,
      rounds: 1,
      cost: 0,
    },
  },
  {
    name: "Shiver Armor",
    description: "A significant upgrade from frozen armor, this defensive shield deals an icy blast to any attackers,",
    initial: {
      "armorBonus %": 45,
      "iceBlast %": 10,
      rounds: 3,
      cost: 11,
    },
    next: {
      "armorBonus %": 5,
      "iceBlast %": 3,
      rounds: 1,
      cost: 0,
    },
  },
  {
    name: "Chilling Armor",
    description: "The best defensive spell available to a Sorceress is manifest in this formidable armor.",
    initial: {
      "armorBonus %": 45,
      "iceBlast %": 10,
      "Freeze %": 10,
      rounds: 3,
      cost: 11,
    },
    next: {
      "armorBonus %": 5,
      "iceBlast %": 3,
      "Freeze %": 2,
      rounds: 1,
      cost: 0,
    },
  },
  {
    name: "Cold Mastery",
    description: "Add extra Cold Damage",
    initial: {
      "damageBonus %": 20,
    },
    next: {
      "damageBonus %": 5,
    },
  },
];

export default wizard;
