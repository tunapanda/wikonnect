const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('tag_followers').del();

  const userIds = await knex('users').pluck('id');
  const tagIds = await knex('tags').pluck('id');

  let followers = [];

  for (let i = 0; i < seed_number; i++) {
    const { tag_id, user_id } = generateUnique();
    followers.push({
      tag_id,
      user_id,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  function generateUnique() {
    const userId = faker.random.arrayElement(userIds);
    const tagId = faker.random.arrayElement(tagIds);
    const index = followers.findIndex((c) => c.user_id === userId && c.tag_id === tagId);

    if (index > -1) {
      return generateUnique();
    }
    return { user_id: userId, tag_id: tagId };
  }
  // Inserts seed entries
  return knex('tag_followers').insert(followers);
};
