
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('modules').del()
    .then(() => knex('course_modules').del())
    .then(function () {
      // Inserts seed entries
      return knex('modules').insert([
        {
          id: 'module1',
          name: 'A Module',
          slug: 'a-module',
          description: 'Contains Lessons.',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }
      ]);
    }).then(() => knex('course_modules').insert([
      {
        module_id: 'module1',
        course_id: 'course1'
      }
    ]));
};
