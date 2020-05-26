
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
          tags: ['H5P', 'user1'],
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'coronavirus',
          name: 'How Much Do You Really Know About Coronavirus?',
          slug: 'coronavirus',
          description: 'Should you wear a face mask? Can you catch the virus from your dog? Put your Covid-19 knowledge to the test. By Jason Gale',
          status: 'published',
          creator_id: 'user1',
          content_type: 'h5p',
          content_uri: '/uploads/h5p/coronavirus',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }
      ]);
    });
};
