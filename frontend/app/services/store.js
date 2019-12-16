import DS from 'ember-data';

export default DS.Store.extend({

  findBySlug: function () {
    return this.query(arguments[0], { "slug": arguments[1] }).then((items) => {

      console.log("STORE");
      console.log(items);

      return items.get('firstObject');
    });

  },

  findByUsername: function () {
    return this.query('user', { "username": arguments[0] }).then((items) => {
      return items.get('firstObject');
    });
  }

});
