import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Uploader from '../utils/uploader';




export default class UploadController extends Controller {
  @inject
  me

  queryParams = ['signup'];
  signup = false;





  @action
  uploadPic() {

  }
} 
