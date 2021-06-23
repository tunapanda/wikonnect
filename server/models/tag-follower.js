const Model = require('./_model');
const knex = require('../db/db');

class TagFollower extends Model {
  static get tableName() {
    return 'tag_followers';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        tagId: { type: 'string' },
        userId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['tagId', 'userId'],
    };
  }

  static get relationMappings() {
    return {
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tag',
        join: {
          from: 'tag_subscribers.tag_id',
          to: 'users.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'tag_subscribers.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

TagFollower.knex(knex);
module.exports = TagFollower;
