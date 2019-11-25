const { Model } = require('objection');
const knex = require('../db/db');
const _ = require('lodash');

class Base extends Model {

  get $virtualFields() {
    return [];
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  $formatJson(json) {
    json = super.$formatJson(json);

    json = { ...json, ...json.metadata };
    delete json.metadata;

    return _.omit(json, this.$secureFields);
  }

  $parseJson(json, opt) {
    json = super.$parseJson(json, opt);

    const virtualProperties = _.pick(json, this.$virtualFields);

    if (_.keys(virtualProperties).length) {
      json.metadata = virtualProperties;
    }

    json = _.omit(json, this.$virtualFields);

    return json;
  }

  toJSON(opts) {
    return super.toJSON(opts);
  }
}

Base.knex(knex);

module.exports = Base;