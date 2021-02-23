import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class TeachPreviewController extends Controller {
  @inject notify;
  @inject session;
  @inject
  me;
  token = this.session.data.authenticated.token;
  @tracked publishModal;
  @tracked unpublishModal;
  @tracked deleteModal;

  @action
  async publish(chapter_id) {
    let chapter  = await this.store.findRecord('chapter', chapter_id);
    await chapter.set('status', 'published');
    await chapter.save();

    this.publishModal = false;
    this.notify.info('Chapter succesfuly published');
    this.transitionToRoute('teach.published');
  }

  @action
  async delete(chapter_id) {
    let chapter = await this.store.findRecord('chapter', chapter_id);
    await chapter.deleteRecord();
    await chapter.save();
    this.deleteModal = false;
    this.notify.info('Chapter succesfuly deleted');
    this.transitionToRoute('teach');
  }

  @action
  showPublishModal() {
    this.publishModal = true;
  }

  @action
  showDeleteModal() {
    this.deleteModal = true;
  }

  @action
  async unpublish(chapter_id) {
    let chap  = await this.store.findRecord('chapter', chapter_id);

    await chap.set('status', 'draft');
    await chap.set('approved', false);
    await chap.save();

    this.unpublishModal = false;
    this.notify.info('Chapter succesfuly unpublished');
    this.transitionToRoute('teach');
  }
}
