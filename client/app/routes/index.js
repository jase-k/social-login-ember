import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    console.log("Store:", this.store);
    console.log("Session:", this.session);
    return this.store.findRecord('user', this.session.data.authenticated.data.id);
  }
}
