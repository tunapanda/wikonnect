import Controller from '@ember/controller';

export default class ResetPasswordController extends Controller {
  queryParams = ['token', 'email'];

  token = null;
  email = null;
}
