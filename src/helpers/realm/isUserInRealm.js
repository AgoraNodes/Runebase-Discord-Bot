const isUserInRealm = async (
  discordClient,
  userCurrentCharacter,
) => {
  let isInRealm = false;
  console.log(userCurrentCharacter.UserGroup);
  console.log('isUserInRealm Start');
  const server = discordClient.guilds.cache.get(userCurrentCharacter.UserGroup.group.groupId);
  if (server.members.cache.get(userCurrentCharacter.UserGroup.user.user_id)) {
    isInRealm = true;
  }
  return isInRealm;
};

export default isUserInRealm;
