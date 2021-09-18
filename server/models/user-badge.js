const Model = require('./_model');
const knex = require('../db/db');

class UserBadge extends Model {
  static get tableName() {
    return 'user_badges';
  }


  static get jsonSchema() {
    return {
      type: 'object',
      required: ['badgeId', 'userId'],
      properties: {
        badgeId: {type: 'string'},
        userId: {type: 'string'},
      },
    };
  }

  static get relationMappings() {
    return {
      badge: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/badges`,
        join: {
          from: 'user_badges.badge_id',
          to: 'badges.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users`,
        join: {
          from: 'user_badges.user_id',
          to: 'users.id'
        }
      },
    };
  }
}

UserBadge.knex(knex);
module.exports = UserBadge;
