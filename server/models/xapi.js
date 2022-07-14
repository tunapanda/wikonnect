const Model = require("./_model");
const knex = require("../db/db");

class Xapi extends Model {
  static get tableName() {
    return "xapi";
  }

  static get relationMappings() {
    return {};
  }
}

Xapi.knex(knex);
module.exports = Xapi;
