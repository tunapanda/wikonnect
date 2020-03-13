
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
          content_uri: '/uploads/h5p/chapter2',
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
          content_uri: '/uploads/h5p/chapter3',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'chapter4',
          name: 'A Chapter4',
          slug: 'a-chapter4',
          description: 'A H5P Chapter.',
          status: 'published',
          lesson_id: 'lesson2',
          creator_id: 'user1',
          content_type: 'h5p',
          content_uri: '/uploads/h5p/chapter4',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          'id': 'chapter5',
          'name': 'Poole',
          'slug': 'Winnie',
          'description': 'excepteur',
          'status': 'published',
          'lesson_id': 'lesson2',
          'content_type': 'h5p',
          'content_uri': '/uploads/h5p/chapter5',
          'created_at': '2017-12-20 19:17:10',
          'updated_at': '2017-12-20 19:17:10'
        },
        {
          'id': 'chapter6',
          'name': 'Carmella',
          'slug': 'Esther',
          'description': 'enim',
          'status': 'published',
          'lesson_id': 'lesson2',
          'content_type': 'h5p',
          'content_uri': '/uploads/h5p/chapter6',
          'created_at': '2017-12-20 19:17:10',
          'updated_at': '2017-12-20 19:17:10'
        },
        {
          'id': 'chapter7',
          'name': 'Randi',
          'slug': 'Blake',
          'description': 'dolore',
          'status': 'published',
          'lesson_id': 'basics1',
          'content_type': 'h5p',
          'content_uri': '/uploads/h5p/chapter7',
          'created_at': '2017-12-20 19:17:10',
          'updated_at': '2017-12-20 19:17:10'
        },
        {
          'id': 'chapter8',
          'name': 'Ball',
          'slug': 'Bernadette',
          'description': 'exercitation',
          'status': 'archived',
          'lesson_id': 'basics1',
          'content_type': 'h5p',
          'content_uri': '/uploads/h5p/chapter8',
          'created_at': '2017-12-20 19:17:10',
          'updated_at': '2017-12-20 19:17:10'
        },
        {
          'id': 'chapter9',
          'name': 'Kelley',
          'slug': 'Elisa',
          'description': 'consectetur',
          'status': 'published',
          'lesson_id': 'basics1',
          'content_type': 'h5p',
          'content_uri': '/uploads/h5p/chapter9',
          'created_at': '2017-12-20 19:17:10',
          'updated_at': '2017-12-20 19:17:10'
        },
        {
          'id': 'chapter10',
          'name': 'Ethel',
          'slug': 'Tonya',
          'description': 'cupidatat',
          'status': 'published',
          'lesson_id': 'basics2',
          'content_type': 'h5p',
          'content_uri': '/uploads/h5p/chapter10',
          'created_at': '2017-12-20 19:17:10',
          'updated_at': '2017-12-20 19:17:10'
        },
        {
          'id': 'chapter11',
          'name': 'Montoya',
          'slug': 'Myra',
          'description': 'qui',
          'status': 'published',
          'lesson_id': 'basics2',
          'content_type': 'h5p',
          'content_uri': '/uploads/h5p/chapter11',
          'created_at': '2017-12-20 19:17:10',
          'updated_at': '2017-12-20 19:17:10'
        }

      ]);
    });
};
