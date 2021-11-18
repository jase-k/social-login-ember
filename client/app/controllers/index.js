import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import axios from 'axios';

export default class IndexController extends Controller {
    @service session;
    
    @action
    logoutUser() {
    axios
        .get('http://localhost:8000/api/logout/')
        .then((results) => {
        console.log(results.data);
        this.session.invalidate();
        })
        .catch((err) => console.log(err));
    }
}
    