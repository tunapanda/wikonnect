const { raw } = require('objection');

const NotificationModel = require('../models/notification');
const BadgeModel = require('../models/badges');
const UserBadgeModel = require('../models/user-badge');
const { notificationTypes } = require('../utils/notification-constants');
const { events } = require('../utils/storage-hooks-events');
const { SHooksEventEmitter } = require('../utils/event-emitter');

module.exports = () => {

  const triggers = {
    learner: {
      chapter: {
        approved: 'chapter_approved',
        published: 'chapter_publish',
        completed: 'chapter_completed',
        attempted: 'chapter_attempted',
      },
      comment: {
        create: 'comment_create',
        reply: 'comment_reply',
      },
      reaction: {
        create: 'reaction_create',
      },
      rating: {
        create: 'rating_create'
      }
    }
  };

  /**
   * On Chapter Approved
   */
  SHooksEventEmitter.on(events.user.chapter.countOnApproved, async (payload) => {
    /** 1) query all badges that user might have unlocked   * */
    const badges = await BadgeModel.query()
      .where('frequency', payload.total)
      .where('published', true) // paying attention to published badges only
      .where('expiry', '>=', raw('now()')) // only query non expired badges (ignores time region difference challenge_)
      .withGraphJoined('badge_triggers')
      .where('badge_triggers.name', triggers.learner.chapter.approved)
      .withGraphJoined('badge_awardees')
      .where((builder) => {
        builder.where('badge_awardees.userId', '<>', payload.creatorId)
          .orWhereNull('badge_awardees.userId');
      });


    /** 2) for all badges the user have unlocked **/
    for (let i = 0; i < badges.length; i++) {

      /** 3) Create a notification for the chapter author **/
      await NotificationModel.query()
        .insert({
          title: 'You have earned a new badge',
          body: badges[i].name,
          itemId: badges[i].id,
          eventType: notificationTypes.badge.unlocked,
          model: 'badge',
          recipientId: payload.creatorId,
          read: false,
        });


      /** 4)  Add activity record (badge that user has unlocked) **/
      await UserBadgeModel.query()
        .insert({
          badgeId: badges[i].id,
          userId: payload.creatorId
        });
    }

  });

  /**
   * On chapter published
   */
  SHooksEventEmitter.on(events.user.chapter.countOnPublished, async (payload) => {
    const badges = await BadgeModel.query()
      .where('frequency', payload.total)
      .where('published', true) // paying attention to published badges only
      .where('is_deleted', false) // badges deleted through the api are partially deleted
      .where('expiry', '>=', raw('now()'))
      .withGraphJoined('badge_triggers')
      .where('badge_triggers.name', triggers.learner.chapter.published)
      .withGraphJoined('badge_awardees')
      .where((builder) => {
        builder.where('badge_awardees.userId', '<>', payload.creatorId)
          .orWhereNull('badge_awardees.userId');
      });


    for (let i = 0; i < badges.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'You have earned a new badge',
          body: badges[i].name,
          itemId: badges[i].id,
          eventType: notificationTypes.badge.unlocked,
          model: 'badge',
          recipientId: payload.creatorId,
          read: false,
        });

      await UserBadgeModel.query()
        .insert({
          badgeId: badges[i].id,
          userId: payload.creatorId
        });
    }

  });
  /**
   * On Comment create
   */

  SHooksEventEmitter.on(events.user.comment.countOnCreate, async (payload) => {
    const badges = await BadgeModel.query()
      .where('frequency', payload.total)
      .where('published', true)
      .where('is_deleted', false)
      .where('expiry', '>=', raw('now()'))
      .withGraphJoined('badge_triggers')
      .where('badge_triggers.name', triggers.learner.comment.create)
      .withGraphJoined('badge_awardees')
      .where((builder) => {
        builder.where('badge_awardees.userId', '<>', payload.creatorId)
          .orWhereNull('badge_awardees.userId');
      });

    for (let i = 0; i < badges.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'You have earned a new badge',
          body: badges[i].name,
          itemId: badges[i].id,
          eventType: notificationTypes.badge.unlocked,
          model: 'badge',
          recipientId: payload.creatorId,
          read: false,
        });

      await UserBadgeModel.query()
        .insert({
          badgeId: badges[i].id,
          userId: payload.creatorId
        });
    }


  });

  /**
   * On Reply create
   */
  SHooksEventEmitter.on(events.user.reply.countOnCreate, async (payload) => {

    const badges = await BadgeModel.query()
      .where('frequency', payload.total)
      .where('published', true)
      .where('is_deleted', false)
      .where('expiry', '>=', raw('now()'))
      .withGraphJoined('badge_triggers')
      .where('badge_triggers.name', triggers.learner.comment.reply)
      .withGraphJoined('badge_awardees')
      .where((builder) => {
        builder.where('badge_awardees.userId', '<>', payload.creatorId)
          .orWhereNull('badge_awardees.userId');
      });

    for (let i = 0; i < badges.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'You have earned a new badge',
          body: badges[i].name,
          itemId: badges[i].id,
          eventType: notificationTypes.badge.unlocked,
          model: 'badge',
          recipientId: payload.creatorId,
          read: false,
        });

      await UserBadgeModel.query()
        .insert({
          badgeId: badges[i].id,
          userId: payload.creatorId
        });
    }

  });

  /**
   * On reaction created
   */
  SHooksEventEmitter.on(events.user.reaction.countOnCreate, async (payload) => {

    const badges = await BadgeModel.query()
      .where('frequency', payload.totalReactions)
      .where('published', true)
      .where('is_deleted', false)
      .where('expiry', '>=', raw('now()'))
      .withGraphJoined('badge_triggers')
      .where('badge_triggers.name', triggers.learner.reaction.create)
      .withGraphJoined('badge_awardees')
      .where((builder) => {
        builder.where('badge_awardees.userId', '<>', payload.creatorId)
          .orWhereNull('badge_awardees.userId');
      });

    for (let i = 0; i < badges.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'You have earned a new badge',
          body: badges[i].name,
          itemId: badges[i].id,
          eventType: notificationTypes.badge.unlocked,
          model: 'badge',
          recipientId: payload.creatorId,
          read: false,
        });

      await UserBadgeModel.query()
        .insert({
          badgeId: badges[i].id,
          userId: payload.creatorId
        });
    }
  });

  /**
   * On ratings created
   */
  SHooksEventEmitter.on(events.user.rating.countOnCreate, async (payload) => {
    const badges = await BadgeModel.query()
      .where('frequency', payload.totalRatings)
      .where('published', true)
      .where('is_deleted', false)
      .where('expiry', '>=', raw('now()'))
      .withGraphJoined('badge_triggers')
      .where('badge_triggers.name', triggers.learner.rating.create)
      .withGraphJoined('badge_awardees')
      .where((builder) => {
        builder.where('badge_awardees.userId', '<>', payload.creatorId)
          .orWhereNull('badge_awardees.userId');
      });

    for (let i = 0; i < badges.length; i++) {
      await NotificationModel.query()
        .insert({
          title: 'You have earned a new badge',
          body: badges[i].name,
          itemId: badges[i].id,
          eventType: notificationTypes.badge.unlocked,
          model: 'badge',
          recipientId: payload.creatorId,
          read: false,
        });

      await UserBadgeModel.query()
        .insert({
          badgeId: badges[i].id,
          userId: payload.creatorId
        });
    }

  });


  /**
   * On chapter attempted
   */
  SHooksEventEmitter.on(events.user.chapter.countOnInteractionAttempt, async (payload) => {

    const badges = await BadgeModel.query()
      .where('frequency', payload.total)
      .where('published', true)
      .where('is_deleted', false)
      .where('expiry', '>=', raw('now()'))
      .withGraphJoined('badge_triggers')
      .where('badge_triggers.name', triggers.learner.chapter.attempted)
      .withGraphJoined('badge_awardees')
      .where((builder) => {
        builder.where('badge_awardees.userId', '<>', payload.creatorId)
          .orWhereNull('badge_awardees.userId');
      });

    for (let i = 0; i < badges.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'You have earned a new badge',
          body: badges[i].name,
          itemId: badges[i].id,
          eventType: notificationTypes.badge.unlocked,
          model: 'badge',
          recipientId: payload.creatorId,
          read: false,
          metadata: { sendEmail: false },
        });

      await UserBadgeModel.query()
        .insert({
          badgeId: badges[i].id,
          userId: payload.creatorId
        });
    }

  });

  /**
   * On chapter completed
   */
  SHooksEventEmitter.on(events.user.chapter.countOnInteractionComplete, async (payload) => {

    const badges = await BadgeModel.query()
      .where('frequency', payload.total)
      .where('published', true)
      .where('is_deleted', false)
      .where('expiry', '>=', raw('now()'))
      .withGraphJoined('badge_triggers')
      .where('badge_triggers.name', triggers.learner.chapter.completed)
      .withGraphJoined('badge_awardees')
      .where((builder) => {
        builder.where('badge_awardees.userId', '<>', payload.creatorId)
          .orWhereNull('badge_awardees.userId');
      });

    for (let i = 0; i < badges.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'You have earned a new badge',
          body: badges[i].name,
          itemId: badges[i].id,
          eventType: notificationTypes.badge.unlocked,
          model: 'badge',
          recipientId: payload.creatorId,
          read: false,
          metadata: { sendEmail: false },
        });

      await UserBadgeModel.query()
        .insert({
          badgeId: badges[i].id,
          userId: payload.creatorId
        });
    }

  });


};