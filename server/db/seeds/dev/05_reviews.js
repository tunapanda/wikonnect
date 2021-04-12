const {faker} = require('../_seeds');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(async () => {

      const ratings = await knex('ratings')
        .select('id', 'reaction', 'metadata', 'is_deleted','chapter_id','user_id');

      const reviews = [];
      for (let index = 0; index < ratings.length; index++) {
        const rating =ratings[index];

        const metadata = Object.keys(rating.metadata)
          .reduce((acc, key) => {
            acc[key] = faker.lorem.sentence();
            return acc;
          }, {});

        reviews.push({
          chapter_id: rating.chapter_id,
          user_id: rating.user_id,
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
