import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class PasswordResetComponent extends Component {
  token = this.args.token;
  email = this.args.email;

  @service notify;
  @service intl;

  @tracked isInvalid = false;
  @tracked showPasswordForm = true;
  @tracked error = { message: '' };
  @tracked password = '';
  @tracked passwordConfirm = '';
  @tracked loading = false;

  @action
  async resetPassword(e) {
    e.preventDefault();

    this.loading = true;
    if (this.password !== this.passwordConfirm) {
      this.isInvalid = true;
      this.error = { ...this.error, message: "Password's don't match" };
      this.loading = false;
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
        if (response.status === 400) {
          // intl service not rendering html so we pass the string to html property of notify service
          this.notify.info({
            html: this.intl.t(
              'auth.password_reset.password_reset_token_expired',
              { htmlSafe: true }
            ),
            closeAfter: null,
          });
        }

        this.loading = false;
      } else {
        this.showPasswordForm = false;
      }
    }
  }
}
