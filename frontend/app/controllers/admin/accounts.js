import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import moment from 'moment';


export default class AdminAccountsController extends Controller {
  editing = false;

  @inject
  me;

  @inject
  session



  total = 0
  colorList = ['54378B', 'F57010', '32A583']


  options = {
    legend: false,
    tooltips: true,
    elements: {
      line: {
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
      },
      point: {
        backgroundColor: "rgb(153, 102, 255)",
        hoverBackgroundColor: "rgb(153, 102, 255)",
        hoverRadius: 15,
      }
    }
  }

  lastSeenComputed(date) {
    return moment().from(date);
  }

  @computed('model.[]')
  get userAccounts() {
    return this.model.map((users, index) => {
      let colorIndex = index % 3;

      return {
        'color': this.colorList[colorIndex],
        'username': users.get('username'),
        'lastSeen': this.lastSeenComputed(users.get('lastSeen')),
        'created': this.lastSeenComputed(users.get('createdAt'))
      };

    });
  }

  @computed('model.[]')
  get accountMetric() {
    let data = this.accountCreated();
    let labels = [];
    let dataset = [];


    for (const [key, value] of Object.entries(data)) {
      labels.push(key);
      dataset.push(value);
    }

    return {
      'total': this.model.length,
      'lineData': {
        labels: labels,
        datasets: [
          {
            label: "Users Created",
            data: dataset
          }
        ],
        options: this.options
      }
    };
  }

  accountCreated() {
    // let trialData = this.numberOfUsers
    let trialData = this.userAccounts;
    let computedLineData = trialData.reduce(function (r, e) {
      return r[e.created] = (r[e.created] || 0) + 1, r;
    }, {});

    return computedLineData;
  }
}
