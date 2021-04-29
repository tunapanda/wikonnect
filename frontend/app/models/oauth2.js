import Model, { attr } from '@ember-data/model';

export default class Oauth2 extends Model {
  @attr() code;
  @attr() provider;
  @attr() username;
}
