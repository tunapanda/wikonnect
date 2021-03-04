const { faker, seed_number } = require('../_seeds');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('counter').del()
    .then(() => {
      return knex('chapters').pluck('id').then((chapterIds) => {
        const counter = [];
        for (let index = 0; index < seed_number; index++) {
          const triggers = ['chapterCompletion', 'timerDelay', 'pageLanding'];
          counter.push({
            trigger: faker.random.arrayElement(triggers),
            chapter_id: faker.random.arrayElement(chapterIds),
            counter: 3,
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
          });
        }
        // Inserts seed entries
        return knex('counter').insert(counter);
      });
    });
};