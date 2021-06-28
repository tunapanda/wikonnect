import { attr } from '@ember-data/model';
import ChapterModel from './chapter';

export default class CoursePlaylistModel extends ChapterModel {
  @attr rank;
}
