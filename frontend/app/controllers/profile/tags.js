import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProfileTagsController extends Controller {
  @service me;
  @service store;
  @service intl;
  @service notify;
  @tracked searchTerm;
  @tracked sortBy = {};

  get popularCourses() {
    return this.model[1];
  }
  get popularTags() {
    //sort to ensure long tags are displayed last
    return this.model[2].toArray().sort((a, b) => {
      return a.name.length > b.name.length ? 1 : -1;
    });
  }

  @action
  setSortBy(title, value) {
    this.sortBy = { title, value };
  }

  sortTags(tags) {
    if (!this.sortBy.value) {
      return tags;
    }
    if (this.sortBy.value === 'followersCount') {
      return tags.sortBy('followersCount').reverse();
    }
    if (this.sortBy.value === 'coursesCount') {
      return tags.sortBy('coursesCount').reverse();
    }
    if (this.sortBy.value === 'name') {
      return tags.sortBy('name');
    }
    if (this.sortBy.value === 'chaptersCount') {
      return tags.sortBy('chaptersCount').reverse();
    }
  }

  get tags() {
    const t = this.store.peekAll('tag').filter((t) => t.id);
    if (!this.searchTerm) {
      return this.sortTags(t);
    }
    const x = t.filter((tag) =>
      tag.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return this.sortTags(x);
  }

  get dataSummary() {
    return this.intl.t('profile.tags_page.showing_all');
  }

  @action
  isFollowing(tag) {
    return tag.tagFollowers && tag.tagFollowers.findBy('userId', this.me.id);
  }

  @action
  async follow(tag) {
    const follow = this.store.createRecord('tag-follower', {
      userId: this.me.id,
      tag: tag,
    });
    try {
      await follow.save();
      tag.followersCount += 1;
    } catch (e) {
      follow.rollbackAttributes();
      const message = this.intl.t('profile.tags_page.general_error');
      this.notify.alert(message);
    }
  }

  @action
  async unfollow(tag) {
    try {
      const obj = tag.tagFollowers.findBy('userId', this.me.id);
      if (obj) {
        await obj.destroyRecord();
        tag.followersCount -= 1;
      }
    } catch (e) {
      const message = this.intl.t('profile.tags_page.general_error');
      this.notify.alert(message);
    }
  }
}
