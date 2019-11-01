
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 'user1',
          username: 'user1',
          email: 'user1@wikonnect.org',
          hash: '$2b$10$oS2X1SWIMralmEpIjs14IuJf6mdaG1Tr/7QPoXVbRfP5fQGjf5HG.',
          last_ip: '245.19.225.55',
          last_seen: '2017-12-20 19:17:10',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'user2',
          username: 'user2',
          email: 'user2@wikonnect.org',
          hash: '$2b$10$oS2X1SWIMralmEpIjs14IuJf6mdaG1Tr/7QPoXVbRfP5fQGjf5HG.',
          last_ip: '245.19.225.55',
          last_seen: '2017-12-20 19:17:10',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        },
        {
          id: 'user3',
          username: 'user3',
          email: 'user3@wikonnect.org',
          hash: '$2b$10$oS2X1SWIMralmEpIjs14IuJf6mdaG1Tr/7QPoXVbRfP5fQGjf5HG.',
          last_ip: '245.19.225.55',
          last_seen: '2017-12-20 19:17:10',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }
      ]);
    });
};
