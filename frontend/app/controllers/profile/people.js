import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProfilePeopleController extends Controller {
  @service me;
  @service store;
  @service intl;
  @service notify;
  @tracked searchTerm;
  @tracked sortBy = {};
  @tracked perPage;
  @tracked currentPage;
  @tracked totalPages;

  @action
  setSortBy(title, value) {
    this.sortBy = { title, value };
  }

  sortUsers(users) {
    if (!this.sortBy || !this.sortBy.value) {
      return users; // dont sort!
    }
    if (this.sortBy.value === 'followersCount') {
      return users.sortBy('totalUserFollowers').reverse();
    }
    if (this.sortBy.value === 'enrolledCount') {
      return users.sortBy('totalCoursesEnrolled').reverse();
    }
    if (this.sortBy.value === 'name') {
      return users.sortBy('name');
    }

    if (this.sortBy.value === 'tagsCount') {
      return users.sort((a, b) =>
        a.totalTagsFollowed > b.totalTagsFollowed ? 1 : -1
      );
    }
  }

  get filteredUsers() {
    if (!this.searchTerm) {
      return this.sortUsers(this.users);
    }
    const x = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return this.sortUsers(x);
  }

  get users() {
    return this.store
      .peekAll('user')
      .filter((user) => user.id && user.id !== this.me.id);
  }

  @action
  isFollowee(user) {
    return this.store.peekAll('user-followee').findBy('followeeId', user.id);
  }

  @action
  updateSummary() {
    this.perPage = this.model.perPage;
    this.currentPage = this.model.currentPage + 1;
    this.totalPages = this.model.meta.total_pages;
  }
  get dataSummary() {
    if (this.currentPage >= this.totalPages) {
      return this.intl.t('profile.people_page.showing_all');
    }
    return this.intl.t('profile.people_page.summary', {
      current: this.currentPage * this.perPage,
      total: this.totalPages * this.perPage,
    });
  }

  @action
  async follow(user) {
    const follow = this.store.createRecord('user-followee', {
      userId: this.me.id,
      followee: user,
    });
    try {
      await follow.save();
      user.totalUserFollowers += 1; //bad hack
    } catch (e) {
      follow.rollbackAttributes();
      const message = this.intl.t('profile.people_page.general_error');
      this.notify.alert(message);
    }
  }

  @action
  async unfollow(user) {
    try {
      const sub = this.store
        .peekAll('user-followee')
        .findBy('followeeId', user.id);
      if (sub) {
        await sub.destroyRecord();
        user.totalUserFollowers -= 1; //makes the model dirty though
      }
    } catch (e) {
      const message = this.intl.t('profile.people_page.general_error');
      this.notify.alert(message);
    }
  }
}
