const Model = require('./_model');
const knex = require('../db/db');

class AchievementAwards extends Model {
  static get tableName() {
    return 'achievement_awards';
  }

  static get relationMappings() {
    return {};
  }

  static get modifiers() {
    return {
      selectId: (builder) => {
        builder.select('id');
      }
    };
  }
}

AchievementAwards.knex(knex);
module.exports = AchievementAwards;
