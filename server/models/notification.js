const Model = require('./_model');
const knex = require('../db/db');

class Notification extends Model {
  static get tableName() {
    return 'notifications';
  }

  static get relationMappings() {
    return {
      recipient: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/user`,
        join: {
          from: 'notifications.recipient_id',
          to: 'users.id',
        }
      }
    };
  }

}

Notification.knex(knex);
module.exports = Notification;
