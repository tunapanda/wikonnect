import Model, { belongsTo, attr } from '@ember-data/model';

export default class CourseEnrollmentModel extends Model {
  @attr userId;
  @attr courseId;
  @attr createdAt;
  @attr updatedAt;

  @belongsTo('user') user;
  @belongsTo('course') course;
}
