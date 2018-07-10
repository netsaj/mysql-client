'use strict';
import Manager from './src/database/dbManager'


var db = new  Manager({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'control_acceso'
});