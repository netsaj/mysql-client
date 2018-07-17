'use strict';

var Manager = require('./src/database/dbManager')


class Main {

    constructor() {
        this.run()
    }

    async run(){
        var db = new  Manager({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'bifrost'
        });

        var lista =  await db.table('usuario').printSql().set('nombre','Fabio').where('usuario', '=', 'demo3').update();
        console.log(lista);
    }
}

module.exports = new Main()