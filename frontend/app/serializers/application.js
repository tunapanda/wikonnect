import RESTSerializer from '@ember-data/serializer/rest';
import { camelize } from '@ember/string';

export default class ApplicationSerializer extends RESTSerializer {
  keyForRelationship(key, relationship) {
    if (relationship === 'belongsTo') {
      return `${camelize(key)}Id`;
    }
    return key;
  }
}