exports.up = async function (knex) {
  return await knex("groups")
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
};

exports.down = async function (knex) {};
