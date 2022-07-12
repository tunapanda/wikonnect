import Controller from '@ember/controller';

export default class TeachReviewsController extends Controller {
  columns = [
    {
      title: 'User',
      component: 'teach/reviews/user-avatar',
    },
    {
      title: 'Rating',
      component: 'teach/reviews/rating',
    },
    {
      title: 'Comments',
      component: 'teach/reviews/comments',
    },
  ];
}
