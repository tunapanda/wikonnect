const faker = require('faker');
const desiredFakeNum = 100;
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(() => knex('parent_child_comments').del())
    .then(() => {
      return knex('chapters').pluck('id').then((chapterIds) => {
        knex('users').pluck('id').then((userIds) => {
          const fakeComments = [];

          for (let index = 0; index < desiredFakeNum; index++) {
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
              const parent_child_comments = [];

              for (let index = 0; index < desiredFakeNum; index++) {
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
