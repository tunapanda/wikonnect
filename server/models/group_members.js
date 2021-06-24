const Model = require('./_model');
const knex = require('../db/db');

class GroupMembers extends Model {

  static get tableName() {
    return 'group_members';
  }

  async $indexForSearch() {
    return null;
  }

  static get relationMappings() {
    return {
      users: {
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
      group: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/group',
        join: {
          from: 'group_members.groupId',
          to: 'groups.id'
        }
      }
    };
  }

  static get modifiers() {
    return {
      selectNameAndId: (builder) => {
        builder.select('group_members.id');
      }
    };
  }

}

GroupMembers.knex(knex);
module.exports = GroupMembers;
