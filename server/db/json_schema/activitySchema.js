const activitySchema = {
  'type': 'object',
  'properties': {
    'user_id': { 'type': 'string' },
    'chapter_id': { 'type': 'string' },
    'status': { 'type': 'string' },
    'progress': { 'type': 'string' }
  },
  'required': ['user_id', 'chapter_id', 'status'],
};


module.exports = activitySchema;
