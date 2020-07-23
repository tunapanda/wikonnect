const Model = require('./_model');
const knex = require('../db/db');

class Rating extends Model {
  static get tableName() {
    return 'ratings';
  }
  static get modifiers() {
    return {
      selectRating: (builder) => {
        builder.select('id', 'rating', 'chapter_id');
      }
    };
  }
}

Rating.knex(knex);
module.exports = Rating;
