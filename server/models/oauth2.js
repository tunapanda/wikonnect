const Model = require('./_model');
const knex = require('../db/db');

class Oauth2 extends Model {
  static get tableName() {
    return 'oauth2';
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/users',
        join: {
          to: 'oauth2.users_id',
          from: 'users.id'
        }
      }
    };
  }

  static get modifiers() {
    return {
      selectData: (builder) => {
        builder.select('user_id', 'provider', 'email' );
      }
    };
  }
}

Oauth2.knex(knex);
module.exports = Oauth2;
