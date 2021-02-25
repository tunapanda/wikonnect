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
        builder.select('id', 'reaction', 'user_id').groupBy('reactions.id');
      },
      filterUser(query, chapter_id, user_id) {
        query.select('id').where({'chapter_id': chapter_id, 'user_id': user_id}).groupBy('reactions.id');
      },
      reactionAggregate: (builder) => {
        builder.select(raw('COUNT(*) AS total_likes, COUNT(CASE WHEN reaction = \'like\' THEN 1 ELSE NULL END) AS likes, COUNT(CASE WHEN reaction = \'dislike\' THEN 1 ELSE NULL END) AS dislikes')).groupBy('reactions.chapter_id');
      },
      selectReactionsWithUser: (builder, creator_id, chapter_id) => {
        builder.select(raw('COUNT(*) AS total_likes, COUNT(CASE WHEN reaction = \'like\' THEN 1 ELSE NULL END) AS likes, COUNT(CASE WHEN reaction = \'dislike\' THEN 1 ELSE NULL END) AS dislikes, (select reaction where user_id = ? and chapter_id = ?) as authenticated_user', [creator_id, chapter_id])).groupBy('reactions.reaction','reactions.chapter_id', 'reactions.user_id');
      },
    };
  }
}

Reaction.knex(knex);
module.exports = Reaction;