const Model = require('./_model');
const knex = require('../db/db');
const campaignSchema = require('../db/json_schema/campaignSchema');

class CampaignMain extends Model {
  static get tableName() {
    return 'activity';
  }

  static get jsonSchema(){
    return campaignSchema;
  }

  async $indexForSearch() {
    return null;
  }

  static get relationMappings() {
    return {};
  }
}

CampaignMain.knex(knex);
module.exports = CampaignMain;
