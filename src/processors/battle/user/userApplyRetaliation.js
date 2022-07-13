/* eslint-disable no-restricted-syntax */

import isFailedAttack from "./isFailedAttack";
import { randomIntFromInterval } from "../../../helpers/utils";
import db from '../../../models';
import calculateCritDamage from "../utils/calculateCritDamage";
import {
  lifeSteal,
  manaSteal,
} from '../utils/utils';

const userApplyRetliation = async (
  userState,
  totalHealedByLifeSteal,
  saveToDatabasePromises,
  battleMonsterState,
  battle,
  retaliationArray,
  stageThreeInfoArray,
  useAttack,
  lvl,
  t,
) => {
  for await (const retaliation of retaliationArray) {
    let battleLogs = [];
    let monstersToUpdate = [];
    let attackFailed = true;
    let lifeStolen = false;
    let individualBattleObject;
    const monster = battleMonsterState.find((x) => x.id === retaliation.monsterId);
    if (monster && monster.currentHp > 0) {
      const updatedMonster = JSON.parse(JSON.stringify(monster));
      [
        battleLogs,
        monstersToUpdate,
        attackFailed,
        saveToDatabasePromises,
      ] = await isFailedAttack(
        userState,
        lvl,
        useAttack,
        battle,
        battleLogs,
        updatedMonster,
        monstersToUpdate,
        saveToDatabasePromises,
        t,
      );
      if (!attackFailed) {
        let randomAttackDamage = randomIntFromInterval(useAttack.min, useAttack.max); // Get Random Damage
        lifeStolen = lifeSteal(randomAttackDamage, useAttack.lifeSteal);
        let didWeCrit = false;
        [
          didWeCrit,
          randomAttackDamage,
        ] = calculateCritDamage(
          randomAttackDamage,
          useAttack.crit,
        );

        // Generate Battle log
        const log = `${userState.user.username} used ${useAttack.name} on ${updatedMonster.monster.name} for ${randomAttackDamage} damage`;
        saveToDatabasePromises.push(
          new Promise((resolve, reject) => {
            db.battleLog.create({
              battleId: battle.id,
              log,
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t,
            }).then(() => resolve());
          }),
        );

        battleLogs.unshift({
          log,
        });

        if (updatedMonster.currentHp < 1) {
          const log = `${userState.user.username} killed ${updatedMonster.monster.name}`;
          saveToDatabasePromises.push(
            new Promise((resolve, reject) => {
              db.battleLog.create({
                battleId: battle.id,
                log,
              }, {
                lock: t.LOCK.UPDATE,
                transaction: t,
              }).then(() => resolve());
            }),
          );
          battleLogs.unshift({
            log,
          });
        }

        updatedMonster.currentHp -= randomAttackDamage;
        monstersToUpdate.push({
          ...updatedMonster,
          didWeCrit,
          userDamage: randomAttackDamage,
          attackType: useAttack.name,
        });
      }

      battleMonsterState = battleMonsterState.map((obj) => monstersToUpdate.find((o) => o.id === obj.id) || obj);
      totalHealedByLifeSteal += lifeStolen || 0;
      const addAmountLife = lifeStolen || 0;
      userState.hp.current = (userState.hp.current + addAmountLife) > userState.hp.max ? userState.hp.max : (userState.hp.current + addAmountLife);

      individualBattleObject = {
        monsterId: updatedMonster.id,
        monstersToUpdate: JSON.parse(JSON.stringify(monstersToUpdate)),
        userState: JSON.parse(JSON.stringify(userState)),
        battleLogs,
        useAttack,
        receivedHeal: lifeStolen || false,
      };

      stageThreeInfoArray.push(individualBattleObject);
    }
  }
  return [
    stageThreeInfoArray,
    userState,
    battleMonsterState,
    totalHealedByLifeSteal,
    saveToDatabasePromises,
  ];
};
export default userApplyRetliation;
