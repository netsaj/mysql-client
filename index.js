'use strict';

var Manager = require('./src/database/dbManager')
var config = {
    db :{
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'sigesen'
    },
    app: {
        folder : __dirname
    }
}

global.config = config;


class Main {

    constructor() {
        this.run()
    }

    async run(){

        var db = new  Manager();

        var lista =  await db.table('areas').printSql().set('codigo',12).where('id', '=', 1).update();
        console.log(lista);
    }
}
module.exports = new Main()