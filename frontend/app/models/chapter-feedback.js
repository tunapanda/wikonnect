import Model, { belongsTo, attr } from '@ember-data/model';

export default class ChapterFeedbackModel extends Model {
  @attr comment;
  @attr parentId;
  @attr chapterId;
  @belongsTo('chapter') chapter;
  @belongsTo('user') creator;
}
