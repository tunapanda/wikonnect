const { faker, seed_number } = require('../_seeds');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reactions').del()
    .then(() => {
      return knex('chapters').pluck('id').then((chapterIds) => {
        return knex('users').pluck('id').then((userIds) => {
          const reactions = [];
          for (let index = 0; index < seed_number; index++) {
            const reaction = ['like', 'dislike'];
            reactions.push({
              reaction: faker.random.arrayElement(reaction),
              chapter_id: faker.random.arrayElement(chapterIds),
              user_id: faker.random.arrayElement(userIds),
            });
          }
          // Inserts seed entries
          return knex('reactions').insert(reactions);
        });
      });
    });
};
