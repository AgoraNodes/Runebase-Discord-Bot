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

  // Fire Spells
  {
    name: "Fire Bolt",
    description: "Creates a bolt of fire.",
    initial: {
      minDamage: 3, // Starting min damage
      maxDamage: 6, // Starting max damage
      cost: 3,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Fireball",
    description: "Creates a ball of fire that explodes on impact.",
    initial: {
      minDamage: 6, // Starting min damage
      maxDamage: 15, // Starting max damage
      cost: 5,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      cost: 1, // mana cost added each level
    },
  },
  {
    name: "Fire Wall",
    description: "Creates a wall of fire.",
    initial: {
      minDamage: 70, // Starting min damage
      maxDamage: 94, // Starting max damage
      rounds: 2,
      cost: 22,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      rounds: 1,
      cost: 1, // mana cost added each level
    },
  },
  {
    name: "Inferno",
    description: "Put enemies on fire",
    initial: {
      minDamage: 12, // Starting min damage
      maxDamage: 25, // Starting max damage
      rounds: 2,
      cost: 7,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      rounds: 0.5,
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Meteor",
    description: "Draws down a meteor from the heavens to smash your enemies. puts enemies on fire for x rounds",
    initial: {
      minDamage: 12, // Starting min damage
      maxDamage: 25, // Starting max damage
      rounds: 2,
      cost: 17,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      rounds: 0.5,
      cost: 2, // mana cost added each level
    },
  },
  {
    name: "Blaze",
    description: "Smoke a pipe, increase fire damage and add critical strike to fire spells for x amount of rounds",
    initial: {
      "damageBonus %": 28,
      "critcalStrike %": 5,
      rounds: 2,
      cost: 11,
    },
    next: {
      "damageBonus %": 5,
      "critcalStrike %": 2,
      rounds: 1,
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Warmth",
    description: "Regenerates Mana each round",
    initial: {
      regen: 1, // Amount of mana regenerated
    },
    next: {
      regen: 1, // Amount of mana regenerated added each level
    },
  },
  {
    name: "Enchant",
    description: "This will be renamed to Fire Armor (armor + chance to put enemy on fire)",
    initial: {
      "armorBonus %": 45,
      "immolate %": 10,
      minDamage: 5,
      maxDamage: 10,
      rounds: 3,
      cost: 11,
    },
    next: {
      "armorBonus %": 5,
      "immolate %": 2,
      minDamage: 20,
      maxDamage: 20,
      rounds: 1,
      cost: 0,
    },
  },
  {
    name: "Hydra",
    description: "This will be renamed to Fireball Armor (armor + chance to cast a fireball)",
    initial: {
      "armorBonus %": 50,
      "fireball %": 10,
      rounds: 3,
      cost: 11,
    },
    next: {
      "armorBonus %": 5,
      "fireball %": 2,
      rounds: 1,
      cost: 0,
    },
  },
  {
    name: "Fire Mastery",
    description: "Add extra Fire Damage",
    initial: {
      "damageBonus %": 20,
    },
    next: {
      "damageBonus %": 5,
    },
  },

  // Lightning Spells
  {
    name: "Charged Bolt",
    description: "Creates a charged bolt.",
    initial: {
      minDamage: 2, // Starting min damage
      maxDamage: 4, // Starting max damage
      cost: 3,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Telekinesis",
    description: "Creates a charged bolt.",
    initial: {
      minDamage: 2, // Starting min damage
      maxDamage: 4, // Starting max damage
      "stun %": 10,
      cost: 3,
    },
    next: {
      minDamage: 55, // Percentage damage added each level (on starting damage)
      maxDamage: 47, // Percentage damage added each level (on starting damage)
      "stun %": 2,
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Static Field",
    description: "Removes % of enemies health",
    initial: {
      damage: 5,
      cost: 3,
    },
    next: {
      damage: 3,
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Lightning",
    description: "Shock all enemies",
    initial: {
      minDamage: 1, // Starting min damage
      maxDamage: 43, // Starting max damage
      cost: 3,
    },
    next: {
      minDamage: 55, // Starting min damage
      maxDamage: 47, // Starting max damage
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Nova",
    description: "Shock all enemies and chance to stun enemy",
    initial: {
      minDamage: 1, // Starting min damage
      maxDamage: 20, // Starting max damage
      "stun %": 5,
      cost: 3,
    },
    next: {
      minDamage: 55, // Starting min damage
      maxDamage: 47, // Starting max damage
      "stun %": 3,
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Chain Lightning",
    description: "Damages x amount of enemies and chance to stun enemy",
    initial: {
      minDamage: 1, // Starting min damage
      maxDamage: 40, // Starting max damage
      enemies: 2,
      "stun %": 5,
      cost: 3,
    },
    next: {
      minDamage: 55, // Starting min damage
      maxDamage: 47, // Starting max damage
      enemies: 0.1,
      "stun %": 1,
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Teleport",
    description: "This will be renamed to Lightning Armor (armor + chance to stun enemy)",
    initial: {
      "armorBonus %": 45,
      "stun %": 10,
      rounds: 3,
      cost: 11,
    },
    next: {
      "armorBonus %": 5,
      "stun %": 2,
      rounds: 1,
      cost: 0,
    },
  },
  {
    name: "Thunder Storm",
    description: "Hit a random enemy with lightning damage each round",
    initial: {
      minDamage: 1, // Starting min damage
      maxDamage: 100, // Starting max damage
      rounds: 2,
      cost: 19,
    },
    next: {
      minDamage: 10, // Starting min damage
      maxDamage: 10, // Starting max damage
      rounds: 1,
      cost: 0, // mana cost added each level
    },
  },
  {
    name: "Energy Shield",
    description: "Absorbs damage to Mana instead of Life for x amount of rounds.",
    initial: {
      'absorb %': 20, // Starting min damage
      rounds: 2,
      cost: 19,
    },
    next: {
      'absorb %': 3, // Starting min damage
      rounds: 1,
      cost: 0,
    },
  },
  {
    name: "Lightning Mastery",
    description: "Add extra Lightning Damage",
    initial: {
      "damageBonus %": 20,
    },
    next: {
      "damageBonus %": 5,
    },
  },
];

export default wizard;
