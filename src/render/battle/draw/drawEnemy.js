export const drawEnemy = (
  ctx,
  monster,
  enemyFrame,
  movedToUser = false,
  number = 0,
) => {
  let x;
  let y;
  // XP Bar
  ctx.lineJoin = 'round';
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  let hpPercentage = monster.BattleMonster.currentHp / monster.BattleMonster.maxHp;
  if (hpPercentage < 0) {
    hpPercentage = 0;
  }
  if (hpPercentage > 100) {
    hpPercentage = 0;
  }

  // empty bar

  if (!movedToUser) {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(
      185,
      45,
      40,
      0,
    );

    ctx.strokeStyle = 'red';
    ctx.strokeRect(
      185,
      45,
      40 * (hpPercentage),
      0,
    );
    x = 190;
    y = 45;
    ctx.drawImage(
      enemyFrame[number],
      190, // x position
      45, // y position
      enemyFrame[number].width / 1.5,
      enemyFrame[number].height / 1.5,
    );
  } else {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(
      110,
      37,
      40,
      0,
    );

    ctx.strokeStyle = 'red';
    ctx.strokeRect(
      110,
      37,
      40 * (hpPercentage),
      0,
    );
    x = 115;
    y = 37;
    ctx.drawImage(
      enemyFrame[number],
      x, // x position
      y, // y position
      enemyFrame[number].width / 1.5,
      enemyFrame[number].height / 1.5,
    );
  }
  return {
    x,
    y,
  };
};
