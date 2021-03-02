import ApplicationSerializer from './application';

export default class ChapterSerializer extends ApplicationSerializer {
  serialize() {
    let json = super.serialize(...arguments);
    delete json.authenticatedUser;
    return json;
  }
}
