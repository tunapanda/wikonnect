const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../middleware/jwt');

const userId = 'user1';
const superAdmin = {
  'user': {
    'id': userId,
    'username': userId,
    'password': 'wikonnect',
    'email': 'user1@wikonnect.com',
    'role': 'superadmin',
    'tags': ['highschool', 'primary', 'university'],
  }
};

const basicUser = {
  'user': {
    'id': 'user10',
    'username': 'user10',
    'password': 'wikonnect',
    'email': 'user10@wikonnect.com',
    'role': 'basic',
    'tags': ['highschool', 'primary', 'university'],
  }
};

const adminUser = {
  'user': {
    'id': 'user44',
    'username': 'user44',
    'password': 'wikonnect',
    'email': 'user44@wikonnect.com',
    'role': 'admin',
    'tags': ['highschool', 'primary', 'university'],
  }
};

const headersSuperAdmin1 = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: superAdmin.user }, secret, { expiresIn: '1d' })
};
const headerBasicUser2 = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: basicUser.user }, secret, { expiresIn: '1d' })
};

const headerAdminUser = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: adminUser.user }, secret, { expiresIn: '1d' })
};

const brokenToken = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: adminUser.user }, 'f', { expiresIn: '1d' })
};


module.exports = {
  headersSuperAdmin1,
  headerBasicUser2,
  headerAdminUser,
  brokenToken
};