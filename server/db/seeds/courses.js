
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('courses').del()
    .then(() => knex('learning_path_courses').del())
    .then(function () {
      return knex('courses').insert([
        {
          id: 'course1',
          name: 'A Course 1',
          slug: 'a-course-1',
          description: 'Contains Modules.',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'course2',
          name: 'A Course 2',
          slug: 'a-course-2',
          description: 'Contains Modules.',
          status: 'draft',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          name: 'Digital Literacy',
          slug: 'digital-literacy',
          id: 'diglit',
          description: 'Learn the basics of how to navigate the digital world',
          status: 'published',
          creator_id: 'user2',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'

        }
      ]);
    })
    .then(() => knex('learning_path_courses').insert([
      {
        learning_path_id: 'learning_path1',
        course_id: 'course1'
      },
      {
        learning_path_id: 'learning_path1',
        course_id: 'diglit'
      }
    ]));
};
