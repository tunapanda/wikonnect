import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

import ApplicationSerializer from './application';

export default class ChapterSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    tags: { deserialize: 'records' },
  };

  serialize(snapshot) {
    let json = super.serialize(...arguments);
    delete json.authenticatedUser;
    delete json.views;
    delete json.creatorId;
    delete json.createdAt;
    delete json.updatedAt;
    delete json.reaction;

    snapshot.eachRelationship((key, relationship) => {
      if (
        relationship.kind === 'hasMany' &&
        key === 'tags' &&
        snapshot.hasMany(key)
      ) {
        json[key] = snapshot.hasMany(key).map((snapshot) => {
          return { id: snapshot.id };
        });
      }
    });

    return json;
  }
}
