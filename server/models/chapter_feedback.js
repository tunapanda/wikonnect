const Model = require('./_model');
const knex = require('../db/db');

class ChapterFeedback extends Model {

  static get tableName() {
    return 'chapter_feedback';
  }

}

ChapterFeedback.knex(knex);
module.exports = ChapterFeedback;
