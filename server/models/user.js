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

  static get modifiers() {
    return {
      selectNameAndId: (builder) => {
        builder.select('id', 'name');
      }
    };
  }
}

User.knex(knex);
module.exports = User;
