const { Client } = require('@elastic/elasticsearch');

let config;

try {
  config = require('../config/elasticsearch');
} catch (e) {
  config = require('../config/elasticsearch.example');
}

const host = process.env.ELASTICSEARCH_HOST ? process.env.ELASTICSEARCH_HOST : config.host;

const client = new Client({ node: host });
client.indexName = 'swag-v1-' + process.env.NODE_ENV;

async function setupElasticsearch() {
  try {
    await client.indices.exists({
      index: client.indexName
    }).then(function (res) {
      if (!res.body) {
        return client.indices.create({
          index: client.indexName,
          body: {
            settings: {
              analysis: {
                analyzer: {
                  title_index: {
                    type: 'custom',
                    tokenizer: 'title_autocomplete',
                    filter: ['lowercase', 'asciifolding']
                  },
                  title_search: {
                    type: 'custom',
                    tokenizer: 'standard',
                    filter: ['lowercase', 'asciifolding']
                  }
                },
                tokenizer: {
                  title_autocomplete: {
                    type: 'edgeNGram',
                    min_gram: '1',
                    max_gram: '10',
                    token_chars: ['letter', 'digit']
                  }
                }
              }
            }
          }
        });
      }
      return true;
    });
    console.log(`Connected to Elasticsearch index ${client.indexName} on ${host} successfully`);
  } catch (e) {
    if (e.name !== 'ConnectionError') {
      console.log(e);
    } else {
      console.log(`Connection to Elasticsearch on ${host} failed`);
      client.unavailable = true;
    }
  }
  try {
    await client.indices.putMapping({
      index: client.indexName,
      body: {
        properties: {
          model: {
            type: 'text',
            analyzer: 'keyword'
          },
          name: {
            type: 'text',
            analyzer: 'title_index',
            search_analyzer: 'title_search'
          },
          description: {
            type: 'text',
            analyzer: 'standard'
          },
          status: {
            type: 'text',
            analyzer: 'keyword'
          },
          content: {
            type: 'text',
            analyzer: 'standard'
          },
          created_at: {
            type: 'date'
          },
          modified_at: {
            type: 'date'
          }
        }
      }
    });
  } catch (e) {
    if (e.name !== 'ConnectionError') {
      console.log(e);
    } else {
      console.log(`Connection to Elasticsearch on ${host} failed`);
      client.unavailable = true;
    }
  }
}

setupElasticsearch();

module.exports = client;