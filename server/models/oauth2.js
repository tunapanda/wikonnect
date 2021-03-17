const Model = require('./_model');
const knex = require('../db/db');
// const search = require('../utils/search');

class Oauth2 extends Model {
  static get tableName() {
    return 'oauth2';
  }

  static get modifiers() {
    return {
      selectOauth2: (builder) => {
        builder.select('id', 'oauth2.userId', 'provider');
      }
    };
  }
}

Oauth2.knex(knex);
module.exports = Oauth2;
