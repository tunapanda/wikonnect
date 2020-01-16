import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default class UserModel extends Model {
  @attr() username;
  @attr() email;
  @attr() password;
  @attr() firstName;
  @attr() lastName;
  @attr() aboutMe;
  @attr() achievementAward;

  @hasMany('group') groups;
  @hasMany('activity') activities;
  @hasMany('achievementAward') achievementAwards;
  @hasMany('course') enrolledCourses;
}
