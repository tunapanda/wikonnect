import Model, { attr } from '@ember-data/model';

export default class DashboardModel extends Model {
  @attr() keyResult;
  @attr() achieved;
  @attr() quarter;
}
