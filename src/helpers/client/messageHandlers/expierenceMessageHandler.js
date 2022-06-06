import {
  gainTestExpMessage,
  gainVoteTopggExpMessage,
} from '../../../messages';

export const handleExperienceMessage = async (
  discordChannel,
  updatedUser,
  amount,
  gainExpType,
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
};
