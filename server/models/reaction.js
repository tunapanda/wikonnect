const Model = require('./_model');
const knex = require('../db/db');

class Reaction extends Model {
  static get tableName() {
    return 'reactions';
  }

  static get relationMappings() {
    return {};
  }

  static get modifiers() {
    return {
      selectReaction: (builder) => {
        builder.select('id', 'reaction', 'user_id');
      }
    };
  }
}

Reaction.knex(knex);
module.exports = Reaction;