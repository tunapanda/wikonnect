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

  get $virtualFields() {
    return ['firstName','lastName','aboutMe'];
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
      },
      achievement_awards: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/achievement_awards',
        join: {
          from: 'users.id',
          to: 'achievement_awards.userId'
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
