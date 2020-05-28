const chapterSchema = {
  'type': 'object',
  'properties': {
    'name': { 'type': 'string' },
    'slug': { 'type': 'string' },
    'description': { 'type': 'string' },
    'status': { 'type': 'string' },
    'lessonId': { 'type': 'string' },
    'creatorId': { 'type': 'string' },
    'contentType': { 'type': 'string' },
    'contentUri': { 'type': ['string', 'null'] },
    'tags': [{ 'type': 'string', }],
  },
  'required': ['name', 'description', 'status', 'creatorId'],
};


module.exports = chapterSchema;
