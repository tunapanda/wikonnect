
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
        },
        {
          name: 'Internet Basics',
          id: 'diglit1',
          slug: 'internet-basics',
          description: 'By the end of this module, you will feel comfortable navigating the internet using mobile phones or desktop browsers, understand the functions and options available when browsing the web, and have an understanding of some of the most common online tools (websites and apps).',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          name: 'Health in a Digital World',
          id: 'diglit2',
          slug: 'digital-health',
          description: 'Health in a digital world: physical, psychological and emotional',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          name: 'Your Brain Online',
          id: 'diglit3',
          slug: 'your-brain-online',
          description: 'How to focus your brain and thoughts to have meaningful interactions to solve increasingly complex problems:',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          name: 'Online Communications',
          id: 'diglit4',
          slug: 'online-communications',
          description: 'How to communicate online:  your personal reputation and digital footprint: from private messaging to photography to  blogging to public commenting',
          status: 'published',
          creator_id: 'user1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
      ]);
    }).then(() => knex('course_modules').insert([
      {
        module_id: 'module1',
        course_id: 'course1'
      },
      {
        module_id: 'diglit1',
        course_id: 'diglit'
      },
      {
        module_id: 'diglit2',
        course_id: 'diglit'
      },
      {
        module_id: 'diglit3',
        course_id: 'diglit'
      },
      {
        module_id: 'diglit4',
        course_id: 'diglit'
      }

    ]));
};
