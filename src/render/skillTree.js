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

function printAtWordWrap(context, text, x, y, lineHeight, fitWidth) {
  fitWidth = fitWidth || 0;

  if (fitWidth <= 0) {
    context.fillText(text, x, y);
    return;
  }
  let words = text.split(' ');
  let currentLine = 0;
  let idx = 1;
  while (words.length > 0 && idx <= words.length) {
    const str = words.slice(0, idx).join(' ');
    const w = context.measureText(str).width;
    if (w > fitWidth) {
      if (idx == 1) {
        idx = 2;
      }
      context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
      currentLine++;
      words = words.splice(idx - 1);
      idx = 1;
    } else { idx++; }
  }
  if (idx > 0) { context.fillText(words.join(' '), x, y + (lineHeight * currentLine)); }
}

export const renderskillTreeImage = async (
  userCharacter,
  skillTree,
  skillTreeIndex,
) => {
  const skillTreeMenuImage = await loadImage(path.join(__dirname, `../assets/images/skilltree/`, `skillTreeMenu.png`));
  const skillTreeImage = await loadImage(path.join(__dirname, `../assets/images/skilltree/`, `skilltree${skillTreeIndex}.png`));
  const canvas = createCanvas(
    skillTreeImage.width + 25,
    skillTreeImage.height + 25,
  );
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 25px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  // ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;

  ctx.drawImage(
    skillTreeMenuImage,
    skillTreeImage.width - skillTreeMenuImage.width + 25,
    skillTreeImage.height - skillTreeMenuImage.height + 25,
    skillTreeMenuImage.width,
    skillTreeMenuImage.height,
  );

  ctx.drawImage(
    skillTreeImage,
    0 + 25,
    0 + 25,
    skillTreeImage.width,
    skillTreeImage.height,
  );

  // Rows
  ctx.strokeText('1', 5, 70, 25);
  ctx.fillText('1', 5, 70, 25);
  ctx.strokeText('2', 5, 140, 25);
  ctx.fillText('2', 5, 140, 25);
  ctx.strokeText('3', 5, 210, 25);
  ctx.fillText('3', 5, 210, 25);

  ctx.strokeText('4', 5, 280, 25);
  ctx.fillText('4', 5, 280, 25);
  ctx.strokeText('5', 5, 350, 25);
  ctx.fillText('5', 5, 350, 25);
  ctx.strokeText('6', 5, 420, 25);
  ctx.fillText('6', 5, 420, 25);

  // columns
  ctx.strokeText('A', 55, 20, 25);
  ctx.fillText('A', 55, 20, 25);

  ctx.strokeText('B', 125, 20, 25);
  ctx.fillText('B', 125, 20, 25);

  ctx.strokeText('C', 195, 20, 25);
  ctx.fillText('C', 195, 20, 25);

  // Skill Tree Names

  ctx.font = 'bold 15px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;

  printAtWordWrap(
    ctx,
    userCharacter.class.skillTrees[0].name,
    295,
    175,
    15,
    skillTreeMenuImage.width - 10,
  );

  printAtWordWrap(
    ctx,
    userCharacter.class.skillTrees[1].name,
    295,
    280,
    15,
    skillTreeMenuImage.width - 10,
  );

  printAtWordWrap(
    ctx,
    userCharacter.class.skillTrees[2].name,
    295,
    385,
    15,
    skillTreeMenuImage.width - 10,
  );

  for (let i = 0; i < skillTree.skills.length; i++) {
    const skillImage = await loadImage(path.join(__dirname, `../assets/images/skills/${userCharacter.user.currentClass.name}/${skillTree.name}`, `${skillTree.skills[i].name}.png`));

    // Skill Amount Boxes
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "black";
    ctx.rect(
      skillTree.skills[i].column === 1
        ? 15 + 25 + skillImage.width - 5
        : 15 + 25 + skillImage.width - 5
        + ((skillTree.skills[i].column) * (skillImage.width))
        + (((skillImage.width / 2) - 4) * (skillTree.skills[i].column - 1))
        - skillImage.width,
      skillTree.skills[i].row === 1
        ? 15 + 25 + skillImage.height - 6
        : 15 + 25 + skillImage.height - 6
        + ((skillTree.skills[i].row) * (skillImage.height))
        + (((skillImage.height / 2) - 4) * (skillTree.skills[i].row - 1))
        - skillImage.height,
      20,
      20,
    );
    ctx.stroke();

    // Skill Image
    ctx.drawImage(
      skillImage,
      skillTree.skills[i].column === 1
        ? 15 + 25
        : 15 + 25
        + ((skillTree.skills[i].column) * (skillImage.width))
        + (((skillImage.width / 2) - 4) * (skillTree.skills[i].column - 1))
        - skillImage.width,
      skillTree.skills[i].row === 1
        ? 15 + 25
        : 15 + 25
        + ((skillTree.skills[i].row) * (skillImage.height))
        + (((skillImage.height / 2) - 4) * (skillTree.skills[i].row - 1))
        - skillImage.height,
      skillImage.width,
      skillImage.height,
    );
  }

  const finalImage = await canvas.toBuffer();
  return finalImage;
};
