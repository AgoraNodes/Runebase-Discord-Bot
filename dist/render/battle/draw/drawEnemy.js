"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawEnemy = void 0;

var drawEnemy = function drawEnemy(ctx, monster, isSelected, enemyFrame) {
  var movedToUser = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var number = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var playerPosition = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {
    x: 0,
    y: 0
  };
  var index = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  var updatedMonsterState = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var extraPositionX = 0;
  var extraPositionY = 0;
  var minusIndex = 0;

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

  var x = 0;
  var y = 0; // XP Bar

  ctx.lineJoin = 'round';
  var currentMonsterHp = updatedMonsterState ? updatedMonsterState.currentMonsterHp : monster.currentHp; // console.log('sdqdfqsdqsd');
  // console.log(monster.currentHp);
  // console.log(updatedMonsterState);
  // console.log(currentMonsterHp);

  var hpPercentage = currentMonsterHp / monster.maxHp;

  if (hpPercentage < 0) {
    hpPercentage = 0;
  }

  if (hpPercentage > 100) {
    hpPercentage = 0;
  }

  if (!movedToUser) {
    x = 280;
    y = 85;

    if (isSelected) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#EEE621";
      ctx.strokeRect(x - 3 + extraPositionX, y + 55 + extraPositionY, 30, 1);
    }

    ctx.lineWidth = 5; // Enemy Healthbar

    ctx.strokeStyle = 'black';
    ctx.strokeRect(x + extraPositionX - 5, y + extraPositionY, 40, 0);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x + extraPositionX - 5, y + extraPositionY, 40 * hpPercentage, 0); // Enemy Image

    ctx.drawImage(enemyFrame[number], x + extraPositionX, // x position
    y + extraPositionY, // y position
    enemyFrame[number].width / 1.5, enemyFrame[number].height / 1.5);
  } else {
    console.log(playerPosition);
    console.log('playerPosition');
    x = 115;
    y = 37; // Enemy Healthbar

    ctx.strokeStyle = 'black';
    ctx.strokeRect(playerPosition.x - 5, playerPosition.y, 40, 0);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(playerPosition.x - 5, playerPosition.y, 40 * hpPercentage, 0); // Enemy Image

    ctx.drawImage(enemyFrame[number], playerPosition.x + 20, // x position
    playerPosition.y, // y position
    enemyFrame[number].width / 1.5, enemyFrame[number].height / 1.5);
  }

  return {
    id: monster.id,
    x: x + extraPositionX,
    y: y + extraPositionY
  };
};

exports.drawEnemy = drawEnemy;