const Model = require('./_model');
const knex = require('../db/db');
const userSchema = require('../db/json_schema/userSchema');

class User extends Model {

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return userSchema;
  }

  get $secureFields() {
    return ['hash', 'email','lastSeen', 'lastIp'];
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
