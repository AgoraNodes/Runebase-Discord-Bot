import {
  // gainTestExpMessage,
  gainVoteTopggExpMessage,
  invitedNewUserRewardMessage,
  gainActiveTalkerExpMessage,
  gainBattleExpExpMessage,
} from '../../../messages';

export const handleExperienceMessage = async (
  discordChannel,
  updatedUserGroup,
  amount,
  gainExpType,
  userJoined = false,
) => {
  // if (gainExpType === 'testExp') {
  //   await discordChannel.send({
  //     content: `<@${updatedUser.user_id}>`,
  //     embeds: [
  //       gainTestExpMessage(
  //         updatedUser.user_id,
  //         amount,
  //       ),
  //     ],
  //   });
  // }
  if (gainExpType === 'battle') {
    await discordChannel.send({
      content: `<@${updatedUserGroup.user.user_id}>`,
      embeds: [
        gainBattleExpExpMessage(
          updatedUserGroup.user.user_id,
          amount,
        ),
      ],
    });
  }
  if (gainExpType === 'activeTalker') {
    await discordChannel.send({
      content: `<@${updatedUserGroup.user.user_id}>`,
      embeds: [
        gainActiveTalkerExpMessage(
          updatedUserGroup.user.user_id,
          amount,
        ),
      ],
    });
  }
  if (gainExpType === 'topggVote') {
    await discordChannel.send({
      content: `<@${updatedUserGroup.user.user_id}>`,
      embeds: [
        gainVoteTopggExpMessage(
          updatedUserGroup.user.user_id,
          amount,
        ),
      ],
    });
  }
  if (gainExpType === 'userJoined') {
    await discordChannel.send({
      content: `<@${updatedUserGroup.user.user_id}>`,
      embeds: [
        invitedNewUserRewardMessage(
          updatedUserGroup.user.user_id,
          userJoined,
          amount,
        ),
      ],
    });
  }
};
