/* eslint-disable no-await-in-loop */
import db from '../../../models';

const userApplyBattleCompleteEffects = async (
  stageSevenInfoArray,
  userState,
  battle,
  totalHealedByLifeSteal,
  saveToDatabasePromises,
  t,
) => {
  console.log(userState);
  console.log('userState');

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

  return [
    stageSevenInfoArray,
    userState,
    totalHealedByLifeSteal,
    saveToDatabasePromises,
  ];
};

export default userApplyBattleCompleteEffects;
