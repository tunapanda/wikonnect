import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';


export default class AchievementEmberObject extends EmberObject.extend(Evented) {
  sendData() {
    fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
      .then(response => response.json())
      .then(commits => console.log(commits[0].author.login));
  }
}