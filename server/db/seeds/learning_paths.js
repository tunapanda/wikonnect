
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('learning_paths').del()
    .then(function () {
      // Inserts seed entries
      return knex('learning_paths').insert([
        {
          id: 'learning_path1',
          name: 'A Learning Path',
          slug: 'a-learning-path',
          description: 'For the organisation of courses.',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }
      ]);
    });
};
