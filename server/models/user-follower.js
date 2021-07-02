const Model = require('./_model');
const knex = require('../db/db');

class UserFollower extends Model {
  static get tableName() {
    return 'user_followers';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        userId: { type: 'string' },
        followeeId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['followeeId', 'userId'],
    };
  }

  static get virtualAttributes() {
    return ['type'];
  }

  type() {
    return 'user-followee';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'user_followers.userId',
          to: 'users.id'
        }
      },
      following: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'user_followers.followeeId',
          to: 'users.id'
        }
      }
    };
  }

}

UserFollower.knex(knex);
module.exports = UserFollower;
