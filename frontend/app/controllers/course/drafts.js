import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class CourseDraftsController extends Controller {
  @tracked searchTerm;

  get courses() {
    if (!this.searchTerm) {
      return this.model;
    }
    return this.model.filter((item) => {
      return (
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
