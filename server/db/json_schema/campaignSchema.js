const campaignSchema = {
  'type': 'object',
  'properties': {
    'userId': { 'type': 'string' },
    'campaignId': { 'type': 'string' },
    'points': { 'type': ['integer', 'null']},
    'enduserId': { 'type': 'string' },
    'partnerId': { 'type': 'string' }
  },
  'required': ['campaignId', 'enduserId', 'partnerId'],
};

module.exports = campaignSchema;
