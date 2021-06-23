const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('user_followers').del();

  const userIds = await knex('users').pluck('id');

  let subscribers = [];

  for (let i = 0; i < seed_number; i++) {
    const { user_id, following_id } = generateUnique();
    subscribers.push({
      following_id,
      user_id,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  function generateUnique() {
    const userId = faker.random.arrayElement(userIds);
    const followingId = faker.random.arrayElement(userIds);
    const index = subscribers.findIndex((c) => c.user_id === userId && c.following_id === followingId);

    if (index > -1 || followingId === userId) {
      return generateUnique();
    }
    return { user_id: userId, following_id: followingId };
  }
  // Inserts seed entries
  return knex('user_followers').insert(subscribers);
};
