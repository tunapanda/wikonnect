import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';

export default class ChapterReviewRatingsComponent extends Component {
  @service store;

  @tracked extaReview;
  @tracked reviewQuestions = this.parseReviewQuestions;

  get hasLikedChapter() {
    return this.args?.reaction === 'like';
  }

  get parseReviewQuestions() {
    const questions = this.store.peekAll('review-question');
    if (!questions) {
      return A([]);
    }
    let parsedQuestions = A([]);
    questions.map((category) => {
      let options;
      if (category.options) {
        options = {
          negative: A([]),
          positive: A([]),
        };

        if (this.hasLikedChapter) {
          category.options.positive.map((opt) => {
            options.positive.pushObject(new ReviewQuestionOption(opt, false));
          });
        } else {
          category.options.negative.map((opt) => {
            options.negative.pushObject(new ReviewQuestionOption(opt, false));
          });
        }
      }
      const question = new ReviewQuestion(
        category.category,
        category.title,
        0,
        '',
        options
      );

      parsedQuestions.pushObject(question);
    });
    return parsedQuestions;
  }

  @action
  toggleSelectionOption(option) {
    option.selected = !option.selected;
  }

  @action
  updateQuestionRating(question, rating) {
    question.rating = rating;
  }

  @action
  submitRatingReview() {
    const reviews = { extra: this.extaReview };
    const ratings = {};

    this.reviewQuestions.map((q) => {
      if (q.options) {
        if (this.hasLikedChapter) {
          reviews[q.category] = q.options.positive
            .filter((opt) => opt.selected)
            .map((opt) => opt.title);
        } else {
          reviews[q.category] = q.options.negative
            .filter((opt) => opt.selected)
            .map((opt) => opt.title);
        }
        reviews[q.category].push(q.review);
      } else {
        reviews[q.category] = q.review;
      }
      ratings[q.category] = q.rating;
    });

    console.log(reviews, ratings);
  }
}

class ReviewQuestion {
  @tracked rating;
  @tracked review;
  @tracked options; // {positive: A([]),negative: A([])};

  /**
   *
   * @param category
   * @param title String
   * @param rating Integer
   * @param review string
   * @param options Object
   */
  constructor(category, title, rating, review, options) {
    this.title = title;
    this.rating = rating;
    this.review = review;
    this.options = options;
    this.category = category;
  }
}

class ReviewQuestionOption {
  @tracked selected = false;

  constructor(title, selected) {
    this.selected = selected;
    this.title = title;
  }
}
