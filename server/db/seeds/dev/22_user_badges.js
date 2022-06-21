const { faker, seed_number } = require('../_seeds');
const BadgeModel = require('../../../models/badges');
const UserBadgeModel = require('../../../models/user-badge');
const UserModel = require('../../../models/user');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(UserBadgeModel.tableName).del();

  const userIds = await knex(UserModel.tableName).pluck('id');
  const badgesIds = await knex(BadgeModel.tableName).pluck('id');

  const userAwardedBadges = [];

  for (let index = 0; index < seed_number; index++) {
    const dateUnlocked = faker.date.past();

    userAwardedBadges.push({
      badge_id: faker.random.arrayElement(badgesIds),
      user_id: faker.random.arrayElement(userIds),
      created_at: dateUnlocked,
      updated_at: faker.datatype.boolean() ? dateUnlocked : faker.date.recent(),
    });
  }

  // Inserts seed entries
  return knex(UserBadgeModel.tableName).insert(userAwardedBadges);
};


