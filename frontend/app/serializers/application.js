import RESTSerializer from '@ember-data/serializer/rest';
import { camelize } from '@ember/string';

export default class ApplicationSerializer extends RESTSerializer {

  keyForRelationship(key) {
    if (key === 'creator') {
      return `${camelize(key)}Id`;
    }
    return camelize(key);
  }
}