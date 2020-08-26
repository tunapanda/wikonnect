// import Component from '@glimmer/component'; @jake
import Component from '@ember/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class LessonVotingComponent extends Component {
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
        let fields = model.getProperties('keyResult', 'checkbox');
        console.log(fields);
    }

}
