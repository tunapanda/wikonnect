import Route from '@ember/routing/route';

export default class TagRoute extends Route {
  async model(params) {
    let filtered = [];
    await this.store.query('chapter', { approved: true }).then((t) => {
      t.map((c) => {
        if (c.tags) {
          if (c.tags.includes(params.id)) {
            filtered.push(c);
          }
        }
      });
    });

    return await filtered;
  }
}
