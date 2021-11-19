import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service session;

  @action
  async registerUser(un, em, pw) {
    console.log('form submitted');
    let user = this.store.createRecord('user', {
      username: un,
      email: em,
      password: pw,
    });
    user
      .save()
      .then((results) => {
        console.log(results);
        this.session.authenticate(
            'authenticator:server',
            un,
            pw 
        )
      })
      .catch((err) => console.log(err));
    console.log(user);
  }

  @action
  async loginUser(un, pw) {
    try {
      let response = await this.session.authenticate(
        'authenticator:server',
        un,
        pw
      );
      console.log(response);
    } catch (error) {
      console.log('Something went wrong', error);
      this.error = error;
    }
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
