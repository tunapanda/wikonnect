import Model, { belongsTo, attr } from '@ember-data/model';

export default class EnrollmentModel extends Model {
  @attr() course_id;

  @attr() status;

  @belongsTo('course')
  course;
}
