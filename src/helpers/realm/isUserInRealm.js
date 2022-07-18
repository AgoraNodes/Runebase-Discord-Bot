import { needToBeInDiscordRealmEmbed } from "../../embeds";

const isUserInRealm = async (
  userCurrentCharacter,
  discordClient,
  message,
  isDefered,
) => {
  let usedDeferReply = false;
  const server = discordClient.guilds.cache.get(userCurrentCharacter.UserGroup.group.groupId);
  if (!server.members.cache.get(userCurrentCharacter.UserGroup.user.user_id)) {
    if (!isDefered) {
      await message.reply({
        content: `<@${userCurrentCharacter.UserGroup.user.user_id}>, ${userCurrentCharacter.UserGroup.group.inviteLink}`,
        embeds: [
          await needToBeInDiscordRealmEmbed(
            userCurrentCharacter.UserGroup.group,
          ),
        ],
        ephemeral: true,
      });
      return [
        true,
        usedDeferReply,
      ];
    }
    await message.editReply({
      content: `<@${userCurrentCharacter.UserGroup.user.user_id}>, ${userCurrentCharacter.UserGroup.group.inviteLink}`,
      embeds: [
        await needToBeInDiscordRealmEmbed(
          userCurrentCharacter.UserGroup.group,
        ),
      ],
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

export default isUserInRealm;
