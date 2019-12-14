const modelSchema = {
  'type': 'object',
  'properties': {
    'id': { 'type': 'string' },
    'name': { 'type': 'string' },
    'slug': { 'type': 'string' },
    'description': { 'type': 'string' },
    'status': { 'type': 'string' },
    'creatorId': { 'type': 'string' },
  },
  'required': ['name', 'slug', 'description', 'status', 'creatorId'],
};


module.exports = modelSchema;
