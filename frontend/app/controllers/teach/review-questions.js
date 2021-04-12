import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class ReviewQuestionsController extends Controller {
  @tracked
  selectedCategories = A(this.chapter.reviewQuestions || []);

  get chapter() {
    return this.model[0];
  }

  get reviewQuestions() {
    return this.model[1];
  }

  @action
  categoryPreselected(category) {
    if (
      !this.chapter.reviewQuestions ||
      this.chapter.reviewQuestions.length === 0
    ) {
      return false;
    }
    return this.selectedCategories.includes(category);
  }

  @action
  toggleCategorySelection(category) {
    const objIndex = this.selectedCategories.findIndex((c) => c === category);
    if (objIndex > -1) {
      this.selectedCategories.removeAt(objIndex);
    } else {
      this.selectedCategories.pushObject(category);
    }
  }

  @action
  async updateChapterReviewQuestions() {
    try {
      this.chapter.reviewQuestions = this.selectedCategories;
      await this.chapter.save();
      this.transitionToRoute('teach.preview', this.chapter.id);
    } catch (e) {
      this.notify.alert('Request not successful. Unexpected error encountered');
    }
  }
}
