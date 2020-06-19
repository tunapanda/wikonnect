import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class AdminAccountsController extends Controller {

  colorList = ['54378B', 'F57010', '32A583']
  // startdate = moment().subtract(1, 'days').format('DD-MM-YYYY');

  lastSeenComputed(date){
    // let date1 = moment('2016-10-08 11:06:55');
    // let date2 = moment(date);
    // let diff = date2.diff(date1);
    return "2017-12-20 19:17:10"
    // return diff
  }

  @computed('model.[]')
  get userAccounts() {
    return this.model.map((users, index) => {
      let colorIndex = index % 3;

      return {
        'color': this.colorList[colorIndex],
        'email': users.get('email'),
        'username': users.get('username'),
        'lastSeen': this.lastSeenComputed(users.get('lastSeen')),
      };

    });
  }

}
