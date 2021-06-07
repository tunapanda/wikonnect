const Model = require('./_model');
const knex = require('../db/db');

class Survey extends Model {
  static get tableName() {
    return 'surveys';
  }

  static get relationMappings() {
    return {
      trigger: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/badge_triggers`,
        join: {
          from: 'surveys.trigger_id',
          to: 'badge_triggers.id'
        }
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users`,
        join: {
          from: 'surveys.creator_id',
          to: 'users.id'
        }
      },
    };
  }
}

Survey.knex(knex);
module.exports = Survey;
