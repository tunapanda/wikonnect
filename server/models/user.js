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

  static get virtualAttributes() {
    return ['name'];
  }

  get name() {
    if (!this.metadata) {
      return this.username;
    }
    if (this.metadata.firstName && this.metadata.lastName) {
      return `${this.metadata.firstName} ${this.metadata.lastName}`;
    }
    if (this.metadata.firstName) {
      return `${this.metadata.firstName}`;
    }
    if (this.metadata.lastName) {
      return `${this.metadata.lastName}`;
    }
    return this.username;
  }
  get $virtualFields() {
    return ['firstName', 'lastName', 'aboutMe'];
  }

  get $secureFields() {
    return ['hash', 'lastIp', 'resetPasswordToken', 'resetPasswordExpires'];
  }

  $beforeInsert() {
    this.lastSeen = new Date(+new Date());
  }

  $afterFind() {
    this.lastSeen = new Date(+new Date());
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
            from: 'course_enrollment.userId',
            to: 'course_enrollment.courseId'
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
      oauth2: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/oauth2',
        join: {
          from: 'users.id',
          to: 'oauth2.userId'
        }
      },
      userRoles: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/group',
        join: {
          from: 'users.id',
          through: {
            from: 'group_members.userId',
            to: 'group_members.groupId'
          },
          to: 'groups.id'
        }
      },
      followees: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'users.id',
          through: {
            to: 'user_followers.followingId',
            from: 'user_followers.userId',
            extra: {
              subscriptionId: 'id'
            },
          },
          to: 'users.id'
        }
      },
      followers: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'users.id',
          through: {
            to: 'user_followers.userId',
            from: 'user_followers.followingId',
            extra: {
              subscriptionId: 'id'
            },
          },
          to: 'users.id'
        }
      },

    };
  }

  static get modifiers() {
    return {
      selectNameAndId: (builder) => {
        builder.select('users.id', 'name');
      },
      selectNameAndProfile: (builder) => {
        builder.select('username', 'profileUri');
      },
      selectBasicInfo: (query) => {
        query.select('users.id', 'username', 'metadata', 'profileUri','email');
      },
    };
  }
}

User.knex(knex);
module.exports = User;
