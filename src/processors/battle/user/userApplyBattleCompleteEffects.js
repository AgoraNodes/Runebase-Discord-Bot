/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import db from '../../../models';
import { randomIntFromInterval } from "../../../helpers/utils";
import isFailedAttack from './isFailedAttack';
import calculateCritDamage from '../utils/calculateCritDamage';

const userApplyBattleCompleteEffects = async (
  stageSevenInfoArray,
  userState,
  battle,
  totalHealedByLifeSteal,
  saveToDatabasePromises,
  t,
) => {
  // userState.hp.current += useAttack.cost;

  console.log(userState);
  console.log('userState');
  console.log('userState');
  console.log('userState');
  console.log('userState');
  console.log('userState');
  console.log('userState');
  console.log('userState');
  console.log('userState');
  console.log('userState');
  console.log('userState');
  console.log('userState');

  // for (const userSkill of userState.UserClassSkills) {

  if (userState.class.name === 'Barbarian') {
    const relieve = userState.UserClassSkills.find((element) => element.skill.name === 'Relieve');
    if (relieve) {
      const battleLogs = [];
      const percentageHealed = 10 + ((relieve.points - 1) * 1);
      const totalRelieveHealing = Math.round((userState.hp.max / 100) * percentageHealed);
      totalHealedByLifeSteal += totalRelieveHealing;
      userState.hp.current = (userState.hp.current + totalRelieveHealing) > userState.hp.max ? userState.hp.max : (userState.hp.current + totalRelieveHealing);

      // Create Battle Log
      const log = `Relieve healed ${userState.user.username} for ${totalRelieveHealing}`;
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
      stageSevenInfoArray.push({
        battleLogs,
        monstersToUpdate: [],
        receivedHeal: totalRelieveHealing,
        userState: JSON.parse(JSON.stringify(userState)),
      });
    }
  }
  // }

  return [
    stageSevenInfoArray,
    userState,
    totalHealedByLifeSteal,
    saveToDatabasePromises,
  ];
};

export default userApplyBattleCompleteEffects;
