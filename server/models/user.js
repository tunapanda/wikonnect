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
    super.$beforeInsert();
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
            to: 'user_followers.followeeId',
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
            from: 'user_followers.followeeId',
            extra: {
              subscriptionId: 'id'
            },
          },
          to: 'users.id'
        }
      },

      userFollowers: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/user-follower',
        join: {
          from: 'users.id',
          to: 'user_followers.followeeId' //perspective: my followers
        }
      },
      userFollowees: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/user-follower',
        join: {
          from: 'users.id',
          to: 'user_followers.userId', //perspective: people I am following
        }
      },
      tagsFollowing: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tag-follower',
        join: {
          from: 'users.id',
          to: 'tag_followers.userId'
        }
      },
      courseEnrollments: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/course-enrollment',
        join: {
          from: 'users.id',
          to: 'course_enrollment.userId'
        }
      },
      chapters: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/chapter',
        join: {
          from: 'users.id',
          to: 'chapters.creatorId'
        }
      },
      courses: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/course',
        join: {
          from: 'users.id',
          to: 'courses.creatorId'
        }
      },
      badgesAwarded: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/badges',
        join:  {
          from: 'users.id',
          through: {
            from: 'user_badges.user_id',
            to: 'user_badges.badge_id',
            extra: {
              user_badge_id: 'id'
            }
          },
          to: 'badges.id'
        }
      }
    }
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
