import { MessageButton } from "discord.js";
import skillEmoji from "../config/skillEmoji";

export const generateAcceptButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Accept`,
    emoji: '<a:checkmark:993469790343671848>',
    customId: 'accept',
  });

  return result;
};

export const generateDeclineButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Decline`,
    emoji: '<a:rejected:993469997596815393>',
    customId: 'decline',
  });

  return result;
};

export const generateBackButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: 'Back',
    emoji: '<a:backArrow:993514069795557488>',
    customId: 'back',
  });

  return result;
};

export const generateForwardButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: 'Forward',
    emoji: '<a:forwardArrow:993514566585683988>',
    customId: 'forward',
  });

  return result;
};

export const generateCancelPickClassButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Cancel class selection`,
    emoji: '<a:rejected:993469997596815393>',
    customId: 'cancelClass',
  });

  return result;
};

export const generatePickClassButton = (
  start,
  classes,
) => {
  const current = classes.slice(start, start + 1);
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Pick ${current[0].name}`,
    emoji: '⛏️',
    customId: `pickClass:${current[0].id}`,
  });

  return result;
};

export const generateCancelSkillButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Cancel skill selection`,
    emoji: '<a:rejected:993469997596815393>',
    customId: 'cancelSkillPick',
  });

  return result;
};

export const generateAddSkillButton = (mySelectedSkill) => {
  const addSkillId = `addSkill:${mySelectedSkill.id}`;
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Add Skillpoint to ${mySelectedSkill.name}`,
    emoji: '➕',
    customId: addSkillId,
  });

  return result;
};

export const generateAddStrengthButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: 'Strength ➕',
    emoji: '💪',
    customId: 'strength',
  });

  return result;
};

export const generateAddDexterityButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: 'Dexterity ➕',
    emoji: '🏃‍♂️',
    customId: 'dexterity',
  });

  return result;
};

export const generateAddVitalityButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: 'Vitality ➕',
    emoji: '❤️',
    customId: 'vitality',
  });

  return result;
};

export const generateAddEnergyButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: 'Energy ➕',
    emoji: '🧙',
    customId: 'energy',
  });

  return result;
};

export const generateCancelStatsPickButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: 'Cancel Stats Selection',
    emoji: '<a:rejected:993469997596815393>',
    customId: 'cancelStatsPick',
  });

  return result;
};

export const generateExitInventoryButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Exit Inventory`,
    emoji: '<a:rejected:993469997596815393>',
    customId: 'exitInventory',
  });

  return result;
};

export const generateDestroyItemButton = (
  start,
  userCurrentCharacter,
) => {
  const current = userCurrentCharacter.inventory.items.slice(start, start + 1);
  const destroyItemId = `Destroy:${current[0].id}`;
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Destroy ${current[0].name}`,
    emoji: '<a:rejected:993469997596815393>',
    customId: destroyItemId,
  });

  return result;
};

export const generateDestroyNoButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `No, go back`,
    emoji: '<a:backArrow:993514069795557488>',
    customId: 'cancelDestroy',
  });

  return result;
};

export const generateEquipItemButton = (
  start,
  userCurrentCharacter,
) => {
  const current = userCurrentCharacter.inventory.items.slice(start, start + 1);
  const equipItemId = `Equip:${current[0].id}`;
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Equip ${current[0].name}`,
    emoji: '⛏️',
    customId: equipItemId,
  });

  return result;
};

export const generateDestroyYesButton = (
  start,
  userCurrentCharacter,
) => {
  const current = userCurrentCharacter.inventory.items.slice(start, start + 1);
  const destroyYesButtonId = `ConfirmDestroy:${current[0].id}`;
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Yes, destroy ${current[0].name}`,
    emoji: '🚮',
    customId: destroyYesButtonId,
  });

  return result;
};

export const generateMainSkillButton = (
  mySelectedSkill,
) => {
  const emoji = skillEmoji.find((a) => a.name === mySelectedSkill.skill.name);
  console.log(emoji);
  console.log('emoji');
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `${mySelectedSkill.skill.name}`,
    // emoji: emoji ? emoji.emoji : '',
    customId: `attackMain:${mySelectedSkill.id}`,
    ...(emoji ? {
      emoji: emoji.emoji,
    } : false),
  });

  return result;
};

export const generateSecondarySkillButton = (
  mySelectedSkill,
) => {
  const emoji = skillEmoji.find((a) => a.name === mySelectedSkill.skill.name);
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `${mySelectedSkill.skill.name}`,
    // emoji: '➕',
    customId: `attackSecondary:${mySelectedSkill.id}`,
    ...(emoji ? {
      emoji: emoji.emoji,
    } : false),
  });

  return result;
};

export const generateHealButton = () => {
  const result = new MessageButton({
    style: 'SECONDARY',
    label: `Heal`,
    emoji: '<a:heal:994509319573876786>',
    customId: 'Heal',
  });

  return result;
};
