import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class VerifyEmailPromptComponent extends Component {
  @service me;

  @action
  async sendVerificationEmail() {
    if (this.me.isAuthenticated) {
      const data = {
        user: {
          email: this.me.user.email,
        },
      };

      const response = await fetch('/api/v1/users/verify', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      if (response.ok) {
        console.log('email sent');
      }
    }
  }
}
