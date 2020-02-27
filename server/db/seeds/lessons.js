
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
        },
        {
          id: 'basics1',
          name: 'Web Browsers',
          slug: 'web-browsers',
          description: 'Understanding the structure and functions of web browsers (mobile and desktop)',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'basics2',
          name: 'Navigation',
          slug: 'navigation',
          description: 'Navigating the internet using links and the address bar.',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'basics3',
          name: 'Searching',
          slug: 'searching',
          description: 'Formulating and executing well-structured queries in search engines, and evaluating search results.',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'basics4',
          name: 'Mobile Applications',
          slug: 'mobile-applications',
          description: 'Mobile application installation and usage, Google Play Store, APKs. Common apps',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'basics5',
          name: 'Website Types',
          slug: 'website-types',
          description: 'Categories and types of websites (ie reference, social, entertainment, educational, etc)',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'basics6',
          name: 'Online Tools',
          slug: 'online-tools',
          description: 'Overview of common and useful online tools/apps/sites (ie Wikipedia, Youtube, learning resources, etc)',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },

      ]);
    }).then(() => knex('module_lessons').insert([
      {
        module_id: 'module1',
        lesson_id: 'lesson1'
      },
      {
        module_id: 'diglit1',
        lesson_id: 'basics1'
      },
      {
        module_id: 'diglit1',
        lesson_id: 'basics2'
      },
      {
        module_id: 'diglit1',
        lesson_id: 'basics3'
      },
      {
        module_id: 'diglit1',
        lesson_id: 'basics4'
      },
      {
        module_id: 'diglit1',
        lesson_id: 'basics5'
      },
      {
        module_id: 'diglit1',
        lesson_id: 'basics6'
      }
    ]));
};
