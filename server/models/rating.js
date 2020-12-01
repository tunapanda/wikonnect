const Model = require('./_model');
const knex = require('../db/db');

class Rating extends Model {
  static get tableName() {
    return 'ratings';
  }
  static get modifiers() {
    return {
      selectRating: (builder) => {
        builder.select('id', 'rating', 'chapter_id', 'user_id', 'labels', 'comment');
      }
    };
  }
}

Rating.knex(knex);
module.exports = Rating;
