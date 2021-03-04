const { faker, seed_number } = require('../_seeds');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(() => knex('parent_child_comments').del())
    .then(() => {
      return knex('chapters').pluck('id').then((chapterIds) => {
        knex('users').pluck('id').then((userIds) => {
          const seed_number = chapterIds.length;
          const users = userIds.length;
          const fakeComments = [];
          for (let index = 0; index < seed_number; index++) {
            for (let data = 0; data < users; data++) {
              fakeComments.push({
                chapter_id: chapterIds[index],
                comment: faker.lorem.sentence(),
                creator_id: userIds[data],
                created_at: faker.date.past(),
                updated_at: faker.date.recent()
              });
            }
          }
          return knex('comments').insert(fakeComments);
        })
          .then(() => {
            return knex('comments').pluck('id').then((commentIds) => {
              const parent_child_comments = [];
              for (let index = 0; index < seed_number; index++) {
                parent_child_comments.push({
                  parent_id: faker.random.arrayElement(commentIds),
                  child_id: faker.random.arrayElement(commentIds)
                });
              }
              return knex('parent_child_comments').insert(parent_child_comments);
            });
          });
      });
    });
};
