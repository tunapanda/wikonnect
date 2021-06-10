/**
 * Storage Hook Event code format: [actor].[resource].[action]
 */
exports.events = {
  user: {
    chapter: {
      countOnCreate: 'user.chapter.countOnCreate',
      countOnUpdate: 'user.chapter.countOnUpdate',
      countOnShare: 'user.chapter.countOnShare',
    },
    comment: {
      countOnCreate: 'user.comment.countOnCreate',
      countOnUpdate: 'user.comment.countOnUpdate',
    },
    session: {
      countOnLogin: 'user.account.countOnLogin',
    },
    rating: {
      countOnCreate: 'user.rating.countOnCreate',
    },
    reaction: {
      countOnCreate: 'user.reaction.countOnCreate',
    }
  }
};
