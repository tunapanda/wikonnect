const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJSON = require('chai-json-schema');

const knex = require('../db/db');
const triggerModel = require('../models/triggers');
const userModel = require('../models/user');
const badgeModel = require('../models/badges');
const chapterModel = require('../models/chapter');
const commentModel = require('../models/comment');
const reactionModel = require('../models/reaction');
const ratingModel = require('../models/rating');
const { socketEventEmitter } = require('../utils/event-emitter');
const { events } = require('../utils/socket-events');
const { notificationTypes } = require('../utils/notification-constants');


chai.use(chaiHttp);
chai.use(chaiJSON);
chai.should();


describe('User badges awarding', () => {

  before(async () => {

    await knex.migrate.rollback(); //reset tables
    await knex.migrate.latest(); // rerun the migrations
    //seed users only
    await knex.seed.run({
      specific: '01_users.js'
    });
    const triggers = await knex(triggerModel.tableName).select('id');
    const userIds = await knex(userModel.tableName).select('id');

    // seed badges with static data
    const badges = [];
    for (let i = 0; i < triggers.length; i++) {
      badges.push({
        name: `Test Badge ${i}`,
        slug: `test-badge-${i}`,
        published: true,
        expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        frequency: 1, // we will test with one X
        trigger_id: triggers[i].id,
        creator_id: userIds[0].id,
        description: 'Test description',
        is_deleted: false,
        reminder: 10,
        reminder_message: 'This is a sample reminder message',
      });
    }
    await knex(badgeModel.tableName).insert(badges);
  });


  async function createChapter() {
    await knex(chapterModel.tableName).delete();
    const userIds = await knex(userModel.tableName).select('id');

    const chapter = {
      name: 'This is a test chapter',
      description: 'test',
      approved: false,
      status: 'draft',
      creatorId: userIds[0].id
    };
    return await chapterModel.query().insertAndFetch(chapter);
  }

  it('Should unlock a badge on publishing a chapter', async () => {

    const chapter = await createChapter();

    await chapterModel.query()
      .patchAndFetchById(chapter.id, {
        status: 'published'
      });

    return new Promise(((resolve, reject) => {
      socketEventEmitter.on(events.user.notification.created, (model) => {
        if (model.eventType === notificationTypes.badge.unlocked) {
          resolve(true);
        } else {
          reject('Invalid notification type');
        }
      });
    }));

  });

  it('Should unlock a badge on chapter approval', async () => {

    const chapter = await createChapter();

    await chapterModel.query()
      .patchAndFetchById(chapter.id, {
        approved: true,
        status: 'published'
      });

    return new Promise(((resolve, reject) => {
      socketEventEmitter.on(events.user.notification.created, (model) => {
        if (model.eventType === notificationTypes.badge.unlocked) {
          resolve(true);
        } else {
          reject('Invalid notification type');
        }
      });
    }));

  });

  it('Should unlock a badge on chapter comment creation', async () => {

    const chapter = await createChapter();
    const userIds = await knex(userModel.tableName).select('id');

    await commentModel.query()
      .insert({
        chapterId: chapter.id,
        comment: 'Test comment',
        creatorId: userIds[0].id,
      });

    return new Promise(((resolve, reject) => {
      socketEventEmitter.on(events.user.notification.created, (model) => {
        if (model.eventType === notificationTypes.badge.unlocked) {
          resolve(true);
        } else {
          reject('Invalid notification type');
        }
      });
    }));

  });

  it('Should unlock a badge  on comment reply creation', async () => {

    const chapter = await createChapter();
    const userIds = await knex(userModel.tableName).select('id');
    const commentIds = await knex(commentModel.tableName).select('id')
      .where('parent_id', 'false');

    await commentModel.query()
      .insert({
        chapterId: chapter.id,
        comment: 'Test reply',
        parentId: commentIds[0] ? commentIds[0].id : 'follow',
        creatorId: userIds[0].id,
      });

    return new Promise(((resolve, reject) => {
      socketEventEmitter.on(events.user.notification.created, (model) => {
        if (model.eventType === notificationTypes.badge.unlocked) {
          resolve(true);
        } else {
          reject('Invalid notification type');
        }
      });
    }));

  });

  it('Should unlock a badge on chapter reaction creation', async () => {

    const chapter = await createChapter();
    const userIds = await knex(userModel.tableName).select('id');

    await reactionModel.query()
      .insert({
        chapterId: chapter.id,
        reaction: 'like',
        userId: userIds[0].id,
      });

    return new Promise(((resolve, reject) => {
      socketEventEmitter.on(events.user.notification.created, (model) => {
        if (model.eventType === notificationTypes.badge.unlocked) {
          resolve(true);
        } else {
          reject('Invalid notification type');
        }
      });
    }));

  });

  it('Should unlock a badge on chapter rating creation', async () => {

    const chapter = await createChapter();
    const userIds = await knex(userModel.tableName).select('id');

    await ratingModel.query()
      .insert({
        chapterId: chapter.id,
        userId: userIds[0].id,
        averageRating: 10,
        reaction: 'like',
        isDeleted: false,
      });

    return new Promise((resolve => {
      socketEventEmitter.on(events.user.notification.created, () => {
        resolve(false);
      });
    }));

  });

  after(async () => {
    await knex.migrate.latest();
    return await knex.seed.run();
  });
});