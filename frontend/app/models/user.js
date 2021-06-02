import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr() username;
  @attr() email;
  @attr() password;
  @attr() firstName;
  @attr() lastName;
  @attr() aboutMe;
  @attr() lastSeen;
  @attr() tags;
  @attr() inviteCode;
  @attr() createdAt;
  @attr() profileUri;
  @attr() metadata;
  @attr() name;
  @attr() emailVerified;
  @attr() flag;
  @attr() userRoles;

  // @hasMany('group') groups;
  @hasMany('activity') activities;
  @hasMany('achievement-award') achievementAwards;
  @hasMany('course') enrolledCourses;

  get role() {
    if (!this.userRoles) {
      return "";
    }
    
    return this.userRoles[0].name;
  }

  get dateJoined() {
    if (!this.createdAt) {
      return new Date();
    }

    return new Date(this.createdAt).toLocaleDateString();
  }

  get status () {
    return this.emailVerified ? "Verified" : "Unverified";
  }
}
