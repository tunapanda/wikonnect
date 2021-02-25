const Model = require('./_model');
const knex = require('../db/db');

class Achievement extends Model {
  static get tableName() {
    return 'achievements';
  }

  static get relationMappings() {
    return {};
  }

  static get virtualAttributes() {
    return ['type'];
  }

  type() {
    return 'achievement';
  }

  static get modifiers() {
    return {
      selectAchievement: (builder) => {
        builder.select('id', 'target', 'target_status');
      }
    };
  }
}

Achievement.knex(knex);
module.exports = Achievement;
