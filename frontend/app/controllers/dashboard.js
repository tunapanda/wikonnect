import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class CoursesController extends Controller {

  // options = {
  //   //
  //   scales: {
  //     xAxes: [{
  //       barPercentage: 0.7,
  //       categoryPercentage: 0.7
  //     }],
  //     yAxes: [{
  //       ticks: {
  //         beginAtZero: false
  //       }
  //     }]
  //   },
  //   legend: {
  //     display: false
  //   }
  // }
  @computed('model.[]')
  get dataS() {
    return this.model.map((dashboard) => {
      let dataNum = [];
      dataNum.push(dashboard.get('achieved'));
      return dataNum;
    });
  }

  @computed('model.[]')
  get k1Data() {
    function dataS(){
      return this.model.map((dashboard) => {
        let dataNum = "";
        dataNum.append(dashboard.get('achieved'));
        console.log(dashboard.get('achieved'));
        return dataNum;
      });
    }
    console.log(this.dataS);
    return {

      labels: ["Q1 20", "Q2 20", "Q3 20", "Q4 20", "Q1 21", "Q2 21", "Q3 21",],
      datasets: [{
        label: "Achieved",
        fillColor: "rgb(34,139,34)",
        strokeColor: "rgb(34,139,34)",
        highlightFill: "rgb(34,139,34)",
        backgroundColor: "rgb(34,139,34)",
        highlightStroke: "rgb(34,139,34)",
        data: this.dataS
      },
      {
        label: "Target",
        fillColor: "rgb(255,215,0)",
        strokeColor: "rgb(255,215,0)",
        backgroundColor: "rgb(255, 215, 0)",
        highlightFill: "rgb(255,215,0)",
        highlightStroke: "rgb(255,215,0)",
        data: [60, 60, 80, 80, 60, 60, 40]
      }]
    };
  }

  @computed('model.[]')
  get k2Data() {
    return {
      labels: ["Q1 20", "Q2 20", "Q3 20", "Q4 20", "Q1 21", "Q2 21", "Q3 21",],
      datasets: [
        {
          label: "Achieved",
          fillColor: "rgb(34,139,34)",
          strokeColor: "rgb(34,139,34)",
          highlightFill: "rgb(34,139,34)",
          backgroundColor: "rgb(34,139,34)",
          highlightStroke: "rgb(34,139,34)",
          data: [28, 48, 40, 19, 60, 27, 60]
        },
        {
          label: "Target",
          fillColor: "rgb(255,215,0)",
          strokeColor: "rgb(255,215,0)",
          backgroundColor: "rgb(255,215,0)",
          highlightFill: "rgb(255,215,0)",
          highlightStroke: "rgb(255,215,0)",
          data: [30, 55, 50, 25, 50, 55, 40]
        }
      ]
    };
  }

  @computed('model.[]')
  get k3Data() {
    return {
      labels: ["Q1 20", "Q2 20", "Q3 20", "Q4 20", "Q1 21", "Q2 21", "Q3 21",],
      datasets: [
        {
          label: "Achieved",
          fillColor: "rgb(34,139,34)",
          strokeColor: "rgb(34,139,34)",
          highlightFill: "rgb(34,139,34)",
          backgroundColor: "rgb(34,139,34)",
          highlightStroke: "rgb(34,139,34)",
          data: [28, 48, 40, 19, 60, 27, 60]
        },
        {
          label: "Target",
          fillColor: "rgb(255,215,0)",
          strokeColor: "rgb(255,215,0)",
          backgroundColor: "rgb(255,215,0)",
          highlightFill: "rgb(255,215,0)",
          highlightStroke: "rgb(255,215,0)",
          data: [30, 55, 50, 25, 50, 55, 40]
        }
      ]
    };
  }

  @computed('model.[]')
  get k4Data() {
    return {
      labels: ["Q1 20", "Q2 20", "Q3 20", "Q4 20", "Q1 21", "Q2 21", "Q3 21",],
      datasets: [
        {
          label: "Achieved",
          fillColor: "rgb(34,139,34)",
          strokeColor: "rgb(34,139,34)",
          highlightFill: "rgb(34,139,34)",
          backgroundColor: "rgb(34,139,34)",
          highlightStroke: "rgb(34,139,34)",
          data: [28, 48, 40, 19, 60, 27, 60]
        },
        {
          label: "Target",
          fillColor: "rgb(255,215,0)",
          strokeColor: "rgb(255,215,0)",
          backgroundColor: "rgb(255,215,0)",
          highlightFill: "rgb(255,215,0)",
          highlightStroke: "rgb(255,215,0)",
          data: [30, 55, 50, 25, 50, 55, 40]
        }
      ]
    };
  }
}