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
          let conflicts = 0;
          const reaction = ['like', 'dislike', 'null'];
          for (let index = 0; index < seed_number; index++) {
            for (let data = 0; data < users; data++) {
              console.log(chapterIds[index], userIds[data]);
              reactions.push({
                reaction: faker.random.arrayElement(reaction),
                chapter_id: chapterIds[index],
                user_id: userIds[data],
              });
            }
          }
          console.log(conflicts);
          // Inserts seed entries
          return knex('reactions').insert(reactions);
        });
      });
    });
};
