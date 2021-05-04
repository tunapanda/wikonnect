const Model = require('./_model');
const knex = require('../db/db');

class Group extends Model {
  static get tableName() {
    return 'groups';
  }

  static get relationMappings() {
    return {
      members: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/users',
        join: {
          from: 'groups.id',
          through: {
            from: 'group_members.groupId',
            to: 'group_members.userId'
          },
          to: 'users.id'
        }
      },
      permissions: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/group_permission',
        join: {
          from: 'group.id',
          to: 'group_permissions.groupId'
        }
      }
    };
  }

  static get virtualAttributes() {
    return ['type'];
  }

  type() {
    return 'userRoles';
  }


  static get modifiers() {
    return {
      selectNameAndId: (builder) => {
        builder.select('id', 'name');
      },
      selectId: (builder) => {
        builder.select('id');
      }
    };
  }
}

Group.knex(knex);
module.exports = Group;
