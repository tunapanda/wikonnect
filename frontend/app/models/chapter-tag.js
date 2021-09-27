import Model, { attr } from '@ember-data/model';

export default class ChapterTagModel extends Model {
  @attr name;
  isSelected = false;
}
