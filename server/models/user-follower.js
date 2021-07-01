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
        followingId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['followingId', 'userId'],
    };
  }

  static get virtualAttributes() {
    return ['type'];
  }

  type() {
    return 'user-follower';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'user_followers.user_id',
          to: 'users.id'
        }
      },
      following: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'user_followers.following_id',
          to: 'users.id'
        }
      }
    };
  }

}

UserFollower.knex(knex);
module.exports = UserFollower;
