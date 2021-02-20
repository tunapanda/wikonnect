const Model = require('./_model');
const knex = require('../db/db');
const { raw } = require('objection');
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
      },
      selectReactionCount: (builder) => {
        builder.select(raw('COUNT(*) AS total_likes, COUNT(CASE WHEN reaction = \'like\' THEN 1 ELSE NULL END) AS likes, COUNT(CASE WHEN reaction = \'dislike\' THEN 1 ELSE NULL END) AS dislikes')).groupBy('reactions.chapter_id');
      }
    };
  }
}

Reaction.knex(knex);
module.exports = Reaction;