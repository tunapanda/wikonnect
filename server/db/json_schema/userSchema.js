const userSchema = {
  'type': 'object',
  'properties': {
    'id': { 'type': 'string' },
    'username': { 'type': 'string' },
    'firstName': { 'type': 'string' },
    'lastName': { 'type': 'string' },
    'email': { 'type': 'string' },
    'aboutMe': { 'type': 'string' },
    'status': { 'type': 'string' },
    'profile_uri': { 'type': 'string' },
    'creatorId': { 'type': 'string' },
    'tags': [{ 'type': 'string', }],
    'authorizationToken': { 'type': 'string' },
    'winguToken': { 'type': 'string' }
  },
  'required': ['username', 'hash', 'email'],
};


module.exports = userSchema;
