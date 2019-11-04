const { Model } = require('objection');
const knex = require('../db/db');

class User extends Model {
  // user schema
  static get tableName() {
    return 'users';
  }
}

User.knex(knex);
module.exports = User;
const Model = require('./_model');
const knex = require('../db/db');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  get $secureFields() {
    return ['hash', 'lastSeen', 'lastIp'];
  }

  static get relationMappings() {
    return {
      enrolledCourses: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/courses',
        join: {
          from: 'users.id',
          through: {
            modelClass: __dirname + '/enrollments',
            from: 'enrollments.userId',
            to: 'enrollments.courseId'
          },
          to: 'courses.id'
        }
      }
    };
  }
}

User.knex(knex);
module.exports = User;
