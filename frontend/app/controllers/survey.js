import Controller from '@ember/controller';
import { action } from '@ember/object';
// import { inject } from '@ember/service';

export default class SurveyController extends Controller {

  // @inject
  // me;

  radioOptions = [
    {
      label: 'yes'
    },
    {
      label: 'no'
    },
    {
      label: 'maybe'
    }
  ];

  @action
  createSurvey(model) {
    let fields = model.getProperties('ok1', 'checkbox');
    console.log(fields);
  }

}
