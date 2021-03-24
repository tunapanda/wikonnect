const {faker, seed_number} = require('../_seeds');
const questions = require('../../../utils/review-questions');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('ratings').del();

  const chapterIds = await knex('chapters').pluck('id');
  const userIds = await knex('users').pluck('id');
  const ratings = [];
  const categories = questions.map((d) => d.category);


  for (let index = 0; index < seed_number; index++) {
    let totalRating = 0;

    const metadata = faker.random.arrayElements(categories, 3).reduce((acc, category) => {
      acc[category] = Math.floor(Math.random() * Math.floor(5));
      totalRating += acc[category];
      return acc;
    }, {});
    const averageRating = totalRating / categories.length;

    const reaction = faker.random.arrayElement(['like', 'dislike', null]);

    ratings.push({
      chapter_id: faker.random.arrayElement(chapterIds),
      user_id: faker.random.arrayElement(userIds),
      average_rating: averageRating,
      reaction,
      metadata,
      is_deleted: reaction === null,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }
  // Inserts seed entries
  return knex('ratings').insert(ratings);

};
