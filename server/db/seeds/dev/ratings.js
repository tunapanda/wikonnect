const { faker, seed_number } = require('../_seeds');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ratings').del()
    .then(() => {
      return knex('chapters').pluck('id').then((chapterIds) => {
        return knex('users').pluck('id').then((userIds) => {
          const ratings = [];
          for (let index = 0; index < seed_number; index++) {
            const labels = ['bad sound', 'inaudible'];
            ratings.push({
              chapter_id: faker.random.arrayElement(chapterIds),
              user_id: faker.random.arrayElement(userIds),
              rating: Math.floor(Math.random() * Math.floor(5)),
              labels: faker.random.arrayElements(labels),
              created_at: faker.date.past(),
              updated_at: faker.date.recent(),
            });
          }
          // Inserts seed entries
          return knex('ratings').insert(ratings);
        });
      });
    });
};
