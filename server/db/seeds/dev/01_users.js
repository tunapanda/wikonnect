const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('users').del();

  let usersSeed = [];
  const genders = ['Male', 'Female', 'N/A', null];

  usersSeed.push(
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
      metadata: { profileComplete: 'false', oneInviteComplete: 'false', oneChapterCompletion: 'false' },
      location: `${faker.address.city()}, ${faker.address.country()}`,
      contact_number: faker.phone.phoneNumber('+############'),
      'gender': faker.random.arrayElement(genders),
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
      metadata: { profileComplete: 'false', oneInviteComplete: 'false', oneChapterCompletion: 'false' },
      location: `${faker.address.city()}, ${faker.address.country()}`,
      contact_number: faker.phone.phoneNumber('+############'),
      'gender': faker.random.arrayElement(genders),
    },
    {
      id: 'user3',
      username: 'user3',
      email: 'user3@wikonnect.org',
      hash: '$2b$10$a.r.mPrpHxwlGh/6jd.RG.QhHu2xHAY3/EzclbPFduSDTnAtV3feu',
      last_ip: '245.19.225.55',
      private: false,
      invite_code: 'user3',
      profile_uri: '/uploads/images/profile/user.jpg',
      last_seen: '2017-12-20 19:17:10',
      created_at: '2017-12-20 19:17:10',
      updated_at: '2017-12-20 19:17:10',
      tags: ['highschool', 'university'],
      metadata: { profileComplete: 'true', oneInviteComplete: 'true', oneChapterCompletion: 'true' },
      location: `${faker.address.city()}, ${faker.address.country()}`, 
      contact_number: faker.phone.phoneNumber('+############'),
      'gender': faker.random.arrayElement(genders),
    }
  );
  
  const seedsMax = usersSeed.length>=seed_number?0:seed_number-usersSeed.length;

  for (let i = 0; i < seedsMax; i++) {
    usersSeed.push({
      username: faker.internet.userName().toLowerCase(),
      email: faker.internet.email(),
      hash: '$2b$10$a.r.mPrpHxwlGh/6jd.RG.QhHu2xHAY3/EzclbPFduSDTnAtV3feu', //wikonnect
      last_ip: faker.internet.ip(),
      private: false,
      invite_code:  faker.internet.userName(),
      profile_uri:  faker.image.imageUrl(500, 500, 'people', true, false),
      last_seen: faker.date.recent(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
      contact_number: faker.phone.phoneNumber('+############'),
      'gender': faker.random.arrayElement(genders),
      metadata: { 
        profileComplete: faker.datatype.boolean(), 
        oneInviteComplete:  faker.datatype.boolean(), 
        oneChapterCompletion:  faker.datatype.boolean(),
        aboutMe: faker.lorem.sentence(28),
        firstName: faker.name.firstName(),
        lastName: faker.name.firstName(),
      },
      location: `${faker.address.city()}, ${faker.address.country()}`,

    });
  }

  // Inserts seed entries
  return knex('users').insert(usersSeed);
};
