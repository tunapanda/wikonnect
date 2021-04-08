const { faker } = require('../_seeds');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reactions').del()
    .then(() => {
      return knex('chapters').pluck('id').then((chapterIds) => {
        return knex('users').pluck('id').then((userIds) => {
          const seed_number = chapterIds.length;
          const users = userIds.length;
          const reactions = [];
          const reaction = ['like', 'dislike'];
          for (let index = 0; index < seed_number; index++) {
            for (let data = 0; data < users; data++) {
              reactions.push({
                reaction: faker.random.arrayElement(reaction),
                chapter_id: chapterIds[index],
                user_id: userIds[data],
              });
            }
          }
          // Inserts seed entries
          return knex('reactions').insert(reactions);
        });
      });
    });
};
