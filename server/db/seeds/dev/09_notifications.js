const {faker, seed_number} = require('../_seeds');
const {eventCodes} = require('./../../../utils/events-classification');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('notifications').del()
    .then(async () => {
      const userIds = await knex('users').pluck('id');

      const comments = await knex('comments').select('id', 'chapter_id');

      const ratings = await knex('ratings')
        .select('id', 'chapter_id', 'reaction')
        .where('is_deleted', false);


      const chapters = await knex('chapters')
        .select('id', 'approved', 'verified', 'creator_id');

      /**
             * seed distribution: 1/4 -comments, 1/4 -ratings, 1/4 - approved chapters, 1/4- verified chapters
             */

      const maxSeed = Math.floor(seed_number / 4);

      //paint the comments (maxSeed only) with chapter creator Id & other notification properties
      const notificationComments = comments.slice(0, maxSeed) //we only need a portion
        .map((comment) => {
          const chapter = chapters.find((p) => p.id === comment.chapterId);
          const event_type = comment.parent_id === 'false' ?
            eventCodes.chapterComment.created :
            eventCodes.chapterComment.ReplyCreated;

          return {
            title: 'Your chapter just received a new comment',
            body: faker.lorem.words(),
            item_id: chapter.id,
            event_type,
            model: 'comment',
            recipient_id: chapter.creatorId,
            read: faker.random.boolean(),
            creator_id: faker.random.arrayElement(userIds),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
          };
        });


      //paint the ratings notifications with chapter creator Id & other notification properties

      const notificationRatings = ratings.slice(0, maxSeed) //we only need a portion
        .map((rating) => {
          const chapter = chapters.find((p) => p.id === rating.chapterId);
          const event_type = rating.reaction === 'like' ?
            eventCodes.rating.positiveCreated :
            eventCodes.rating.negativeCreated;

          return {
            title: 'User rated your chapter ' + faker.random.arrayElement(['🎆', '🎉', '✳']),
            body: faker.lorem.words(),
            item_id: chapter.id,
            event_type,
            model: 'rating',
            recipient_id: chapter.creatorId,
            read: faker.random.boolean(),
            creator_id: faker.random.arrayElement(userIds),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
          };
        });

      const approvedChapters = chapters.filter((c) => c.approved === true);

      const approvedChaptersNotifications = approvedChapters.slice(0, maxSeed)
        .map((chapter) => {
          return {
            title: 'Your chapter has been approved',
            body: faker.lorem.words(),
            item_id: chapter.id,
            event_type: eventCodes.chapter.approved,
            model: 'chapter',
            recipient_id: chapter.creatorId,
            read: faker.random.boolean(),
            metadata: {sendEmail: faker.random.boolean()},
            creator_id: faker.random.arrayElement(userIds),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
          };
        });


      const verifiedChapters = chapters.filter((c) => c.verified === true);

      const verifiedChaptersNotifications = verifiedChapters.slice(0, maxSeed)
        .map((chapter) => {
          return {
            title: 'Your chapter has been verified',
            body: faker.lorem.words(),
            item_id: chapter.id,
            event_type: eventCodes.chapter.verified,
            model: 'chapter',
            recipient_id: chapter.creatorId,
            read: faker.random.boolean(),
            metadata: {sendEmail: faker.random.boolean()},
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
          };
        });

      const notifications = [...notificationComments, ...notificationRatings,
        ...approvedChaptersNotifications, ...verifiedChaptersNotifications];

      // Inserts seed entries
      return knex('notifications').insert(notifications);
    });
};
