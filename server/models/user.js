const { Model } = require('objection');
const knex = require('../db/db');

class User extends Model{
    // user schema
    static get tableName(){
        return 'users';
    }
}

User.knex(knex);
module.exports =  User;
