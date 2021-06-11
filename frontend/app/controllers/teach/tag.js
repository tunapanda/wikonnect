import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class TeachTagController extends Controller {
  @service me;
  @service config;
  @service intl;
  @service notify;

  maxTagsTotal = 6;
  disallowedXcters = [
    '#',
    ',',
    '<',
    '>',
    '/',
    '\\',
    '=',
    ';',
    '"',
    "'",
    '+',
    '!',
    '@',
    '$',
    ':',
    '%',
    '^',
    '(',
    '*',
    '~',
    '.',
    ')',
  ];

  @tracked topic_list = [
    'Literacy',
    'STEM',
    'Environmental conservation',
    'Emotional well-being',
    'Life skills and values',
    'Fitness and nutrition',
    'Creative arts',
    'Community service',
    'Learners with special needs',
    'Music and movement',
    'Entrepreneurship',
    'Health and safety',
    'Language Learning',
  ];

  @tracked competency_list = [
    'Digital literacy',
    'Self efficacy',
    'Imagination',
    'Creativity',
    'Communication',
    'Critical thinking',
    'Problem solving',
    'Collaboration',
    'Citizenship',
    'Learning to learn',
  ];

  @tracked level_list = [
    'Pre - primary',
    'Standard 1',
    'Standard 2',
    'Standard 3',
    'Standard 4',
    'Standard 5',
    'Standard 6',
    'Standard 7',
    'Standard 8',
    'Form 1',
    'Form 2',
    'Form 3',
    'Form 4',
    'Post - secondary',
  ];

  @tracked platform_list = [
    'Web',
    'Mobile app',
    'WhatsApp',
    'SMS',
    'TV',
    'Radio	Print / offline',
  ];

  @tracked kicd_list = ['APPROVED', 'ALIGNED'];

  @tracked kicd_cart = A([]);
  @tracked competency_cart = A([]);
  @tracked platform_cart = A([]);
  @tracked topic_cart = A([]);
  @tracked level_cart = A([]);

  @tracked custom_tags = [];

  @tracked custom_cart;
  @tracked tag;
  @tracked customTagError;

  get selectedTags() {
    if (this.custom_cart) {
      return this.custom_cart;
    }
    return this.model.tags;
  }

  get topicBucketTags() {
    const tags = [
      { title: 'Internet basics', isSelected: false },
      { title: 'Content creation', isSelected: false },
      { title: 'Digital wellness', isSelected: false },
      { title: 'Data protection and privacy', isSelected: false },
      { title: 'Online safety', isSelected: false },
      { title: 'Relationships and communications', isSelected: false },
      { title: 'News and media literacy', isSelected: false },
      { title: 'Online working', isSelected: false },
      { title: 'Online learning', isSelected: false },
      { title: 'Life skills', isSelected: false },
      { title: 'Health', isSelected: false },
      { title: 'Digital financial literacy', isSelected: false },
    ];

    if (this.selectedTags) {
      return tags.map((tag) => {
        const index = this.selectedTags.findIndex(
          (pred) => pred.toLowerCase() === tag.title.toLowerCase()
        );
        if (index > -1) {
          tag.isSelected = true;
        }
        return tag;
      });
    }
    return tags;
  }

  get hasUnselectedPredefinedTags() {
    return this.topicBucketTags.filter((t) => !t.isSelected).length > 0;
  }

  @action
  addtag(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this.custom_cart) {
      this.custom_cart = A(this.model.tags);
    }
    if (this.custom_cart.length === this.maxTagsTotal) {
      this.notify.alert(
        this.intl.t('errors.max_tags_selected', { max: this.maxTagsTotal })
      );
      return;
    }
    if (this.customTagError) {
      return;
    }
    if (this.tag) {
      this.tag = this.tag.replace(/( & +)/, ' and ');

      const index = this.custom_cart.findIndex(
        (pred) => pred.toLowerCase() === this.tag.trim().toLowerCase()
      );
      if (index > -1) {
        this.tag = '';
      } else {
        this.custom_cart.pushObject(this.tag.trim().toLowerCase()); // lowercase for insane capitalization.
        // we are sacrificing some capitalization i.e. McDonald
        this.tag = '';
      }
    }
  }

  @action
  async updateTags() {
    if (this.model.tags && !this.custom_cart) {
      this.transitionToRoute('teach.review-questions', this.model.id);
      return;
    }

    let id = this.model.id;
    let combined = [];

    combined = combined.concat(
      this.topic_cart,
      this.competency_cart,
      this.level_cart,
      this.custom_cart,
      this.platform_cart
    );

    let chapter = await this.store.peekRecord('chapter', id);
    chapter.tags = combined.map((t) => t.toLowerCase()); //all tags will be lower cased for easier backend filtering
    await chapter.save();
    //reset the local tags holder
    this.custom_cart = null;
    this.transitionToRoute('teach.review-questions', id);
  }

  @action
  removetag(item) {
    this.tags.removeObject(item);
  }

  @action
  addme(item, cart) {
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
      case 'platform':
        this.platform_list.removeObject(item);
        this.platform_cart.addObject(item);
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
      case 'platform':
        this.platform_cart.removeObject(item);
        this.platform_list.addObject(item);
        break;
      case 'kicd':
        this.kicd_cart.removeObject(item);
        this.kicd_list.addObject(item);
        break;
      case 'custom':
        if (!this.custom_cart) {
          this.custom_cart = A(this.model.tags);
        }
        this.custom_cart.removeObject(item);
        break;

      default:
        break;
    }
  }

  @action
  selectPredefinedTag(tag) {
    if (!this.custom_cart) {
      this.custom_cart = A(this.model.tags);
    }
    if (this.custom_cart.length === this.maxTagsTotal) {
      this.notify.alert(
        this.intl.t('errors.max_tags_selected', { max: this.maxTagsTotal })
      );
      return;
    }
    this.custom_cart.pushObject(tag.title);
  }

  @action
  validateTag() {
    if (!this.tag) {
      this.customTagError = this.intl.t('errors.is_required', {
        key: this.intl.t('teach.tag.tag_name'),
      });
      return;
    }

    if (this.disallowedXcters.some((xcter) => this.tag.includes(xcter))) {
      this.customTagError = this.intl.t('errors.characters_not_allowed', {
        characters: this.disallowedXcters.join(' '),
      });
      return;
    }

    if (this.tag.length >= 30) {
      this.customTagError = this.intl.t('errors.max_characters', {
        key: this.intl.t('teach.tag.tag_name'),
        max: 30,
      });
      return;
    }

    this.customTagError = '';
  }
}
