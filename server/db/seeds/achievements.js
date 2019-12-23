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
          status: 'completed',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'achievements2',
          user_id: 'user1',
          target: 'chapter1',
          description: 'completed chapter1',
          status: 'completed',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }
      ]);
    });
};
