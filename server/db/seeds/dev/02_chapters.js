const { faker, seed_number } = require('../_seeds');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('lesson_chapters').del()
    .then(() => knex('chapters').del())
    .then(() => {
      return knex('users').pluck('id').then((userIds) => {
        const fakeChapters = [];
        for (let index = 0; index < seed_number; index++) {
          const name = faker.lorem.words();
          const slug = faker.helpers.slugify(name);
          const status = ['published', 'drafts', 'archived'];
          const tags = ['highschool', 'university', 'all', 'data', 'test'];
          fakeChapters.push({
            name: name,
            slug: slug,
            description: faker.lorem.paragraph(),
            lesson_id: 'lesson1',
            content_type: 'h5p',
            status: faker.random.arrayElement(status),
            content_uri: '/uploads/h5p/chapter1',
            creator_id: faker.random.arrayElement(userIds),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
            tags: faker.random.arrayElements(tags),
            approved: faker.random.boolean(),
            verified: faker.random.boolean()
          });
        }
        // Inserts seed entries
        return knex('chapters').insert(fakeChapters);
      });
    });
};
