import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class PasswordResetComponent extends Component {
  token = this.args.token;
  email = this.args.email;

  @tracked isInvalid = false;
  @tracked showPasswordForm = true;
  @tracked error = { message: '' };
  @tracked password = '';
  @tracked passwordConfirm = '';

  @action
  async resetPassword(e) {
    e.preventDefault();

    if (this.password !== this.passwordConfirm) {
      this.isInvalid = true;
      this.error = { ...this.error, message: "Password's don't match" };
    } else {
      const data = {
        auth: {
          email: this.email,
          token: this.token,
          // TODO: Hash these!
          new_password: this.password,
          verify_password: this.passwordConfirm,
        },
      };

      const response = await fetch('/api/v1/auth/reset_password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      if (!response.ok) {
        this.isInvalid = true;
        this.error = {
          ...this.error,
          message: 'Something went wrong. Please try again.',
        };
      } else {
        this.showPasswordForm = false;
      }
    }
  }
}
