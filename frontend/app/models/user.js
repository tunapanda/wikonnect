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

  @hasMany('group') groups;
  @hasMany('activity') activities;
  @hasMany('achievement-award') achievementAwards;
  @hasMany('course') enrolledCourses;

  get dateJoined() {
    return new Date(this.createdAt).toLocaleDateString();
  }

  get verificationStatus() {
    return this.emailVerified ? 'Verified' : 'Unverified';
  }

  get role() {
    const roleId = this.userRoles[0].id;

    if (roleId === 'groupSuperAdmin') {
      return 'Super Admin';
    } else if (roleId === 'groupAdmin') {
      return 'Admin';
    } else if (roleId === 'groupBasic') {
      return 'Learner';
    }

    return null;
  }
}
