const Model = require('./_model');
const knex = require('../db/db');

class UserVerification extends Model {
  static get tableName() {
    return 'user_verification';
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'user_verification.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

UserVerification.knex(knex);
module.exports = UserVerification;
