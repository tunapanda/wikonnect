exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('achievements').del()
    .then(function () {
      return knex('achievements').insert([
        {
          id: 'achievements1',
          name: 'achievements one',
          slug: 'achievements-one',
          description: 'achievements one, achievements, achievements one',
          activity_id: 'activity1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'achievements2',
          name: 'achievements-new-one',
          slug: 'achievements-one',
          description: 'achievements-one-achievements, achievements one',
          activity_id: 'activity1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }
      ]);
    });
};
