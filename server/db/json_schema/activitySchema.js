const activitySchema = {
  'type': 'object',
  'properties': {
    'userId': { 'type': 'string' },
    'chapterId': { 'type': 'string' },
    'status': { 'type': 'string' },
    'progress': { 'type': 'string' }
  },
  'required': ['userId', 'chapterId', 'status'],
};


module.exports = activitySchema;
