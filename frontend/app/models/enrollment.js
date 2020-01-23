import DS from 'ember-data';

const { Model, attr } = DS;
export default class EnrollmentModel extends Model {
  @attr() course_id;
  @attr() creator_id;
}
