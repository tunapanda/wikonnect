const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../middleware/jwt');

const userId = 'user2';
const admin = {
  user: {
    id: userId,
    username: userId,
    password: 'wikonnect',
    email: 'user1@wikonnect.com',
    role: 'admin',
    tags: ['test'],
  },
};

const basicUser = {
  user: {
    id: 'user10',
    username: 'user10',
    password: 'wikonnect',
    email: 'user10@wikonnect.com',
    role: 'basic',
    tags: ['test'],
  },
};

const moderatorUser = {
  user: {
    id: 'user44',
    username: 'user44',
    password: 'wikonnect',
    email: 'user44@wikonnect.com',
    role: 'moderator',
    tags: ['test'],
  },
};

const headerAdminUser = {
  Authorization:
    'Bearer ' +
    jsonwebtoken.sign({ data: admin.user }, secret, { expiresIn: '1d' }),
};
const headerBasicUser = {
  Authorization:
    'Bearer ' +
    jsonwebtoken.sign({ data: basicUser.user }, secret, { expiresIn: '1d' }),
};

const headerModeratorUser = {
  Authorization:
    'Bearer ' +
    jsonwebtoken.sign({ data: moderatorUser.user }, secret, {
      expiresIn: '1d',
    }),
};

const brokenToken = {
  Authorization:
    'Bearer ' +
    jsonwebtoken.sign({ data: moderatorUser.user }, 'f', { expiresIn: '1d' }),
};

module.exports = {
  headerAdminUser,
  headerBasicUser,
  headerModeratorUser,
  brokenToken,
};
