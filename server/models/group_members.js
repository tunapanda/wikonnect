const Model = require('./_model');
const knex = require('../db/db');

class GroupMembers extends Model {

  static get tableName() {
    return 'group_members';
  }

  async $indexForSearch() {
    return null;
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
