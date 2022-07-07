import {
  MessageAttachment,
} from 'discord.js';
import {
  createCanvas,
  loadImage,
} from 'canvas';
import { renderSkillTreeImage } from "./skillTree";
import { renderSkillDescriptionImage } from './skillDescription';

export const renderSkillScreen = async (
  userCharacter,
  skillTree,
  skillTreeIndex,
  selectedSkill,
  failReason,
) => {
  const skillTreeImageBuffer = await renderSkillTreeImage(
    userCharacter,
    skillTree,
    skillTreeIndex,
    selectedSkill,
  );
  const skillTreeImage = await loadImage(skillTreeImageBuffer);

  const skillDescriptionImageBuffer = await renderSkillDescriptionImage(
    userCharacter,
    skillTree,
    skillTreeIndex,
    selectedSkill,
  );
  const skillDescriptionImage = await loadImage(skillDescriptionImageBuffer);

  const failReasonHeight = failReason ? 25 : 0;

  const canvas = createCanvas(
    skillTreeImage.width + skillDescriptionImage.width,
    skillTreeImage.height + failReasonHeight,
  );
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    skillTreeImage,
    0,
    0,
    skillTreeImage.width,
    skillTreeImage.height,
  );

  if (selectedSkill) {
    ctx.drawImage(
      skillDescriptionImage,
      skillTreeImage.width,
      0,
      skillDescriptionImage.width,
      skillDescriptionImage.height,
    );
  }

  if (failReason) {
    ctx.font = 'bold 15px "HeartWarming"';
    ctx.fillStyle = "red";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.strokeText(
      failReason,
      skillTreeImage.width / 2,
      skillTreeImage.height + 15,
      skillTreeImage.width,
    );
    ctx.fillText(
      failReason,
      skillTreeImage.width / 2,
      skillTreeImage.height + 15,
      skillTreeImage.width,
    );
  }

  return new MessageAttachment(canvas.toBuffer(), 'skillTree.png');
};
