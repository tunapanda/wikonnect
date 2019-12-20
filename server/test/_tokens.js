const chai = require('chai');
const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../middleware/jwt');

const basicUser1 = {
  'user': {
    'id': 'user99',
    'username': 'user99',
    'password': 'tunapanda',
    'email': 'user99@wikonnect.com',
    'role': 'superadmin'
  }
};

const basicUser2 = {
  'user': {
    'id': 'user2',
    'username': 'user2',
    'password': 'tunapanda',
    'email': 'user99@wikonnect.com'
  }
};
const headersSuperAdmin1 = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: basicUser1.user }, secret, { expiresIn: '30d' })
};
const headersAdmin1 = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: basicUser1.user, role: 'admin' }, secret, { expiresIn: '30d' })
};
const headersAdmin2 = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: basicUser1.user, role: 'admin' }, secret, { expiresIn: '30d' })
};
const headerBasicUser2 = {
  'Authorization': 'Bearer ' + jsonwebtoken.sign({ data: basicUser2.user, role: 'basic' }, secret, { expiresIn: '30d' })
};


module.exports = {
  headersSuperAdmin1,
  headersAdmin1,
  headersAdmin2,
  headerBasicUser2
}