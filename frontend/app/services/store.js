import Store from '@ember-data/store';

export default class StoreService extends Store {
  findBySlug() {
    return this.query(arguments[0], { slug: arguments[1] }).then((items) => {
      return items.get('firstObject');
    });
  }

  findByUsername() {
    return this.query('user', { username: arguments[0] }).then((items) => {
      return items.get('firstObject');
    });
  }
}
