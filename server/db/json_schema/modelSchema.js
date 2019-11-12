const modelSchema = {
  'type': 'object',
  'properties': {
    'id': { 'type': 'string' },
    'name': { 'type': 'string' },
    'slug': { 'type': 'string' },
    'description': { 'type': 'string' },
    'status': { 'type': 'string' },
    'creator_id': { 'type': 'string' },
  },
  'required': ['name', 'slug', 'description', 'status', 'creator_id'],
};


module.exports = modelSchema;
