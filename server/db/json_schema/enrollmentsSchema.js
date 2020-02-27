const enrollmentsSchema = {
  'type': 'object',
  'properties': {
    'user_id': { 'type': 'string' },
    'course_id': { 'type': 'string' },
  },
  'required': ['user_id', 'course_id'],
};


module.exports = enrollmentsSchema;
