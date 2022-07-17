export const playingOnRealmMessage = (userCurrentCharacter) => `You are playing on realm: ${userCurrentCharacter.UserGroup.group.groupName}
<@${userCurrentCharacter.UserGroup.user.user_id}>`;

export const notSelectedClassYetMessage = () => 'You have not selected a class yet\n`!runebase pickclass`\n`/pickclass`';

export const notSelectedRealmYetMessage = () => 'You have not selected a realm yet\n`!runebase changerealm`\n`/changerealm`';
