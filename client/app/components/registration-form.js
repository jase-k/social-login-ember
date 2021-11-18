import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RegistrationFormComponent extends Component {
  @tracked username = '';
  @tracked email = '';
  @tracked password = '';

  @action
  async submit(e) {
    e.preventDefault();
    this.args.onSubmit(this.username, this.email, this.password);
  }
}
