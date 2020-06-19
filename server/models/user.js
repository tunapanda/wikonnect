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
    return ['firstName', 'lastName', 'aboutMe'];
  }

  get $secureFields() {
    return ['hash', 'lastIp'];
  }

  async $indexForSearch() {
    return null;
  }

  static get relationMappings() {
    return {
      enrolledCourses: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/course',
        join: {
          from: 'users.id',
          through: {
            modelClass: __dirname + '/enrollment',
            from: 'enrollments.user_id',
            to: 'enrollments.course_id'
          },
          to: 'courses.id'
        }
      },
      achievementAwards: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/achievement_awards',
        join: {
          from: 'users.id',
          to: 'achievement_awards.userId'
        }
      },
      userRoles: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/group',
        join: {
          from: 'users.id',
          through: {
            from: 'group_members.user_id',
            to: 'group_members.group_id'
          },
          to: 'groups.id'
        }
      }
    };
  }

  static get modifiers() {
    return {
      selectNameAndId: (builder) => {
        builder.select('users.id', 'name');
      }
    };
  }
}

User.knex(knex);
module.exports = User;
