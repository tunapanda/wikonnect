const SurveyModel = require('../models/survey');
const NotificationModel = require('../models/notification');
const UserSurveyModel = require('../models/user-survey');
const {notificationTypes} = require('../utils/notification-constants');
const {events} = require('../utils/storage-hooks-events');
const {SHooksEventEmitter} = require('../utils/event-emitter');

module.exports = () => {

  const surveyStatus = {
    published: 'Active',
    unpublished: 'Pending',
    archived: 'Archived',
  };
  /**
     * On Chapter Update
     */
  SHooksEventEmitter.on(events.user.chapter.countOnUpdate, async (payload) => {
    const surveys = await SurveyModel.query()
      .where('frequency', payload.totalApproved)
      .where('status',  surveyStatus.published)
      .where('surveyType','mne') //is default now.Future: there can be dedicated table of survey types.
      .where('expiry', '>=', new Date().toISOString()) // can do for now..(_region difference challenge_)
      .withGraphJoined('trigger')
      .where('trigger.name', 'chapter_approved')
      .withGraphJoined('respondents')
      .where(  (builder)=>{
        builder.where('respondents.userId','<>',  payload.creatorId)
          .orWhereNull('respondents.userId');
      });


    for (let i = 0; i < surveys.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'We\'d love to hear your thoughts',
          body: surveys[i].name,
          itemId: surveys[i].id,
          eventType: notificationTypes.chapter.approved,
          model: 'survey',
          recipientId: payload.creatorId,
          read: false,
          metadata: {sendEmail: false},
        });
      await UserSurveyModel.query()
        .insert({
          surveyId: surveys[i].id,
          userId: payload.creatorId
        });
    }

    const approvedChapterSurveys = await SurveyModel.query()
      .where('frequency', payload.totalPublished)
      .where('status',  surveyStatus.published)
      .where('expiry', '>=', new Date().toISOString())
      .withGraphJoined('trigger')
      .where('trigger.name', 'chapter_publish')
      .withGraphJoined('respondents')
      .where(  (builder)=>{
        builder.where('respondents.userId','<>',  payload.creatorId)
          .orWhereNull('respondents.userId');
      });
    
    for (let i = 0; i < approvedChapterSurveys.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'We\'d love to hear your thoughts',
          body: approvedChapterSurveys[i].name,
          itemId: approvedChapterSurveys[i].id,
          eventType: notificationTypes.chapter.published,
          model: 'survey',
          recipientId: payload.creatorId,
          read: false,
          metadata: {sendEmail: false},
        });
      await UserSurveyModel.query()
        .insert({
          surveyId: approvedChapterSurveys[i].id,
          userId: payload.creatorId
        });
    }

  });
  /**
     * On Comment/Reply create
     */

  SHooksEventEmitter.on(events.user.comment.countOnCreate, async(payload) => {
    const commentSurveys = await SurveyModel.query()
      .where('frequency', payload.totalComments)
      .where('status',  surveyStatus.published)
      .where('surveyType','mne')
      .where('expiry', '>=', new Date().toISOString())
      .withGraphJoined('trigger')
      .where('trigger.name', 'comment_create')
      .withGraphJoined('respondents')
      .where(  (builder)=>{
        builder.where('respondents.userId','<>',  payload.creatorId)
          .orWhereNull('respondents.userId');
      });  
    
    for (let i = 0; i < commentSurveys.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'We\'d love to hear your thoughts',
          body:  commentSurveys[i].name,
          itemId: commentSurveys[i].id,
          model: 'survey',
          eventType:notificationTypes.comment.created,
          recipientId: payload.creatorId,
          read: false,
          metadata: {sendEmail: false},
        });

      await UserSurveyModel.query()
        .insert({
          surveyId: commentSurveys[i].id,
          userId: payload.creatorId
        });
    }

    const repliesSurveys = await SurveyModel.query()
      .where('frequency', payload.totalReplies)
      .where('status',  surveyStatus.published)
      .where('surveyType','mne')
      .where('expiry', '>=', new Date().toISOString()) 
      .withGraphJoined('trigger')
      .where('trigger.name', 'comment_reply')
      .withGraphJoined('respondents')
      .where(  (builder)=>{
        builder.where('respondents.userId','<>',  payload.creatorId)
          .orWhereNull('respondents.userId');
      });
    
    for (let i = 0; i < repliesSurveys.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'We\'d love to hear your thoughts',
          body:  repliesSurveys[i].name,
          itemId: repliesSurveys[i].id,
          model: 'survey',
          eventType:notificationTypes.comment.replied,
          recipientId: payload.creatorId,
          read: false,
          metadata: {sendEmail: false},
        });

      await UserSurveyModel.query()
        .insert({
          surveyId: repliesSurveys[i].id,
          userId: payload.creatorId
        });
    }
    
  });

  /**
     * On reaction created
     */
  SHooksEventEmitter.on(events.user.reaction.countOnCreate, async(payload) =>{
    const surveys = await SurveyModel.query()
      .where('frequency', payload.totalReactions)
      .where('surveyType','mne')
      .where('status',  surveyStatus.published)
      .where('expiry', '>=', new Date().toISOString())
      .withGraphJoined('trigger')
      .where('trigger.name', 'reaction_create')
      .withGraphJoined('respondents')
      .where(  (builder)=>{
        builder.where('respondents.userId','<>',  payload.creatorId)
          .orWhereNull('respondents.userId');
      });

    for (let i = 0; i < surveys.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'We\'d love to hear your thoughts',
          body: surveys[i].name,
          itemId: surveys[i].id,
          model: 'survey',
          eventType:notificationTypes.reaction.created,
          recipientId: payload.creatorId,
          read: false,
          metadata: {sendEmail: false},
        });

      await UserSurveyModel.query()
        .insert({
          surveyId: surveys[i].id,
          userId: payload.creatorId
        });
    }
  });

  /**
     * On ratings created
     */
  SHooksEventEmitter.on(events.user.rating.countOnCreate, async (payload) => {

    const surveys = await SurveyModel.query()
      .where('frequency', payload.totalRatings)
      .where('surveyType','mne')
      .where('status',  surveyStatus.published)
      .where('expiry', '>=', new Date().toISOString())
      .withGraphJoined('trigger')
      .where('trigger.name', 'rating_create')
      .withGraphJoined('respondents')
      .where(  (builder)=>{
        builder.where('respondents.userId','<>',  payload.creatorId)
          .orWhereNull('respondents.userId');
      });

    for (let i = 0; i < surveys.length; i++) {
      //add a notification
      await NotificationModel.query()
        .insert({
          title: 'We\'d love to hear your thoughts',
          body: surveys[i].name,
          itemId: surveys[i].id,
          eventType:notificationTypes.rating.created,
          model: 'survey',
          recipientId: payload.creatorId,
          read: false,
          metadata: {sendEmail: false},
        });

      await UserSurveyModel.query()
        .insert({
          surveyId: surveys[i].id,
          userId: payload.creatorId
        });
    }

  });


};