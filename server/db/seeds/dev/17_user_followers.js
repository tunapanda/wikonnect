const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('user_followers').del();

  const userIds = await knex('users').pluck('id');

  let subscribers = [];

  for (let i = 0; i < seed_number; i++) {
    const { user_id, followee_id } = generateUnique();
    subscribers.push({
      followee_id,
      user_id,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  function generateUnique() {
    const userId = faker.random.arrayElement(userIds);
    const followeeId = faker.random.arrayElement(userIds);
    const index = subscribers.findIndex((c) => c.user_id === userId && c.followee_id === followeeId);

    if (index > -1 || followeeId === userId) {
      return generateUnique();
    }
    return { user_id: userId, followee_id: followeeId };
  }
  // Inserts seed entries
  return knex('user_followers').insert(subscribers);
};
