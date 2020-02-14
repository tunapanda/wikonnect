const Model = require('./_model');
const knex = require('../db/db');
const enrollmentsSchema = require('../db/json_schema/enrollmentsSchema');
const search = require('../utils/search');


class Enrollment extends Model {
  static get tableName() {
    return 'enrollments';
  }

  static get jsonSchema() {
    return enrollmentsSchema;
  }


  async $indexForSearch() {
    return search.index({
      index: search.indexName,
      id: this.id,
      body: {
        model: 'course',
        name: this.name,
        description: this.description,
        status: this.status,
        created_at: this.createdAt,
        modified_at: this.modifiedAt
      }
    });
  }

  static get modifiers() {
    return {
      selectNameAndId: (builder) => {
        builder.select('id', 'courseId', 'status');
      }
    };
  }
}

Enrollment.knex(knex);
module.exports = Enrollment;
