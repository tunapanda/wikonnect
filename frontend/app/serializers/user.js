import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ApplicationSerializer from './application';

export default class UserSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    userFollowers: { deserialize: 'records' },
  };

  serialize() {
    let json = super.serialize(...arguments);
    delete json.profileUri;
    delete json.totalCoursesEnrolled;
    delete json.totalTagsFollowed;
    delete json.totalUserFollowers;

    return json;
  }
}
