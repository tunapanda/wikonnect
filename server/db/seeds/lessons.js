
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('lessons').del()
    .then(() => knex('module_lessons').del())
    .then(function () {
      // Inserts seed entries
      return knex('lessons').insert([
        {
          id: 'lesson1',
          name: 'A Lesson',
          slug: 'a-lesson',
          description: 'Contains Chapters.',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }
      ]);
    }).then(() => knex('module_lessons').insert([
      {
        module_id: 'module1',
        lesson_id: 'lesson1'
      }
    ]));
};
