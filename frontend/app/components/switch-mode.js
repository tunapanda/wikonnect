import Component from '@glimmer/component';

import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';

export default class SwitchModeComponent extends Component {
  @tracked 
  isDarkModeOn;
  
  @inject
  me;

  // constructor() {
  //   super(...arguments);
  //   if(!this.isDarkModeOn) {
  //     this.isDarkModeOn = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   }
  // }

  @action loadMode() {
    // hack to trigger toggle event on load to change styles.!
    this.isDarkModeOn && document.getElementById("switch").dispatchEvent(new MouseEvent('click'));
  }

  @action toggleMode(e) {
    let checked = e.target.checked;
    let cl = e.currentTarget.classList;
    checked ? cl.add("dark-mode") : cl.remove("dark-mode");

    if(this.isDarkModeOn){
      this.me.updateTheme('dark');
    }else{
      this.me.updateTheme('light');
    }

    // const switchButton = document.querySelector('#switch');
    
    let trans = () => {
      document.documentElement.classList.add('transition');
      window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
      }, 200);

      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.card__header > h1').textContent =
          'Dark theme';
        trans();
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('.card__header > h1').textContent =
          'Light theme';
        trans();
      }
    };

  }

}