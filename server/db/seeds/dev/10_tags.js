const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('tags').del();

  const userIds = await knex('users').pluck('id');

  const defaultTags = ['Internet Basics', 'Content Creation', 'Digital Wellness',
    'Data Protection and Privacy', 'Online Safety', 'Relationships and Communications',
    'News and Media Literacy', 'Online Working', 'Online Learning', 'Life Skills',
    'Health', 'Digital Financial Literacy',
  ];

  let tags = [];

  for (let i = 0; i < defaultTags.length; i++) {
    tags.push({
      name: defaultTags[i],
      slug: faker.helpers.slugify(defaultTags[i].toLowerCase()),
      can_delete: false,
      creator_id: faker.random.arrayElement(userIds),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  const maxRandomSeeds = seed_number < defaultTags.length ? 0 : seed_number - defaultTags.length;
  for (let i = 0; i < maxRandomSeeds; i++) {
    const name = faker.lorem.words();
    tags.push({
      name,
      slug: faker.helpers.slugify(name.toLowerCase()),
      can_delete: true,
      creator_id: faker.random.arrayElement(userIds),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  // Inserts seed entries
  return knex('tags').insert(tags);
};
