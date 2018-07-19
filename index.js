'use strict';

var Manager = require('./src/database/dbManager')

var config = {
    db: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'bifrost',
        port: 3306,
        debug: true,
    }
}
global.config = config;


class Main {

    constructor() {
        this.run()
    }

    async run(){
        var db = new  Manager(null);

        //var lista =  await db.table('usuario').printSql().set('nombre','Fabio').where('usuario', '=', 'demo3').update();
        var usuario = {codigo: 'FAB2', nombre: 'Cuenta demo2', tipo_cuenta : 'CAJA GENERAL', esActiva : true,
            saldo_inicial: 1000.20};
        var lista = await db.table('cuenta').insert(usuario);
        console.log("id: "+lista);
    }
}

module.exports = new Main()