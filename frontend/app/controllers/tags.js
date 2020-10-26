import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';



export default class TagsController extends Controller {
  @inject
  me;

  @tracked topic_list = ['Literacy', 'STEM', 'Environmental conservation', 'Emotional well-being', 'Life skills and values',
    'Fitness and nutrition', 'Creative arts', 'Community service', 'Learners with special needs', 'Music and movement', 'Entrepreneurship',
    'Health and safety', 'Language Learning']



  @tracked competency_list = [

    'Digital literacy', 'Self efficacy', 'Imagination', 'Creativity', 'Communication', 'Critical thinking', 'Problem solving', 'Collaboration', 'Citizenship', 'Learning to learn'
  ]

  @tracked level_list = [
    'Pre - primary', 'Standard 1', 'Standard 2', 'Standard 3', 'Standard 4', 'Standard 5', 'Standard 6', 'Standard 7', 'Standard 8', 'Form 1', 'Form 2', 'Form 3', 'Form 4', 'Post - secondary'
  ]

  @tracked kicd_list = [
    'APPROVED', 'ALIGNED'
  ]



  @tracked competency_cart = []
  @tracked kicd_cart = []
  @tracked topic_cart = []
  @tracked level_cart = []


  @action
  addme(item, cart) {
    console.log(item);
    console.log(cart);
    switch (cart) {
    case 'competency':
      this.competency_list.removeObject(item);
      this.competency_cart.addObject(item);
      break;
    case 'topic':
      this.topic_list.removeObject(item);
      this.topic_cart.addObject(item);
      break;
    case 'level':
      this.level_list.removeObject(item);
      this.level_cart.addObject(item);
      break;

    case 'kicd':
      this.kicd_list.removeObject(item);
      this.kicd_cart.addObject(item);
      break;

    default:
      break;
    }


  }

  @action
  removeme(item, cart) {
    console.log(item);
    console.log(cart);

    switch (cart) {
    case 'competency':
      this.competency_cart.removeObject(item);
      this.competency_list.addObject(item);
      break;
    case 'topic':
      this.topic_cart.removeObject(item);
      this.topic_list.addObject(item);
      break;
    case 'level':
      this.level_cart.removeObject(item);
      this.level_list.addObject(item);
      break;
    case 'kicd':
      this.kicd_cart.removeObject(item);
      this.kicd_list.addObject(item);
      break;
    case 'custom':
      this.custom_cart.removeObject(item);
      break;

    default:
      break;
    }
  }







  @action
  updateTags() {

    let combined = [];

    combined.concat(this.topic_cart);
    combined.concat(this.competency_cart);
    combined.concat(this.level_cart);


    this.store.findRecord('user', this.me.user.id).then(function (user) {
      user.set('tags', combined);
      user.save();

    });




    this.transitionToRoute('upload', { queryParams: { signup: 'true' } });

  }

}
