exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("groups")
    .del()
    .then(() => knex("group_permissions").del())
    .then(() => knex("group_members").del())
    .then(function () {
      return knex("groups")
        .insert([
          {
            id: "groupAdmin",
            name: "admin",
            slug: "role-admin",
            description: "",
            created_at: "2019-12-20 19:17:10",
            updated_at: "2019-12-20 19:17:10",
          },
          {
            id: "groupModerator",
            name: "moderator",
            slug: "role-moderator",
            description: "",
            created_at: "2019-12-20 19:17:10",
            updated_at: "2019-12-20 19:17:10",
          },
          {
            id: "groupVerified",
            name: "verified",
            slug: "role-verified",
            description: "",
            created_at: "2019-12-20 19:17:10",
            updated_at: "2019-12-20 19:17:10",
          },
        ])
        .then(() =>
          knex("group_permissions").insert([
            {
              id: "groupAdmin1",
              group_id: "groupAdmin",
              resource: "profile",
              action: "create:any",
              attributes: "*",
            },
            {
              id: "groupAdmin2",
              group_id: "groupAdmin",
              resource: "profile",
              action: "read:any",
              attributes: "*",
            },
            {
              id: "groupAdmin3",
              group_id: "groupAdmin",
              resource: "profile",
              action: "update:any",
              attributes: "*",
            },
            {
              id: "groupAdmin4",
              group_id: "groupAdmin",
              resource: "path",
              action: "delete:own",
              attributes: "*",
            },
            {
              id: "groupAdmin5",
              group_id: "groupAdmin",
              resource: "path",
              action: "create:any",
              attributes: "*",
            },
            {
              id: "groupAdmin6",
              group_id: "groupAdmin",
              resource: "path",
              action: "read:any",
              attributes: "*",
            },
            {
              id: "groupAdmin7",
              group_id: "groupAdmin",
              resource: "path",
              action: "update:any",
              attributes: "*",
            },
          ])
        )
        .then(() => {
          return knex('users').then(() => {
            return knex('group_members').insert(
              [
                {
                  user_id: 'user1',
                  group_id: 'groupAdmin',
                  created_at: '2019-12-20 19:17:10',
                  updated_at: '2019-12-20 19:17:10',
                },
                {
                  user_id: 'user2',
                  group_id: 'groupModerator',
                  created_at: '2019-12-20 19:17:10',
                  updated_at: '2019-12-20 19:17:10',
                },
                {
                  user_id: 'user3',
                  group_id: 'groupVerified',
                  created_at: '2019-12-20 19:17:10',
                  updated_at: '2019-12-20 19:17:10',
                },
              ]
            );
          });
        });
    });
};
