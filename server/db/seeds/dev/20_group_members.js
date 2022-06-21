const { faker, seed_number } = require("../_seeds");

exports.seed = async (knex) => {
  // Deletes ALL existing entries

  await knex("groups")
    .select()
    .whereIn("name", ["admin", "moderator", "basic"])
    .then((rows) => {
      if (rows.length === 0) {
        return knex("groups").insert([
          {
            id: "groupAdmin",
            name: "admin",
            slug: "role-admin",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "groupModerator",
            name: "moderator",
            slug: "role-moderator",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "groupBasic",
            name: "basic",
            slug: "role-basic",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      }
    });

  const groupIds = await knex("groups").pluck("id");
  console.log("===========================================", groupIds);
  await knex("group_members").truncate();

  const userIds = await knex("users")
    .whereNotIn("id", ["user1", "user2", "user3"])
    .pluck("id");

  let groupMembers = [
    {
      user_id: "user1",
      group_id: "groupAdmin",
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    },
    {
      user_id: "user2",
      group_id: "groupModerator",
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    },
    {
      user_id: "user3",
      group_id: "groupBasic",
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    },
  ];

  const maxSeeds =
    groupMembers.length > seed_number ? 0 : seed_number - groupMembers.length;

  for (let i = 0; i < maxSeeds; i++) {
    groupMembers.push({
      user_id: userIds[i],
      group_id: faker.random.arrayElement(groupIds),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  return knex("group_members").insert(groupMembers);
};
