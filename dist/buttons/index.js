"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSecondarySkillButton = exports.generatePickClassButton = exports.generateMainSkillButton = exports.generateHealButton = exports.generateForwardButton = exports.generateExitInventoryButton = exports.generateEquipItemButton = exports.generateDestroyYesButton = exports.generateDestroyNoButton = exports.generateDestroyItemButton = exports.generateDeclineButton = exports.generateCancelStatsPickButton = exports.generateCancelSkillButton = exports.generateCancelPickClassButton = exports.generateBackButton = exports.generateAddVitalityButton = exports.generateAddStrengthButton = exports.generateAddSkillButton = exports.generateAddEnergyButton = exports.generateAddDexterityButton = exports.generateAcceptButton = void 0;

var _discord = require("discord.js");

var generateAcceptButton = function generateAcceptButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Accept",
    emoji: '<a:checkmark:993469790343671848>',
    customId: 'accept'
  });
  return result;
};

exports.generateAcceptButton = generateAcceptButton;

var generateDeclineButton = function generateDeclineButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Decline",
    emoji: '<a:rejected:993469997596815393>',
    customId: 'decline'
  });
  return result;
};

exports.generateDeclineButton = generateDeclineButton;

var generateBackButton = function generateBackButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: 'Back',
    emoji: '<a:backArrow:993514069795557488>',
    customId: 'back'
  });
  return result;
};

exports.generateBackButton = generateBackButton;

var generateForwardButton = function generateForwardButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: 'Forward',
    emoji: '<a:forwardArrow:993514566585683988>',
    customId: 'forward'
  });
  return result;
};

exports.generateForwardButton = generateForwardButton;

var generateCancelPickClassButton = function generateCancelPickClassButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Cancel class selection",
    emoji: '<a:rejected:993469997596815393>',
    customId: 'cancelClass'
  });
  return result;
};

exports.generateCancelPickClassButton = generateCancelPickClassButton;

var generatePickClassButton = function generatePickClassButton(start, classes) {
  var current = classes.slice(start, start + 1);
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Pick ".concat(current[0].name),
    emoji: '⛏️',
    customId: "pickClass:".concat(current[0].id)
  });
  return result;
};

exports.generatePickClassButton = generatePickClassButton;

var generateCancelSkillButton = function generateCancelSkillButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Cancel skill selection",
    emoji: '<a:rejected:993469997596815393>',
    customId: 'cancelSkillPick'
  });
  return result;
};

exports.generateCancelSkillButton = generateCancelSkillButton;

var generateAddSkillButton = function generateAddSkillButton(mySelectedSkill) {
  var addSkillId = "addSkill:".concat(mySelectedSkill.id);
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Add Skillpoint to ".concat(mySelectedSkill.name),
    emoji: '➕',
    customId: addSkillId
  });
  return result;
};

exports.generateAddSkillButton = generateAddSkillButton;

var generateAddStrengthButton = function generateAddStrengthButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: 'Strength ➕',
    emoji: '💪',
    customId: 'strength'
  });
  return result;
};

exports.generateAddStrengthButton = generateAddStrengthButton;

var generateAddDexterityButton = function generateAddDexterityButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: 'Dexterity ➕',
    emoji: '🏃‍♂️',
    customId: 'dexterity'
  });
  return result;
};

exports.generateAddDexterityButton = generateAddDexterityButton;

var generateAddVitalityButton = function generateAddVitalityButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: 'Vitality ➕',
    emoji: '❤️',
    customId: 'vitality'
  });
  return result;
};

exports.generateAddVitalityButton = generateAddVitalityButton;

var generateAddEnergyButton = function generateAddEnergyButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: 'Energy ➕',
    emoji: '🧙',
    customId: 'energy'
  });
  return result;
};

exports.generateAddEnergyButton = generateAddEnergyButton;

var generateCancelStatsPickButton = function generateCancelStatsPickButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: 'Cancel Stats Selection',
    emoji: '<a:rejected:993469997596815393>',
    customId: 'cancelStatsPick'
  });
  return result;
};

exports.generateCancelStatsPickButton = generateCancelStatsPickButton;

var generateExitInventoryButton = function generateExitInventoryButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Exit Inventory",
    emoji: '<a:rejected:993469997596815393>',
    customId: 'exitInventory'
  });
  return result;
};

exports.generateExitInventoryButton = generateExitInventoryButton;

var generateDestroyItemButton = function generateDestroyItemButton(start, userCurrentCharacter) {
  var current = userCurrentCharacter.inventory.items.slice(start, start + 1);
  var destroyItemId = "Destroy:".concat(current[0].id);
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Destroy ".concat(current[0].name),
    emoji: '<a:rejected:993469997596815393>',
    customId: destroyItemId
  });
  return result;
};

exports.generateDestroyItemButton = generateDestroyItemButton;

var generateDestroyNoButton = function generateDestroyNoButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "No, go back",
    emoji: '<a:backArrow:993514069795557488>',
    customId: 'cancelDestroy'
  });
  return result;
};

exports.generateDestroyNoButton = generateDestroyNoButton;

var generateEquipItemButton = function generateEquipItemButton(start, userCurrentCharacter) {
  var current = userCurrentCharacter.inventory.items.slice(start, start + 1);
  var equipItemId = "Equip:".concat(current[0].id);
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Equip ".concat(current[0].name),
    emoji: '⛏️',
    customId: equipItemId
  });
  return result;
};

exports.generateEquipItemButton = generateEquipItemButton;

var generateDestroyYesButton = function generateDestroyYesButton(start, userCurrentCharacter) {
  var current = userCurrentCharacter.inventory.items.slice(start, start + 1);
  var destroyYesButtonId = "ConfirmDestroy:".concat(current[0].id);
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Yes, destroy ".concat(current[0].name),
    emoji: '🚮',
    customId: destroyYesButtonId
  });
  return result;
};

exports.generateDestroyYesButton = generateDestroyYesButton;

var generateMainSkillButton = function generateMainSkillButton(mySelectedSkill) {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "".concat(mySelectedSkill.skill.name),
    // emoji: '➕',
    customId: "attackMain:".concat(mySelectedSkill.id)
  });
  return result;
};

exports.generateMainSkillButton = generateMainSkillButton;

var generateSecondarySkillButton = function generateSecondarySkillButton(mySelectedSkill) {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "".concat(mySelectedSkill.skill.name),
    // emoji: '➕',
    customId: "attackSecondary:".concat(mySelectedSkill.id)
  });
  return result;
};

exports.generateSecondarySkillButton = generateSecondarySkillButton;

var generateHealButton = function generateHealButton() {
  var result = new _discord.MessageButton({
    style: 'SECONDARY',
    label: "Heal",
    emoji: '<a:heal:994509319573876786>',
    customId: 'Heal'
  });
  return result;
};

exports.generateHealButton = generateHealButton;