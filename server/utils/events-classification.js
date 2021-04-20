exports.eventCodes = {
  user: {
    registered: 'user-signup',
    authenticated: 'user-login',
    roleChange: 'role-modified',
    connected: 'connected',
    profileUpdated: 'profile-update',
    passwordResetRequested: 'user-password-reset-start',
    passwordResetSuccessful: 'user-password-reset-done',

  },
  chapter: {
    created: 'chapter-created',
    updated: 'chapter-updated',
    deleted: 'chapter-deleted',

    published: 'chapter-published',
    approved: 'chapter-approved',
    verified: 'chapter-verified',
      
  },
  reaction: {
    liked: 'liked-chapter',
    disliked: 'disliked-chapter',
  },
  rating:{
    deleted: 'rating-deleted',
    positiveCreated: 'positive-rating-created',
    negativeCreated: 'negative-rating-created',
  },   
  review:{
    deleted: 'rating-deleted',
    positiveCreated: 'positive-review-created',
    negativeCreated: 'negative-review-created',
  },
  chapterComment:{
    created: 'chapter-comment-created',
    updated: 'chapter-comment-updated',
    deleted: 'chapter-comment-deleted',
    ReplyCreated: 'chapter-comment-reply-created',
  },
  survey: {
    created: 'survey-created',
    updated: 'survey-updated',
    deleted: 'survey-deleted',
    filled: 'survey-filled',
  },
  contentEngagement: {
    started: 'attempted-chapter',
    completed: 'completed-chapter',
  },
  badge: {
    unlocked: 'badge-unlocked', //unlocked after X triggers on an action
    awarded: 'badge-awarded', //by another user
    revoked: 'badge-revoked',
    created: 'new-badge-created',
    updated: 'badge-details-updated',
    deleted: 'badge-deleted',
  }
};
