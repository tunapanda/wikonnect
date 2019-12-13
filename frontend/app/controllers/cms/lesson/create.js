import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { all } from 'rsvp';
import Uploader from '../../../utils/uploader';

export default class CmsLessonCreateController extends Controller {
  @inject
  me;

  @action
  async submit() {
    await this.model.save();

    await all(this.model.chapters.invoke('save'));

    this.transitionToRoute('cms.lesson.edit', this.model);
  }

  @action
  addChapter() {
    const chapter = this.store.createRecord('chapter', {
      creator: this.me.user,
      lesson: this.model,
      status: 'published'
    });

    this.get('model.chapters').pushObject(chapter);
  }

  @action
  async fileAdded(chapter, files) {
    console.log(arguments);

    const uploader = Uploader.create({
      file: files[0],
      filename: files[0].name,
    });

    this.set('uploader', uploader);


    const host = '/' + this.store.adapterFor('application').urlPrefix();

    const uploadRes = await uploader.startUpload([host, 'chapters', chapter.id, 'upload'].join('/'));

    const url = ['//', uploadRes.host, uploadRes.path].join('/');

    chapter.set('contentType', 'h5p');
    chapter.set('contentUri', url);

    return chapter.save();
  }

  @action
  removeChapter(chapter) {
    this.get('model.chapters').removeObject(chapter);
    chapter.destroy();
  }
}
