import Service, { inject as service } from '@ember/service';

export default class XapiRecordService extends Service {
  @service
  store;

  achievementCreate(fields) {
    let achievement = this.store.createRecord('achievement', fields);
    return achievement.save();
  }
}
