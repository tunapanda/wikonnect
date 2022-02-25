import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TeachPreviewController extends Controller {
  @service notify;
  @service session;
  @service me;
  @tracked publishModal = false;
  @tracked unpublishModal = false;
  @tracked deleteModal = false;
  token = this.session.data.authenticated.token;

  @action
  async publish(chapter_id) {
    try {
      let chapter = this.store.peekRecord('chapter', chapter_id);
      chapter.status = 'published';

      await chapter.save();

      this.publishModal = false;
      this.notify.info('Chapter successfully published');
      this.transitionToRoute('teach');
    } catch (e) {
      this.notify.alert('Chapter not published. Unexpected error encountered');
    }
  }

  @action
  async delete(chapter_id) {
    try {
      let chapter = await this.store.find('chapter', chapter_id);
      await chapter.deleteRecord();
      await chapter.save();
      this.deleteModal = false;
      this.notify.info('Chapter successfully deleted');
      this.transitionToRoute('teach');
    } catch (e) {
      this.notify.alert('Chapter not deleted. Unexpected error encountered');
    }
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
    try {
      let chapter = this.store.peekRecord('chapter', chapter_id);
      chapter.status = 'draft';
      chapter.approved = false;
      await chapter.save();

      this.unpublishModal = false;
      this.notify.info('Chapter successfully unpublished');
      this.transitionToRoute('teach');
    } catch (e) {
      this.notify.alert(
        'Chapter not unpublished. Unexpected error encountered'
      );
    }
  }
}
