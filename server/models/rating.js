const Model = require('./_model');
const knex = require('../db/db');

class Rating extends Model {
  static get tableName() {
    return 'ratings';
  }
  static get modifiers() {
    return {
      selectFlag: (builder) => {
        builder.select('id', 'user_id','chapter_id', 'comment');
      }
    };
  }
}

Rating.knex(knex);
module.exports = Rating;
