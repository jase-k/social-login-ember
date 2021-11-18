import RESTAdapter from '@ember-data/adapter/rest';
import { get } from '@ember/object';
import { computed } from '@ember/object';

export default class ApplicationAdapter extends RESTAdapter {
  headers = {
    API_KEY: document.cookie.match(/usertoken\=([^;]*)/)[1],
  };
  namespace = 'api';
  host = 'http://localhost:8000';
}
