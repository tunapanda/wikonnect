exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('achievement_awards').del()
    .then(function () {
      return knex('achievement_awards').insert([
        {
          user_id: 'user1',
          achievement_id: 'achievements1',
          name: 'longest streak',
          image_url: '',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          user_id: 'user2',
          achievement_id: 'achievements2',
          name: 'completed courses',
          image_url: '',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          user_id: 'user1',
          achievement_id: 'achievements3',
          name: 'design apprentice',
          image_url: '',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          user_id: 'user2',
          achievement_id: 'achievements4',
          name: 'young padawan',
          image_url: '',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          user_id: 'usernew',
          achievement_id: 'achievements5',
          name: 'master yoda',
          image_url: '',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          user_id: 'usernew',
          achievement_id: 'achievements6',
          name: 'coding master',
          image_url: '',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }
      ]);
    });
};
