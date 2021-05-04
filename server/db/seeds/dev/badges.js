const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  return knex('badges').del()
    .then(() => {
      return knex('users').pluck('id').then((userIds) => {
        const fakeBadges = [];
        for (let index = 0; index < seed_number; index++) {
          const name = faker.lorem.words();
          const slug = faker.helpers.slugify(name);
          const trigger = ['chapter_create', 'chapter_publish', 'chapter_create', 'comment_create', 'comment_reply']
          fakeBadges.push({
            name: name,
            slug: slug,
            points: 10,
            description: faker.lorem.paragraph(),
            badge_uri: faker.image.imageUrl(328, 200, 'business', true, false),
            creator_id: faker.random.arrayElement(userIds),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
            is_deleted: faker.datatype.boolean(),
            trigger: faker.random.arrayElement(trigger)
          });
        }
        return knex('badges').insert(fakeBadges);
      });
    });
};
