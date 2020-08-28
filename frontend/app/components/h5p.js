import Component from '@glimmer/component';
import { H5P } from 'h5p-standalone'; // ES6
import { action } from '@ember/object';
import { inject, inject as service } from '@ember/service';
import sendData from '../utils/achievement';


export default class H5pComponent extends Component {
  @inject me;

  @service notify;

  @action
  async renderH5P(el) {

    this.notify.info('Log in to track progress');
    const h5pLocation = this.args.location;

    const options = {
      frameJs: '/h5p/frame.bundle.js',
      frameCss: '/h5p/h5p.css'
    };

    await new H5P(el, h5pLocation, options);
  }

  @action
  async dataLoad(el) {
    console.log(el);

    this.notify.info('chapter completed');
    let chapter_id = 'chapter2';
    console.log(chapter_id);

    window.H5P.externalDispatcher.on('xAPI', function (event) {
      console.log('INITIAL STATEMENT ON externalDispatcher');
      let information = sendData.create();
      console.log(information);
      if (event.getScore() === event.getMaxScore() && event.getMaxScore() > 0) {
        let body = {
          achievement: {
            description: 'not set',
            targetStatus: 'completed',
            target: chapter_id
          }
        };
        console.log(event.getScore());
        console.log(event.getMaxScore());
        console.log(body);
      }
    });
  }
}


