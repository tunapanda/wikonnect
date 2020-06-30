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
  @attr() lastSeen;
  @attr() inviteCode;
  @attr() createdAt;
  @attr() profileUri;

  @hasMany('group') groups;
  @hasMany('activity') activities;
  @hasMany('achievement-award') achievementAwards;
  @hasMany('course') enrolledCourses;
}
