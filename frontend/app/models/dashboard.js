import DS from 'ember-data';
const { Model, attr } = DS;

export default class DashboardModel extends Model {
  @attr() keyResult;
  @attr() achieved;
  @attr() quarter;
}
