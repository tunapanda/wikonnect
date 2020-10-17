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
          description: 'An H5P Chapter.',
          status: 'published',
          lesson_id: 'lesson1',
          creator_id: 'user1',
          content_type: 'h5p',
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10',
          approved: true,
          tags: ['highschool', 'university'],
          topics:  'primary'
        },
        {
          'id': 'chapter2',
          'name': 'Kelley',
          'slug': 'Elisa',
          'description': 'consectetur',
          'status': 'published',
          'lesson_id': 'basics1',
          'content_type': 'h5p',
          'content_uri': '/uploads/h5p/chapter2',
          'created_at': '2017-12-20 19:17:10',
          'updated_at': '2017-12-20 19:17:10',
          approved: true,
          tags: ['highschool', 'university'],
        },
          'id': 'chapter3',
          'name': 'Ethel',
          'slug': 'Tonya',
          'description': 'cupidatat',
          'status': 'published',
          'lesson_id': 'basics2',
          'content_type': 'h5p',
          'content_uri': '/uploads/h5p/chapter3',
          'created_at': '2017-12-20 19:17:10',
          'updated_at': '2017-12-20 19:17:10',
          tags: ['university'],
          approved: false,
          topics: 'highschool'
        },
        {
          'id': 'chapter4',
          'name': 'Montoya',
          'slug': 'Myra',
          'description': 'qui',
          'status': 'published',
          'lesson_id': 'basics2',
          'content_type': 'h5p',
          'content_uri': '/uploads/h5p/chapter4',
          'created_at': '2017-12-20 19:17:10',
          'updated_at': '2017-12-20 19:17:10',
<<<<<<< HEAD
          approved: true,
=======
          tags: ['highschool', 'university'],
        }
      ]);
};