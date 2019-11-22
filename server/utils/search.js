const { Client } = require('@elastic/elasticsearch');
const { host } = require('../config/elasticsearch');
const client = new Client({ node: host });

client.indexName = 'swag-v1';

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
    console.log(`Connected to Elasticsearch index ${client.indexName} on ${host} succesfully`);
  } catch (e) {
    console.log(e.meta.body ? e.meta.body.error : e);
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
          child_titles: {
            type: 'text',
            analyzer: 'title_index',
            search_analyzer: 'title_search'
          },
          child_descriptions: {
            type: 'text',
            analyzer: 'standard'
          },
          child_contents: {
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
    console.log(e.meta.body.error);
  }
}

setupElasticsearch();

module.exports = client;