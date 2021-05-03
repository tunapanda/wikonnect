import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default class ForgotPasswordComponent extends Component {
  @service notify;

  @tracked email;
  @tracked isInvalid = false;
  @tracked showEmailForm = true;
  @tracked error = { message: '' };

  @action
  tryAgain() {
    this.showEmailForm = true;
  }

  @action
  async resetPassword(e) {
    e.preventDefault();

    const data = { auth: { email: this.email } };
    try {
      const res = await fetch('/api/v1/auth/forgot_password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      if (res.ok) {
        this.showEmailForm = false;
        return;
      }
      throw res;
    } catch (e) {
      let message = 'Unexpected error encountered';
      if (e.status === 404) {
        message = 'User account associated with that email not found';
      }
      this.notify.error(message, { closeAfter: 20000 });
    }
  }
}
