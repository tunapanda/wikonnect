const Model = require('./_model');
const knex = require('../db/db');

class UserSurvey extends Model {
  static get tableName() {
    return 'user_surveys';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['survey_id', 'user_id'],
      properties: {
        survey_id: {type: 'string'},
        user_id: {type: 'string'},
      },
    };
  }

  static get relationMappings() {
    return {
      survey: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/survey`,
        join: {
          from: 'user_surveys.survey_id',
          to: 'surveys.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users`,
        join: {
          from: 'user_surveys.user_id',
          to: 'users.id'
        }
      },
    };
  }
}

UserSurvey.knex(knex);
module.exports = UserSurvey;
