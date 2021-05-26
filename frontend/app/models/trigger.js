import Model, { attr } from '@ember-data/model';

export default class TriggerModel extends Model {
  @attr() name;
  @attr() description;
}
