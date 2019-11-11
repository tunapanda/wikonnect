const Model = require('./_model');
const knex = require('../db/db');
const activitySchema = require('../db/json_schema/activitySchema');

class Activity extends Model {
  static get tableName() {
    return 'activity';
  }

  static get jsonSchema(){
    return activitySchema;
  }
  static get relationMappings() {
    return {};
  }
}

Activity.knex(knex);
module.exports = Activity;
