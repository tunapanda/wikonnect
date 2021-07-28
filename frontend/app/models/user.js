import Model, { attr, hasMany } from '@ember-data/model';
import { capitalize } from '@ember/string';

export default class UserModel extends Model {
  @attr() username;
  @attr() email;
  @attr() password;
  @attr() firstName;
  @attr() lastName;
  @attr() lastSeen;
  @attr() updatedAt;
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

  @attr('number', { defaultValue: 0 }) totalCoursesEnrolled;
  @attr('number', { defaultValue: 0 }) totalTagsFollowed;
  @attr('number', { defaultValue: 0 }) totalUserFollowers;

  @hasMany('activity') activities;
  @hasMany('achievement-award') achievementAwards;
  @hasMany('course') enrolledCourses;
  @hasMany('user-followee') userFollowers;

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
    if (!this.userRoles || !this.userRoles[0] || !this.userRoles[0].name) {
      return '';
    }

    return capitalize(this.userRoles[0].name);
  }

  get lastLoginTime() {
    if (!this.createdAt) {
      return new Date();
    }

    return new Date(this.updatedAt).toLocaleString();
  }

  get status() {
    return this.emailVerified ? 'Verified' : 'Unverified';
  }
}
