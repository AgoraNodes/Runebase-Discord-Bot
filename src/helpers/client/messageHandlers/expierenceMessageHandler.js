import {
  gainTestExpMessage,
  gainVoteTopggExpMessage,
  invitedNewUserRewardMessage,
} from '../../../messages';

export const handleExperienceMessage = async (
  discordChannel,
  updatedUser,
  amount,
  gainExpType,
  userJoined = false,
) => {
  if (gainExpType === 'testExp') {
    await discordChannel.send({
      content: `<@${updatedUser.user_id}>`,
      embeds: [
        gainTestExpMessage(
          updatedUser.user_id,
          amount,
        ),
      ],
    });
  }
  if (gainExpType === 'topggVote') {
    await discordChannel.send({
      content: `<@${updatedUser.user_id}>`,
      embeds: [
        gainVoteTopggExpMessage(
          updatedUser.user_id,
          amount,
        ),
      ],
    });
  }
  if (gainExpType === 'userJoined') {
    await discordChannel.send({
      content: `<@${updatedUser.user_id}>`,
      embeds: [
        invitedNewUserRewardMessage(
          updatedUser.user_id,
          userJoined,
          amount,
        ),
      ],
    });
  }
};
