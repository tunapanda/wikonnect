import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ApplicationSerializer from './application';

export default class TagSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    tagFollowers: { deserialize: 'records' },
  };

  serialize() {
    let json = super.serialize(...arguments);
    delete json.authenticatedUser;
    delete json.slug;
    delete json.metadata;
    delete json.creator;
    delete json.canDelete;
    delete json.createdAt;
    delete json.updatedAt;
    delete json.coursesCount;
    delete json.chaptersCount;
    delete json.followersCount;
    return json;
  }
}
