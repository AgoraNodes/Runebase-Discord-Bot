/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  Op,
} from 'sequelize';
import db from '../../models';
import { calculateCharacterStats } from '../stats/calculateCharacterStats';
// import { fetchUserCurrentSelectedSkills } from "../character/selectedSkills";
// import { calculateSkillDamage } from "../stats/calculateSkills";
import { randomIntFromInterval } from "../utils";

// TODO: Make code more readable by moving monster/user updates in their own designated function
export const processBattleMove = async (
  userCurrentCharacter,
  battle,
  currentSelectedMonster,
  attackUsed,
  io,
  queue,
  t,
) => {
  const sumExp = battle.BattleMonsters.reduce((accumulator, object) => accumulator + object.monster.exp, 0);
  const {
    lvl,
    attackOne,
    attackTwo,
    regularAttack,
    block,
    defense,
  } = await calculateCharacterStats(
    userCurrentCharacter,
  );
  let useAttack;
  if (attackUsed === 'main') {
    if (userCurrentCharacter.condition.mana >= attackOne.cost) {
      useAttack = attackOne;
    } else {
      useAttack = regularAttack;
    }
  }
  if (attackUsed === 'secondary') {
    if (userCurrentCharacter.condition.mana >= attackTwo.cost) {
      useAttack = attackTwo;
    } else {
      useAttack = regularAttack;
    }
  }
  // Remove new tag from existing debuffs
  for (const monsterToRemoveNewDebuffTag of battle.BattleMonsters) {
    if (monsterToRemoveNewDebuffTag.debuffs.length > 0) {
      for (const debuffToCountDown of monsterToRemoveNewDebuffTag.debuffs) {
        if (debuffToCountDown.new) {
          await debuffToCountDown.update({
            new: false,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }
      }
    }
  }
  const newUserMp = userCurrentCharacter.condition.mana - useAttack.cost;
  const monsterInfoArray = [];
  const updatedMonstersArray = [];
  const userBattleLogs = [];
  const battleBattleLogs = [];
  const selectedMonster = battle.BattleMonsters.find((element) => element.id === currentSelectedMonster.id);

  if (useAttack.debuff && useAttack.aoe) {
    // Apply ALL AOE Debuffs here
    for (const battleMonster of battle.BattleMonsters) {
      const BattleMonsterToUpdate = JSON.parse(JSON.stringify(battleMonster));
      if (battleMonster.currentHp > 0) {
        const existingDebuff = battleMonster.debuffs.find((x) => x.name === useAttack.name);
        if (existingDebuff) {
          await existingDebuff.destroy({
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
          const index = BattleMonsterToUpdate.debuffs.findIndex((o) => o.id === existingDebuff.id);
          if (index !== -1) BattleMonsterToUpdate.debuffs.splice(index, 1);
        }
        const createDebuff = await db.debuff.create({
          name: useAttack.name,
          new: true,
          rounds: useAttack.rounds,
          BattleMonsterId: battleMonster.id,
          reducedArmor: useAttack.reducedArmor,
        }, {
          lock: t.LOCK.UPDATE,
          transaction: t,
        });
        BattleMonsterToUpdate.debuffs.unshift(
          JSON.parse(JSON.stringify(createDebuff)),
          // createDebuff.dataValues,
        );
        updatedMonstersArray.push({
          ...BattleMonsterToUpdate,
          userDamage: useAttack.name,
          // currentMonsterHp: selectedMonster.currentHp - 0,
          // died: !(battleMonster.currentHp > 0),
          attackType: useAttack.name,
        });
        userBattleLogs.unshift({
          log: `${userCurrentCharacter.user.username} used ${useAttack.name} on ${selectedMonster.monster.name}`,
        });
      }
    }

    monsterInfoArray.push({
      monsterId: selectedMonster.id,
      // userDamage: useAttack.name,
      monstersToUpdate: updatedMonstersArray,
      // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
      battleLogs: userBattleLogs,
      currentUserMp: newUserMp,
      // died: false,
      ranged: true,
    });
  } else {
    // APPLY USER Single MONSTER attack
    // TODO ONLY APPLY BLOCK, PARRY, MISS TO PHYSICAL ATTACKS (give attacks a attack type in skill configs)
    const updatedMonster = JSON.parse(JSON.stringify(selectedMonster));

    // Apply Armor Debuff if exists
    if (updatedMonster.debuffs.length > 0) {
      for (const debuff of updatedMonster.debuffs) {
        if (debuff.reducedArmor) {
          updatedMonster.monster.armor = Math.round(updatedMonster.monster.defense - ((updatedMonster.monster.defense / 100) * debuff.reducedArmor));
        }
      }
    }

    // Chance To Hit = 200% * {AR / (AR + DR)} * {Alvl / (Alvl + Dlvl)}
    // AR = Attacker's Attack Rating
    // DR = Defender's Defense rating
    // Alvl = Attacker's level
    // Dlvl = Defender's level
    const userHitChance = (200 * (useAttack.ar / (useAttack.ar + updatedMonster.monster.defense)) * (lvl / (lvl + updatedMonster.monster.level))) * 100;
    console.log(userHitChance);
    console.log('userHitChance');

    const isBlocked = Math.random() < Number(updatedMonster.monster.block) / 100; // Did We block the attack?
    const isParried = Math.random() < Number(updatedMonster.monster.parry) / 100; // Did monster parry the attack?
    const isNotMissed = Math.random() < Number(userHitChance) / 100; // Did User hit monster?
    const randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max);

    if (!isNotMissed) {
      battleBattleLogs.unshift({
        log: `${userCurrentCharacter.user.username} ${attackUsed.name} missed ${updatedMonster.monster.name}`,
      });
      monsterInfoArray.push({
        monsterId: updatedMonster.id,
        monstersToUpdate: [
          {
            ...updatedMonster,
            // ...JSON.parse(JSON.stringify(updatedMonster)),
            // ...updatedMonster.dataValues,
            userDamage: 'Missed',
            // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
            // died: !(updatedMonster.currentHp > 0),
            attackType: 'Missed',
          },
        ],
        battleLogs: userBattleLogs,
        currentUserMp: newUserMp,
        ranged: false,
      });
      await db.battleLog.create({
        battleId: battle.id,
        log: `${userCurrentCharacter.user.username} ${attackUsed.name} missed ${updatedMonster.monster.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    } else if (isBlocked) {
      battleBattleLogs.unshift({
        log: `${updatedMonster.monster.name} blocked ${userCurrentCharacter.user.username} ${attackUsed.name}`,
      });
      monsterInfoArray.push({
        monsterId: updatedMonster.id,
        monstersToUpdate: [
          {
            ...updatedMonster,
            // ...JSON.parse(JSON.stringify(updatedMonster)),
            // ...updatedMonster.dataValues,
            userDamage: 'Blocked',
            // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
            // died: !(updatedMonster.currentHp > 0),
            attackType: 'Blocked',
          },
        ],
        battleLogs: userBattleLogs,
        currentUserMp: newUserMp,
        ranged: false,
      });
      await db.battleLog.create({
        battleId: battle.id,
        log: `${updatedMonster.monster.name} blocked ${userCurrentCharacter.user.username} ${attackUsed.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    } else if (isParried) {
      battleBattleLogs.unshift({
        log: `${updatedMonster.monster.name} parried ${userCurrentCharacter.user.username} ${attackUsed.name}`,
      });
      monsterInfoArray.push({
        monsterId: updatedMonster.id,
        monstersToUpdate: [
          {
            ...updatedMonster,
            // ...JSON.parse(JSON.stringify(updatedMonster)),
            // ...updatedMonster.dataValues,
            userDamage: 'Parried',
            // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
            // died: !(updatedMonster.currentHp > 0),
            attackType: 'Parried',
          },
        ],
        battleLogs: userBattleLogs,
        currentUserMp: newUserMp,
        ranged: false,
      });

      await db.battleLog.create({
        battleId: battle.id,
        log: `${updatedMonster.monster.name} parried ${userCurrentCharacter.user.username} ${attackUsed.name}`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
    } else {
      // Apply Damage to monster
      await selectedMonster.decrement('currentHp', {
        by: randomAttackDamage,
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      updatedMonster.currentHp -= randomAttackDamage;

      // Generate Battle log
      await db.battleLog.create({
        battleId: battle.id,
        log: `${userCurrentCharacter.user.username} used ${useAttack.name} on ${selectedMonster.monster.name} for ${randomAttackDamage} damage`,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      userBattleLogs.unshift({
        log: `${userCurrentCharacter.user.username} used ${useAttack.name} on ${selectedMonster.monster.name} for ${randomAttackDamage} damage`,
      });
      if (updatedMonster.currentHp < 1) {
        userBattleLogs.unshift({
          log: `${userCurrentCharacter.user.username} killed ${selectedMonster.monster.name}`,
        });
      }

      monsterInfoArray.push({
        monsterId: updatedMonster.id,
        monstersToUpdate: [
          {
            ...updatedMonster,
            // ...JSON.parse(JSON.stringify(updatedMonster)),
            // ...updatedMonster.dataValues,
            userDamage: randomAttackDamage,
            // currentMonsterHp: selectedMonster.currentHp - randomAttackDamage,
            // died: !(updatedMonster.currentHp > 0),
            attackType: useAttack.name,
          },
        ],
        battleLogs: userBattleLogs,
        currentUserMp: newUserMp,
        ranged: false,
      });
    }
  }

  // Process Monster Moves/Attacks
  const allRemainingBattleMonster = await db.BattleMonster.findAll({
    where: {
      battleId: battle.id,
      currentHp: {
        [Op.gt]: 0,
      },
    },
    include: [
      {
        model: db.debuff,
        as: 'debuffs',
      },
      {
        model: db.monster,
        as: 'monster',
        include: [
          {
            model: db.monsterAttack,
            as: 'monsterAttacks',
          },
        ],
      },
    ],
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  if (!allRemainingBattleMonster || allRemainingBattleMonster.length < 1) {
    await battle.update({
      complete: true,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }

  const battleInfoArray = [];
  if (allRemainingBattleMonster) {
    let currentUserHp = userCurrentCharacter.condition.life;
    let totalDamageByMonsters = 0;
    // eslint-disable-next-line no-restricted-syntax
    for await (const remainingMonster of allRemainingBattleMonster) {
      if (currentUserHp > 0) {
        let pickedMonsterAttack = remainingMonster.monster.monsterAttacks.find((x) => x.defaultAttack === true);
        const nonDefaultMonsterAttacks = remainingMonster.monster.monsterAttacks.filter((filterAttack) => filterAttack.defaultAttack === false);
        console.log(nonDefaultMonsterAttacks);
        // Pick a non-default monster attack based on % chance
        let roll = Math.random();
        for (let i = 0, len = nonDefaultMonsterAttacks.length; i < len; ++i) {
          const { chance } = nonDefaultMonsterAttacks[i];
          console.log(chance);
          if (roll < (chance / 100)) {
            pickedMonsterAttack = nonDefaultMonsterAttacks[i];
            break;
          }
          roll -= chance;
        }
        const randomMonsterAttackDamage = randomIntFromInterval(pickedMonsterAttack.minDmg, pickedMonsterAttack.maxDmg); // Get Random Monster Damage
        const randomMonsterAttackRating = randomIntFromInterval(pickedMonsterAttack.minAr, pickedMonsterAttack.maxAr); // Get Random Monster Damage

        // Chance To Hit = 200% * {AR / (AR + DR)} * {Alvl / (Alvl + Dlvl)}
        // AR = Attacker's Attack Rating
        // DR = Defender's Defense rating
        // Alvl = Attacker's level
        // Dlvl = Defender's level
        const monsterHitChance = (200 * (randomMonsterAttackRating / (randomMonsterAttackRating + defense)) * (remainingMonster.monster.level / (remainingMonster.monster.level + lvl))) * 100;
        console.log(monsterHitChance);
        console.log('monsterHitChance');

        const isBlocked = Math.random() < Number(block) / 100; // Did We block the attack?
        const isParried = Math.random() < Number(regularAttack.parry) / 100; // Did We parry the attack?
        const isNotMissed = Math.random() < Number(monsterHitChance) / 100; // Did Monster hit user?

        if (!isNotMissed) {
          battleBattleLogs.unshift({
            log: `${remainingMonster.monster.name} ${pickedMonsterAttack.name} missed ${userCurrentCharacter.user.username}`,
          });
          battleInfoArray.push({
            monsterId: remainingMonster.id,
            attackType: 'Missed',
            damage: 0,
            currentHp: currentUserHp,
            battleLogs: battleBattleLogs,
          });
          await db.battleLog.create({
            battleId: battle.id,
            log: `${remainingMonster.monster.name} ${pickedMonsterAttack.name} missed ${userCurrentCharacter.user.username}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        } else if (isBlocked) {
          battleBattleLogs.unshift({
            log: `${userCurrentCharacter.user.username} blocked ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
          });
          battleInfoArray.push({
            monsterId: remainingMonster.id,
            attackType: 'Blocked',
            damage: 0,
            currentHp: currentUserHp,
            battleLogs: battleBattleLogs,
          });
          await db.battleLog.create({
            battleId: battle.id,
            log: `${userCurrentCharacter.user.username} blocked ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        } else if (isParried) {
          battleBattleLogs.unshift({
            log: `${userCurrentCharacter.user.username} parried ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
          });
          battleInfoArray.push({
            monsterId: remainingMonster.id,
            attackType: 'Parried',
            damage: 0,
            currentHp: currentUserHp,
            battleLogs: battleBattleLogs,
          });

          await db.battleLog.create({
            battleId: battle.id,
            log: `${userCurrentCharacter.user.username} parried ${remainingMonster.monster.name} ${pickedMonsterAttack.name}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        } else {
          // TODO Check if we counter attack (retaliate)
          // TODO Create Kick Damage calculation in statscalculations
          totalDamageByMonsters += randomMonsterAttackDamage;
          currentUserHp -= randomMonsterAttackDamage;
          battleBattleLogs.unshift({
            log: `${remainingMonster.monster.name} used ${pickedMonsterAttack.name} on ${userCurrentCharacter.user.username} for ${randomMonsterAttackDamage} damage`,
          });
          if (currentUserHp < 1) {
            battleBattleLogs.unshift({
              log: `${remainingMonster.monster.name} killed ${userCurrentCharacter.user.username}`,
            });
          }
          battleInfoArray.push({
            monsterId: remainingMonster.id,
            attackType: pickedMonsterAttack.name,
            damage: randomMonsterAttackDamage,
            currentHp: currentUserHp,
            // currentHp: currentUserHp - randomMonsterAttackDamage,
            battleLogs: battleBattleLogs,

          });

          await db.battleLog.create({
            battleId: battle.id,
            log: `${remainingMonster.monster.name} used ${pickedMonsterAttack.name} on ${userCurrentCharacter.user.username} for ${randomMonsterAttackDamage} damage`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }

        if (currentUserHp < 1) {
          await db.battleLog.create({
            battleId: battle.id,
            log: `${remainingMonster.monster.name} killed ${userCurrentCharacter.user.username}`,
          }, {
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }
      }
    }
    await userCurrentCharacter.condition.update({
      life: userCurrentCharacter.condition.life - totalDamageByMonsters,
      mana: newUserMp,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
  }

  // Count down Debuffs
  const findAllMonsterToCountDownDebuff = await db.BattleMonster.findAll({
    where: {
      battleId: battle.id,
    },
    include: [
      {
        model: db.debuff,
        as: 'debuffs',
      },
    ],
    lock: t.LOCK.UPDATE,
    transaction: t,
  });
  for (const monsterToCountDownDebuff of findAllMonsterToCountDownDebuff) {
    if (monsterToCountDownDebuff.debuffs.length > 0) {
      for (const debuffToCountDown of monsterToCountDownDebuff.debuffs) {
        if (
          debuffToCountDown.rounds >= 1
          && !debuffToCountDown.new
        ) {
          await debuffToCountDown.decrement('rounds', {
            by: 1,
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        } else if (debuffToCountDown.rounds < 1) {
          await debuffToCountDown.destroy({
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
        }
      }
    }
  }

  const updatedBattle = await db.battle.findOne({
    where: {
      id: battle.id,
    },
    order: [
      [db.battleLog, 'id', 'DESC'],
      [db.BattleMonster, 'id', 'DESC'],
    ],
    include: [
      {
        model: db.battleLog,
        as: 'battleLogs',
        required: false,
      },
      {
        model: db.BattleMonster,
        as: 'BattleMonsters',
        include: [
          {
            model: db.debuff,
            as: 'debuffs',
          },
          {
            model: db.monster,
            as: 'monster',
          },
        ],
      },
    ],
    lock: t.LOCK.UPDATE,
    transaction: t,
  });

  return [
    userCurrentCharacter,
    updatedBattle,
    battleInfoArray,
    monsterInfoArray,
    sumExp,
  ];
};
