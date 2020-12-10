import Component from '@glimmer/component';
import { H5P } from 'h5p-standalone'; // ES6
import { action } from '@ember/object';
import { inject, inject as service } from '@ember/service';


export default class H5pComponent extends Component {
  @inject me;

  @service notify;

  @action
  async renderH5P(el) {
    const h5pLocation = this.args.location;

    const options = {
      frameJs: '/h5p/frame.bundle.js',
      frameCss: '/h5p/h5p.css'
    };

    await new H5P(el, h5pLocation, options);
  }

  @action
  async counterTimer(el) {
    console.log(el);
    console.log(el.onload);
    let chapter_id = await this.target.currentRoute.params.chapter_slug;
    let data = {
      'counter': {
        'counter': 1,
        'chapter-id': chapter_id,
        'trigger': 'pageLandingN'
      }
    };


    fetch('http://localhost:3000/api/v1/counters', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        this.notify.info('Success:', data);
      })
      .catch((error) => {
        this.notify.info('Error:', error);
      });
  }
}