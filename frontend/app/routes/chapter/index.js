import Route from '@ember/routing/route';
import { inject } from '@ember/service';


export default class ChapterIndexRoute extends Route {
  @inject
  me

  beforeModel() {
    return this.store.findAll('chapter');
  }

  async model(params) {

    // let rated = await this.store.query('rating', { "chapterId": params.chapter_slug });
    // let total = 0;
    // rated.forEach(element => {
    //   console.log(element.rating)
    //   total += element.rating;
    // });


    // let average = total / rated.get("length")
    let res = this.store.findRecord('chapter', params.chapter_slug);
    // res.average = average;
    // res.numberOf = rated.get("length");

    return res;
  }
}
