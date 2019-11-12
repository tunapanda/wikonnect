const chapterSchema = {
  'type': 'object',
  'properties': {
    'name': { 'type': 'string' },
    'slug': { 'type': 'string' },
    'description': { 'type': 'string' },
    'status': { 'type': 'string' },
    'lesson_id': { 'type': 'string' },
    'creator_id': { 'type': 'string' },
  },
  'required': ['name', 'slug', 'description', 'status', 'lesson_id', 'creator_id'],
};


module.exports = chapterSchema;
