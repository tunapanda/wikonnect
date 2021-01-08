import Model from 'ember-data/model';
import attr from 'ember-data/attr';

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
