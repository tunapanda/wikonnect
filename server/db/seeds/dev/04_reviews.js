const {faker, seed_number} = require('../_seeds');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(async () => {
      const chapterIds = await knex('chapters').pluck('id');
      const userIds = await knex('users').pluck('id');

      const ratings = await knex('ratings').select('id', 'reaction', 'metadata', 'is_deleted');

      const reviews = [];
      for (let index = 0; index < seed_number; index++) {
        const rating = faker.random.arrayElement(ratings);

        const metadata = Object.keys(rating.metadata)
          .reduce((acc, key) => {
            acc[key] = faker.lorem.sentence();
            return acc;
          }, {});

        reviews.push({
          chapter_id: faker.random.arrayElement(chapterIds),
          user_id: faker.random.arrayElement(userIds),
          rating_id: rating.id,
          reaction: rating.reaction,
          metadata: metadata,
          is_deleted: rating.is_deleted,
          created_at: faker.date.past(),
          updated_at: faker.date.recent(),
        });
      }
      // Inserts seed entries
      return knex('reviews').insert(reviews);
    });
};
