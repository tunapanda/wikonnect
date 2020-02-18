const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../middleware/jwt');

const basicUser1 = {
  'user': {
    'id': 'user99',
    'username': 'user99',
    'password': 'wikonnect',
    'email': 'user99@wikonnect.com',
    'role': 'superadmin'
  }
};

const basicUser2 = {
  'user': {
    'id': 'user10',
    'username': 'user10',
    'password': 'wikonnect',
    'email': 'user10@wikonnect.com',
    'role': 'basic'
  }
};

const adminUser = {
  'user': {
    'id': 'user44',
    'username': 'user44',
    'password': 'wikonnect',
    'email': 'user44@wikonnect.com',
    'role': 'admin'
  }
};

const headersSuperAdmin1 = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: basicUser1.user }, secret, { expiresIn: '1d' })
};
const headerBasicUser2 = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: basicUser2.user }, secret, { expiresIn: '1d' })
};

const headerAdminUser = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: adminUser.user }, secret, { expiresIn: '1d' })
};

const brokenToken = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: adminUser.user }, 'knskldnvlskndkvlskbds,mdlfnsdlnf', { expiresIn: '1d' })
};

module.exports = {
  headersSuperAdmin1,
  headerBasicUser2,
  headerAdminUser,
  brokenToken
};