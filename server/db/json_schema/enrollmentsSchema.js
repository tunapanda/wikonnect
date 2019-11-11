const enrollmentsSchema = {
  'type': 'object',
  'properties': {
    'user_id': { 'type': 'string' },
    'creator_id': { 'type': 'string' },
  },
  'required': ['user_id', 'creator_id'],
};


module.exports = enrollmentsSchema;
