import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr() username;
  @attr() email;
  @attr() password;
  @attr() firstName;
  @attr() lastName;
  @attr() lastSeen;
  @attr() tags;
  @attr() inviteCode;
  @attr() createdAt;
  @attr() profileUri;
  @attr() metadata;
  @attr() name;
  @attr() emailVerified;
  @attr() flag;
  @attr() location;
  @attr() contactNumber;
  @attr() gender;
  @attr() userRoles;

  @hasMany('group') groups;
  @hasMany('activity') activities;
  @hasMany('achievement-award') achievementAwards;
  @hasMany('course') enrolledCourses;

  get role() {
    if (!this.userRoles || !this.userRoles[0]) {
      return '';
    }
    return this.userRoles[0].name;
  }
}
