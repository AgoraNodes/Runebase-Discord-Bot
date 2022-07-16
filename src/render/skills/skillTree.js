import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import {
  createCanvas,
  loadImage,
} from 'canvas';
import path from 'path';
import _ from 'lodash';
import { renderGrayScaleIcon } from './grayScaleIcon';

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

export const renderSkillTreeImage = async (
  userCharacter,
  skillTree,
  skillTreeIndex,
  selectedSkill,
) => {
  console.log('before render skill tree');
  console.log(userCharacter);
  const userCurrentRank = userCharacter.UserGroup.ranks[0] ? userCharacter.UserGroup.ranks[0] : { level: 0 };
  const skillTreeMenuImage = await loadImage(path.join(__dirname, `../../assets/images/skilltree/`, `skillTreeMenu.png`));
  const skillTreeImage = await loadImage(path.join(__dirname, `../../assets/images/skilltree/`, `skilltree${skillTreeIndex}.png`));
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

  console.log(userCharacter);
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
  console.log('before render skill tree 1');
  ctx.shadowBlur = 30;
  ctx.shadowColor = "blue";
  ctx.beginPath();
  ctx.lineWidth = "3";
  ctx.strokeStyle = "blue";
  ctx.rect(
    selectedSkill.column === 1
      ? 15 + 25
      : 15 + 25
      + ((selectedSkill.column) * (48))
      + (((48 / 2) - 4) * (selectedSkill.column - 1))
      - 48,
    selectedSkill.row === 1
      ? 15 + 24
      : 15 + 24
      + ((selectedSkill.row) * (48))
      + (((48 / 2) - 4) * (selectedSkill.row - 1))
      - 48,
    50,
    50,
  );
  ctx.stroke();

  // Draw Connection
  for (let i = 0; i < skillTree.skills.length; i++) {
    for (let y = 0; y < skillTree.skills[i].PreviousSkill.length; y++) {
      if (skillTree.skills[i].PreviousSkill[y]) {
        const userHasPreviousSkill = userCharacter.UserGroupClassSkills.find((o) => o.skillId === skillTree.skills[i].PreviousSkill[y].id);
        const userHasCurrentSkill = userCharacter.UserGroupClassSkills.find((o) => o.skillId === skillTree.skills[i].id);
        if (userHasPreviousSkill && userHasCurrentSkill) {
          ctx.shadowBlur = 30;
          ctx.shadowColor = "#FFD700";
          ctx.beginPath();
          ctx.lineWidth = "3";
          ctx.strokeStyle = "#FFD700";
        } else {
          ctx.shadowBlur = 0;
          ctx.shadowColor = "none";
          ctx.beginPath();
          ctx.lineWidth = "3";
          ctx.strokeStyle = "#151515";
        }

        if (
          skillTree.skills[i].row - skillTree.skills[i].PreviousSkill[y].row === 1
          || skillTree.skills[i].column === skillTree.skills[i].PreviousSkill[y].column
          || (
            skillTree.skills[i].row === skillTree.skills[i].PreviousSkill[y].row
            && skillTree.skills[i].column - skillTree.skills[i].PreviousSkill[y].column === -1
          )
        ) {
          ctx.moveTo(
            skillTree.skills[i].column === 1
              ? 15 + 27 + (48 / 2)
              : 15 + 27 + (48 / 2)
              + ((skillTree.skills[i].column) * (48))
              + (((48 / 2) - 4) * (skillTree.skills[i].column - 1))
              - 48,
            skillTree.skills[i].row === 1
              ? 15 + 27 + (48 / 2)
              : 15 + 27 + (48 / 2) - 6
              + ((skillTree.skills[i].row) * (48))
              + (((48 / 2) - 4) * (skillTree.skills[i].row - 1))
              - 48,
          );
        } else {
          ctx.moveTo(
            skillTree.skills[i].column === 1
              ? 15 + 27 + (48 / 2)
              : 15 + 27 + (48 / 2)
              + ((skillTree.skills[i].column) * (48))
              + (((48 / 2) - 4) * (skillTree.skills[i].column - 1))
              - 48,
            skillTree.skills[i].row === 1
              ? 15 + 27 + (48 / 2)
              : 15 + 27 + (48 / 2) - 6
              + ((skillTree.skills[i].row - 1) * (48))
              + (((48 / 2) - 4) * (skillTree.skills[i].row - 1))
              - 48,
          );
        }

        ctx.lineTo(
          skillTree.skills[i].PreviousSkill[y].column === 1
            ? 15 + 27 + (48 / 2)
            : 15 + 27 + (48 / 2)
            + ((skillTree.skills[i].PreviousSkill[y].column) * (48))
            + (((48 / 2) - 4) * (skillTree.skills[i].PreviousSkill[y].column - 1))
            - 48,
          skillTree.skills[i].PreviousSkill[y].row === 1
            ? 15 + 27 + (48 / 2)
            : 15 + 27 + (48 / 2)
            + ((skillTree.skills[i].PreviousSkill[y].row) * (48))
            + (((48 / 2) - 4) * (skillTree.skills[i].PreviousSkill[y].row - 1))
            - 48,
        );
        ctx.stroke();
      }
    }
  }

  ctx.shadowBlur = 0;
  ctx.shadowColor = "none";
  ctx.lineWidth = "3";
  ctx.strokeStyle = "black";
  console.log('before render skill tree 2');
  for (let i = 0; i < skillTree.skills.length; i++) {
    const skillIcon = await loadImage(path.join(__dirname, `../../assets/images/skills/${userCharacter.UserGroup.user.currentClass.name}/${skillTree.name}`, `${skillTree.skills[i].name}.png`));
    let skillImage;
    const userHasSkill = userCharacter.UserGroupClassSkills.find((o) => o.skillId === skillTree.skills[i].id);
    let userHasPreviousSkills = true;

    // check if user has the previous skills
    if (skillTree.skills[i].PreviousSkill.length === 1) {
      const userHasSkillOne = userCharacter.UserGroupClassSkills.find((o) => o.skillId === skillTree.skills[i].PreviousSkill[0].id);
      if (!userHasSkillOne) {
        userHasPreviousSkills = false;
      }
    }
    if (skillTree.skills[i].PreviousSkill.length === 2) {
      const userHasSkillOne = userCharacter.UserGroupClassSkills.find((o) => o.skillId === skillTree.skills[i].PreviousSkill[0].id);
      const userHasSkillTwo = userCharacter.UserGroupClassSkills.find((o) => o.skillId === skillTree.skills[i].PreviousSkill[1].id);
      if (!userHasSkillOne || !userHasSkillTwo) {
        userHasPreviousSkills = false;
      }
    }

    // check if we need gray scaled icon
    if (
      skillTree.skills[i].level > userCurrentRank.level
      || !userHasPreviousSkills
    ) {
      const grayScaleIconBuffer = await renderGrayScaleIcon(skillIcon);
      skillImage = await loadImage(grayScaleIconBuffer);
    } else {
      skillImage = skillIcon;
    }

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

    if (userHasSkill) {
      ctx.font = 'bold 12px "HeartWarming"';
      ctx.strokeText(
        userHasSkill.points,
        skillTree.skills[i].column === 1
          ? 15 + 28 + skillImage.width
          : 15 + 28 + skillImage.width
          + ((skillTree.skills[i].column) * (skillImage.width))
          + (((skillImage.width / 2) - 4) * (skillTree.skills[i].column - 1))
          - skillImage.width,
        skillTree.skills[i].row === 1
          ? 15 + 33 + skillImage.height
          : 15 + 33 + skillImage.height
          + ((skillTree.skills[i].row) * (skillImage.height))
          + (((skillImage.height / 2) - 4) * (skillTree.skills[i].row - 1))
          - skillImage.height,
        50,
      );
      ctx.fillText(
        userHasSkill.points,
        skillTree.skills[i].column === 1
          ? 15 + 28 + skillImage.width
          : 15 + 28 + skillImage.width
          + ((skillTree.skills[i].column) * (skillImage.width))
          + (((skillImage.width / 2) - 4) * (skillTree.skills[i].column - 1))
          - skillImage.width,
        skillTree.skills[i].row === 1
          ? 15 + 33 + skillImage.height
          : 15 + 33 + skillImage.height
          + ((skillTree.skills[i].row) * (skillImage.height))
          + (((skillImage.height / 2) - 4) * (skillTree.skills[i].row - 1))
          - skillImage.height,
        50,
      );
    }
  }
  console.log('before render skill tree 3');
  const totalSkillsPointsSpend = _.sumBy(userCharacter.UserGroupClassSkills, 'points');
  const skillPointsLeftToSpend = (userCurrentRank.level - totalSkillsPointsSpend);

  if (skillPointsLeftToSpend > 0) {
    ctx.font = 'bold 18px "HeartWarming"';
    ctx.shadowBlur = 30;
    ctx.shadowColor = "red";
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "red";
    ctx.strokeText(skillPointsLeftToSpend, 300, 105, 50);
    ctx.fillText(skillPointsLeftToSpend, 300, 105, 50);

    ctx.shadowBlur = 0;
    ctx.font = 'bold 15px "HeartWarming"';
    ctx.strokeText('Remaining', 300, 50, 70);
    ctx.fillText('Remaining', 300, 50, 70);
    ctx.strokeText('Skillpoints', 300, 70, 70);
    ctx.fillText('Skillpoints', 300, 70, 70);
  }
  console.log('before render skill tree 5');
  const finalImage = await canvas.toBuffer();
  console.log('before send back render skill message');
  return finalImage;
};
