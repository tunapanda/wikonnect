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
  // @attr('string', { defaultValue: 'Nairobi, Kenya' }) location;
  // @attr('string', { defaultValue: '+254 712345678' }) contactNumber;
  @attr() userRoles;

  @hasMany('activity') activities;
  @hasMany('achievement-award') achievementAwards;
  @hasMany('course') enrolledCourses;

  get badgesEarned() {
    return 0;
  }

  get pointsEarned() {
    return 0;
  }

  get chaptersCompleted() {
    return 0;
  }

  get chaptersCreated() {
    return 0;
  }

  get role() {
    if (!this.userRoles) {
      return '';
    }

    return this.userRoles[0].name;
  }

  get lastLoginTime() {
    if (!this.createdAt) {
      return new Date();
    }

    return new Date(this.lastSeen).toLocaleString();
  }

  get status() {
    return this.emailVerified ? 'Verified' : 'Unverified';
  }
}
