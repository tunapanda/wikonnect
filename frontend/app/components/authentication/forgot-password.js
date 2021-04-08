import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class ForgotPasswordComponent extends Component {
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
    const response = await fetch('/api/v1/auth/forgot_password', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    if (!response.ok) {
      this.isInvalid = true;

      if (response.status === 404) {
        this.error = { ...this.error, message: 'No user with this email' };
      }
    }

    this.showEmailForm = false;
  }
}
