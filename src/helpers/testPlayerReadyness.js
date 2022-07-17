import {
  notSelectedClassYetMessage,
  notSelectedRealmYetMessage,
} from '../messages';

const testPlayerReadyness = async (
  userCurrentCharacter,
  message,
  isDefered,
) => {
  let usedDeferReply = false;
  if (!userCurrentCharacter) {
    if (!isDefered) {
      await message.reply({
        content: notSelectedClassYetMessage(),
        ephemeral: true,
      });
      return [
        true,
        usedDeferReply,
      ];
    }
    await message.editReply({
      content: notSelectedClassYetMessage(),
      ephemeral: true,
    });
    usedDeferReply = true;
    return [
      true,
      usedDeferReply,
    ];
  }
  if (!userCurrentCharacter.UserGroup.user.currentRealmId) {
    if (!isDefered) {
      await message.reply({
        content: notSelectedRealmYetMessage(),
        ephemeral: true,
      });
      return [
        true,
        usedDeferReply,
      ];
    }
    await message.editReply({
      content: notSelectedRealmYetMessage(),
      ephemeral: true,
    });
    usedDeferReply = true;
    return [
      true,
      usedDeferReply,
    ];
  }
  return [
    false,
    usedDeferReply,
  ];
};

export default testPlayerReadyness;
