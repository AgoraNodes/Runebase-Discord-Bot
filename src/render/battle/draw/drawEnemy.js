/* eslint-disable no-restricted-syntax */
export const drawEnemy = (
  ctx,
  monster,
  isSelected,
  enemyFrame,
  debuffImages,
  movedToUser = false,
  number = 0,
  playerPosition = {
    x: 0,
    y: 0,
  },
  index = 0,
  updatedMonsterState = false,
) => {
  let extraPositionX = 0;
  let extraPositionY = 0;

  let minusIndex = 0;
  if (index % 2 === 0 && index !== 0) {
    minusIndex = index / 2;
    extraPositionX = (index - minusIndex) * 30;
    extraPositionY = (index - minusIndex) * 30;
  }
  if (index % 2 !== 0 && index !== 0) {
    if (index > 2) {
      minusIndex = 1;
    }
    extraPositionX = (index - minusIndex) * -30;
    extraPositionY = (index - minusIndex) * -30;
  }

  let x = 0;
  let y = 0;
  // XP Bar
  ctx.lineJoin = 'round';
  const currentMonsterHp = updatedMonsterState ? updatedMonsterState.currentMonsterHp : monster.currentHp;
  let hpPercentage = currentMonsterHp / monster.maxHp;
  if (hpPercentage < 0) {
    hpPercentage = 0;
  }
  if (hpPercentage > 100) {
    hpPercentage = 0;
  }
  if (!movedToUser) {
    x = 280 + extraPositionX;
    y = 85 + extraPositionY;
  } else {
    x = playerPosition.x + 20;
    y = playerPosition.y;
  }
  if (isSelected) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#EEE621";
    ctx.strokeRect(
      x - 3,
      y + 55,
      30,
      1,
    );
  }

  // console.log('before apply debuff');
  for (const [i, debuff] of monster.debuffs.entries()) {
    // console.log(debuffImages);
    // console.log(debuff);
    ctx.drawImage(
      debuffImages[debuff.name][0],
      (x - 6) + (i * 17), // x position
      y - 17, // y position
      debuffImages[debuff.name][0].width / 4,
      debuffImages[debuff.name][0].height / 4,
    );
    ctx.lineWidth = 1;
    ctx.font = 'normal 10px "HeartWarming"';
    ctx.fillStyle = "red";
    ctx.fillText(
      debuff.rounds,
      (x - 6) + (i * 17), // x position
      y - 17, // y position
      50,
    );
  }

  ctx.lineWidth = 5;
  // Enemy Healthbar
  ctx.strokeStyle = 'black';
  ctx.strokeRect(
    x - 5,
    y,
    40,
    0,
  );
  ctx.strokeStyle = 'red';
  ctx.strokeRect(
    x - 5,
    y,
    40 * (hpPercentage),
    0,
  );

  // Enemy Image
  ctx.drawImage(
    enemyFrame[number],
    x, // x position
    y, // y position
    enemyFrame[number].width / 1.5,
    enemyFrame[number].height / 1.5,
  );

  return {
    id: monster.id,
    x,
    y,
  };
};
