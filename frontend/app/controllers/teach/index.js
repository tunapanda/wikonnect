import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class TeachIndexController extends Controller {
  @service me;

  columns = [
    {
      title: 'Topics',
      propertyName: 'name',
    },
    {
      title: 'Average Rating',
      component: 'teach/average-rating',
    },
    {
      title: 'Status',
      component: 'chapter/approval-status',
    },
    {
      title: 'Reviews',
      component: 'teach/link-to-reviews',
    },
    {
      title: 'Feedback',
      component: 'chapter/feedback',
    },
  ];
}
