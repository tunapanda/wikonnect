import Component from '@glimmer/component';
import { H5PEditorComponent } from '@lumieducation/h5p-webcomponents';
import fetch from 'fetch';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class H5pEditorComponent extends Component {
  @tracked
  editor;

  @tracked
  contentId = this.args.contentId || 'new';

  baseUrl = '/api/v1/h5p';

  constructor(owner, args) {
    super(owner, args);

    /*create H5P editor web component*/
    if (!window.customElements.get('hp-editor')) {
      window.customElements.define('hp-editor', H5PEditorComponent);
    }
  }

  @action
  initEditor(element) {
    element.addEventListener('editorloaded', () => {
      this.loading = true;
      if (this.args.onEditorLoaded) {
        this.args.onEditorLoaded(element);
      }
    });

    element.loadContentCallback = async (contentId) => {
      return await fetch(
        contentId
          ? `${this.baseUrl}/editor/${contentId}`
          : `${this.baseUrl}/editor`
      )
        .then((res) => res.json())
        .then((rs) => {
          if (this.args.onEditorInit) {
            this.args.onEditorInit(element);
          }
          this.editor = element; //initialize the editor now
          return rs.model;
        });
    };

    element.saveContentCallback = async (contentId, requestBody) => {
      return await fetch(`${this.baseUrl}/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }).then((res) => res.json());
    };
  }
}
