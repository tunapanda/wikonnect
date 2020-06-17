const commentSchema = {
  'type': 'object',
  'properties': {
    'id': { 'type': 'string' },
    'chapterId': { 'type': 'string' },
    'creatorId': { 'type': 'string' },
    'comment': { 'type': 'string' }
  },
  'required': ['chapterId', 'creatorId', 'comment'],
};

module.exports = commentSchema;
