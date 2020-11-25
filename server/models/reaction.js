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
        builder.select('id', 'target', 'target_status');
      }
    };
  }
}

Reaction.knex(knex);
module.exports = Reaction;
