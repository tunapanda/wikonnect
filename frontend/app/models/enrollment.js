import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

const { Model, attr } = DS;
export default class EnrollmentModel extends Model {
  @attr() course_id;

  @attr() status;

  @belongsTo('course')
  course;
}
