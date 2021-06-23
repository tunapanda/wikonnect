const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('courses').del();

  const userIds = await knex('users').pluck('id');

  let courses = [];

  for (let i = 0; i < seed_number; i++) {
    const name = faker.lorem.words();
    courses.push({
      name,
      slug: faker.helpers.slugify(name.toLowerCase()),
      description: faker.lorem.paragraph(),
      status: faker.random.arrayElement(['published', 'draft']),
      thumbnail_url: faker.image.imageUrl(500, 300, 'business', true, false),
      creator_id: faker.random.arrayElement(userIds),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  // Inserts seed entries
  return knex('courses').insert(courses);
};
