import RESTAdapter from '@ember-data/adapter/rest';
import { get } from '@ember/object';
import { computed } from '@ember/object';

export default class ApplicationAdapter extends RESTAdapter {
  headers = {
    API_KEY: (function getCookie(name = "usertoken") {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    })()
  };
  namespace = 'api';
  host = 'http://localhost:8000';
}
