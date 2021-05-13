import Model, { attr } from '@ember-data/model';

export default class BadgeModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() badgeUri;
  @attr() trigger;
  @attr('number') points;
  @attr() description;
  @attr('date') expiry;
  @attr('boolean') isDeleted;
  @attr('boolean') published;
  @attr('number') frequency;
  @attr('number') reminder;
  @attr() reminderMessage;
  @attr() metadata;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  get iconUrl() {
    return this.badgeUri;
  }
}
