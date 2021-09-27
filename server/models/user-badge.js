const Model = require('./_model');
const knex = require('../db/db');
const {socketEventEmitter} = require('../utils/event-emitter');
const {events} = require('../utils/socket-events');

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

   async $afterInsert(){
    await super.$afterInsert();
    socketEventEmitter.emit(events.user.badge.unlocked, this);
  }
}

UserBadge.knex(knex);
module.exports = UserBadge;
