import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default class UserModel extends Model {

    @attr()
    username

    @attr()
    email

    @attr()
    password

}
