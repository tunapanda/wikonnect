const { faker, seed_number } = require('../_seeds');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(() => {
      return knex('chapters').pluck('id').then((chapterIds) => {
        knex('users').pluck('id').then((userIds) => {
          const fakeComments = [];
          for (let index = 0; index < seed_number; index++) {
            fakeComments.push({
              chapter_id: faker.random.arrayElement(chapterIds),
              comment: faker.lorem.sentence(),
              creator_id: faker.random.arrayElement(userIds),
              created_at: faker.date.past(),
              updated_at: faker.date.recent()
            });
          }
          return knex('comments').insert(fakeComments);
        })
          .then(() => {
            return knex('comments').pluck('id').then((commentIds) => {
              knex('users').pluck('id').then((userIds) => {
                const comments_with_replies = [];
                for (let index = 0; index < seed_number; index++) {
                  comments_with_replies.push({
                    parent_id: faker.random.arrayElement(commentIds),
                    chapter_id: faker.random.arrayElement(chapterIds),
                    comment: faker.lorem.sentence(),
                    creator_id: faker.random.arrayElement(userIds),
                    created_at: faker.date.past(),
                    updated_at: faker.date.recent()
                  });
                }
                return knex('comments').insert(comments_with_replies);
              });
            });
          });
      });
    });
};
