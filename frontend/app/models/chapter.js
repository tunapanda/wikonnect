import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class ChapterModel extends Model {
  @attr name;
  @attr slug;
  @attr description;
  @attr status;
  @attr contentId;
  @attr contentType;
  @attr contentUri;
  @attr('boolean') approved;
  @attr('boolean') verified;
  @attr('boolean') revisionRequested;
  @attr tags;
  @attr targetStatus;
  @attr imageUrl;
  @attr createdAt;
  @attr updatedAt;
  @attr reaction;
  @attr authenticatedUser;
  @attr views;
  @hasMany('comment') comment;
  @hasMany('chapterFeedback') feedback;
  @attr author;
  @attr reviewQuestions;
  @attr rank; // used by course
  @attr('number') ratings;

  @belongsTo('user') creator;
  @hasMany('tag') tags;

  get approvalStatus() {
    if (this.revisionRequested) {
      return 'revisions requested';
    } else {
      return this.approved ? 'approved' : 'pending';
    }
  }

  get lastUpdateTime() {
    if (!this.createdAt) {
      return new Date();
    }

    return new Date(this.updatedAt).toLocaleString();
  }
}
