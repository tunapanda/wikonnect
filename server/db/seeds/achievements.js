exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('achievements').del()
    .then(function () {
      return knex('achievements').insert([
        {
          id: 'achievements1',
          user_id: 'user1',
          target: 'chapter2',
          description: 'completed chapter 2',
          target_status: 'completed',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'achievements2',
          user_id: 'user1',
          target: 'chapter1',
          description: 'completed chapter1',
          target_status: 'completed',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'achievements3',
          user_id: 'user2',
          target: 'chapter2',
          description: 'completed chapter 2',
          target_status: 'completed',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'achievements4',
          user_id: 'user2',
          target: 'chapter1',
          description: 'completed chapter1',
          target_status: 'completed',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'achievements5',
          user_id: 'user2',
          target: 'chapter4',
          description: 'completed chapter 4',
          target_status: 'completed',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'achievements7',
          user_id: 'user1',
          target: 'chapter1',
          description: 'completed chapter1',
          target_status: 'started',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'achievements8',
          user_id: 'user1',
          target: 'chapter1',
          description: 'completed chapter1',
          target_status: 'attempted',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
      ]);
    });
};
