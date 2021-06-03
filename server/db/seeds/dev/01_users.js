
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('user_invite').del())
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 'user1',
          username: 'user1',
          email: 'user1@wikonnect.org',
          hash: '$2b$10$a.r.mPrpHxwlGh/6jd.RG.QhHu2xHAY3/EzclbPFduSDTnAtV3feu',
          last_ip: '245.19.225.55',
          private: true,
          profile_uri: '/uploads/images/profile/user1.jpg',
          invite_code: 'user1',
          last_seen: '2017-12-20 19:17:10',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10',
          tags: ['highschool', 'primary', 'university'],
          metadata: { profileComplete: 'false', oneInviteComplete: 'false', oneChapterCompletion: 'false' }
        },
        {
          id: 'user2',
          username: 'user2',
          email: 'user2@wikonnect.org',
          hash: '$2b$10$a.r.mPrpHxwlGh/6jd.RG.QhHu2xHAY3/EzclbPFduSDTnAtV3feu',
          last_ip: '245.19.225.55',
          private: false,
          profile_uri: '/uploads/images/profile/user2.jpg',
          invite_code: 'user2',
          last_seen: '2017-12-20 19:17:10',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10',
          tags: ['primary'],
          metadata: { profileComplete: 'false', oneInviteComplete: 'false', oneChapterCompletion: 'false' }
        },
        {
          id: 'user3',
          username: 'user3',
          email: 'user3@wikonnect.org',
          hash: '$2b$10$a.r.mPrpHxwlGh/6jd.RG.QhHu2xHAY3/EzclbPFduSDTnAtV3feu',
          last_ip: '245.19.225.55',
          private: false,
          invite_code: 'user3',
          profile_uri: '/uploads/images/profile/user3.jpg',
          last_seen: '2017-12-20 19:17:10',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10',
          tags: ['highschool', 'university'],
          metadata: { profileComplete: 'true', oneInviteComplete: 'true', oneChapterCompletion: 'true' }
        }
      ]);
    });
};
