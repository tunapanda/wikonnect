
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('chapters').del()
    .then(() => knex('lesson_chapters').del())
    .then(function () {
      // Inserts seed entries
      return knex('chapters').insert([
        {
          id: 'chapter1',
          name: 'A Chapter',
          slug: 'a-chapter',
          description: 'A H5P Chapter.',
          status: 'published',
          lesson_id: 'lesson1',
          creator_id: 'user1',
          content_type: 'h5p',
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'chapter2',
          name: 'A Chapter 2',
          slug: 'a-chapter-2',
          description: 'A H5P Chapter.',
          status: 'published',
          lesson_id: 'lesson1',
          creator_id: 'user1',
          content_type: 'h5p',
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'chapter3',
          name: 'A Chapter3',
          slug: 'a-chapter3',
          description: 'A H5P Chapter.',
          status: 'published',
          lesson_id: 'lesson1',
          creator_id: 'user1',
          content_type: 'h5p',
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'chapter4',
          name: 'A Chapter4',
          slug: 'a-chapter4',
          description: 'A H5P Chapter.',
          status: 'published',
          lesson_id: 'lesson1',
          creator_id: 'user1',
          content_type: 'h5p',
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }
      ]).then(() => knex('lesson_chapters').insert([
        {
          lesson_id: 'lesson1',
          chapter_id: 'chapter1'
        },
        {
          lesson_id: 'lesson1',
          chapter_id: 'chapter2'
        },
        {
          lesson_id: 'lesson1',
          chapter_id: 'chapter3'
        },
        {
          lesson_id: 'lesson1',
          chapter_id: 'chapter4'
        },
        {
          lesson_id: 'basics1',
          chapter_id: 'chapter1'
        },
        {
          lesson_id: 'basics1',
          chapter_id: 'chapter2'
        },
        {
          lesson_id: 'basics1',
          chapter_id: 'chapter3'
        },
        {
          lesson_id: 'basics1',
          chapter_id: 'chapter4'
        },
      ]));
    });
};
