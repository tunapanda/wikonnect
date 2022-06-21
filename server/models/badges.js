const Model = require('./_model');
const knex = require('../db/db');
const softDelete = require('objection-soft-delete');

class Badge extends softDelete({ columnName: 'is_deleted' })(Model) {
  static get tableName() {
    return 'badges';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        // matches the columnName passed above
        isDeleted: { type: 'boolean' },
        // other columns
      },
    };
  }

  async $indexForSearch() {
    return null;
  }

  static get relationMappings() {
    return {
      badge_triggers: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/badge_triggers`,
        join: {
          from: 'badge_triggers.id',
          to: 'badges.trigger_id'
        }
      },
      badge_awardees: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/user-badge`,
        join: {
          from: 'badges.id',
          to: 'user_badges.badge_id'
        }
      },
    };
  }
}

Badge.knex(knex);
module.exports = Badge;
