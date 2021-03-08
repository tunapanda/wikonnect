import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TeachH5pUploadController extends Controller {
  @service me;
  @service notify;

  @tracked editor;

  @action
  editorLoaded(elem) {
    this.editor = elem;
  }

  @action
  async saveH5PContent() {
    if (!this.editor) {
      this.notify.info('You need to create content first to proceed');
      return;
    }
    try {
      const res = await this.editor.save();
      this.model.contentId = res.id;
      await this.model.save();
      this.transitionToRoute('teach.thumbnail-upload', this.model.id);
    } catch (e) {
      console.log(e);
      this.notify.alert(
        'Unexpected error encountered and we could not save the content'
      );
    }
  }
}
