const Model = require('./_model');
const knex = require('../db/db');

class Rating extends Model {
  static get tableName() {
    return 'ratings';
  }

  static  get relationMappings(){
    return {
      review:{
        relation: Model.HasOneRelation,
        modelClass:`${__dirname}/review`,
        join: {
          from: 'ratings.id',
          to: 'reviews.ratingId'
        }
      }
    };
  }
}

Rating.knex(knex);
module.exports = Rating;
