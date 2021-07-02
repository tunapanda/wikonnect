import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ApplicationSerializer from './application';

export default class CourseSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    tags: { deserialize: 'records' },
    playlist: { deserialize: 'records' },
    creator: { deserialize: 'records' },
    courseEnrollments: { deserialize: 'records' },
  };
  serialize(snapshot) {
    let json = super.serialize(...arguments);
    delete json.slug;
    delete json.totalEnrolled;
    delete json.creatorId;
    delete json.createdAt;
    delete json.updatedAt;
    delete json.metadata;

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
      if (
        relationship.kind === 'hasMany' &&
        key === 'playlist' &&
        snapshot.hasMany(key)
      ) {
        json[key] = snapshot.hasMany(key).map((snapshot) => {
          return { id: snapshot.id, rank: snapshot.attr('rank') };
        });
      }
    });

    return json;
  }
}
