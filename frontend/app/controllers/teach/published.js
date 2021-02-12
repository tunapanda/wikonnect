import Controller from "@ember/controller";
import { inject } from "@ember/service";

export default class TeachPublishedController extends Controller {
  @inject me;

  get courseList() {
    return this.model;
  }
}
