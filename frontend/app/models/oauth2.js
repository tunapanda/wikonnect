import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {

  @attr() googleToken;
  @attr() provider;
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
}
