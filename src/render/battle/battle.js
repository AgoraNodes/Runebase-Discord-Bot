import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import {
  createCanvas,
  loadImage,
  registerFont,
} from 'canvas';
import path from 'path';
// import db from '../models';
import GIFEncoder from 'gif-encoder-2';
import { calculateCharacterStats } from '../../helpers/stats/calculateCharacterStats';
import { renderHpOrb } from '../orbs/hp';
import { renderMpOrb } from '../orbs/mp';

const background = async (
  ctx,
  zone,
) => {
  const mapImage = await loadImage(path.join(__dirname, `../../assets/images/zone/background`, `${zone}.png`));
  ctx.drawImage(
    mapImage,
    0, // x position
    0, // y position
    mapImage.width,
    mapImage.height,
  );
};

const drawScreenTools = async (
  ctx,
  mainSkill,
  secondarySkill,
  hpOrbImage,
  mpOrbImage,
) => {
  ctx.drawImage(
    mainSkill,
    60, // x position
    175, // y position
    hpOrbImage.width / 4,
    hpOrbImage.height / 4,
  );
  ctx.drawImage(
    secondarySkill,
    225, // x position
    175, // y position
    hpOrbImage.width / 4,
    hpOrbImage.height / 4,
  );
  ctx.drawImage(
    hpOrbImage,
    0, // x position
    132, // y position
    hpOrbImage.width / 1.5,
    hpOrbImage.height / 1.5,
  );
  ctx.drawImage(
    mpOrbImage,
    250, // x position
    132, // y position
    hpOrbImage.width / 1.5,
    hpOrbImage.height / 1.5,
  );
};
const drawBattleLog = (
  ctx,
  battle,
) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(320, 0, 130, 200);
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText('Battle log', 330, 20, 100);
  ctx.fillText('Battle log', 330, 20, 100);
  ctx.font = 'normal 10px serif';
  ctx.fillStyle = 'black';
  for (let i = 0; i < battle.battleLogs.length; i++) {
    ctx.fillText(
      battle.battleLogs[i].log,
      330,
      25 + ((i + 1) * 15),
      100,
    );
  }
};

const drawPlayer = (
  ctx,
  inAttackPosition,
) => {
  function drawBorder(xPos, yPos, width, height, thickness = 1) {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
  }
  let rectXPos = 80;
  let rectYPos = 70;
  let rectWidth = 20;
  let rectHeight = 50;

  if (inAttackPosition) {
    rectXPos = 175;
    rectYPos = 60;
    rectWidth = 20;
    rectHeight = 50;
  }

  drawBorder(rectXPos, rectYPos, rectWidth, rectHeight);

  ctx.fillStyle = '#000';
  ctx.fillRect(rectXPos, rectYPos, rectWidth, rectHeight);
};

const drawEnemy = (
  ctx,
  monster,
  enemyFrame,
  movedToUser = false,
  number = 0,
) => {
  // XP Bar
  ctx.lineJoin = 'round';
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";

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
      40 * (monster.BattleMonster.currentHp / monster.BattleMonster.maxHp),
      0,
    );
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
      40 * (monster.BattleMonster.currentHp / monster.BattleMonster.maxHp),
      0,
    );
    ctx.drawImage(
      enemyFrame[number],
      115, // x position
      37, // y position
      enemyFrame[number].width / 1.5,
      enemyFrame[number].height / 1.5,
    );
  }
};

export const renderBattleGif = async (
  currentUser,
  userCurrentSelectedSkills,
  battle,
  previousBattleState,
  previousUserState,
  monsterInfo = false,
  userInfo = false,
) => {
  await registerFont(path.join(__dirname, '../../assets/fonts/', 'Heart_warming.otf'), { family: 'HeartWarming' });
  const enemyFrame = [];
  const hpOrbBufferPrevious = await renderHpOrb(
    previousUserState,
  );
  const mpOrbBufferPrevious = await renderMpOrb(
    previousUserState,
  );
  const hpOrbBuffer = await renderHpOrb(
    currentUser,
  );
  const mpOrbBuffer = await renderMpOrb(
    currentUser,
  );
  const hpOrbImage = await loadImage(hpOrbBuffer);
  const mpOrbImage = await loadImage(mpOrbBuffer);
  const hpOrbImagePrevious = await loadImage(hpOrbBufferPrevious);
  const mpOrbImagePrevious = await loadImage(mpOrbBufferPrevious);
  enemyFrame[0] = await loadImage(path.join(
    __dirname,
    `../../assets/images/monsters/Zombie/`,
    `zombie.png`,
  ));
  enemyFrame[1] = await loadImage(path.join(
    __dirname,
    `../../assets/images/monsters/Zombie/`,
    `zombie (8).png`,
  ));
  enemyFrame[2] = await loadImage(path.join(
    __dirname,
    `../../assets/images/monsters/Zombie/`,
    `zombie (6).png`,
  ));
  console.log('renderBattlegif');

  const mainSkill = await loadImage(path.join(
    __dirname,
    `../../assets/images/skills/${userCurrentSelectedSkills.selectedMainSkill.skill.skillTree ? `${userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.class.name}/${userCurrentSelectedSkills.selectedMainSkill.skill.skillTree.name}` : ``}`,
    `${userCurrentSelectedSkills.selectedMainSkill.skill.name}.png`,
  ));
  console.log('123');
  const secondarySkill = await loadImage(path.join(
    __dirname,
    `../../assets/images/skills/${userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree ? `${userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.class.name}/${userCurrentSelectedSkills.selectedSecondarySkill.skill.skillTree.name}` : ``}`,
    `${userCurrentSelectedSkills.selectedSecondarySkill.skill.name}.png`,
  ));

  const canvas = createCanvas(450, 200);
  const ctx = canvas.getContext('2d');

  const encoder = new GIFEncoder(450, 200);
  encoder.setDelay(200);
  encoder.setRepeat(-1);
  encoder.setQuality(30);
  encoder.start();
  // frame 1
  const slice = 200 / 5; // this is the width of each rectangle
  await background(
    ctx,
    'den',
  );

  drawPlayer(
    ctx,
    false,
  );
  drawEnemy(
    ctx,
    previousBattleState.monsters[0],
    enemyFrame,
  );
  drawScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImagePrevious,
  );
  drawBattleLog(
    ctx,
    battle,
  );
  encoder.addFrame(ctx);

  // frame 2
  await background(
    ctx,
    'den',
  );
  drawPlayer(
    ctx,
    false,
  );
  drawEnemy(
    ctx,
    previousBattleState.monsters[0],
    enemyFrame,
  );
  drawScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImagePrevious,
  );
  drawBattleLog(
    ctx,
    battle,
  );
  encoder.addFrame(ctx);

  // frame 3
  await background(
    ctx,
    'den',
  );
  drawPlayer(
    ctx,
    false,
  );
  drawEnemy(
    ctx,
    previousBattleState.monsters[0],
    enemyFrame,
  );
  drawScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImagePrevious,
  );
  drawBattleLog(
    ctx,
    battle,
  );
  encoder.addFrame(ctx);

  // frame 4
  await background(
    ctx,
    'den',
  );
  drawPlayer(
    ctx,
    true,
  );
  drawEnemy(
    ctx,
    previousBattleState.monsters[0],
    enemyFrame,
  );
  drawScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImagePrevious,
  );
  drawBattleLog(
    ctx,
    battle,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
  encoder.addFrame(ctx);

  // frame 5
  await background(
    ctx,
    'den',
  );
  drawPlayer(
    ctx,
    true,
  );
  drawEnemy(
    ctx,
    battle.monsters[0],
    enemyFrame,
  );
  drawScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImage,
  );
  drawBattleLog(
    ctx,
    battle,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
  encoder.addFrame(ctx);

  // frame 6
  await background(
    ctx,
    'den',
  );
  drawPlayer(
    ctx,
    false,
  );
  drawEnemy(
    ctx,
    battle.monsters[0],
    enemyFrame,
  );
  drawScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImage,
  );
  drawBattleLog(
    ctx,
    battle,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
  encoder.addFrame(ctx);

  // frame 7
  await background(
    ctx,
    'den',
  );
  drawPlayer(
    ctx,
    false,
  );
  drawEnemy(
    ctx,
    battle.monsters[0],
    enemyFrame,
  );
  drawScreenTools(
    ctx,
    mainSkill,
    secondarySkill,
    hpOrbImagePrevious,
    mpOrbImage,
  );
  drawBattleLog(
    ctx,
    battle,
  );
  ctx.lineWidth = 1;
  ctx.font = 'bold 13px "HeartWarming"';
  ctx.strokeText(userInfo.attackDamage, 193, 38, 50);
  encoder.addFrame(ctx);

  if (monsterInfo.alive) {
    // frame 8
    await background(
      ctx,
      'den',
    );
    drawPlayer(
      ctx,
      false,
    );
    drawEnemy(
      ctx,
      battle.monsters[0],
      enemyFrame,
    );
    drawScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImagePrevious,
      mpOrbImage,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    encoder.addFrame(ctx);

    // frame 9
    await background(
      ctx,
      'den',
    );
    drawPlayer(
      ctx,
      false,
    );
    drawEnemy(
      ctx,
      battle.monsters[0],
      enemyFrame,
    );
    drawScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImagePrevious,
      mpOrbImage,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    encoder.addFrame(ctx);

    // frame 6
    await background(
      ctx,
      'den',
    );
    drawPlayer(
      ctx,
      false,
    );
    drawEnemy(
      ctx,
      battle.monsters[0],
      enemyFrame,
      true,
    );
    drawScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImagePrevious,
      mpOrbImage,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50);
    encoder.addFrame(ctx);

    // frame 6
    await background(
      ctx,
      'den',
    );
    drawPlayer(
      ctx,
      false,
    );
    drawEnemy(
      ctx,
      battle.monsters[0],
      enemyFrame,
      true,
      1,
    );
    drawScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImage,
      mpOrbImage,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50);
    encoder.addFrame(ctx);

    // frame 6
    await background(
      ctx,
      'den',
    );
    drawPlayer(
      ctx,
      false,
    );
    drawEnemy(
      ctx,
      battle.monsters[0],
      enemyFrame,
      true,
      2,
    );
    drawScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImage,
      mpOrbImage,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    ctx.lineWidth = 1;
    ctx.font = 'bold 13px "HeartWarming"';
    ctx.strokeText(monsterInfo.attackDamage, 80, 45, 50);
    encoder.addFrame(ctx);

    // frame 6
    await background(
      ctx,
      'den',
    );
    drawPlayer(
      ctx,
      false,
    );
    drawEnemy(
      ctx,
      battle.monsters[0],
      enemyFrame,
    );
    drawScreenTools(
      ctx,
      mainSkill,
      secondarySkill,
      hpOrbImage,
      mpOrbImage,
    );
    drawBattleLog(
      ctx,
      battle,
    );
    encoder.addFrame(ctx);
  }

  encoder.finish();
  const finalImage = await encoder.out.getData();
  return finalImage;
};
