import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import fetch from 'fetch';

export default class VerifyEmailComponent extends Component {
  email = this.args.email;
  token = this.args.token;

  @inject me;

  @action
  async verify() {
    const data = `email=${this.email}&token=${this.token}`;

    const response = await fetch(`/api/v1/users/${this.me.id}/verify?${data}`, {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    if (!response.ok) {
      this.error = {
        ...this.error,
        message: 'Something went wrong. Please try again.',
      };
    } else {
      console.log('email verified success!');
      this.args.verificationSuccessful();
    }
  }
}
