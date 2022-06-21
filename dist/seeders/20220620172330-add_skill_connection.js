"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var MagicArrowSkills, FireArrowSkills, MultipleShotskills, ExplodingArrowSkills, ColdArrow, IceArrow, GuidedArrow, Strafe, ImmolationArrow, FreezingArrow, InnerSight, CriticalStrike, Dodge, SlowMissiles, Avoid, Penetrate, Decoy, Evade, Valkyrie, Pierce, Jab, PowerStrike, PoisonJavelin, Impale, LightningBolt, ChargedStrike, PlagueJavelin, Fend, LightningStrike, LightningFury, TigerStrike, DragonTalon, FistsofFire, DragonClaw, CobraStrike, ClawsofThunder, DragonTail, BladesofIce, DragonFlight, PhoenixStrike, ClawMastery, PsychicHammer, BurstofSpeed, WeaponBlock, CloakofShadows, Fade, ShadowWarrior, MindBlast, Venom, ShadowMaster, FireBlast, ShockWeb, BladeSentinel, ChargedBoltSentry, WakeofFire, BladeFury, LightningSentry, WakeofInferno, DeathSentry, BladeShield, Howl, FindPotion, Taunt, Shout, FindItem, BattleCry, BattleOrders, GrimWard, WarCry, BattleCommand, Bash, Leap, DoubleSwing, Stun, DoubleThrow, LeapAttack, Concentrate, Frenzy, Whirlwind, Berserk, NaturalResistance, IncreasedSpeed, IronSkin, IncreasedStamina, Werewolf, Lycanthropy, Werebear, FeralRage, Maul, Rabies, FireClaws, Hunger, ShockWave, Fury, Raven, PoisonCreeper, OakSage, SummonSpiritWolf, CarrionVine, HeartofWolverine, SummonDireWolf, SolarCreeper, SpiritofBarbs, SummonGrizzly, FireBolt, Warmth, Inferno, Blaze, FireBall, FireWall, Enchant, Meteor, FireMastery, Hydra, ChargedBolt, StaticField, Telekinesis, Nova, Lightning, ChainLightning, Teleport, ThunderStorm, EnergyShield, LightningMastery, IceBolt, FrozenArmor, FrostNova, IceBlast, ShiverArmor, GlacialSpike, Blizzard, ChillingArmor, FrozenOrb, RaiseSkeleton, SkeletonMastery, ClayGolem, GolemMastery, RaiseSkeletalMage, BloodGolem, SummonResist, IronGolem, FireGolem, Revive, Teeth, BoneArmor, PoisonDagger, CorpseExplosion, BoneWall, PoisonExplosion, BoneSpear, BonePrison, PoisonNova, BoneSpirit, AmplifyDamage, DimVision, Weaken, IronMaiden, Terror, Confuse, LifeTap, Attract, Decrepify, LowerResist, Sacrifice, Smite, HolyBolt, Zeal, Charge, Vengeance, BlessedHammer, Conversion, HolyShield, FistoftheHeavens, Might, HolyFire, Thorns, BlessedAim, Concentration, HolyFreeze, HolyShock, Sanctuary, Fanaticism, Conviction, Prayer, ResistFire, ResistCold, ResistLightning, Defiance, Cleansing, Vigor, Meditation, Redemption, Salvation;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Magic Arrow'
                }
              }, ['id']);

            case 2:
              MagicArrowSkills = _context.sent;
              _context.next = 5;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fire Arrow'
                }
              }, ['id']);

            case 5:
              FireArrowSkills = _context.sent;
              _context.next = 8;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Multiple Shot'
                }
              }, ['id']);

            case 8:
              MultipleShotskills = _context.sent;
              _context.next = 11;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Exploding Arrow'
                }
              }, ['id']);

            case 11:
              ExplodingArrowSkills = _context.sent;
              _context.next = 14;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Cold Arrow'
                }
              }, ['id']);

            case 14:
              ColdArrow = _context.sent;
              _context.next = 17;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Ice Arrow'
                }
              }, ['id']);

            case 17:
              IceArrow = _context.sent;
              _context.next = 20;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Guided Arrow'
                }
              }, ['id']);

            case 20:
              GuidedArrow = _context.sent;
              _context.next = 23;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Strafe'
                }
              }, ['id']);

            case 23:
              Strafe = _context.sent;
              _context.next = 26;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Immolation Arrow'
                }
              }, ['id']);

            case 26:
              ImmolationArrow = _context.sent;
              _context.next = 29;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Freezing Arrow'
                }
              }, ['id']);

            case 29:
              FreezingArrow = _context.sent;
              _context.next = 32;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Inner Sight'
                }
              }, ['id']);

            case 32:
              InnerSight = _context.sent;
              _context.next = 35;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Critical Strike'
                }
              }, ['id']);

            case 35:
              CriticalStrike = _context.sent;
              _context.next = 38;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Dodge'
                }
              }, ['id']);

            case 38:
              Dodge = _context.sent;
              _context.next = 41;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Slow Missiles'
                }
              }, ['id']);

            case 41:
              SlowMissiles = _context.sent;
              _context.next = 44;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Avoid'
                }
              }, ['id']);

            case 44:
              Avoid = _context.sent;
              _context.next = 47;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Penetrate'
                }
              }, ['id']);

            case 47:
              Penetrate = _context.sent;
              _context.next = 50;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Decoy'
                }
              }, ['id']);

            case 50:
              Decoy = _context.sent;
              _context.next = 53;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Evade'
                }
              }, ['id']);

            case 53:
              Evade = _context.sent;
              _context.next = 56;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Valkyrie'
                }
              }, ['id']);

            case 56:
              Valkyrie = _context.sent;
              _context.next = 59;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Pierce'
                }
              }, ['id']);

            case 59:
              Pierce = _context.sent;
              _context.next = 62;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Jab'
                }
              }, ['id']);

            case 62:
              Jab = _context.sent;
              _context.next = 65;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Power Strike'
                }
              }, ['id']);

            case 65:
              PowerStrike = _context.sent;
              _context.next = 68;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Poison Javelin'
                }
              }, ['id']);

            case 68:
              PoisonJavelin = _context.sent;
              _context.next = 71;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Impale'
                }
              }, ['id']);

            case 71:
              Impale = _context.sent;
              _context.next = 74;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Lightning Bolt'
                }
              }, ['id']);

            case 74:
              LightningBolt = _context.sent;
              _context.next = 77;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Charged Strike'
                }
              }, ['id']);

            case 77:
              ChargedStrike = _context.sent;
              _context.next = 80;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Plague Javelin'
                }
              }, ['id']);

            case 80:
              PlagueJavelin = _context.sent;
              _context.next = 83;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fend'
                }
              }, ['id']);

            case 83:
              Fend = _context.sent;
              _context.next = 86;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Lightning Strike'
                }
              }, ['id']);

            case 86:
              LightningStrike = _context.sent;
              _context.next = 89;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Lightning Fury'
                }
              }, ['id']);

            case 89:
              LightningFury = _context.sent;
              _context.next = 92;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Tiger Strike'
                }
              }, ['id']);

            case 92:
              TigerStrike = _context.sent;
              _context.next = 95;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Dragon Talon'
                }
              }, ['id']);

            case 95:
              DragonTalon = _context.sent;
              _context.next = 98;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fists of Fire'
                }
              }, ['id']);

            case 98:
              FistsofFire = _context.sent;
              _context.next = 101;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Dragon Claw'
                }
              }, ['id']);

            case 101:
              DragonClaw = _context.sent;
              _context.next = 104;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Cobra Strike'
                }
              }, ['id']);

            case 104:
              CobraStrike = _context.sent;
              _context.next = 107;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Claws of Thunder'
                }
              }, ['id']);

            case 107:
              ClawsofThunder = _context.sent;
              _context.next = 110;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Dragon Tail'
                }
              }, ['id']);

            case 110:
              DragonTail = _context.sent;
              _context.next = 113;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Blades of Ice'
                }
              }, ['id']);

            case 113:
              BladesofIce = _context.sent;
              _context.next = 116;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Dragon Flight'
                }
              }, ['id']);

            case 116:
              DragonFlight = _context.sent;
              _context.next = 119;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Phoenix Strike'
                }
              }, ['id']);

            case 119:
              PhoenixStrike = _context.sent;
              _context.next = 122;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Claw Mastery'
                }
              }, ['id']);

            case 122:
              ClawMastery = _context.sent;
              _context.next = 125;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Psychic Hammer'
                }
              }, ['id']);

            case 125:
              PsychicHammer = _context.sent;
              _context.next = 128;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Burst of Speed'
                }
              }, ['id']);

            case 128:
              BurstofSpeed = _context.sent;
              _context.next = 131;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Weapon Block'
                }
              }, ['id']);

            case 131:
              WeaponBlock = _context.sent;
              _context.next = 134;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Cloak of Shadows'
                }
              }, ['id']);

            case 134:
              CloakofShadows = _context.sent;
              _context.next = 137;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fade'
                }
              }, ['id']);

            case 137:
              Fade = _context.sent;
              _context.next = 140;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Shadow Warrior'
                }
              }, ['id']);

            case 140:
              ShadowWarrior = _context.sent;
              _context.next = 143;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Mind Blast'
                }
              }, ['id']);

            case 143:
              MindBlast = _context.sent;
              _context.next = 146;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Venom'
                }
              }, ['id']);

            case 146:
              Venom = _context.sent;
              _context.next = 149;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Shadow Master'
                }
              }, ['id']);

            case 149:
              ShadowMaster = _context.sent;
              _context.next = 152;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fire Blast'
                }
              }, ['id']);

            case 152:
              FireBlast = _context.sent;
              _context.next = 155;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Shock Web'
                }
              }, ['id']);

            case 155:
              ShockWeb = _context.sent;
              _context.next = 158;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Blade Sentinel'
                }
              }, ['id']);

            case 158:
              BladeSentinel = _context.sent;
              _context.next = 161;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Charged Bolt Sentry'
                }
              }, ['id']);

            case 161:
              ChargedBoltSentry = _context.sent;
              _context.next = 164;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Wake of Fire'
                }
              }, ['id']);

            case 164:
              WakeofFire = _context.sent;
              _context.next = 167;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Blade Fury'
                }
              }, ['id']);

            case 167:
              BladeFury = _context.sent;
              _context.next = 170;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Lightning Sentry'
                }
              }, ['id']);

            case 170:
              LightningSentry = _context.sent;
              _context.next = 173;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Wake of Inferno'
                }
              }, ['id']);

            case 173:
              WakeofInferno = _context.sent;
              _context.next = 176;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Death Sentry'
                }
              }, ['id']);

            case 176:
              DeathSentry = _context.sent;
              _context.next = 179;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Blade Shield'
                }
              }, ['id']);

            case 179:
              BladeShield = _context.sent;
              _context.next = 182;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Howl'
                }
              }, ['id']);

            case 182:
              Howl = _context.sent;
              _context.next = 185;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Find Potion'
                }
              }, ['id']);

            case 185:
              FindPotion = _context.sent;
              _context.next = 188;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Taunt'
                }
              }, ['id']);

            case 188:
              Taunt = _context.sent;
              _context.next = 191;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Shout'
                }
              }, ['id']);

            case 191:
              Shout = _context.sent;
              _context.next = 194;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Find Item'
                }
              }, ['id']);

            case 194:
              FindItem = _context.sent;
              _context.next = 197;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Battle Cry'
                }
              }, ['id']);

            case 197:
              BattleCry = _context.sent;
              _context.next = 200;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Battle Orders'
                }
              }, ['id']);

            case 200:
              BattleOrders = _context.sent;
              _context.next = 203;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Grim Ward'
                }
              }, ['id']);

            case 203:
              GrimWard = _context.sent;
              _context.next = 206;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'War Cry'
                }
              }, ['id']);

            case 206:
              WarCry = _context.sent;
              _context.next = 209;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Battle Command'
                }
              }, ['id']);

            case 209:
              BattleCommand = _context.sent;
              _context.next = 212;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Bash'
                }
              }, ['id']);

            case 212:
              Bash = _context.sent;
              _context.next = 215;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Leap'
                }
              }, ['id']);

            case 215:
              Leap = _context.sent;
              _context.next = 218;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Double Swing'
                }
              }, ['id']);

            case 218:
              DoubleSwing = _context.sent;
              _context.next = 221;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Stun'
                }
              }, ['id']);

            case 221:
              Stun = _context.sent;
              _context.next = 224;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Double Throw'
                }
              }, ['id']);

            case 224:
              DoubleThrow = _context.sent;
              _context.next = 227;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Leap Attack'
                }
              }, ['id']);

            case 227:
              LeapAttack = _context.sent;
              _context.next = 230;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Concentrate'
                }
              }, ['id']);

            case 230:
              Concentrate = _context.sent;
              _context.next = 233;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Frenzy'
                }
              }, ['id']);

            case 233:
              Frenzy = _context.sent;
              _context.next = 236;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Whirlwind'
                }
              }, ['id']);

            case 236:
              Whirlwind = _context.sent;
              _context.next = 239;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Berserk'
                }
              }, ['id']);

            case 239:
              Berserk = _context.sent;
              _context.next = 242;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Natural Resistance'
                }
              }, ['id']);

            case 242:
              NaturalResistance = _context.sent;
              _context.next = 245;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Increased Speed'
                }
              }, ['id']);

            case 245:
              IncreasedSpeed = _context.sent;
              _context.next = 248;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Iron Skin'
                }
              }, ['id']);

            case 248:
              IronSkin = _context.sent;
              _context.next = 251;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Increased Stamina'
                }
              }, ['id']);

            case 251:
              IncreasedStamina = _context.sent;
              _context.next = 254;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Werewolf'
                }
              }, ['id']);

            case 254:
              Werewolf = _context.sent;
              _context.next = 257;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Lycanthropy'
                }
              }, ['id']);

            case 257:
              Lycanthropy = _context.sent;
              _context.next = 260;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Werebear'
                }
              }, ['id']);

            case 260:
              Werebear = _context.sent;
              _context.next = 263;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Feral Rage'
                }
              }, ['id']);

            case 263:
              FeralRage = _context.sent;
              _context.next = 266;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Maul'
                }
              }, ['id']);

            case 266:
              Maul = _context.sent;
              _context.next = 269;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Rabies'
                }
              }, ['id']);

            case 269:
              Rabies = _context.sent;
              _context.next = 272;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fire Claws'
                }
              }, ['id']);

            case 272:
              FireClaws = _context.sent;
              _context.next = 275;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Hunger'
                }
              }, ['id']);

            case 275:
              Hunger = _context.sent;
              _context.next = 278;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Shock Wave'
                }
              }, ['id']);

            case 278:
              ShockWave = _context.sent;
              _context.next = 281;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fury'
                }
              }, ['id']);

            case 281:
              Fury = _context.sent;
              _context.next = 284;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Raven'
                }
              }, ['id']);

            case 284:
              Raven = _context.sent;
              _context.next = 287;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Poison Creeper'
                }
              }, ['id']);

            case 287:
              PoisonCreeper = _context.sent;
              _context.next = 290;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Oak Sage'
                }
              }, ['id']);

            case 290:
              OakSage = _context.sent;
              _context.next = 293;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Summon Spirit Wolf'
                }
              }, ['id']);

            case 293:
              SummonSpiritWolf = _context.sent;
              _context.next = 296;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Carrion Vine'
                }
              }, ['id']);

            case 296:
              CarrionVine = _context.sent;
              _context.next = 299;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Heart of Wolverine'
                }
              }, ['id']);

            case 299:
              HeartofWolverine = _context.sent;
              _context.next = 302;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Summon Dire Wolf'
                }
              }, ['id']);

            case 302:
              SummonDireWolf = _context.sent;
              _context.next = 305;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Solar Creeper'
                }
              }, ['id']);

            case 305:
              SolarCreeper = _context.sent;
              _context.next = 308;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Spirit of Barbs'
                }
              }, ['id']);

            case 308:
              SpiritofBarbs = _context.sent;
              _context.next = 311;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Summon Grizzly'
                }
              }, ['id']);

            case 311:
              SummonGrizzly = _context.sent;
              _context.next = 314;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fire Bolt'
                }
              }, ['id']);

            case 314:
              FireBolt = _context.sent;
              _context.next = 317;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Warmth'
                }
              }, ['id']);

            case 317:
              Warmth = _context.sent;
              _context.next = 320;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Inferno'
                }
              }, ['id']);

            case 320:
              Inferno = _context.sent;
              _context.next = 323;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Blaze'
                }
              }, ['id']);

            case 323:
              Blaze = _context.sent;
              _context.next = 326;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fire Ball'
                }
              }, ['id']);

            case 326:
              FireBall = _context.sent;
              _context.next = 329;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fire Wall'
                }
              }, ['id']);

            case 329:
              FireWall = _context.sent;
              _context.next = 332;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Enchant'
                }
              }, ['id']);

            case 332:
              Enchant = _context.sent;
              _context.next = 335;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Meteor'
                }
              }, ['id']);

            case 335:
              Meteor = _context.sent;
              _context.next = 338;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fire Mastery'
                }
              }, ['id']);

            case 338:
              FireMastery = _context.sent;
              _context.next = 341;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Hydra'
                }
              }, ['id']);

            case 341:
              Hydra = _context.sent;
              _context.next = 344;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Charged Bolt'
                }
              }, ['id']);

            case 344:
              ChargedBolt = _context.sent;
              _context.next = 347;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Static Field'
                }
              }, ['id']);

            case 347:
              StaticField = _context.sent;
              _context.next = 350;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Telekinesis'
                }
              }, ['id']);

            case 350:
              Telekinesis = _context.sent;
              _context.next = 353;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Nova'
                }
              }, ['id']);

            case 353:
              Nova = _context.sent;
              _context.next = 356;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Lightning'
                }
              }, ['id']);

            case 356:
              Lightning = _context.sent;
              _context.next = 359;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Chain Lightning'
                }
              }, ['id']);

            case 359:
              ChainLightning = _context.sent;
              _context.next = 362;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Teleport'
                }
              }, ['id']);

            case 362:
              Teleport = _context.sent;
              _context.next = 365;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Thunder Storm'
                }
              }, ['id']);

            case 365:
              ThunderStorm = _context.sent;
              _context.next = 368;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Energy Shield'
                }
              }, ['id']);

            case 368:
              EnergyShield = _context.sent;
              _context.next = 371;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Lightning Mastery'
                }
              }, ['id']);

            case 371:
              LightningMastery = _context.sent;
              _context.next = 374;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Ice Bolt'
                }
              }, ['id']);

            case 374:
              IceBolt = _context.sent;
              _context.next = 377;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Frozen Armor'
                }
              }, ['id']);

            case 377:
              FrozenArmor = _context.sent;
              _context.next = 380;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Frost Nova'
                }
              }, ['id']);

            case 380:
              FrostNova = _context.sent;
              _context.next = 383;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Ice Blast'
                }
              }, ['id']);

            case 383:
              IceBlast = _context.sent;
              _context.next = 386;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Shiver Armor'
                }
              }, ['id']);

            case 386:
              ShiverArmor = _context.sent;
              _context.next = 389;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Glacial Spike'
                }
              }, ['id']);

            case 389:
              GlacialSpike = _context.sent;
              _context.next = 392;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Blizzard'
                }
              }, ['id']);

            case 392:
              Blizzard = _context.sent;
              _context.next = 395;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Chilling Armor'
                }
              }, ['id']);

            case 395:
              ChillingArmor = _context.sent;
              _context.next = 398;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Frozen Orb'
                }
              }, ['id']);

            case 398:
              FrozenOrb = _context.sent;
              _context.next = 401;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Raise Skeleton'
                }
              }, ['id']);

            case 401:
              RaiseSkeleton = _context.sent;
              _context.next = 404;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Skeleton Mastery'
                }
              }, ['id']);

            case 404:
              SkeletonMastery = _context.sent;
              _context.next = 407;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Clay Golem'
                }
              }, ['id']);

            case 407:
              ClayGolem = _context.sent;
              _context.next = 410;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Golem Mastery'
                }
              }, ['id']);

            case 410:
              GolemMastery = _context.sent;
              _context.next = 413;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Raise Skeletal Mage'
                }
              }, ['id']);

            case 413:
              RaiseSkeletalMage = _context.sent;
              _context.next = 416;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Blood Golem'
                }
              }, ['id']);

            case 416:
              BloodGolem = _context.sent;
              _context.next = 419;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Summon Resist'
                }
              }, ['id']);

            case 419:
              SummonResist = _context.sent;
              _context.next = 422;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Iron Golem'
                }
              }, ['id']);

            case 422:
              IronGolem = _context.sent;
              _context.next = 425;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fire Golem'
                }
              }, ['id']);

            case 425:
              FireGolem = _context.sent;
              _context.next = 428;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Revive'
                }
              }, ['id']);

            case 428:
              Revive = _context.sent;
              _context.next = 431;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Teeth'
                }
              }, ['id']);

            case 431:
              Teeth = _context.sent;
              _context.next = 434;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Bone Armor'
                }
              }, ['id']);

            case 434:
              BoneArmor = _context.sent;
              _context.next = 437;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Poison Dagger'
                }
              }, ['id']);

            case 437:
              PoisonDagger = _context.sent;
              _context.next = 440;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Corpse Explosion'
                }
              }, ['id']);

            case 440:
              CorpseExplosion = _context.sent;
              _context.next = 443;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Bone Wall'
                }
              }, ['id']);

            case 443:
              BoneWall = _context.sent;
              _context.next = 446;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Poison Explosion'
                }
              }, ['id']);

            case 446:
              PoisonExplosion = _context.sent;
              _context.next = 449;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Bone Spear'
                }
              }, ['id']);

            case 449:
              BoneSpear = _context.sent;
              _context.next = 452;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Bone Prison'
                }
              }, ['id']);

            case 452:
              BonePrison = _context.sent;
              _context.next = 455;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Poison Nova'
                }
              }, ['id']);

            case 455:
              PoisonNova = _context.sent;
              _context.next = 458;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Bone Spirit'
                }
              }, ['id']);

            case 458:
              BoneSpirit = _context.sent;
              _context.next = 461;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Amplify Damage'
                }
              }, ['id']);

            case 461:
              AmplifyDamage = _context.sent;
              _context.next = 464;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Dim Vision'
                }
              }, ['id']);

            case 464:
              DimVision = _context.sent;
              _context.next = 467;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Weaken'
                }
              }, ['id']);

            case 467:
              Weaken = _context.sent;
              _context.next = 470;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Iron Maiden'
                }
              }, ['id']);

            case 470:
              IronMaiden = _context.sent;
              _context.next = 473;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Terror'
                }
              }, ['id']);

            case 473:
              Terror = _context.sent;
              _context.next = 476;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Confuse'
                }
              }, ['id']);

            case 476:
              Confuse = _context.sent;
              _context.next = 479;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Life Tap'
                }
              }, ['id']);

            case 479:
              LifeTap = _context.sent;
              _context.next = 482;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Attract'
                }
              }, ['id']);

            case 482:
              Attract = _context.sent;
              _context.next = 485;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Decrepify'
                }
              }, ['id']);

            case 485:
              Decrepify = _context.sent;
              _context.next = 488;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Lower Resist'
                }
              }, ['id']);

            case 488:
              LowerResist = _context.sent;
              _context.next = 491;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Sacrifice'
                }
              }, ['id']);

            case 491:
              Sacrifice = _context.sent;
              _context.next = 494;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Smite'
                }
              }, ['id']);

            case 494:
              Smite = _context.sent;
              _context.next = 497;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Holy Bolt'
                }
              }, ['id']);

            case 497:
              HolyBolt = _context.sent;
              _context.next = 500;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Zeal'
                }
              }, ['id']);

            case 500:
              Zeal = _context.sent;
              _context.next = 503;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Charge'
                }
              }, ['id']);

            case 503:
              Charge = _context.sent;
              _context.next = 506;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Vengeance'
                }
              }, ['id']);

            case 506:
              Vengeance = _context.sent;
              _context.next = 509;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Blessed Hammer'
                }
              }, ['id']);

            case 509:
              BlessedHammer = _context.sent;
              _context.next = 512;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Conversion'
                }
              }, ['id']);

            case 512:
              Conversion = _context.sent;
              _context.next = 515;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Holy Shield'
                }
              }, ['id']);

            case 515:
              HolyShield = _context.sent;
              _context.next = 518;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fist of the Heavens'
                }
              }, ['id']);

            case 518:
              FistoftheHeavens = _context.sent;
              _context.next = 521;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Might'
                }
              }, ['id']);

            case 521:
              Might = _context.sent;
              _context.next = 524;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Holy Fire'
                }
              }, ['id']);

            case 524:
              HolyFire = _context.sent;
              _context.next = 527;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Thorns'
                }
              }, ['id']);

            case 527:
              Thorns = _context.sent;
              _context.next = 530;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Blessed Aim'
                }
              }, ['id']);

            case 530:
              BlessedAim = _context.sent;
              _context.next = 533;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Concentration'
                }
              }, ['id']);

            case 533:
              Concentration = _context.sent;
              _context.next = 536;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Holy Freeze'
                }
              }, ['id']);

            case 536:
              HolyFreeze = _context.sent;
              _context.next = 539;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Holy Shock'
                }
              }, ['id']);

            case 539:
              HolyShock = _context.sent;
              _context.next = 542;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Sanctuary'
                }
              }, ['id']);

            case 542:
              Sanctuary = _context.sent;
              _context.next = 545;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Fanaticism'
                }
              }, ['id']);

            case 545:
              Fanaticism = _context.sent;
              _context.next = 548;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Conviction'
                }
              }, ['id']);

            case 548:
              Conviction = _context.sent;
              _context.next = 551;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Prayer'
                }
              }, ['id']);

            case 551:
              Prayer = _context.sent;
              _context.next = 554;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Resist Fire'
                }
              }, ['id']);

            case 554:
              ResistFire = _context.sent;
              _context.next = 557;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Resist Cold'
                }
              }, ['id']);

            case 557:
              ResistCold = _context.sent;
              _context.next = 560;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Resist Lightning'
                }
              }, ['id']);

            case 560:
              ResistLightning = _context.sent;
              _context.next = 563;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Defiance'
                }
              }, ['id']);

            case 563:
              Defiance = _context.sent;
              _context.next = 566;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Cleansing'
                }
              }, ['id']);

            case 566:
              Cleansing = _context.sent;
              _context.next = 569;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Vigor'
                }
              }, ['id']);

            case 569:
              Vigor = _context.sent;
              _context.next = 572;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Meditation'
                }
              }, ['id']);

            case 572:
              Meditation = _context.sent;
              _context.next = 575;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Redemption'
                }
              }, ['id']);

            case 575:
              Redemption = _context.sent;
              _context.next = 578;
              return queryInterface.rawSelect('skill', {
                where: {
                  name: 'Salvation'
                }
              }, ['id']);

            case 578:
              Salvation = _context.sent;
              _context.next = 581;
              return queryInterface.bulkInsert('SkillSkill', [{
                currentSkillId: Meditation,
                previousSkillId: Cleansing,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Cleansing,
                previousSkillId: Prayer,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Redemption,
                previousSkillId: Vigor,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Vigor,
                previousSkillId: Cleansing,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Vigor,
                previousSkillId: Defiance,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Fanaticism,
                previousSkillId: Concentration,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Concentration,
                previousSkillId: BlessedAim,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BlessedAim,
                previousSkillId: Might,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: HolyShock,
                previousSkillId: HolyFreeze,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: HolyFreeze,
                previousSkillId: HolyFire,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: HolyFire,
                previousSkillId: Might,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Conviction,
                previousSkillId: Sanctuary,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Sanctuary,
                previousSkillId: HolyFreeze,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Sanctuary,
                previousSkillId: Thorns,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FistoftheHeavens,
                previousSkillId: Conversion,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Conversion,
                previousSkillId: Vengeance,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Vengeance,
                previousSkillId: Zeal,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Zeal,
                previousSkillId: Sacrifice,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FistoftheHeavens,
                previousSkillId: BlessedHammer,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BlessedHammer,
                previousSkillId: HolyBolt,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: HolyShield,
                previousSkillId: BlessedHammer,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: HolyShield,
                previousSkillId: Charge,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Charge,
                previousSkillId: Smite,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Attract,
                previousSkillId: Confuse,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Confuse,
                previousSkillId: DimVision,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: LowerResist,
                previousSkillId: Decrepify,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: LowerResist,
                previousSkillId: LifeTap,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: LifeTap,
                previousSkillId: IronMaiden,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: IronMaiden,
                previousSkillId: AmplifyDamage,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Decrepify,
                previousSkillId: Terror,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Terror,
                previousSkillId: Weaken,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Weaken,
                previousSkillId: AmplifyDamage,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: PoisonNova,
                previousSkillId: PoisonExplosion,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: PoisonExplosion,
                previousSkillId: PoisonDagger,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: PoisonExplosion,
                previousSkillId: CorpseExplosion,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BoneSpirit,
                previousSkillId: BoneSpear,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BoneSpear,
                previousSkillId: CorpseExplosion,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: CorpseExplosion,
                previousSkillId: Teeth,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BonePrison,
                previousSkillId: BoneSpear,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BonePrison,
                previousSkillId: BoneWall,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BoneWall,
                previousSkillId: BoneArmor,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: SummonResist,
                previousSkillId: GolemMastery,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: GolemMastery,
                previousSkillId: ClayGolem,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FireGolem,
                previousSkillId: IronGolem,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: IronGolem,
                previousSkillId: BloodGolem,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BloodGolem,
                previousSkillId: ClayGolem,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Revive,
                previousSkillId: IronGolem,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Revive,
                previousSkillId: RaiseSkeletalMage,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: RaiseSkeletalMage,
                previousSkillId: RaiseSkeleton,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: SkeletonMastery,
                previousSkillId: RaiseSkeleton,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FrozenOrb,
                previousSkillId: Blizzard,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Blizzard,
                previousSkillId: FrostNova,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Blizzard,
                previousSkillId: GlacialSpike,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: GlacialSpike,
                previousSkillId: IceBlast,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: IceBlast,
                previousSkillId: IceBolt,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ChillingArmor,
                previousSkillId: ShiverArmor,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ShiverArmor,
                previousSkillId: IceBlast,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ShiverArmor,
                previousSkillId: FrozenArmor,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ThunderStorm,
                previousSkillId: Nova,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Nova,
                previousSkillId: StaticField,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ThunderStorm,
                previousSkillId: ChainLightning,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ChainLightning,
                previousSkillId: Lightning,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Lightning,
                previousSkillId: ChargedBolt,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: EnergyShield,
                previousSkillId: ChainLightning,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: EnergyShield,
                previousSkillId: Teleport,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Teleport,
                previousSkillId: Telekinesis,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Meteor,
                previousSkillId: FireWall,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FireWall,
                previousSkillId: Blaze,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Blaze,
                previousSkillId: Inferno,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Meteor,
                previousSkillId: FireBall,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FireBall,
                previousSkillId: FireBolt,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Hydra,
                previousSkillId: Enchant,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Enchant,
                previousSkillId: FireBall,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Enchant,
                previousSkillId: Warmth,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: SpiritofBarbs,
                previousSkillId: HeartofWolverine,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: HeartofWolverine,
                previousSkillId: OakSage,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: SummonGrizzly,
                previousSkillId: SummonDireWolf,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: SummonDireWolf,
                previousSkillId: OakSage,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: SummonDireWolf,
                previousSkillId: SummonSpiritWolf,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: SummonSpiritWolf,
                previousSkillId: Raven,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: SolarCreeper,
                previousSkillId: CarrionVine,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: CarrionVine,
                previousSkillId: PoisonCreeper,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Fury,
                previousSkillId: Rabies,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Rabies,
                previousSkillId: FeralRage,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FeralRage,
                previousSkillId: Werewolf,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Lycanthropy,
                previousSkillId: Werewolf,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Hunger,
                previousSkillId: FireClaws,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FireClaws,
                previousSkillId: FeralRage,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FireClaws,
                previousSkillId: Maul,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ShockWave,
                previousSkillId: Maul,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Maul,
                previousSkillId: Werebear,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: NaturalResistance,
                previousSkillId: IronSkin,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: IncreasedSpeed,
                previousSkillId: IncreasedStamina,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Whirlwind,
                previousSkillId: Concentrate,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Whirlwind,
                previousSkillId: LeapAttack,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: LeapAttack,
                previousSkillId: Leap,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Berserk,
                previousSkillId: Concentrate,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Concentrate,
                previousSkillId: Stun,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Stun,
                previousSkillId: Bash,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Frenzy,
                previousSkillId: DoubleThrow,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: DoubleThrow,
                previousSkillId: DoubleSwing,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: DoubleSwing,
                previousSkillId: Bash,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: WarCry,
                previousSkillId: BattleCry,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BattleCry,
                previousSkillId: Taunt,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Taunt,
                previousSkillId: Howl,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: WarCry,
                previousSkillId: BattleOrders,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BattleCommand,
                previousSkillId: BattleOrders,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BattleOrders,
                previousSkillId: Shout,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Shout,
                previousSkillId: Howl,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: GrimWard,
                previousSkillId: FindItem,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FindItem,
                previousSkillId: FindPotion,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: DeathSentry,
                previousSkillId: LightningSentry,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: LightningSentry,
                previousSkillId: ChargedBoltSentry,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ChargedBoltSentry,
                previousSkillId: ShockWeb,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ShockWeb,
                previousSkillId: FireBlast,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: WakeofInferno,
                previousSkillId: WakeofFire,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: WakeofFire,
                previousSkillId: FireBlast,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BladeShield,
                previousSkillId: BladeFury,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BladeFury,
                previousSkillId: WakeofFire,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BladeFury,
                previousSkillId: BladeSentinel,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Venom,
                previousSkillId: Fade,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Fade,
                previousSkillId: BurstofSpeed,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BurstofSpeed,
                previousSkillId: ClawMastery,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ShadowMaster,
                previousSkillId: ShadowWarrior,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ShadowWarrior,
                previousSkillId: WeaponBlock,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ShadowWarrior,
                previousSkillId: CloakofShadows,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: WeaponBlock,
                previousSkillId: ClawMastery,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: MindBlast,
                previousSkillId: CloakofShadows,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: CloakofShadows,
                previousSkillId: PsychicHammer,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: PhoenixStrike,
                previousSkillId: BladesofIce,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: PhoenixStrike,
                previousSkillId: CobraStrike,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: CobraStrike,
                previousSkillId: TigerStrike,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: BladesofIce,
                previousSkillId: ClawsofThunder,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ClawsofThunder,
                previousSkillId: FistsofFire,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: DragonFlight,
                previousSkillId: DragonTail,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: DragonTail,
                previousSkillId: DragonClaw,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: DragonClaw,
                previousSkillId: DragonTalon,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: LightningFury,
                previousSkillId: PlagueJavelin,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: LightningStrike,
                previousSkillId: ChargedStrike,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Fend,
                previousSkillId: Impale,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ChargedStrike,
                previousSkillId: LightningBolt,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ChargedStrike,
                previousSkillId: PowerStrike,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: PlagueJavelin,
                previousSkillId: LightningBolt,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: LightningBolt,
                previousSkillId: PoisonJavelin,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: PowerStrike,
                previousSkillId: Jab,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Impale,
                previousSkillId: Jab,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FreezingArrow,
                previousSkillId: IceArrow,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: IceArrow,
                previousSkillId: ColdArrow,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Strafe,
                previousSkillId: GuidedArrow,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ImmolationArrow,
                previousSkillId: ExplodingArrowSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: FreezingArrow,
                previousSkillId: GuidedArrow,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: GuidedArrow,
                previousSkillId: MultipleShotskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: MultipleShotskills,
                previousSkillId: MagicArrowSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ExplodingArrowSkills,
                previousSkillId: MultipleShotskills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: ExplodingArrowSkills,
                previousSkillId: FireArrowSkills,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Penetrate,
                previousSkillId: CriticalStrike,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Pierce,
                previousSkillId: Penetrate,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Valkyrie,
                previousSkillId: Evade,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Valkyrie,
                previousSkillId: Decoy,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Decoy,
                previousSkillId: SlowMissiles,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Evade,
                previousSkillId: Avoid,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: Avoid,
                previousSkillId: Dodge,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                currentSkillId: SlowMissiles,
                previousSkillId: InnerSight,
                createdAt: new Date(),
                updatedAt: new Date()
              }]);

            case 581:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SkillSkill', null, {});
  }
};