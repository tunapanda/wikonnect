const Model = require('./_model');
const knex = require('../db/db');

class AchievementAwards extends Model {
  static get tableName() {
    return 'achievement_awards';
  }

  static get relationMappings() {
    return {};
  }

  static get virtualAttributes() {
    return ['type'];
  }

  type() {
    return 'achievementAward';
  }


  static get modifiers() {
    return {
      selectBadgeNameAndId: (builder) => {
        builder.select('id', 'name', 'achievementId', 'userId');
      }
    };
  }
}

AchievementAwards.knex(knex);
module.exports = AchievementAwards;
