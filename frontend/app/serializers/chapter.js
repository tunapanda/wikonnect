import ApplicationSerializer from './application';

export default class ChapterSerializer extends ApplicationSerializer {
  serialize() {
    let json = super.serialize(...arguments);
    // Sending authenticatedUser & views to backend causes an error so we avoid sending it
    delete json.authenticatedUser;
    delete json.views;

    return json;
  }
}
